import type { RefObject } from "react";
import { getLenis } from "../providers/SmoothScrollProvider";

export const useSmoothScroll = () => {
  const scrollToElement = (
    target: string | RefObject<HTMLElement | null> | HTMLElement | null,
    offset = 80,
  ) => {
    let el: HTMLElement | null = null;

    if (typeof target === "string") {
      el = document.getElementById(target);
    } else if (target && "current" in target) {
      el = target.current;
    } else if (target instanceof HTMLElement) {
      el = target;
    }

    if (!el) return;

    const lenis = getLenis();

    if (lenis) {
      lenis.scrollTo(el, {
        offset: -offset,
      });
    }
  };

  return scrollToElement;
};
