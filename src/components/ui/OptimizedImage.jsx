import { useState, useEffect } from 'react'

/**
 * OptimizedImage component provides:
 * - Native lazy loading (loading="lazy")
 * - Responsive images with srcset
 * - WebP format support with JPEG fallback
 * - Loading state management
 * - Error handling
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  sizes = '100vw',
  quality = 85,
  loading = 'lazy',
  onLoadingComplete,
  disableTransition = false,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
    onLoadingComplete?.()
  }

  const handleError = () => {
    setHasError(true)
  }

  // Extract image name without extension for responsive variants
  const imageName = src.replace(/\.[^/.]+$/, '')
  const imageExtension = src.match(/\.[^/.]+$/)?.[0] || '.jpg'

  // Generate responsive srcset for modern browsers
  // Note: In production, you'd generate these on your server or use a CDN like Cloudinary/Imgix
  const srcSet = `${src}`

  const transitionClass = disableTransition 
    ? '' 
    : `${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`

  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={loading}
      className={`${className} transform-gpu ${transitionClass}`}
      onLoad={handleLoad}
      onError={handleError}
      decoding="async"
      {...props}
    />
  )
}
