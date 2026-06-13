"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap} from "../../../lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";


/* ─── Constants ───────────────────────────────────────────────────────────── */
const TABS = [
  "LEADERSHIP AND\nMANAGEMENT STRUCTURE",
  "INFRASTRUCTURE AND\nOPERATIONAL EXCELLENCE",
  "INSTITUTIONAL\nSYSTEMS & LEADERSHIP",
];

const TABS_SHORT = ["Leadership", "Infrastructure", "Institutional"];

const CARDS_DATA = [
  [
    { n: "01", t: "Strategic Leadership", img: "/images/card1.webp" },
    { n: "02", t: "Structured Academics", img: "/images/card2.webp" },
    { n: "03", t: "Operational Discipline", img: "/images/card3.webp" },
    { n: "04", t: "Community-Rooted Vision", img: "/images/card4.webp" },
    { n: "05", t: "Faculty-Centric Approach", img: "/images/card5.webp" },
    { n: "06", t: "Infrastructure Excellence", img: "/images/card6.webp" },
    { n: "07", t: "Sports & Exposure Integration", img: "/images/card7.webp" },
    { n: "08", t: "Value-Anchored Education", img: "/images/card8.webp" },
  ],
  [
    { n: "01", t: "Academic Planning Support", img: "/images/cardinfra1.webp" },
    {
      n: "02",
      t: "Active involvement of Trust leadership",
      img: "/images/cardinfra2.webp",
    },
    {
      n: "03",
      t: "Direct relationship with Principals & HODs",
      img: "/images/cardinfra3.webp",
    },
    { n: "04", t: "Regular review meetings", img: "/images/cardinfra3.webp" },
  ],
  [
    {
      n: "01",
      t: "Amphitheatre & cultural spaces",
      img: "/images/cardinstit1.webp",
    },
    { n: "02", t: "Modern classrooms & labs", img: "/images/institute.webp" },
    {
      n: "03",
      t: "Sports grounds & athletics facilities",
      img: "/images/cardinstit3.webp",
    },
    { n: "04", t: "Community-Rooted Vision", img: "/images/cardinstit4.webp" },
  ],
];

const SCROLL_BY = 1;
const CARD_WIDTH = 320;
const CARD_GAP = 18;

const TAB_CONFIG = [
  { showText: false, fullWidth: true, showArrows: true },
  { showText: false, fullWidth: true, showArrows: false },
  { showText: true, fullWidth: false, showArrows: true },
];

interface ArrowIconProps {
  active: boolean;
}

/* ─── Sub-components ──────────────────────────────────────────────────────── */
const ArrowIcon = ({ active }: ArrowIconProps) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M2 6h8M6 2l4 4-4 4"
      stroke={active ? "white" : "#888"}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface CarouselArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}

const CarouselArrow = ({
  direction,
  onClick,
  disabled = false,
}: CarouselArrowProps) => (
 <button
  onClick={onClick}
  disabled={disabled}
  aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
  className={`
    group flex-none flex items-center justify-center
    w-[42px] h-[42px] rounded-full border-[2px]
    transition-all duration-300 ease-out
    ${
      disabled
        ? "border-[#666] opacity-40 cursor-not-allowed"
        : "border-[#cfcfcf] cursor-pointer hover:bg-[#ae1431] hover:border-[#ae1431]"
    }
  `}
>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="transition-colors duration-300 stroke-white"
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

/* ─── Main component ──────────────────────────────────────────────────────── */
export default function SystemsSection() {
  const router = useRouter();;
  const [activeTab, setActiveTab] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const busy = useRef(false); // animation lock

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
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* refs */
  const sectionRef = useRef<HTMLElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mobTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const desktopCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
const [canScrollRight, setCanScrollRight] = useState(true);
  const textBlockRef = useRef<HTMLDivElement>(null);

  const cards = CARDS_DATA[activeTab];
  const config = TAB_CONFIG[activeTab];

  /* ── indicator ── */
  const moveIndicator = useCallback((index: number) => {
    const btn = tabRefs.current[index];
    const bar = tabBarRef.current;
    if (!btn || !bar || !indicatorRef.current) return;
    const { left, width } = btn.getBoundingClientRect();
    gsap.to(indicatorRef.current, {
      left: left - bar.getBoundingClientRect().left,
      width,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
  }, []);

  useEffect(() => {
    moveIndicator(activeTab);
  }, []);

  useEffect(() => {
    moveIndicator(activeTab);
  }, [activeTab]);

 const updateScrollButtons = useCallback(() => {
  const el = desktopScrollRef.current;
  if (!el) return;

  setCanScrollLeft(el.scrollLeft > 5);

  setCanScrollRight(
    el.scrollLeft < el.scrollWidth - el.clientWidth - 5
  );
}, []);
useEffect(() => {
  const el = desktopScrollRef.current;
  if (!el) return;

  updateScrollButtons();

  el.addEventListener("scroll", updateScrollButtons);

  return () => {
    el.removeEventListener("scroll", updateScrollButtons);
  };
}, [activeTab, updateScrollButtons]);

  /* ── carousel scroll ── */
  const scrollCarousel = useCallback((dir: "left" | "right") => {
    const el = desktopScrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: (dir === "right" ? 1 : -1) * (CARD_WIDTH + CARD_GAP) * SCROLL_BY,
      behavior: "smooth",
    });
  }, []);

  /* ── card pulse ── */
  const pulseEl = useCallback((refs: React.MutableRefObject<any[]>, i: number) => {
    const el = refs.current[i];
    if (!el) return;
    gsap
      .timeline()
      .to(el, { scale: 0.94, duration: 0.1, ease: "power2.in" })
      .to(el, { scale: 1, duration: 0.45, ease: "elastic.out(1,0.42)" });
  }, []);

  /* ── tab switch animation ── */
  useEffect(() => {
    if (!shouldInit) return;
    const dCards = desktopCardRefs.current.filter(Boolean);

    // out
    gsap.killTweensOf(dCards);
    gsap.to(dCards, {
      opacity: 0,
      y: -14,
      scale: 0.98,
      duration: 0.18,
      ease: "power2.in",
      stagger: 0.03,
      onComplete() {
        // in
        gsap.fromTo(
          dCards,
          { opacity: 0, y: 32, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: { each: 0.06, ease: "power1.inOut" },
            ease: "expo.out",
            clearProps: "filter,transform",
            onComplete() {
              busy.current = false;
            },
          },
        );
      },
    });

    // text block (tab 3)
    if (textBlockRef.current) {
      gsap.fromTo(
        textBlockRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.6, ease: "expo.out", delay: 0.12 },
      );
    }

    // mobile
    if (window.innerWidth < 900) {
      const mCards = mobCardRefs.current.filter(Boolean);
      gsap.killTweensOf(mCards);
      gsap.fromTo(
        mCards,
        { opacity: 0, x: 36, scale: 0.97 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: "expo.out",
          clearProps: "transform",
        },
      );
    }
    return () => {
    gsap.killTweensOf(dCards);
    gsap.killTweensOf(mobCardRefs.current);
  };
  }, [activeTab]);

  /* ── tab click ── */
 const handleTabClick = useCallback(
  (index: number) => {
    if (busy.current || index === activeTab) return;

    busy.current = true;

    desktopScrollRef.current?.scrollTo({
      left: 0,
      behavior: "auto",
    });

    setActiveTab(index);
    setActiveCard(0);
  },
  [activeTab],
);

  /* ── mobile tab spring ── */
  const animateMobTab = useCallback((index: number) => {
    const el = mobTabRefs.current[index];
    if (!el) return;
    gsap.fromTo(
      el,
      { scale: 0.9, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 0.38, ease: "back.out(2)" },
    );
  }, []);

  /* ── scroll entrance ── */
  useGSAP(
    () => {
      if (!shouldInit) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const trigger = { trigger: sectionRef.current, start: "top 78%" };

        gsap.fromTo(
          ".desk-tabbar",
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "expo.out",
            scrollTrigger: trigger,
          },
        );
        gsap.fromTo(
          ".desk-content",
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "expo.out",
            delay: 0.18,
            scrollTrigger: trigger,
          },
        );
        gsap.fromTo(
          ".desk-cta",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.35,
            scrollTrigger: trigger,
          },
        );
      });

      mm.add("(max-width: 899px)", () => {
        const t = (trigger: any, start = "top 82%") => ({
          scrollTrigger: { trigger, start },
        });

        gsap.fromTo(
          ".mob-heading",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "expo.out",
            ...t(sectionRef.current),
          },
        );
        gsap.fromTo(
          ".mob-para",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.14,
            ...t(sectionRef.current),
          },
        );
        gsap.fromTo(
          ".mob-tabbar",
          { opacity: 0, y: -14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "expo.out",
            ...t(sectionRef.current, "top 76%"),
          },
        );
        gsap.fromTo(
          ".mob-card",
          { opacity: 0, x: 44, scale: 0.97 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "expo.out",
            ...t(".mob-cards", "top 88%"),
          },
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [shouldInit] },
  );

  /* ─── Render ──────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="bg-[#ae1431] py-[90px] max-[899px]:pt-[24px] max-[899px]:pb-[48px] overflow-hidden"
    >
      {/* ══ Desktop ≥ 900px ══════════════════════════════════════════════ */}
      <div className="hidden min-[900px]:block">
        {/* Tab bar */}
        <div className="desk-tabbar flex justify-center mb-[70px] px-[20px]">
          <div
            ref={tabBarRef}
            className="relative flex gap-[160px] border-b-[4px] border-[#d8a9b4]"
          >
            {TABS.map((label, i) => (
              <button
                key={i}
                ref={(el) => { tabRefs.current[i] = el; }}
                onClick={() => handleTabClick(i)}
                className="relative pb-[18px] text-[18px] tracking-[0.12em] uppercase whitespace-nowrap transition-colors duration-300 cursor-pointer"
                style={{ color: activeTab === i ? "#ffffff" : "rgba(255,255,255,0.65)" }}
              >
                {label.split("\n").map((line, j) => (
                  <span key={j} className="block">
                    {line}
                  </span>
                ))}
              </button>
            ))}
            <span
              ref={indicatorRef}
              className="absolute -bottom-[4px] h-[6px] rounded-t-full bg-white pointer-events-none"
              style={{ left: 0, width: 0 }}
            />
          </div>
        </div>

        {/* Cards area */}
        <div
          className={`desk-content mx-auto w-[min(1200px,calc(100vw-120px))] flex items-start gap-[80px] ${!config.showText ? "justify-center" : ""}`}
        >
          {/* Text block — tab 3 only */}
          {config.showText && (
            <div
              ref={textBlockRef}
              className="max-w-[420px] ml-[40px] flex-shrink-0"
            >
              <h2 className="font-display mb-[32px] text-[42px] leading-[1.1] text-white">
                Systems That
                <br />
                Sustain Excellence
              </h2>
              <p className="font-rethink text-[14.5px] leading-[1.8] text-white">
                An integrated framework of management oversight, faculty
                excellence, and purpose-built infrastructure sustaining quality
                across every institution, ensuring continuous assessment,
                teacher development, institutional monitoring, and transparent
                processes.
              </p>
            </div>
          )}

          {/* Carousel */}
          <div
            className={`flex items-center gap-[14px] min-w-0 ${config.showText ? "flex-1" : "w-full"}`}
          >
            {config.showArrows && (
             <CarouselArrow
  direction="left"
  onClick={() => scrollCarousel("left")}
  disabled={!canScrollLeft}
/>
            )}

            <div
              ref={desktopScrollRef}
              className="flex snap-x snap-mandatory gap-[18px] overflow-x-auto scroll-smooth pb-[20px] scrollbar-hide flex-1 min-w-0"
            >
              {cards.map((card, i) => (
                <div
                  key={`${activeTab}-${i}`}
                  ref={(el) => { desktopCardRefs.current[i] = el; }}
                  className="will-change-transform group relative cursor-pointer flex flex-shrink-0 snap-start overflow-hidden rounded-[22px] p-[34px] bg-black"
                  style={{
                    width: config.fullWidth ? "calc(25% - 14px)" : "320px",
                    height: config.fullWidth ? "320px" : "220px",
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.t}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/55 transition-all duration-500 group-hover:bg-black/35" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                  <div className="relative z-10 flex h-full w-full flex-col justify-between">
                    <span
                      style={{
                        color:
                          activeCard === i
                            ? "#f1d7dd"
                            : "rgba(255,255,255,0.7)",
                      }}
                    >
                      /{card.n}
                    </span>
                    <span className="font-rethink flex justify-end text-[26px]  leading-[1.2] text-[#f8f8f8] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                      {card.t}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {config.showArrows && (
              <CarouselArrow
  direction="right"
  onClick={() => scrollCarousel("right")}
  disabled={!canScrollRight}
/>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="desk-cta mt-[70px] flex justify-center px-[20px]">
          <button
            onClick={() => router.push("/about-us")}
            className="font-rethink rounded-[8px] border border-white/70 px-[36px] py-[14px] text-[12px]  uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#a80c2d] cursor-pointer"
          >
            EXPLORE OUR SYSTEMS & STANDARDS
          </button>
        </div>
      </div>

      {/* ══ Mobile < 900px ═══════════════════════════════════════════════ */}
     <div className="min-[900px]:hidden px-[22px] pb-[10px]">
  {/* =========================
      HEADER
  ========================= */}
  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111] px-[22px] pt-[26px] pb-[28px] mb-[18px]">
    {/* glow */}
    <div className="absolute top-[-120px] right-[-60px] w-[220px] h-[220px] rounded-full bg-[#ae1431]/20 blur-[90px]" />

    {/* grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    />

    <div className="relative z-[2]">
      <div className="flex items-center gap-[10px] mb-[18px]">
        <span className="w-[32px] h-px bg-[#ae1431]" />

        <span className="font-rethink text-[10px] tracking-[0.28em] uppercase text-white/45">
          Institutional Framework
        </span>
      </div>

      <h2
        className="
          mob-heading
          font-display
          text-[36px]
          leading-[0.96]
          tracking-[-0.05em]
          text-white
        "
      >
        Systems That
        <br />
        Sustain Excellence
      </h2>

      <p
        className="
          mob-para
          mt-[18px]
          font-rethink
          text-[13.5px]
          leading-[1.8]
          text-white/70
          max-w-[420px]
        "
      >
        An integrated framework of management oversight, faculty excellence,
        and purpose-built infrastructure sustaining quality across every
        institution, ensuring continuous assessment, teacher development,
        institutional monitoring, and transparent processes.
      </p>
    </div>
  </div>

  {/* =========================
      MOBILE TABS
  ========================= */}
  <div className="mob-tabbar flex gap-[10px] mb-[18px] overflow-x-auto scrollbar-hide pb-[2px]">
    {TABS_SHORT.map((label, i) => {
      const isActive = activeTab === i;

      return (
        <button
          key={i}
          ref={(el) => {
            mobTabRefs.current[i] = el;
          }}
          onClick={() => {
            if (activeTab === i) return;

            requestAnimationFrame(() => {
              setActiveCard(0);
              handleTabClick(i);
            });
          }}
          className={`
            relative
            overflow-hidden
            min-w-[108px]
            flex
            flex-col
            items-start
            gap-[8px]
            rounded-[18px]
            px-[16px]
            py-[14px]
            border
            flex-shrink-0

            transform-gpu
            will-change-transform

            transition-[background-color,border-color,transform]
            duration-300
            ease-out

            active:scale-[0.98]

            ${isActive ? "scale-[1]" : "scale-[0.985]"}
          `}
          style={{
            backgroundColor: isActive ? "#ae1431" : "#111",
            borderColor: isActive ? "#ae1431" : "#262626",
          }}
        >
          {/* pattern */}
          <div
            className="
              absolute
              inset-0
              opacity-[0.04]
              pointer-events-none
            "
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          {/* active bg */}
          <div
            className={`
              absolute
              inset-0
              bg-[#ae1431]
              transition-opacity
              duration-300
              pointer-events-none
              ${isActive ? "opacity-100" : "opacity-0"}
            `}
          />

          {/* number */}
          <span
            className={`
              relative
              z-[2]
              text-[10px]
              font-rethink
              tracking-[0.2em]
              transition-colors
              duration-300
              ${
                isActive
                  ? "text-white/55"
                  : "text-[#777]"
              }
            `}
          >
            0{i + 1}
          </span>

          {/* label */}
          <span
            className={`
              relative
              z-[2]
              text-[11px]
              font-rethink
              leading-[1.35]
              tracking-[0.04em]
              text-left
              transition-colors
              duration-300
              ${
                isActive
                  ? "text-white"
                  : "text-[#d1d1d1]"
              }
            `}
          >
            {label}
          </span>

          {/* active line */}
          <span
            className={`
              absolute
              left-[16px]
              bottom-0
              h-[2px]
              rounded-full
              bg-white

              transition-all
              duration-300
              ease-out

              ${
                isActive
                  ? "w-[38px] opacity-100"
                  : "w-0 opacity-0"
              }
            `}
          />
        </button>
      );
    })}
  </div>

  {/* =========================
      MOBILE CARDS
  ========================= */}
  <div className="mob-cards flex flex-col gap-[12px] mb-[24px]">
    {cards.map((card, i) => {
      const isActive = activeCard === i;

      return (
        <div
          key={`${activeTab}-${i}`}
          ref={(el) => {
            mobCardRefs.current[i] = el;
          }}
          onClick={() => {
            if (activeCard === i) return;

            requestAnimationFrame(() => {
              setActiveCard(i);
            });
          }}
          className={`
            will-change-transform
            transform-gpu

            mob-card
            relative
            overflow-hidden
            rounded-[22px]
            border
            px-[22px]
            py-[22px]
            cursor-pointer

            transition-[background-color,border-color,transform]
            duration-300
            ease-out

            active:scale-[0.985]

            ${isActive ? "scale-[1]" : "scale-[0.992]"}
          `}
          style={{
            backgroundColor: isActive ? "#ae1431" : "#111",
            borderColor: isActive ? "#ae1431" : "#202020",
          }}
        >
          {/* grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* active glow */}
          <div
            className={`
              absolute
              top-[-40px]
              right-[-20px]
              w-[120px]
              h-[120px]
              rounded-full
              bg-white/10
              blur-[50px]

              transition-opacity
              duration-300

              ${
                isActive
                  ? "opacity-100"
                  : "opacity-0"
              }
            `}
          />

          <div className="relative z-[2] flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-[18px]">
              <span
                className={`
                  text-[11px]
                  font-rethink
                  tracking-[0.16em]
                  tabular-nums
                  w-[26px]

                  transition-colors
                  duration-300

                  ${
                    isActive
                      ? "text-white/45"
                      : "text-[#8e8e8e]"
                  }
                `}
              >
                /{card.n}
              </span>

              <div>
                <span
                  className={`
                    block
                    text-[17px]
                    font-rethink
                    leading-[1.3]
                    tracking-[-0.02em]

                    transition-colors
                    duration-300

                    ${
                      isActive
                        ? "text-white"
                        : "text-[#f5f5f5]"
                    }
                  `}
                >
                  {card.t}
                </span>

                <span
                  className={`
                    block
                    mt-[4px]
                    text-[10px]
                    uppercase
                    tracking-[0.18em]

                    transition-colors
                    duration-300

                    ${
                      isActive
                        ? "text-white/50"
                        : "text-[#666]"
                    }
                  `}
                >
                  Institutional Standard
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div
              className={`
                flex-shrink-0
                w-[38px]
                h-[38px]
                rounded-full
                flex
                items-center
                justify-center

                transition-[background-color,border-color,transform]
                duration-300
                ease-out

                ${
                  isActive
                    ? "bg-white/15 border border-white/10"
                    : "bg-[#1b1b1b] border border-[#2a2a2a]"
                }
              `}
            >
              <ArrowIcon active={isActive} />
            </div>
          </div>
        </div>
      );
    })}
  </div>

  {/* =========================
      CTA
  ========================= */}
 <button
  onClick={() => router.push("/about-us")}
  className="
    group
    relative
    overflow-hidden
    isolate

    w-full

    rounded-[24px]
    border
    border-white/[0.08]

    bg-[#0d0d0d]

    px-[20px]
    py-[20px]

    transform-gpu
    will-change-transform

    transition-all
    duration-500
    ease-out

    active:scale-[0.985]
  "
>
  {/* =========================
      MAIN GRADIENT
  ========================= */}
  <div
    className="
      absolute
      inset-0
      opacity-100
      transition-opacity
      duration-500
    "
  >
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#ae1431_0%,#8f0f29_45%,#5a0818_100%)]" />

    {/* radial highlight */}
    <div className="absolute top-[-120px] right-[-80px] w-[240px] h-[240px] rounded-full bg-white/10 blur-[80px]" />

    {/* secondary glow */}
    <div className="absolute bottom-[-100px] left-[-80px] w-[180px] h-[180px] rounded-full bg-[#ff6a85]/10 blur-[70px]" />
  </div>

  {/* =========================
      GRID PATTERN
  ========================= */}
  <div
    className="
      absolute
      inset-0
      opacity-[0.045]
      pointer-events-none
    "
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
      backgroundSize: "22px 22px",
    }}
  />

  {/* =========================
      TOP BORDER GLOW
  ========================= */}
  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

  {/* =========================
      HOVER SHINE
  ========================= */}
  <div
    className="
      absolute
      inset-0
      opacity-0
      group-hover:opacity-100
      transition-opacity
      duration-700
    "
  >
    <div
      className="
        absolute
        top-0
        left-[-120%]
        h-full
        w-[60%]
        rotate-[18deg]
        bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.16),transparent)]

        group-hover:left-[140%]
        transition-all
        duration-[1200ms]
        ease-out
      "
    />
  </div>

  {/* =========================
      CONTENT
  ========================= */}
  <div className="relative z-[2] flex items-center justify-between">
    {/* LEFT */}
    <div className="text-left">
      {/* small label */}
      <div className="flex items-center gap-[8px] mb-[10px]">
        <span className="w-[24px] h-px bg-white/40" />

        <span
          className="
            text-[10px]
            tracking-[0.26em]
            uppercase
            text-white/50
            font-rethink
          "
        >
          Learn More
        </span>
      </div>

      {/* title */}
      <span
        className="
          block
          text-[12px]
          
          uppercase
          tracking-[0.18em]
          leading-[1.5]
          text-white
          font-rethink
          max-w-[220px]
        "
      >
        Explore Our
        <br />
        Systems & Standards
      </span>
    </div>

    {/* RIGHT */}
    <div
      className="
        relative
        w-[48px]
        h-[48px]
        rounded-full

        flex
        items-center
        justify-center

        border
        border-white/10

        bg-white/[0.08]
        backdrop-blur-[8px]

        transition-all
        duration-500

        group-hover:scale-[1.08]
        group-hover:bg-white/[0.14]
      "
    >
      {/* glow */}
      <div className="absolute inset-0 rounded-full bg-white/10 blur-[16px]" />

      {/* rotating ring */}
      <div
        className="
          absolute
          inset-[-2px]
          rounded-full
          border
          border-white/10

          group-hover:rotate-180
          transition-transform
          duration-[1200ms]
          ease-out
        "
      />

      <div className="relative z-[2]">
        <ArrowIcon active />
      </div>
    </div>
  </div>

  {/* =========================
      BOTTOM PROGRESS LINE
  ========================= */}
  <div
    className="
      absolute
      left-0
      bottom-0
      h-[2px]
      w-0

      bg-white/70

      group-hover:w-full

      transition-all
      duration-700
      ease-out
    "
  />
</button>
</div>
    </section>
  );
}
