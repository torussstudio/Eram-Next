/**
 * usePerformanceMonitoring Hook
 * Monitors and logs Core Web Vitals and performance metrics
 */
import { useEffect } from 'react'

export function usePerformanceMonitoring() {
  useEffect(() => {
    // Report Web Vitals
    const reportWebVitals = (metric) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`${metric.name}:`, metric.value)
      }
    }

    // Measure Cumulative Layout Shift (CLS)
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          reportWebVitals({
            name: 'LCP',
            value: lastEntry.renderTime || lastEntry.loadTime,
          })
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            reportWebVitals({
              name: 'FID',
              value: entry.processingDuration,
            })
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })

        // Cumulative Layout Shift (CLS)
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
              reportWebVitals({
                name: 'CLS',
                value: clsValue,
              })
            }
          })
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })

        return () => {
          lcpObserver.disconnect()
          fidObserver.disconnect()
          clsObserver.disconnect()
        }
      } catch (error) {
        console.error('Performance monitoring error:', error)
      }
    }
  }, [])
}

/**
 * Measure component render performance
 */
export function measureComponentPerformance(componentName) {
  const startTime = performance.now()

  return {
    logRenderTime: () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime
      if (renderTime > 16.67) {
        // > 60fps threshold
        console.warn(`${componentName} render time: ${renderTime.toFixed(2)}ms (exceeds 60fps budget)`)
      }
    },
  }
}
