"use client";

import { useRef, useState, useCallback } from "react";
import { section, shell } from "../../../constants/homeStyles";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";

/* ── Data ────────────────────────────────────────────────────────── */
const impactItems = [
  { code: "/01", title: "Free & subsidised education" },
  { code: "/02", title: "Healthcare outreach and medical camps" },
  {
    code: "/03",
    title: "Water conservation projects and 180+ community wells",
  },
  { code: "/04", title: "Interreligious harmony initiatives" },
  { code: "/05", title: "Housing support for disaster-affected families" },
  { code: "/06", title: "WHO-certified teacher training programs" },
];

const CARD_WIDTH = 350;
const CARD_GAP = 20;

interface SplitHeadingProps {
  text: string;
  className?: string;
}
function SplitHeading({ text, className }: SplitHeadingProps) {
  return (
    <h2 className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="mr-[0.22em] inline-block overflow-hidden leading-[1.15]"
        >
          <span className="inline-block">{word}</span>
        </span>
      ))}
    </h2>
  );
}

interface ImpactImageProps {
  src: string;
  alt: string;
  className?: string;
}
function ImpactImage({ src, alt, className = "" }: ImpactImageProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] will-change-transform ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}

interface ImpactCardProps {
  code: string;
  title: string;
  cardClass?: string;
}
function ImpactCard({ code, title, cardClass = "" }: ImpactCardProps) {
  return (
    <div className={`relative ${cardClass}`}>
      <div className="card-line absolute left-0 top-0 h-full w-[2px] bg-[#f5efe8]" />
      <div className="flex h-[225px] flex-col py-[6px]">
        <span className="card-code tracking-[0.16em] text-[#f5efe8]">
          {code}
        </span>
        <p className="card-title leading-[1.08] text-[#f5efe8] min-h-[84px] flex items-end">
          {title}
        </p>
      </div>
    </div>
  );
}

interface CarouselArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}
function CarouselArrow({
  direction,
  onClick,
  disabled = false,
}: CarouselArrowProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      className={`
        relative -top-7 group flex-none flex items-center justify-center
        w-[42px] h-[42px] max-[640px]:w-[40px] max-[640px]:h-[40px]
        rounded-full border-[2px] transition-all duration-300 ease-out
        ${
          disabled
            ? "border-[#666] opacity-40 cursor-not-allowed"
            : "border-[#f5efe8]/50 cursor-pointer hover:border-transparent hover:scale-110"
        }
      `}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className={`transition-colors duration-300 ${disabled ? "stroke-[#777]" : "stroke-[#f5efe8] group-hover:stroke-white"}`}
      >
        {direction === "left" ? (
          <path
            d="M10 13L5 8L10 3"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M6 3L11 8L6 13"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

/* ── Main ────────────────────────────────────────────────────────── */
export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopCarouselRef = useRef<HTMLDivElement | null>(null);
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);

  // Left always starts disabled — we're at position 0
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const router = useRouter();

  /* ── IntersectionObserver-based arrow state (no pixel math) ─────── */
  const setupObserver = useCallback(
    (
      el: HTMLDivElement,
      setLeft: (v: boolean) => void,
      setRight: (v: boolean) => void,
    ) => {
      const inner = el.firstElementChild as HTMLElement | null;
      if (!inner) return null;
      const first = inner.firstElementChild as HTMLElement | null;
      const last = inner.lastElementChild as HTMLElement | null;
      if (!first || !last) return null;

      let firstVisible = true;
      let lastVisible = false;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === first) firstVisible = entry.isIntersecting;
            if (entry.target === last) lastVisible = entry.isIntersecting;
          });
          setLeft(!firstVisible);
          setRight(!lastVisible);
        },
        { root: el, threshold: 0.95 },
      );

      observer.observe(first);
      observer.observe(last);
      return observer;
    },
    [],
  );

  /* ── Ref callbacks — fire the moment the div mounts ─────────────── */
  const desktopRefCallback = useCallback(
    (el: HTMLDivElement | null) => {
      desktopCarouselRef.current = el;
      if (!el) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupObserver(el, setCanScrollLeft, setCanScrollRight);
        });
      });
    },
    [setupObserver],
  );

  const mobileRefCallback = useCallback(
    (el: HTMLDivElement | null) => {
      mobileCarouselRef.current = el;
      if (!el) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupObserver(el, setCanScrollLeft, setCanScrollRight);
        });
      });
    },
    [setupObserver],
  );

  /* ── Scroll carousel ─────────────────────────────────────────────── */
  const scrollCarousel = useCallback((direction: "left" | "right") => {
    const isMobile = window.innerWidth < 640;
    const el = isMobile
      ? mobileCarouselRef.current
      : desktopCarouselRef.current;
    if (!el) return;
    const cardW = isMobile ? 190 : CARD_WIDTH;
    const gap = isMobile ? 16 : CARD_GAP;
    el.scrollBy({
      left: direction === "right" ? cardW + gap : -(cardW + gap),
      behavior: "smooth",
    });
  }, []);

  /* ── JSX ─────────────────────────────────────────────────────────── */
  return (
   <section
  ref={sectionRef}
  className={`${section} bg-[#ae1431] !pt-[0px] !pb-[52px] -mt-[30px] max-[640px]:!pt-[20px] max-[640px]:!pb-[36px] max-[640px]:-mt-[24px]`}
  id="impact"
>
      {/* ── Desktop top layout ─────────────────────────────────── */}
      <div
        className={`${shell} grid grid-cols-[1.05fr_0.95fr] max-[1100px]:grid-cols-1 max-[640px]:hidden`}
      >
        <div className="ml-[200px] grid grid-cols-[0.85fr_1.15fr] items-end gap-[26px]">
          <ImpactImage
            src="/images/impact1.webp"
            alt="Community support"
            className="h-[200px] w-[300px]"
          />
          <ImpactImage
            src="/images/impact2.webp"
            alt="Social outreach"
            className="h-[300px] w-[300px]"
          />
        </div>
        <div className="max-w-[480px] pt-[25px] pl-[50px] max-[1100px]:pl-0 max-[1100px]:pt-9">
          <SplitHeading
            text="In Service Of Society"
            className="mb-[18px] text-[42px] leading-[1.12] text-[#f5efe8]"
          />
          <p className="font-rethink mb-[14px] text-[14.5px] leading-[1.75] text-[#f5efe8]">
            ERAM Educational &amp; Welfare Trust advances social equity through
            structured CSR initiatives focused on educational access, healthcare
            outreach, and community resilience.
          </p>
          <p className="font-rethink mb-7 text-[15px] leading-[1.75] text-[#f5efe8]">
            While education remains its core mission, the Trust extends its
            responsibility through targeted social initiatives supporting
            underprivileged communities.
          </p>
         <button
 className="
    font-rethink
    w-full
    sm:w-auto
    cursor-pointer
    rounded-[12px]
    border
    border-white
    px-7
    bg-[#ae1431]
    py-3
    text-[13px]
    uppercase
    tracking-[0.16em]
    text-white
    whitespace-nowrap
    transition-all
    duration-200
    hover:bg-white
    hover:text-[#ae1431]
    flex
    items-center
    justify-center
    gap-2
  "
  onClick={() => router.push("/the-trust")}
>
  EXPLORE STUDENT PATHWAYS
  <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
</button>
        </div>
      </div>

      {/* ── Mobile top layout ──────────────────────────────────── */}
      <div className="hidden max-[640px]:flex flex-col gap-5 px-5">
           <div className="flex flex-col gap-3">
  <ImpactImage
    src="/images/impact1.webp"
    alt="Students"
    className="h-[170px] w-full rounded-[18px]"
  />
  <ImpactImage
    src="/images/impact2.webp"
    alt="Campus"
    className="h-[170px] w-full rounded-[18px]"
  />
</div>
        <div className="flex flex-col gap-3">
          <SplitHeading
            text="In Service Of Society"
            className="text-[26px] leading-[1.15] text-[#f5efe8]"
          />
          <p className="font-rethink text-[13.5px] leading-[1.8] text-[#f5efe8]/90">
            ERAM Educational &amp; Welfare Trust advances social equity through
            structured CSR initiatives focused on educational access, healthcare
            outreach, and community resilience.
          </p>
          <p className="font-rethink text-[13.5px] leading-[1.8] text-[#f5efe8]/90">
            While education remains its core mission, the Trust extends its
            responsibility through targeted social initiatives supporting
            underprivileged communities.
          </p>
          <button
            className="mt-1 h-[44px] w-full cursor-pointer rounded-[12px] border border-[#f5efe8] bg-[#f5efe8] font-rethink text-[12px] tracking-[0.08em] text-[#ae1431] transition active:scale-[0.97]"
            onClick={() => router.push("/the-trust")}
          >
            EXPLORE STUDENT PATHWAYS
          </button>
        </div>
      </div>

      {/* ── Cards ─────────────────────────────────────────────── */}
     <div className="mt-[56px] max-[640px]:mt-[48px]">
  <p className="mb-[36px] text-center text-[28px] uppercase tracking-[0.18em] text-[#f5efe8] max-[900px]:text-[24px] max-[640px]:mb-5 max-[640px]:px-5 max-[640px]:text-[13px] max-[640px]:tracking-[0.22em]">
    Key Areas Of Impact Include:
  </p>

  {/* ── Desktop ── */}
  <div className="mx-auto flex items-center gap-[14px] w-[min(1100px,calc(100vw-160px))] max-[640px]:hidden">
    <CarouselArrow
      direction="left"
      onClick={() => scrollCarousel("left")}
      disabled={!canScrollLeft}
    />
    <div
      ref={desktopRefCallback}
      className="flex-1 min-w-0 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-5"
    >
      <div className="flex gap-5 px-8">
        {impactItems.map((item) => (
          <ImpactCard
            key={item.code}
            {...item}
            cardClass=" font-rethink
            impact-scroll-card flex-none snap-start
            w-[350px] min-h-[120px] pl-[26px] pr-[26px]
            [&_.card-line]:h-[185px]
            [&_.card-code]:text-[25px] [&_.card-code]:mb-[15px]
            [&_.card-title]:text-[25px] [&_.card-title]:mt-[50px]
          "
          />
        ))}
      </div>
    </div>
    <CarouselArrow
      direction="right"
      onClick={() => scrollCarousel("right")}
      disabled={!canScrollRight}
    />
  </div>

  {/* ── Mobile ── */}
  <div className="hidden max-[640px]:flex flex-col gap-[18px]">
    <div
      ref={mobileRefCallback}
      className="w-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2 cursor-pointer"
    >
      <div className="flex gap-4 pl-8 pr-4">
        {impactItems.map((item) => (
          <ImpactCard
            key={item.code}
            {...item}
            cardClass="
            flex-none snap-start
            w-[190px] min-h-[170px] pl-10 pr-10 pb-1
            [&_.card-line]:h-[170px]
            [&_.card-code]:text-[15px] [&_.card-code]:mb-[40px]
            [&_.card-title]:text-[15px] [&_.card-title]:mt-6
          "
          />
        ))}
      </div>
    </div>
    <div className="flex items-center justify-center gap-[16px]">
      <CarouselArrow
        direction="left"
        onClick={() => scrollCarousel("left")}
        disabled={!canScrollLeft}
      />
      <CarouselArrow
        direction="right"
        onClick={() => scrollCarousel("right")}
        disabled={!canScrollRight}
      />
    </div>
  </div>
</div>
    </section>
  );
}