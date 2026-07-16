/**
 * Dynamic robots.txt generator complying with Google Search Console guidelines.
 * Pulls base domain dynamically from SITE_URL or APP_URL environment variables.
 */
export default function handler(req, res) {
  // Retrieve the base domain with a reliable default fallback
  let baseDomain = process.env.SITE_URL || process.env.APP_URL || 'https://omnirange.vercel.app';
  if (baseDomain.endsWith('/')) {
    baseDomain = baseDomain.slice(0, -1);
  }

  // Standard robots.txt rules
  const robotsTxt = `User-agent: *
Allow: /
Allow: /#/blog

# Block private, auth, admin, and backend api routes
Disallow: /api/
Disallow: /admin
Disallow: /#/admin
Disallow: /auth/
Disallow: /checkout/

# Reference the dynamic sitemap URL explicitly
Sitemap: ${baseDomain}/sitemap.xml
`;

  // Serve with correct plain text header and aggressive cache-control
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  return res.status(200).send(robotsTxt);
}
