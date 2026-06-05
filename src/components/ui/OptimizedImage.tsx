"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  onLoadingComplete?: () => void;
  disableTransition?: boolean;
  style?: React.CSSProperties;
  priority?: boolean;
  width?: number;
  height?: number;
  [key: string]: any;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  loading = "lazy",
  onLoadingComplete,
  disableTransition = false,
  style,
  priority = false,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoadingComplete?.();

    if (typeof window !== "undefined") {
      const win = window as any;
      clearTimeout(win.__stRefresh);
      win.__stRefresh = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    }
  };

  const transitionClass = disableTransition
    ? ""
    : `${!isLoaded ? "opacity-0" : "opacity-100"}`;

  const hasDimensions = width !== undefined && height !== undefined;

  return (
    <div className={`relative ${hasDimensions ? "" : "w-full h-full"} overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority || loading === "eager"}
        fill={!hasDimensions}
        width={width}
        height={height}
        onLoad={handleLoad}
        className={`transform-gpu transition-opacity duration-300 ${transitionClass}`}
        style={{
          objectFit: "cover",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          ...style,
        }}
        {...props}
      />
    </div>
  );
}
