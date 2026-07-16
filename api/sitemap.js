import admin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Handle escaped newlines in private key
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  if (projectId && clientEmail && privateKey) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log('Firebase Admin SDK initialized successfully for sitemap');
    } catch (e) {
      console.error('Error initializing Firebase Admin SDK for sitemap:', e);
    }
  }
}

// Helper to format Date objects or Firestore Timestamps to ISO 8601 Date string (YYYY-MM-DD)
const formatDate = (val) => {
  if (!val) return null;
  try {
    let d;
    if (typeof val.toDate === 'function') {
      d = val.toDate();
    } else {
      d = new Date(val);
    }
    if (d && !isNaN(d.getTime())) {
      return d.toISOString().split('T')[0];
    }
  } catch (e) {
    console.error('Error formatting date for sitemap:', e);
  }
  return null;
};

// Helper to derive slug from the post URL
const getSlugFromUrl = (urlStr) => {
  try {
    if (!urlStr) return '';
    const parsed = new URL(urlStr);
    const pathname = parsed.pathname;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
    return filename.replace(/\.html$/, '');
  } catch (e) {
    return '';
  }
};

/**
 * Fetches publicly indexable posts dynamically.
 * Try Firestore -> Try Blogger API -> Fallback to Local Static Slugs
 */
async function getPosts() {
  const posts = [];

  // Method 1: Fetch from Firestore "posts" collection
  if (admin.apps.length) {
    try {
      const db = admin.firestore();
      const snapshot = await db.collection('posts').orderBy('publishedAt', 'desc').get();
      if (!snapshot.empty) {
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          const slug = docSnap.id || data.slug;
          if (slug) {
            let lastmod = null;
            if (data.updatedAt) {
              lastmod = formatDate(data.updatedAt);
            } else if (data.publishedAt) {
              lastmod = formatDate(data.publishedAt);
            }
            posts.push({ slug, lastmod });
          }
        });
        if (posts.length > 0) {
          console.log(`Retrieved ${posts.length} posts from Firestore for sitemap`);
          return posts;
        }
      }
    } catch (e) {
      console.warn('Firestore fetch failed in sitemap, trying Blogger fallback:', e);
    }
  }

  // Method 2: Fallback to Live Blogger Feed
  try {
    const bloggerUrl = 'https://omnirangesolutions.blogspot.com/feeds/posts/default?alt=json&max-results=50';
    const response = await fetch(bloggerUrl);
    if (response.ok) {
      const data = await response.json();
      const entries = data.feed?.entry || [];
      for (const entry of entries) {
        const alternateLink = entry.link?.find((l) => l.rel === 'alternate')?.href || '';
        const slug = getSlugFromUrl(alternateLink);
        if (slug) {
          const updatedStr = entry.updated?.$t || entry.published?.$t || '';
          const lastmod = updatedStr ? new Date(updatedStr).toISOString().split('T')[0] : null;
          posts.push({ slug, lastmod });
        }
      }
      if (posts.length > 0) {
        console.log(`Retrieved ${posts.length} posts from Blogger API for sitemap`);
        return posts;
      }
    }
  } catch (e) {
    console.warn('Blogger live feed fetch failed in sitemap, trying static local fallback:', e);
  }

  // Method 3: Fallback to known static BLOGS_DATA slugs
  const staticSlugs = ['b1', 'b2', 'b3'];
  const today = new Date().toISOString().split('T')[0];
  console.log('Using static default fallback for sitemap slugs');
  return staticSlugs.map((slug) => ({ slug, lastmod: today }));
}

/**
 * Main sitemap handler. Serves dynamically generated sitemap.xml.
 */
export default async function handler(req, res) {
  try {
    // Retrieve base domain dynamically
    let baseDomain = process.env.SITE_URL || process.env.APP_URL || 'https://omnirange.vercel.app';
    if (baseDomain.endsWith('/')) {
      baseDomain = baseDomain.slice(0, -1);
    }

    // Fetch live posts
    const posts = await getPosts();

    // Determine latest update timestamp for homepage priority rating
    let latestUpdate = '2026-07-16'; // Reliable baseline date
    posts.forEach((post) => {
      if (post.lastmod && post.lastmod > latestUpdate) {
        latestUpdate = post.lastmod;
      }
    });

    // Construct valid GSC XML format
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // 1. Homepage index route
    xml += '  <url>\n';
    xml += `    <loc>${baseDomain}/</loc>\n`;
    xml += `    <lastmod>${latestUpdate}</lastmod>\n`;
    xml += '    <changefreq>daily</changefreq>\n';
    xml += '    <priority>1.0</priority>\n';
    xml += '  </url>\n';

    // 2. Blog Index route
    xml += '  <url>\n';
    xml += `    <loc>${baseDomain}/#/blog</loc>\n`;
    xml += `    <lastmod>${latestUpdate}</lastmod>\n`;
    xml += '    <changefreq>daily</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';

    // 3. Individual dynamic post pages
    posts.forEach((post) => {
      xml += '  <url>\n';
      xml += `    <loc>${baseDomain}/#/blog/${post.slug}</loc>\n`;
      if (post.lastmod) {
        xml += `    <lastmod>${post.lastmod}</lastmod>\n`;
      }
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
      xml += '  </url>\n';
    });

    xml += '</urlset>\n';

    // Serve sitemap with correct dynamic headers and cache policies
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
    return res.status(200).send(xml);

  } catch (error) {
    console.error('Error in sitemap serverless function:', error);
    // Serve a simple default sitemap in case of a fatal error to keep search engine parsing functional
    const baseDomain = process.env.SITE_URL || process.env.APP_URL || 'https://omnirange.vercel.app';
    const today = new Date().toISOString().split('T')[0];
    const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseDomain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseDomain}/#/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(errorXml);
  }
}
