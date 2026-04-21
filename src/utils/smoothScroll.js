/**
 * Smooth scroll utility functions (non-React)
 */

/**
 * Scroll to an element by ID with optional offset
 * @param {string} elementId - ID of the element to scroll to
 * @param {number} offset - Offset from top in pixels (default: 0)
 */
export const scrollToElementById = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }
};

/**
 * Scroll to top of page smoothly
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

/**
 * Scroll by a specific amount smoothly
 * @param {number} amount - Amount to scroll in pixels
 */
export const scrollByAmount = (amount) => {
  window.scrollBy({
    top: amount,
    behavior: 'smooth',
  });
};

/**
 * Check if an element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean}
 */
export const isElementInViewport = (element) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
};
