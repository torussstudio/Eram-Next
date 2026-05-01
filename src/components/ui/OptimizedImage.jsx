import { useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function OptimizedImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  loading = "lazy",
  onLoadingComplete,
  disableTransition = false,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoadingComplete?.();

    // Debounced ScrollTrigger refresh (prevents multiple refresh spikes)
    if (typeof window !== "undefined") {
      clearTimeout(window.__stRefresh);
      window.__stRefresh = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    }
  };

  const transitionClass = disableTransition
    ? ""
    : `${!isLoaded ? "opacity-0" : "opacity-100"}`;

  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={loading}
      decoding="auto"
      onLoad={handleLoad}
      className={`${className} transform-gpu ${transitionClass}`}
      style={{
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        ...props.style,
      }}
      {...props}
    />
  );
}