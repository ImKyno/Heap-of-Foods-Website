"use client";

import { useState, useCallback, useRef } from "react";

interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  skeletonClassName?: string;
}

export default function SkeletonImage({
  className = "",
  skeletonClassName,
  onLoad,
  ...props
}: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true);
      onLoad?.(e);
    },
    [onLoad],
  );

  // Check if already loaded (cached) when ref attaches
  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className={`relative ${className}`}>
      <img
        ref={imgRef}
        {...props}
        className={`w-full h-full object-contain transition-opacity duration-100 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={handleLoad}
      />
    </div>
  );
}
