"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "../../../lib/gsap";
import { useGSAP } from "@gsap/react";
import { section, shell } from "../../../constants/homeStyles";
import Link from "next/link";
import { Play } from "lucide-react";

export default function CTASection() {
  const ctaRef = useRef(null);

  const [shouldInit, setShouldInit] = useState(false);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldInit(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!shouldInit) return;
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        },
      );
    },
    { dependencies: [shouldInit] },
  );

  return (
    <section
      id="contact"
      className={`${section} pt-[80px] max-[640px]:pt-[60px] pb-[110px] bg-white`}
    >
      <div
        ref={ctaRef}
        className={`
    ${shell}

    relative
    overflow-hidden

    flex
    flex-col
    items-center
    justify-center

    rounded-[32px]
    max-[640px]:rounded-[22px]

    pt-[80px]
    pb-[85px]

    px-[40px]

    max-w-[1040px]
    mx-auto
  `}
      >
        {/* BACKGROUND IMAGE */}
        <img
          src="/images/cta-bg.webp"
          alt="Campus"
          className="
      absolute
      inset-0
      h-full
      w-full
      object-cover
    "
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* TITLE */}
          <h2
            className="
        font-display
        text-[40px]
        leading-[1.15]
        tracking-[-0.02em]
        
        text-white
        mb-[10px]
        max-[640px]:text-[31px]
      "
          >
            Begin the Journey.
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
        text-[15px]
        text-white/80
        mb-[28px]
        max-[640px]:text-[14px]
        font-rethink
      "
          >
            Admissions are now open across our institutions.
          </p>

          {/* BUTTONS */}
          <div
            className="
        flex
        gap-[14px]
        flex-wrap
        justify-center
        max-[640px]:w-full
      "
          >
            {/* PRIMARY */}
          <Link
  href="/contact"
  onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
>
  <button
    className="
      h-[42px]
      px-[22px]
      text-[15px]
      tracking-[0.04em]
      rounded-[10px]
      bg-[#ae1431]
      text-white
      hover:opacity-90
      hover:bg-black
      transition
      max-[640px]:w-full
      cursor-pointer
      font-rethink
      flex items-center justify-center gap-2
    "
  >
    APPLY NOW
    <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
  </button>
</Link>

            {/* SECONDARY */}
            <button
              className="
                  font-rethink
                  cursor-pointer
                  text-white
                  border border-white
                  px-6 py-3
                  rounded-[12px]
                  transition-all duration-300
                  hover:bg-white hover:text-[#ae1431]
                  flex items-center justify-center gap-2
                "
            >
              BOOK A CAMPUS VISIT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
