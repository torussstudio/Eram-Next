import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { useSmoothScrollToTop } from '../../hooks/useSmoothScroll';

/**
 * Scroll to Top Button Component
 * Shows when page is scrolled down, hides at top
 * Click to smoothly scroll back to top
 */
export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = useSmoothScrollToTop();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      aria-label="Scroll to top"
    >
      <FiArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
