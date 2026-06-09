"use client";

import { memo, useRef } from "react";
import OptimizedImage from "../../ui/OptimizedImage";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { useRouter } from "next/navigation";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

function ERAMSportsArena() {
  const containerRef = useRef(null);
  const router = useRouter();

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        gsap.set(".arena-text",     { opacity: 0, y: 32 });
        gsap.set(".arena-img-wrap", { opacity: 0, scale: 0.95 });
        gsap.set(".arena-img-text", { opacity: 0, y: 20 });
        gsap.set(".arena-cta",      { opacity: 0, scale: 0.98 });
        gsap.set(".arena-cta-text", { opacity: 0, y: 20 });
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

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".arena-cta",
          start: "top 80%",
        },
      });

      ctaTl.to(".arena-cta", {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      });

      ctaTl.to(
        ".arena-cta-text",
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.8"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="
        bg-[#F5EFE8]
        px-4 xs:px-5 sm:px-6 md:px-8 lg:px-6
        py-12 sm:py-16 md:py-20 lg:py-24
      "
    >
      <div className="max-w-[1100px] mx-auto">

        {/* ── TOP HEADER ── */}
        <div className="
          grid grid-cols-1 md:grid-cols-2
          gap-6 sm:gap-8 md:gap-12
          items-start
        ">
          <h2
            className="
              arena-text
              font-display
              text-[26px] xs:text-[28px] sm:text-[32px] md:text-[40px] lg:text-[44px]
              leading-[1.2] text-black
            "
          >
            The ERAM
            <br />
            Sports Arena
          </h2>

          <p
            className="
              arena-text
              text-[13.5px] xs:text-[14px] sm:text-[14.5px] md:text-[15px]
              text-black/70 leading-[1.65]
              max-w-full md:max-w-[600px]
              font-rethink
            "
          >
            The ERAM Sports Arena further reflects the Trust's long-term
            commitment to athletics and community engagement. Designed to
            support institutional competitions and external sporting events, the
            Arena marks a significant milestone in integrating sports excellence
            within the educational ecosystem.
          </p>
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
              alt="sports"
              className="absolute inset-0 w-full h-full object-cover block"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1100px"
              disableTransition
            />

            <div className="absolute inset-0 bg-black/30" />

            <p
              className="
                arena-img-text
                absolute
                bottom-4 xs:bottom-5 sm:bottom-8 md:bottom-10 lg:bottom-[60px]
                left-4 xs:left-5 sm:left-8 md:left-12 lg:left-20
                right-4 sm:right-8 md:right-10
                text-white
                text-[12px] xs:text-[13px] sm:text-[15px] md:text-[18px] lg:text-[22px]
                font-semibold leading-[1.4]
                max-w-[220px] xs:max-w-[260px] sm:max-w-[340px] md:max-w-[440px] lg:max-w-[520px]
                font-rethink
              "
            >
              Infrastructure at ERAM is planned not for scale alone, but for
              sustained opportunity.
            </p>
          </div>
        </div>

        {/* ── CTA BLOCK ── */}
        <div className="arena-cta mt-8 sm:mt-10 md:mt-12 lg:mt-14">

          {/*
            KEY FIX: The outer wrapper has an explicit height at every breakpoint.
            Previously only the <img> had height — if OptimizedImage renders
            as position:absolute or fails to load, the `relative` parent collapses
            to 0px and all `absolute inset-0` children (overlay + text) disappear.
            Now the parent always has a defined height, so nothing can collapse.
          */}
          <div
            className="
              relative
              rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] md:rounded-[28px]
              overflow-hidden
              h-[300px] xs:h-[320px] sm:h-[300px] md:h-[320px] lg:h-[340px]
            "
          >
            {/* Image sits absolute, filling the fixed-height container */}
            <OptimizedImage
              src="/images/classroom-dark.webp"
              alt="cta"
              className="absolute inset-0 w-full h-full object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1100px"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content — sits above overlay via z-index */}
            <div
              className="
                absolute inset-0 z-10
                flex flex-col items-center justify-center
                text-center
                px-4 xs:px-5 sm:px-8 md:px-12
                gap-4 sm:gap-5 md:gap-6
              "
            >
              <p
                className="
                  arena-cta-text
                  text-white/90
                  text-[11.5px] xs:text-[12.5px] sm:text-[14px] md:text-[15px] lg:text-[16px]
                  font-medium leading-[1.72]
                  max-w-[280px] xs:max-w-[320px] sm:max-w-[460px] md:max-w-[520px] lg:max-w-[560px]
                  mx-auto font-rethink
                "
              >
                ERAM Educational & Welfare Trust continues to build an
                integrated educational ecosystem rooted in discipline, guided by
                responsibility, & strengthened by community engagement.
              </p>

              <div
                className="
                  arena-cta-text
                  flex flex-row
                  gap-2.5 sm:gap-3 md:gap-4
                  items-center
                  justify-center
                "
              >
               <Link
  href="/contact"
  className="
    inline-flex
    items-center
    justify-center
    bg-[#b5122b] text-white
    px-4 xs:px-5 sm:px-6
    py-2 xs:py-2.5 sm:py-3
    rounded-lg
    text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px]
    font-medium font-rethink
    hover:opacity-90 active:scale-95 transition
    whitespace-nowrap cursor-pointer
    tracking-wide
  "
>
  ADMISSIONS OPEN
</Link>

                <button
                  type="button"
                  onClick={() => {
                    router.push("/");
                    setTimeout(() => {
                      const section = document.getElementById("institutions");
                      if (section) {
                        const y =
                          section.getBoundingClientRect().top +
                          window.pageYOffset -
                          90;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }, 700);
                  }}
                  className="
                    border border-white/60 text-white
                    px-4 xs:px-5 sm:px-6
                    py-2 xs:py-2.5 sm:py-3
                    rounded-lg
                    text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px]
                    font-medium font-rethink
                    hover:bg-white hover:text-black
                    active:scale-95 transition
                    whitespace-nowrap cursor-pointer
                    tracking-wide
                  "
                >
                  EXPLORE OUR INSTITUTIONS
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default memo(ERAMSportsArena);