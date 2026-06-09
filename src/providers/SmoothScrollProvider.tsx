"use client";

import React, { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let lenisInstance: any = null;

export const getLenis = () => lenisInstance;

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.killAll();
    };
  }, [pathname]);

  useEffect(() => {
    // Disable on mobile
    if (window.innerWidth < 768) return;

    let lenis: Lenis | null = null;
    let observer: ResizeObserver | null = null;
    let initialRefreshTimeout: NodeJS.Timeout;
    let resizeTimeout: NodeJS.Timeout;
    let isDestroyed = false;

    const onScroll = () => {
      ScrollTrigger.update();
    };

    const update = (time: number) => {
      if (lenis) {
        lenis.raf(time * 1000);
      }
    };

    const onRefresh = () => {
      if (lenis) {
        lenis.resize();
      }
    };

    const init = () => {
      if (isDestroyed) return;

      gsap.registerPlugin(ScrollTrigger);

      gsap.config({
        autoSleep: 60,
        force3D: true,
        nullTargetWarn: false,
      });

      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      lenisInstance = lenis;

      lenis.on("scroll", onScroll);

      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.addEventListener("refresh", onRefresh);

      let lastHeight = document.body.scrollHeight;

      observer = new ResizeObserver(() => {
        const newHeight = document.body.scrollHeight;

        if (Math.abs(newHeight - lastHeight) > 100) {
          lastHeight = newHeight;

          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
          }, 150);
        }
      });

      observer.observe(document.body);

      initialRefreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    };

    // Defer initialization to let the main thread render and hydrate the DOM first
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => init());
      } else {
        setTimeout(init, 100);
      }
    }

    return () => {
      isDestroyed = true;
      clearTimeout(initialRefreshTimeout);
      clearTimeout(resizeTimeout);
      if (observer) {
        observer.disconnect();
      }
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(1000, 16);
      if (lenis) {
        lenis.destroy();
      }
      if (lenisInstance === lenis) {
        lenisInstance = null;
      }
    };
  }, []);

  return <>{children}</>;
}
