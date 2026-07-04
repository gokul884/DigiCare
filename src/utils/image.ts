/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generates high-performance WebP image URLs and responsive srcSet arrays 
 * from Google User Content or Unsplash source URLs.
 * 
 * @param url The source image URL.
 * @param defaultWidth The fallback/default width in pixels.
 */
export function getOptimizedImage(url: string, defaultWidth: number = 600): { src: string; srcSet?: string } {
  if (!url) return { src: '' };

  // Handle Google User Content URLs (lh3.googleusercontent.com)
  if (url.includes('googleusercontent.com')) {
    // Strip any existing width/formatting parameters
    const cleanUrl = url.split('=')[0];
    
    // Choose appropriate responsive widths
    const widths = defaultWidth <= 200 
      ? [48, 96, 144, 192, 256] 
      : [320, 480, 640, 800, 1024, 1200];
    
    const src = `${cleanUrl}=w${defaultWidth}-rw`;
    const srcSet = widths
      .map(w => `${cleanUrl}=w${w}-rw ${w}w`)
      .join(', ');
      
    return { src, srcSet };
  }

  // Handle Unsplash image URLs
  if (url.includes('unsplash.com')) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('fm', 'webp');
      
      const widths = defaultWidth <= 200 
        ? [48, 96, 144, 192, 256] 
        : [320, 480, 640, 800, 1024, 1200];
      
      urlObj.searchParams.set('w', defaultWidth.toString());
      if (defaultWidth <= 200) {
        urlObj.searchParams.set('fit', 'crop');
        urlObj.searchParams.set('h', defaultWidth.toString());
      }
      const src = urlObj.toString();
      
      const srcSet = widths
        .map(w => {
          const u = new URL(url);
          u.searchParams.set('fm', 'webp');
          u.searchParams.set('w', w.toString());
          if (defaultWidth <= 200) {
            u.searchParams.set('fit', 'crop');
            u.searchParams.set('h', w.toString());
          }
          return `${u.toString()} ${w}w`;
        })
        .join(', ');
        
      return { src, srcSet };
    } catch (e) {
      return { src: url };
    }
  }

  // Fallback for any other/unrecognized image hosts
  return { src: url };
}
