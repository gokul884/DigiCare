import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost, BLOGS_DATA } from '../types';
import { calculateReadTime, formatDate, fetchBloggerFeed } from './blogger';

/**
 * Executes a Firestore query with a local timeout to prevent hanging.
 */
const getDocsWithTimeout = async (q: any, ms: number = 1500): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Firestore request timed out.'));
    }, ms);
    getDocs(q)
      .then((snapshot) => {
        clearTimeout(timer);
        resolve(snapshot);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

/**
 * Fetches blog posts from the Firestore "posts" collection, ordered by publishedAt descending.
 * If the collection is empty or fails, falls back gracefully to the direct Blogger feed.
 */
export const fetchFirestoreBlogs = async (): Promise<BlogPost[]> => {
  try {
    const postsCol = collection(db, 'posts');
    const q = query(postsCol, orderBy('publishedAt', 'desc'));
    // Await with a strict 1.5s timeout to prevent network hang
    const snapshot = await getDocsWithTimeout(q, 1500);

    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const id = docSnap.id || data.slug;
        const title = data.title || '';
        const content = data.contentHtml || '';
        const description = data.excerpt || '';
        const category = data.category || 'General';
        const image = data.thumbnailUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';
        const author = data.author || 'Gokul Krisnan';

        // Format publishedAt timestamp to readable string
        let date = 'Jun 28, 2026';
        if (data.publishedAt) {
          try {
            const jsDate = typeof data.publishedAt.toDate === 'function'
              ? data.publishedAt.toDate()
              : new Date(data.publishedAt);
            
            if (jsDate && !isNaN(jsDate.getTime())) {
              date = formatDate(jsDate.toISOString());
            }
          } catch (e) {
            console.warn('Failed to parse publishedAt date for post:', id, e);
          }
        }

        const readTime = calculateReadTime(content);

        return {
          id,
          title,
          description,
          content,
          category,
          date,
          image,
          author,
          authorRole: 'Contributor',
          authorAvatar: '', // Renders with default initials in UI
          readTime,
        };
      });
    }
    console.log('Firestore "posts" collection is empty, falling back to direct Blogger feed.');
  } catch (error) {
    console.warn('Firestore fetch failed or timed out, falling back to direct Blogger feed:', error);
  }

  // Fallback to direct Blogger feed with final fallback to local BLOGS_DATA
  try {
    return await fetchBloggerFeed();
  } catch (bloggerError) {
    console.warn('Blogger live feed failed too, returning static local BLOGS_DATA:', bloggerError);
    return BLOGS_DATA;
  }
};
