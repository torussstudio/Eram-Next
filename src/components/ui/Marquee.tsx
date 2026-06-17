"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function MarqueeText() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.to(ref.current, {
        xPercent: -50,
        duration: 40,
        ease: "linear",
        repeat: -1,
      });
    },
    { scope: ref },
  );

  const text = "FIVE INSTITUTIONS. ONE DISCIPLINED ECOSYSTEM OF LEARNING";
  const items = Array.from({ length: 8 });

  return (
    <div
      className="
        relative
        left-1/2
        right-1/2
      
        w-screen
        -translate-x-1/2
        overflow-hidden
        border-y-[2px]
        border-black
        py-[16px]
        max-[640px]:mt-[20px]
        max-[640px]:mb-[44px]
        max-[640px]:py-[12px]
      "
    >
      <div ref={ref} className="flex items-center whitespace-nowrap w-max">
        {items.map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-[40px] pr-[40px] max-[640px]:gap-[18px] max-[640px]:pr-[18px]"
          >
            <span className="text-[25px] tracking-[0.22em] text-black max-[640px]:text-[14px] max-[640px]:tracking-[0.12em]">
              {text}
            </span>
            <div className="h-[18px] w-[1px] flex-shrink-0 bg-black max-[640px]:h-[12px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
