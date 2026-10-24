import React from 'react';
import imageAssets from '../data/imageAssets.json';

interface ImageAsset {
  width: number;
  height: number;
  srcSet: string;
}

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  src: string;
  sizes: string;
}

/** Let the browser choose a lossless image for its viewport and pixel density. */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  sizes,
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  const asset = (imageAssets as Record<string, ImageAsset>)[src];

  return (
    <picture className="contents">
      {asset && <source type="image/webp" srcSet={asset.srcSet} sizes={sizes} />}
      <img
        src={src}
        sizes={sizes}
        width={asset?.width}
        height={asset?.height}
        loading={loading}
        decoding={decoding}
        {...props}
      />
    </picture>
  );
};
