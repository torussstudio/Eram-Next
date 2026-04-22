import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "../../providers/SmoothScrollProvider";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force standard browser scroll to top immediately
    window.scrollTo(0, 0);

    // If Lenis is active, force its internal state to top without easing
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
