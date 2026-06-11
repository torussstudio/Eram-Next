"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ActionButton from "../../ui/ActionButton";
import { section } from "../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

const BEYOND_CARDS = [
  { code: "/01", title: "STEM CLUBS", image: "/images/beyond2.avif" },
  { code: "/02", title: "RESIDENTIAL CAMPS", image: "/images/beyond3.avif" },
  { code: "/03", title: "TRAINING SESSIONS", image: "/images/beyond4.avif" },
  { code: "/04", title: "STATE-LEVEL PROGRAMS", image: "/images/beyond5.avif" },
  {
    code: "/05",
    title: "SOCIETY-CONNECT INITIATIVES",
    image: "/images/beyond6.avif",
  },
  { code: "/06", title: "JCI & ROTARY", image: "/images/beyond1.avif" },
];

const CARD_WIDTH = 350; // px  (desktop)
const CARD_WIDTH_MOBILE = 260; // px  (≤640 px)
const GAP = 22;
const GAP_MOBILE = 12;

// How many cards to scroll per arrow click
const SCROLL_BY = 1;

export default function BeyondSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [shouldInit, setShouldInit] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
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

  /* ── Scroll helpers ─────────────────────────────────────── */
  const isMobile = () => window.innerWidth <= 640;

  const scrollCarousel = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = isMobile() ? CARD_WIDTH_MOBILE : CARD_WIDTH;
    const gap = isMobile() ? GAP_MOBILE : GAP;
    const step = (cardW + gap) * SCROLL_BY;
    el.scrollBy({
      left: direction === "right" ? step : -step,
      behavior: "smooth",
    });
  };

  /* ── GSAP entrance animations ───────────────────────────── */
  useGSAP(
    () => {
      if (!shouldInit) return;
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        gsap.set(".beyond-heading, .beyond-card", {
          opacity: 1,
          x: 0,
          y: 0,
          clearProps: "all",
        });

        return;
      }

      const defaults = { ease: "power2.out" };

      gsap.fromTo(
        ".beyond-heading",
        { opacity: 0, y: 30 },
        {
          ...defaults,
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        ".beyond-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".beyond-cards-container",
            start: "top 90%",
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [shouldInit] },
  );

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="beyond"
      className={`${section}  pt-[90px]  bg-[#ae1431]`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-[20px] md:px-[32px] lg:px-[40px] text-center">
        {/* Heading */}
        <h2 className="beyond-heading font-display mb-[14px] text-[36px]  leading-[1.2] tracking-[-0.02em] text-[#f5efe8] max-[640px]:text-[28px]">
          BEYOND THE CLASSROOM
        </h2>

        {/* Description */}
        <p className="beyond-heading font-rethink mx-auto mb-[26px] max-w-[560px] text-[14.5px] leading-[1.7] text-[#f5efe8] max-[640px]:text-[13px]">
          Clubs, leadership forums, residential programs, state-level
          participation, curated experiences, learning that extends beyond
          textbooks.
        </p>

        {/* CTA */}
        <div className="beyond-heading mb-[48px] max-[640px]:mb-[34px]">
          <ActionButton
            variant="secondary"
            className="font-rethink text-[#f5efe8] max-[640px]:!w-auto cursor-pointer hover:bg-black hover:text-white"
          >
            Explore Student Pathways
          </ActionButton>
        </div>

        {/* Cards + Arrow Buttons */}
        <div
          className="
    beyond-cards-container
    mx-auto
    mt-[48px]

    w-full

    max-[640px]:
    mt-[34px]
  "
        >
          {/* Row: arrow-left | scrollable strip | arrow-right */}
          <div
            className="
    flex
    items-center

    gap-[14px]

    max-[768px]:
    gap-[10px]

    max-[640px]:
    gap-[6px]
  "
          >
            {/* ← Left Arrow */}
            <ArrowButton
              direction="left"
              onClick={() => scrollCarousel("left")}
            />

            {/* Scrollable cards */}
            <div
              ref={scrollRef}
              style={{
                WebkitOverflowScrolling: "touch",
              }}
              className="
  flex
  flex-1

  snap-x
  snap-mandatory

  gap-[22px]

overflow-x-auto overscroll-x-contain

  pb-[16px]

  scrollbar-hide

  scroll-smooth

  px-[2px]

  max-[900px]:
  gap-[16px]

  max-[640px]:
  gap-[12px]
"
            >
              {BEYOND_CARDS.map((card, index) => (
                <BeyondCard key={card.title} card={card} />
              ))}
            </div>

            {/* → Right Arrow */}
            <ArrowButton
              direction="right"
              onClick={() => scrollCarousel("right")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface ArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

/* ── Arrow Button ───────────────────────────────────────────── */
function ArrowButton({ direction, onClick }: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      className="
        group
        flex-none
        flex
        items-center
        justify-center
        cursor-pointer

        w-[44px] h-[44px]
        rounded-full
        border-[2px] border-[#f5efe8]/50

        bg-transparent
        transition-all
        duration-300
        ease-out

        hover:bg-transparent
hover:border-transparent
hover:scale-110
hover:shadow-none

        active:scale-95

        max-[640px]:w-[36px]
        max-[640px]:h-[36px]
      "
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="
          transition-colors duration-300
          stroke-[#f5efe8]
          group-hover:stroke-whitea
          max-[640px]:w-[14px] max-[640px]:h-[14px]
        "
      >
        {direction === "left" ? (
          <path
            d="M11 14L6 9L11 4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M7 4L12 9L7 14"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

interface BeyondCardProps {
  card: {
    code: string;
    title: string;
    image: string;
  };
  isActive?: boolean;
  onClick?: () => void;
}

/* ── Card ───────────────────────────────────────────────────── */
function BeyondCard({ card, isActive, onClick }: BeyondCardProps) {
  return (
    <div
      onClick={onClick}
      className="
        beyond-card
        group
        relative
        cursor-pointer

        flex-none
        snap-start

        overflow-hidden

        rounded-[26px]

        w-[clamp(240px,30vw,350px)]
        h-[clamp(190px,22vw,235px)]

        transform-gpu
        will-change-transform

        transition-all
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[6px]

        max-[640px]:
        rounded-[20px]
      "
    >
      {/* =========================
          IMAGE
      ========================= */}
      <img
        src={card.image}
        alt={card.title}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="
          absolute
          inset-0

          h-full
          w-full

          object-cover

          scale-[1.01]

          transition-transform
          duration-[1400ms]
          ease-[cubic-bezier(.22,1,.36,1)]

          will-change-transform
          transform-gpu

          group-hover:scale-[1.08]
        "
      />

      {/* =========================
          DARK OVERLAY
      ========================= */}
      <div
        className="
          absolute
          inset-0

          bg-black/30

          transition-all
          duration-700

          group-hover:bg-black/20
        "
      />

      {/* =========================
          CINEMATIC GRADIENT
      ========================= */}
      <div
        className="
          absolute
          inset-0

          bg-gradient-to-t
          from-black/75
          via-black/10
          to-transparent

          transition-all
          duration-700

          group-hover:from-black/55
        "
      />

      {/* =========================
          RED GLOW
      ========================= */}
      <div
        className="
          absolute
          bottom-[-100px]
          right-[-60px]

          h-[180px]
          w-[180px]

          rounded-full

          bg-[#ae1431]/20

          blur-[70px]

          opacity-0

          transition-opacity
          duration-700

          group-hover:opacity-100
        "
      />

      {/* =========================
          GRID PATTERN
      ========================= */}
      <div
        className="
          absolute
          inset-0

          opacity-[0.04]

          pointer-events-none
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* =========================
          TOP LIGHT LINE
      ========================= */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />

      {/* =========================
          CONTENT
      ========================= */}
      <div
        className="
          relative
          z-[3]

          flex
          h-full
          flex-col
          justify-between

          px-[clamp(18px,3vw,30px)]
          py-[clamp(18px,3vw,28px)]

          max-[640px]:px-[20px]
          max-[640px]:py-[18px]
        "
      >
        {/* TOP */}
        <div className="flex items-start justify-end">
          {/* arrow */}
          <div
            className="
              flex
              h-[35px]
              w-[35px]
              items-center
              justify-center

              rounded-full

              border
              border-white/10

              bg-white/10

              backdrop-blur-[10px]

              transition-all
              duration-500

              group-hover:rotate-45
              group-hover:bg-[#ae1431]
            "
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-white"
            >
              <path
                d="M3 13L13 3M13 3H5M13 3V11"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div>
          {/* title */}
          <div
            className="
              font-rethink

              max-w-[92%]

              text-[clamp(1rem,2vw,1.45rem)]
              

              leading-[1.12]

              tracking-[-0.02em]

              text-white

              transition-transform
              duration-500

              group-hover:translate-x-[2px]

              max-[640px]:text-[18px]
            "
          >
            {card.title}
          </div>
        </div>
      </div>
    </div>
  );
}
