// import { useEffect } from "react";
// import Lenis from "lenis";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // Optimize GSAP for better performance
// gsap.config({
//   autoSleep: 60,
//   force3D: true,
//   nullTargetWarn: false,
// });

// let lenis;

// export const getLenis = () => lenis;

// export default function SmoothScrollProvider({ children }) {
//   useEffect(() => {
//     lenis = new Lenis({
//       lerp: 0.1,
//       smoothWheel: true,
//       smoothTouch: false,
//       wheelMultiplier: 0.9,
//       orientation: "vertical",
//       gestureOrientation: "vertical",
//       syncTouch: false,
//       touchInertiaMultiplier: 30,
//     });

//     // Perfect Sync via GSAP ticker
//     lenis.on("scroll", ScrollTrigger.update);

//     const updateLenis = (time) => {
//       lenis?.raf(time * 1000);
//     };

//     gsap.ticker.add(updateLenis);
//     gsap.ticker.lagSmoothing(0); // Ensure GSAP lag smoothing doesn't conflict with Lenis

//     // Keep Lenis size in sync with ScrollTrigger
//     const onRefresh = () => lenis?.resize();
//     ScrollTrigger.addEventListener("refresh", onRefresh);

//     // Eliminate layout shifts (CLS) by observing DOM body resizes and triggering refresh selectively
//     let debounceScroll;
//     let lastHeight = document.body.scrollHeight;

//     const resizeObserver = new ResizeObserver(() => {
//       const currentHeight = document.body.scrollHeight;
//       // Only refresh if height significantly changed to prevent mobile URL bar hiding from thrashing GPU
//       if (Math.abs(currentHeight - lastHeight) > 100) {
//         lastHeight = currentHeight;
//         clearTimeout(debounceScroll);
//         debounceScroll = setTimeout(() => {
//           ScrollTrigger.refresh();
//         }, 150);
//       }
//     });

//     resizeObserver.observe(document.body);

//     // Trigger initial refresh correctly
//     setTimeout(() => {
//       ScrollTrigger.refresh();
//     }, 100);

//     return () => {
//       resizeObserver.disconnect();
//       ScrollTrigger.removeEventListener("refresh", onRefresh);
//       gsap.ticker.remove(updateLenis);
//       gsap.ticker.lagSmoothing(1000, 16); // Restore GSAP defaults
//       lenis.destroy();
//       lenis = null;
//     };
//   }, []);

//   return children;
// }


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

    // ✅ IMPORTANT: connect Lenis with GSAP
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value);
        } else {
          return lenis.scroll;
        }
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // Sync scroll
    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis?.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Refresh handling
    const onRefresh = () => lenis?.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    // Resize observer
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

    // ✅ Strong initial refresh (fix production bug)
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