import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Constants ──────────────────────────────────────────────────── */
const CATEGORIES = ["ACADEMIC", "SPORTS", "CULTURAL", "PROFESSIONAL"];

export const excellenceDomains = {
  ACADEMIC: Array.from({ length: 4 }, (_, i) => ({
    image: `/images/academic${i + 1}.avif`,
  })),
  SPORTS: Array.from({ length: 4 }, (_, i) => ({
    image: `/images/sports${i + 1}.avif`,
  })),
  CULTURAL: Array.from({ length: 4 }, (_, i) => ({
    image: `/images/cultural${i + 1}.avif`,
  })),
  PROFESSIONAL: Array.from({ length: 4 }, (_, i) => ({
    image: `/images/pro${i + 1}.avif`,
  })),
};

const isDesktop = () => window.innerWidth >= 900;

/* ── NavArrow ────────────────────────────────────────────────────── */
function NavArrow({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e4e4e4] transition-colors duration-200 disabled:opacity-20"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d={direction === "left" ? "M7.5 2L3.5 6l4 4" : "M4.5 2l4 4-4 4"}
          stroke="#111"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* ── ImageCard ───────────────────────────────────────────────────── */
function ImageCard({ src, className = "", cardClass = "" }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] ${cardClass}`}
    >
      <img
        src={src}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-105 ${className}`}
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export default function ExcellenceSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const isAnimating = useRef(false);
  const isMounted = useRef(false);

  const currentCards = excellenceDomains[CATEGORIES[active]];

  /* ── Category switch ───────────────────────────────────────────── */
  const goTo = useCallback(
    (nextIdx) => {
      if (
        nextIdx === active ||
        nextIdx < 0 ||
        nextIdx >= CATEGORIES.length ||
        isAnimating.current
      )
        return;

      if (isDesktop()) {
        isAnimating.current = true;

        gsap.to(".exc-card", {
          opacity: 0,
          y: -18,
          scale: 0.97,
          duration: 0.22,
          stagger: { amount: 0.12 },
          ease: "power2.in",
          onComplete: () => {
            setActive(nextIdx);
            isAnimating.current = false;
          },
        });
        return;
      }

      // Mobile path
      isAnimating.current = true;
      const dir = nextIdx > active ? 1 : -1;

      gsap.to(".mob-exc-card", {
        x: dir * -36,
        opacity: 0,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(".mob-exc-card", { clearProps: "all" });
          setActive(nextIdx);
          isAnimating.current = false;
        },
      });
    },
    [active],
  );

  /* ── Animate cards IN after tab switch ────────────────────────── */
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (isDesktop()) {
      gsap.fromTo(
        ".exc-card",
        { opacity: 0, y: 18, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: { amount: 0.3 },
          ease: "power3.out",
        },
      );
    } else {
      gsap.fromTo(
        ".mob-exc-card",
        { opacity: 0, x: 0, y: 0 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power3.out",
          clearProps: "all",
        },
      );
    }
  }, [active]);

  /* ── Scroll entrance ─────────────────────────────────────────── */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        gsap.set(".exc-heading", { clipPath: "inset(0 100% 0 0)" });
        gsap.set(".exc-menu-item", { x: -32, opacity: 0 });
        gsap.set(".exc-card", { opacity: 0, y: 28, scale: 0.95 });
        gsap.set(".exc-btn", { opacity: 0, y: 16 });

        const t1 = { trigger: sectionRef.current, start: "top 78%" };
        const t2 = { trigger: ".exc-grid", start: "top 85%" };

        gsap.to(".exc-heading", {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.0,
          ease: "power3.inOut",
          scrollTrigger: t1,
        });
        gsap.to(".exc-menu-item", {
          x: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: t1,
        });
        gsap.to(".exc-card", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: { amount: 0.35 },
          ease: "power3.out",
          scrollTrigger: t2,
        });
        gsap.to(".exc-btn", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: t2,
        });
      });

      mm.add("(max-width: 899px)", () => {
        gsap.set(".mob-exc-word", { y: "105%", opacity: 0 });
        gsap.set(".mob-nav-row", { y: 14, opacity: 0 });
        gsap.set(".mob-exc-card", { y: 40, opacity: 0 });
        gsap.set(".mob-exc-btn", { y: 14, opacity: 0 });

        const t1 = { trigger: sectionRef.current, start: "top 82%" };
        const t2 = { trigger: ".mob-exc-grid", start: "top 88%" };

        gsap.to(".mob-exc-word", {
          y: "0%",
          opacity: 1,
          duration: 0.65,
          stagger: 0.055,
          ease: "power4.out",
          scrollTrigger: t1,
        });
        gsap.to(".mob-nav-row", {
          y: 0,
          opacity: 1,
          duration: 0.55,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: t1,
        });
        gsap.to(".mob-exc-card", {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: { amount: 0.3 },
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: t2,
        });
        gsap.to(".mob-exc-btn", {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: ".mob-exc-btn", start: "top 95%" },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="bg-white py-[120px] max-[900px]:py-16"
    >
      {/* ── Desktop ≥ 900px ─────────────────────────────────────── */}
      {/*
        FIX: Removed `overflow-hidden` (or any overflow other than `visible`) from
        this wrapper — overflow:hidden on a scroll-parent breaks position:sticky on
        any descendant. Also removed `items-start` from the grid and replaced with
        `self-start` directly on <aside>, which is the reliable way to enable
        sticky inside a CSS grid.
      */}
      <div className="mx-auto hidden max-w-[1180px] grid-cols-[240px_1fr] gap-16 px-6 min-[900px]:grid">
        {/* Sidebar nav — self-start is required for sticky to work inside a grid */}
        <aside className="sticky top-[120px] self-start flex flex-col gap-5 pt-5">
          {CATEGORIES.map((label, i) => (
            <button
              key={label}
              onClick={() => goTo(i)}
              className={`exc-menu-item text-left text-[22px] tracking-[0.16em] transition-colors duration-200 ${
                active === i
                  ? "text-[#111]"
                  : "text-[#b0b0b0] hover:text-[#555] cursor-pointer"
              }`}
            >
              {active === i && <span className="mr-1">//</span>}
              {label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <div className="ml-20">
          <h2 className="exc-heading font-display mb-14 text-[48px] tracking-[-0.02em] text-[#111]">
            Excellence Across Every Domain
          </h2>

          <div className="exc-grid grid grid-cols-2 gap-8">
            {currentCards.map((item, i) => (
              <ImageCard
                key={i}
                src={item.image}
                cardClass="exc-card h-[320px]"
              />
            ))}
          </div>

          <div className="mt-14">
            <button className="exc-btn font-rethink cursor-pointer rounded-[10px] border border-[#c0c0c0] px-7 py-3 text-[13px] uppercase tracking-[0.16em] text-[#222] transition-all duration-200 hover:bg-[#111] hover:text-white hover:border-[#111]">
              Explore Excellence
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile < 900px ──────────────────────────────────────── */}
      <div className="w-full overflow-x-clip px-4 min-[900px]:hidden">
        {/* Heading */}
        <div className="mb-9">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b0b0b0]">
            Our Domains
          </p>
          <h2 className="font-display text-[26px] leading-[1.15] sm:text-[32px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#111]">
            {"Excellence Across Every Domain".split(" ").map((word, i) => (
              <span
                key={i}
                className="mr-[0.22em] inline-block overflow-hidden align-bottom"
              >
                <span className="mob-exc-word inline-block">{word}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Navigation row */}
        <div className="mob-nav-row mb-6">
          <div className="mb-2.5 flex items-center justify-between">
            <NavArrow
              direction="left"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
            />
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#c0c0c0]">
                0{active + 1} / 0{CATEGORIES.length}
              </span>
              <span className="font-display text-[17px] font-semibold leading-none tracking-[0.05em] text-[#111]">
                {CATEGORIES[active]}
              </span>
            </div>
            <NavArrow
              direction="right"
              onClick={() => goTo(active + 1)}
              disabled={active === CATEGORIES.length - 1}
            />
          </div>

          {/* Progress bar */}
          <div className="h-[2px] overflow-hidden rounded-full bg-[#f0f0f0]">
            <div
              className="h-full rounded-full bg-[#111] transition-all duration-300 ease-out"
              style={{ width: `${((active + 1) / CATEGORIES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* overflow-x-clip instead of overflow-hidden — lets sticky work on ancestors */}
        <div className="mob-exc-grid mb-6 grid grid-cols-2 gap-2 sm:gap-2.5 overflow-x-clip">
          {currentCards.map((item, i) => (
            <ImageCard
              key={i}
              src={item.image}
              cardClass="mob-exc-card aspect-square min-w-0 rounded-[16px]"
            />
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mb-7 flex justify-center gap-1.5">
          {CATEGORIES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: active === i ? "20px" : "6px",
                height: "6px",
                background: active === i ? "#111" : "#ddd",
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <button className="mob-exc-btn font-rethink w-full cursor-pointer rounded-[12px] border border-[#d8d8d8] py-[15px] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#222] transition-all duration-200 active:border-[#111] active:bg-[#111] active:text-white">
          Explore Excellence
        </button>
      </div>
    </section>
  );
}