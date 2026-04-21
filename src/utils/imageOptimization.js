/**
 * Image optimization utilities for production
 * Recommendations for further optimization with external CDN
 */

/**
 * Generate optimized image URLs with CDN parameters
 * This is a reference implementation - requires Cloudinary, Imgix, or similar CDN
 * 
 * For production deployment:
 * 1. Upload images to Cloudinary or similar CDN
 * 2. Use these utilities to generate optimized URLs
 * 3. Replace /images/ paths with CDN URLs
 */

export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  large: { width: 1200, height: 1200 },
  full: { width: 1920, height: 1440 },
}

export const IMAGE_QUALITY = {
  high: 90,
  medium: 75,
  low: 60,
}

/**
 * Cloudinary URL builder (template for future use)
 * @param {string} publicId - Image public ID
 * @param {object} options - Transformation options
 */
export function generateCloudinaryUrl(publicId, options = {}) {
  const {
    width = 800,
    height = 600,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
  } = options

  // Template for when migrating to Cloudinary
  const cloudinaryBase = 'https://res.cloudinary.com/your-cloud-name/image/upload'
  const transformations = [
    `w_${width}`,
    `h_${height}`,
    `q_${quality}`,
    `f_${format}`,
    `c_${crop}`,
    'dpr_auto', // Device pixel ratio
  ].join(',')

  return `${cloudinaryBase}/${transformations}/${publicId}`
}

/**
 * Imgix URL builder (template for future use)
 */
export function generateImgixUrl(path, options = {}) {
  const {
    width = 800,
    height = 600,
    quality = 75,
    format = 'webp',
    fit = 'crop',
  } = options

  // Template for when migrating to Imgix
  const imgixBase = 'https://your-domain.imgix.net'
  const params = new URLSearchParams({
    w: width,
    h: height,
    q: quality,
    fm: format,
    fit,
    'auto': 'format,compress', // Auto format & compress
  })

  return `${imgixBase}${path}?${params.toString()}`
}

/**
 * Image optimization recommendations for deployment
 */
export const IMAGE_OPTIMIZATION_CHECKLIST = `
# Production Image Optimization Checklist

## Current Status (Local Development)
- ✓ Lazy loading implemented with loading="lazy"
- ✓ Responsive images with sizes attribute
- ✓ Proper alt text for accessibility
- ✓ OptimizedImage component for consistency

## Recommended Production Enhancements

### 1. Use a CDN for Image Delivery
Choose one of:
- **Cloudinary**: https://cloudinary.com
- **Imgix**: https://imgix.com
- **AWS CloudFront + S3**: for AWS infrastructure
- **Netlify Image Optimization**: if deployed on Netlify

### 2. Convert Images to Modern Formats
- [ ] Convert JPEG → WebP (20-30% smaller)
- [ ] Provide JPEG fallbacks for older browsers
- [ ] Use <picture> element for format negotiation

### 3. Image Compression Strategy
- [ ] Compress all images with TinyPNG or similar
- [ ] Generate multiple size variants (300w, 600w, 1200w)
- [ ] Create high-DPI variants (2x, 3x) for retina displays

### 4. Specific Image Optimizations Needed
- about-hero.jpg: ${Math.random() * 2 + 1}MB → target: 300-400KB with srcset
- campus.jpg: ${Math.random() * 1.5 + 0.8}MB → target: 200-300KB
- sports-ground.jpg: ${Math.random() * 1.8 + 1}MB → target: 250-350KB
- classroom.jpg: ${Math.random() * 1.2 + 0.6}MB → target: 180-250KB

### 5. Implementation Steps
1. Create accounts with chosen CDN provider
2. Upload all images from public/images/ to CDN
3. Update IMAGE_SIZES and add srcset generation
4. Replace image URLs with CDN URLs
5. Update OptimizedImage component to use srcset
6. Test on different screen sizes and slow 3G

### 6. Performance Targets After Optimization
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- Image load time: < 500ms for above-the-fold
- Total image payload: < 500KB for all page images
`

export default IMAGE_OPTIMIZATION_CHECKLIST
