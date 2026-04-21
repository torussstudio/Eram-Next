import { useState, useEffect } from 'react';

/**
 * Custom hook for smooth scroll to elements
 * Usage: const scrollToElement = useSmoothScroll();
 * Then call: scrollToElement('element-id') or scrollToElement(elementRef)
 */
export const useSmoothScroll = () => {
  const scrollToElement = (target, offset = 0) => {
    let element;

    // Handle different input types
    if (typeof target === 'string') {
      // If target is a string ID
      element = document.getElementById(target);
    } else if (target?.current) {
      // If target is a React ref
      element = target.current;
    } else if (target instanceof HTMLElement) {
      // If target is a DOM element
      element = target;
    }

    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return scrollToElement;
};

/**
 * Hook for smooth scroll to top
 * Usage: const scrollToTop = useSmoothScrollToTop();
 * Then call: scrollToTop()
 */
export const useSmoothScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return scrollToTop;
};

/**
 * Hook to detect scroll position for effects (like showing scroll-to-top button)
 * Usage: const isScrolled = useScrollPosition();
 */
export const useScrollPosition = (threshold = 300) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};
