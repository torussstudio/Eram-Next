"use client";

import { useRef } from "react";
import { gsap } from "../../../lib/gsap";
import { useGSAP } from "@gsap/react";
import { useSmoothScroll } from "../../../hooks/useSmoothScroll";

/* ─── Animation config ────────────────────────────────────────────────────── */
const EASE = {
  snappy: "power2.out",
  smooth: "power3.out",
  heavy: "power4.out",
  light: "power1.out",
};

/* ─── Shared image class ──────────────────────────────────────────────────── */
const imgCls =
  "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105";

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function AboutSection() {
  const smoothScrollTo = useSmoothScroll();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Desktop refs
  const dLabelRef = useRef(null);
  const dHeadingRef = useRef(null);
  const dParaRef = useRef(null);
  const dGridRef = useRef<HTMLDivElement | null>(null);
  const dQuoteRef = useRef(null);
  const dCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile / Tablet refs
  const mLabelRef = useRef(null);
  const mHeadingRef = useRef(null);
  const mParaRef = useRef(null);
  const mQuoteRef = useRef(null);
  const mCardsWrap = useRef<HTMLDivElement | null>(null);
  const mCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const section = sectionRef.current;
      const mm = gsap.matchMedia();

      /* ── Desktop ≥ 1100px — cinematic, layered ──────────────────────────── */
      mm.add("(min-width: 1100px)", () => {
        gsap.set(
          [
            dLabelRef.current,
            dHeadingRef.current,
            dParaRef.current,
            dQuoteRef.current,
            ...dCardsRef.current,
          ],
          { opacity: 0 },
        );

        // Text block
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            invalidateOnRefresh: true,
          },
        });

        tl1
          .fromTo(
            dLabelRef.current,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.6, ease: EASE.snappy },
          )
          .fromTo(
            dHeadingRef.current,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.85, ease: EASE.smooth },
            "-=0.35",
          )
          .fromTo(
            dParaRef.current,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.85, ease: EASE.smooth },
            "-=0.68",
          );

        // Grid (quote + cards)
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: dGridRef.current,
            start: "top 82%",
            invalidateOnRefresh: true,
          },
        });

        tl2
          .fromTo(
            dQuoteRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.0, ease: EASE.heavy },
          )
          .fromTo(
            dCardsRef.current,
            { opacity: 0, y: 44, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.1,
              ease: EASE.snappy,
            },
            "-=0.75",
          );

        return () => {
          tl1.kill();
          tl2.kill();
        };
      });

      /* ── Tablet 768–1099px — balanced ───────────────────────────────────── */
      mm.add("(min-width: 768px) and (max-width: 1099px)", () => {
        gsap.set(
          [
            mLabelRef.current,
            mHeadingRef.current,
            mParaRef.current,
            mQuoteRef.current,
            ...mCardsRef.current,
          ],
          { opacity: 0 },
        );

        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            invalidateOnRefresh: true,
          },
        });

        tl1
          .fromTo(
            mLabelRef.current,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.55, ease: EASE.snappy },
          )
          .fromTo(
            mHeadingRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.62, ease: EASE.snappy },
            "-=0.30",
          )
          .fromTo(
            mParaRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.55, ease: EASE.snappy },
            "-=0.42",
          )
          .fromTo(
            mQuoteRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: EASE.snappy },
            "-=0.38",
          );

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: mCardsWrap.current,
            start: "top 86%",
            invalidateOnRefresh: true,
          },
        });

        tl2.fromTo(
          mCardsRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.08,
            ease: EASE.snappy,
          },
        );

        return () => {
          tl1.kill();
          tl2.kill();
        };
      });

      /* ── Mobile < 768px — fade-only, fast, zero layout cost ─────────────── */
      mm.add("(max-width: 767px)", () => {
        gsap.set(
          [
            mLabelRef.current,
            mHeadingRef.current,
            mParaRef.current,
            mQuoteRef.current,
            ...mCardsRef.current,
          ],
          { opacity: 0 },
        );

        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            invalidateOnRefresh: true,
          },
        });

        tl1
          .fromTo(
            mLabelRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, ease: EASE.light },
          )
          .fromTo(
            mHeadingRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.42, ease: EASE.snappy },
            "-=0.18",
          )
          .fromTo(
            mParaRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, ease: EASE.light },
            "-=0.20",
          )
          .fromTo(
            mQuoteRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, ease: EASE.light },
            "-=0.18",
          );

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: mCardsWrap.current,
            start: "top 90%",
            invalidateOnRefresh: true,
          },
        });

        tl2.fromTo(
          mCardsRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, stagger: 0.06, ease: EASE.light },
        );

        return () => {
          tl1.kill();
          tl2.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="bg-[#f5efe8] pt-[40px] pb-[100px] -mt-[2px]"
    >
      {/* ── Desktop ≥ 1100px ──────────────────────────────────────────────── */}
      <div className="hidden min-[1100px]:block mx-auto w-[min(1100px,calc(100vw-120px))]">
        <div className="grid grid-cols-[300px_1fr] gap-x-[100px]">
          <div ref={dLabelRef} className="pl-[50px]">
            <span className="text-[18px] tracking-[0.15em] uppercase text-[#111111] font-rethink font-medium">
              ABOUT US
            </span>
          </div>

          <div className="xl:-ml-[20px] pl-0 max-[1280px]:pl-[60px]">
            <h2
              ref={dHeadingRef}
              className="font-display text-[48px] leading-[1.15] text-[#111111] max-w-[600px]"
            >
              An Institutional
              <br />
              Movement of Purpose
            </h2>

            <p
              ref={dParaRef}
              className="font-rethink mt-6 text-[14.5px] leading-[1.75] text-[#111111] max-w-[720px]"
            >
              ERAM Education was established to build disciplined, value-based
              institutions that expand access to quality learning and reach
              communities that need it most. Founded under the CSR vision of the
              Eram Group of Companies, it upholds structured academic standards
              while serving communities with integrity.
            </p>

            <div className="beyond-heading pt-[30px] max-[640px]:mb-[15px]">
              <button
                onClick={() => smoothScrollTo("institutions")}
                className="
    font-rethink
    inline-flex
    items-center
    gap-2

    bg-[#ae1431]
    text-white

    px-5
    py-2.5

    rounded-lg

    text-[18px]
    font-medium

    transition-colors
    duration-300

    hover:bg-black

    cursor-pointer
  "
              >
                Explore Our Institutions
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div ref={dGridRef} className="mt-[60px]">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-[24px]">
            <div
              ref={dQuoteRef}
              className="flex items-end h-[300px] pb-[70px] pl-[40px] max-[1280px]:pl-[60px]"
            >
              <p className="font-display  text-[38px] leading-[1.25] text-black">
                Committed
                <br />
                to Access.
                <br />
                Dedicated to
                <br />
                Excellence
              </p>
            </div>

            <div
              ref={(el) => {
                dCardsRef.current[0] = el;
              }}
              className="group rounded-[20px] h-[300px] overflow-hidden"
            >
              <img src="/images/about1.webp" alt="Campus" className={imgCls} />
            </div>

            <div
              ref={(el) => {
                dCardsRef.current[1] = el;
              }}
              className="group rounded-[20px] h-[300px] overflow-hidden"
            >
              <img
                src="/images/about2.webp"
                alt="Students"
                className={imgCls}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-[24px] mt-[24px]">
            <div
              ref={(el) => {
                dCardsRef.current[2] = el;
              }}
              className="group rounded-[24px] h-[320px] overflow-hidden"
            >
              <img
                src="/images/about3.webp"
                alt="Education"
                className={imgCls}
              />
            </div>

            <div
              ref={(el) => {
                dCardsRef.current[3] = el;
              }}
              className="group rounded-[24px] h-[320px] overflow-hidden"
            >
              <img
                src="/images/about4.webp"
                alt="Institution"
                className={imgCls}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile + Tablet < 1100px ──────────────────────────────────────── */}
      <div className="min-[1100px]:hidden">
        <div className="px-[28px] max-[480px]:px-[20px]">
          <div ref={mLabelRef} className="mb-[36px]">
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#111111] font-medium">
              ABOUT US
            </span>
          </div>

          <h2
            ref={mHeadingRef}
            className="font-display text-[42px] leading-[1.18] text-[#111111] mb-[28px] max-[480px]:text-[34px] max-[360px]:text-[28px]"
          >
            An Institutional
            <br />
            Movement of Purpose
          </h2>

          <p
            ref={mParaRef}
            className="font-rethink text-[14px] leading-[1.85] text-[#111111] max-w-[500px] mb-[44px]"
          >
            ERAM Education was established to build disciplined, value-based
            institutions that expand access to quality learning and reach
            communities that need it most. Founded under the CSR vision of the
            Eram Group of Companies, it upholds structured academic standards
            while serving communities with integrity.
          </p>

          <div
            ref={mQuoteRef}
            className="mb-[52px] border-l-[3px] border-black/20 pl-[22px]"
          >
            <p className="font-display text-[26px] leading-[1.3] text-[#111111] max-[480px]:text-[22px]">
              Committed
              <br />
              to Access.
              <br />
              Dedicated to
              <br />
              Excellence
            </p>
          </div>
        </div>

        <div
          ref={mCardsWrap}
          className="px-[28px] max-[480px]:px-[20px] grid grid-cols-2 gap-[14px]"
        >
          {[
            { src: "/images/about1.webp", alt: "Campus" },
            { src: "/images/about2.webp", alt: "Students" },
            { src: "/images/about3.webp", alt: "Education" },
            { src: "/images/about4.webp", alt: "Institution" },
          ].map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                mCardsRef.current[i] = el;
              }}
              className="
        group
        relative
        overflow-hidden
        rounded-[18px]
        bg-[#d8d8d8]
        h-[180px]
      "
            >
              <img
                src={card.src}
                alt={card.alt}
                loading="lazy"
                decoding="async"
                className="
          absolute inset-0
          h-full w-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-105
        "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
