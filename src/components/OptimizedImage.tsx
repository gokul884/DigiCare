/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { getOptimizedImage } from '../utils/image';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  defaultWidth?: number;
}

/**
 * A responsive, high-performance image component that automatically serving WebP 
 * formats and responsive srcSet maps for Google and Unsplash images.
 */
export default function OptimizedImage({
  src,
  defaultWidth = 600,
  className,
  alt = '',
  sizes,
  ...props
}: OptimizedImageProps) {
  const optimized = getOptimizedImage(src, defaultWidth);

  return (
    <img
      src={optimized.src}
      srcSet={optimized.srcSet}
      sizes={sizes || (defaultWidth <= 200 ? undefined : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px')}
      className={className}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}
