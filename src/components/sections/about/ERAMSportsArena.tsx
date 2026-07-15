"use client";

import { memo, useRef } from "react";
import OptimizedImage from "../../ui/OptimizedImage";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import {  Play } from "lucide-react";
import { useRouter } from "next/navigation";


gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { number: "/01", title: "Competitive training pathways" },
  { number: "/02", title: "Inter-school and regional participation" },
  { number: "/03", title: "Community engagement through sports" },
  { number: "/04", title: "Institutional visibility and reputation" },
];



function ERAMSportsArena() {
  const containerRef = useRef(null);
  const router = useRouter();

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        gsap.set(".arena-text", { opacity: 0, y: 32 });
        gsap.set(".arena-feature", { opacity: 0, y: 20 });
        gsap.set(".arena-img-wrap", { opacity: 0, scale: 0.95 });
        gsap.set(".arena-img-text", { opacity: 0, y: 20 });
        gsap.set(".arena-cta", { opacity: 0, y: 16 });
      }

      if (isMobile) return;

      gsap.to(".arena-text", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      gsap.to(".arena-feature", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".arena-features",
          start: "top 85%",
        },
      });

      gsap.to(".arena-img-wrap", {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".arena-img-wrap",
          start: "top 85%",
        },
      });

      gsap.to(".arena-img-text", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".arena-img-wrap",
          start: "top 60%",
        },
      });

      gsap.to(".arena-cta", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".arena-cta",
          start: "top 90%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
  ref={containerRef}
  className="
    bg-[#F5EFE8]
    px-4 xs:px-5 sm:px-6 md:px-8 lg:px-6
    pt-12 sm:pt-16 md:pt-20 lg:pt-24
    pb-6 sm:pb-8 md:pb-10 lg:pb-12
  "
>
      <div className="max-w-[1100px] mx-auto">
        {/* ── HEADER ── */}
        <h2
          className="
            arena-text
            font-display
            text-[26px] xs:text-[28px] sm:text-[32px] md:text-[40px] lg:text-[44px]
            leading-[1.2] text-black
          "
        >
          The ERAM Sports Arena
        </h2>

        <p
          className="
            arena-text
            mt-3 xs:mt-4 sm:mt-4 md:mt-5
            text-[13.5px] xs:text-[14px] sm:text-[14.5px] md:text-[15px]
            text-black/70 leading-[1.65]
            max-w-full md:max-w-[640px]
            font-rethink
          "
        >
          The ERAM Sports Arena marks a significant milestone in the Trust&rsquo;s
          long-term commitment to athletics, community engagement, and exposure.
          Designed to host institutional competitions as well as external
          sporting events, the Arena strengthens:
        </p>

        {/* ── NUMBERED FEATURES ── */}
        <div
          className="
            arena-features
            mt-8 sm:mt-10 md:mt-14
            grid grid-cols-2 md:grid-cols-4
            gap-x-4 xs:gap-x-5 sm:gap-x-6 md:gap-x-8
            gap-y-8 sm:gap-y-9 md:gap-y-0
          "
        >
          {FEATURES.map((feature) => (
            <div
              key={feature.number}
              className="arena-feature border-l border-black/15 pl-3 xs:pl-4 sm:pl-5"
            >
              <span className="font-rethink text-[12px] xs:text-[13px] sm:text-[14px] text-[#ae1431]">
                {feature.number}
              </span>
              <p
                className="
                  font-rethink
                  mt-8 xs:mt-9 sm:mt-10 md:mt-12
                  text-[14px] xs:text-[15px] sm:text-[16px] md:text-[17px]
                  leading-[1.4] text-black
                "
              >
                {feature.title}
              </p>
            </div>
          ))}
        </div>

        {/* ── IMAGE CARD ── */}
        <div className="mt-8 sm:mt-10 md:mt-14">
          <div
            className="
              arena-img-wrap
              relative
              rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] md:rounded-[28px]
              overflow-hidden
              will-change-transform transform-gpu
              h-[240px] xs:h-[280px] sm:h-[340px] md:h-[420px] lg:h-[480px]
            "
          >
            <OptimizedImage
              src="/images/sports-ground.webp"
              alt="ERAM Sports Arena"
              className="absolute inset-0 w-full h-full object-cover block"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1100px"
              disableTransition
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div
              className="
                absolute inset-0
                flex items-center justify-center
                px-6 xs:px-8 sm:px-12 md:px-16 lg:px-20
              "
            >
              <p
                className="
                  arena-img-text
                  text-white text-center
                  text-[16px] xs:text-[18px] sm:text-[22px] md:text-[27px] lg:text-[30px]
                  leading-[1.4]
                  max-w-[320px] xs:max-w-[420px] sm:max-w-[560px] md:max-w-[700px] lg:max-w-[780px]
                  font-rethink
                "
              >
                It reflects the Trust&rsquo;s belief that structured education must
                include structured athletic excellence, integrating sports
                excellence within the educational ecosystem.
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="arena-cta sm:mt-4 md:mt-6 flex justify-center">
         <button
  onClick={() => router.push("/explore-arena")}
  className="
    structured-btn

    mt-2
    md:mt-3

    border
    border-[#ae1431]

    px-5
    py-2

    rounded-lg

    text-sm

    flex
    items-center
    gap-2

    hover:bg-black
    hover:border-black
    text-white
    bg-[#ae1431]

    transition-all
    duration-300

    cursor-pointer

    font-rethink
  "
>
  EXPLORE MORE
 <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
</button>
        </div>
      </div>
    </section>
  );
}

export default memo(ERAMSportsArena);