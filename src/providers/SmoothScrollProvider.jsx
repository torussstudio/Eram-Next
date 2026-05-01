import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.config({
  autoSleep: 60,
  force3D: true,
  nullTargetWarn: false,
});

let lenis;

export const getLenis = () => lenis;

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
    });

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker for perfect sync
    const updateLenis = (time) => {
      lenis?.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Refresh Lenis dimensions whenever ScrollTrigger refreshes
    const onRefresh = () => lenis?.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    // Debounced resize observer — only refresh when page height changes significantly
    let debounceScroll;
    let lastHeight = document.body.scrollHeight;

    const resizeObserver = new ResizeObserver(() => {
      const currentHeight = document.body.scrollHeight;
      if (Math.abs(currentHeight - lastHeight) > 100) {
        lastHeight = currentHeight;
        clearTimeout(debounceScroll);
        debounceScroll = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      }
    });

    resizeObserver.observe(document.body);

    // Initial refresh after layout settles
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      resizeObserver.disconnect();
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(updateLenis);
      gsap.ticker.lagSmoothing(1000, 16);
      lenis.destroy();
      lenis = null;
    };
  }, []);

  return children;
}