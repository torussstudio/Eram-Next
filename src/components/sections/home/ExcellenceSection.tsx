"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "../../../lib/gsap";
import { useGSAP } from "@gsap/react";

/* ── Constants ──────────────────────────────────────────────────── */
const CATEGORIES = ["SPORTS", "CULTURAL", "SOCIAL", "ACADEMIC"] as const;
type Category = (typeof CATEGORIES)[number];

// Now 8 images per category — first 4 visible initially, next 4 on expand
export const excellenceDomains: Record<
  Category,
  { image: string }[]
> = {
  SPORTS: Array.from({ length: 8 }, (_, i) => ({
    image: `/images/sports${i + 1}.avif`,
  })),
  CULTURAL: Array.from({ length: 8 }, (_, i) => ({
    image: `/images/cultural${i + 1}.avif`,
  })),
  SOCIAL: Array.from({ length: 8 }, (_, i) => ({
    image: `/images/pro${i + 1}.avif`,
  })),
  ACADEMIC: Array.from({ length: 8 }, (_, i) => ({
    image: `/images/academic${i + 1}.avif`,
  })),
};

/* ── NavArrow ────────────────────────────────────────────────────── */
function NavArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
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
function ImageCard({
  src,
  eager = false,
  className = "",
}: {
  src: string;
  eager?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] ${className}`}
    >
      <img
        src={src}
        loading={eager ? "eager" : "lazy"}
        decoding={eager ? "sync" : "async"}
        fetchPriority={eager ? "high" : "auto"}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export default function ExcellenceSection() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const entranceDone = useRef(false);
  const [visible, setVisible] = useState(false);

  // Refs for the extra-cards wrappers so GSAP can target them directly
  const desktopExtraRef = useRef<HTMLDivElement>(null);
  const mobileExtraRef = useRef<HTMLDivElement>(null);

  /* Lazy-init: start GSAP only when section scrolls near viewport */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const allCards = excellenceDomains[CATEGORIES[active]];
  const initialCards = allCards.slice(0, 4);
  const extraCards = allCards.slice(4, 8);
  const desktop = () => window.innerWidth >= 900;

  /* ── Collapse extra cards then swap category ─────────────────── */
  const collapseAndSwap = useCallback(
    (next: number, onDone: () => void) => {
      if (!expanded) {
        onDone();
        return;
      }
      const extraEls =
        desktop()
          ? desktopExtraRef.current?.querySelectorAll(".exc-extra-card")
          : mobileExtraRef.current?.querySelectorAll(".mob-exc-extra-card");

      if (!extraEls || extraEls.length === 0) {
        setExpanded(false);
        onDone();
        return;
      }

      gsap.to(Array.from(extraEls), {
        opacity: 0,
        y: desktop() ? 18 : 0,
        x: desktop() ? 0 : 12,
        scale: 0.96,
        duration: 0.2,
        stagger: { amount: 0.1, from: "end" },
        ease: "power2.in",
        onComplete: () => {
          setExpanded(false);
          onDone();
        },
      });
    },
    [expanded],
  );

  /* ── Category switch (animate OUT then swap) ─────────────────── */
  const goTo = useCallback(
    (next: number) => {
      if (
        next === active ||
        next < 0 ||
        next >= CATEGORIES.length ||
        isAnimating.current
      )
        return;

      isAnimating.current = true;

      const doSwap = () => {
        if (desktop()) {
          gsap.to(".exc-card", {
            opacity: 0,
            y: -18,
            scale: 0.97,
            duration: 0.22,
            stagger: { amount: 0.12 },
            ease: "power2.in",
            onComplete: () => {
              setActive(next);
              isAnimating.current = false;
            },
          });
        } else {
          const dir = next > active ? 1 : -1;
          gsap.to(".mob-exc-card", {
            x: dir * -36,
            opacity: 0,
            duration: 0.2,
            stagger: 0.03,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(".mob-exc-card", { clearProps: "all" });
              setActive(next);
              isAnimating.current = false;
            },
          });
        }
      };

      // If expanded, collapse extras first, then animate out main cards
      if (expanded) {
        collapseAndSwap(next, doSwap);
      } else {
        doSwap();
      }
    },
    [active, expanded, collapseAndSwap],
  );

  /* ── Animate INITIAL cards IN after active changes ───────────── */
  useEffect(() => {
    if (!visible || !entranceDone.current) return;

    if (desktop()) {
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
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Animate EXTRA cards IN after expanded becomes true ──────── */
  useEffect(() => {
    if (!expanded) return;

    // Small delay so React has painted the extra cards into the DOM
    const raf = requestAnimationFrame(() => {
      if (desktop()) {
        const extraEls =
          desktopExtraRef.current?.querySelectorAll(".exc-extra-card");
        if (!extraEls || extraEls.length === 0) return;
        gsap.fromTo(
          Array.from(extraEls),
          { opacity: 0, y: 28, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: { amount: 0.28 },
            ease: "power3.out",
          },
        );
      } else {
        const extraEls =
          mobileExtraRef.current?.querySelectorAll(".mob-exc-extra-card");
        if (!extraEls || extraEls.length === 0) return;
        gsap.fromTo(
          Array.from(extraEls),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: { amount: 0.22 },
            ease: "power3.out",
            clearProps: "all",
          },
        );
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [expanded]);

  /* ── Toggle expand / collapse ────────────────────────────────── */
  const handleToggleExpand = useCallback(() => {
    if (expanded) {
      // Collapse: animate out then hide
      const extraEls = desktop()
        ? desktopExtraRef.current?.querySelectorAll(".exc-extra-card")
        : mobileExtraRef.current?.querySelectorAll(".mob-exc-extra-card");

      if (extraEls && extraEls.length > 0) {
        gsap.to(Array.from(extraEls), {
          opacity: 0,
          y: desktop() ? 16 : 12,
          scale: 0.96,
          duration: 0.25,
          stagger: { amount: 0.12, from: "end" },
          ease: "power2.in",
          onComplete: () => setExpanded(false),
        });
      } else {
        setExpanded(false);
      }
    } else {
      setExpanded(true);
    }
  }, [expanded]);

  /* ── Scroll-entrance animations ──────────────────────────────── */
  useGSAP(
    () => {
      if (!visible) return;
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
          onComplete: () => {
            entranceDone.current = true;
          },
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
          onComplete: () => {
            entranceDone.current = true;
          },
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
    { scope: sectionRef, dependencies: [visible] },
  );

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="bg-white py-[100px] max-[900px]:py-16"
    >
      {/* ── Desktop ≥ 900px ─────────────────────────────────────── */}
      <div className="mx-auto hidden max-w-[1180px] grid-cols-[240px_1fr] gap-16 px-6 min-[900px]:grid">
        {/* Sidebar */}
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

          {/* Initial 4 cards */}
          <div className="exc-grid grid grid-cols-2 gap-8">
            {initialCards.map((item, i) => (
              <ImageCard
                key={`init-${i}`}
                src={item.image}
                eager={i < 2}
                className="exc-card h-[320px]"
              />
            ))}
          </div>

          {/* Extra 4 cards — rendered only when expanded */}
          {expanded && (
            <div
              ref={desktopExtraRef}
              className="grid grid-cols-2 gap-8 mt-8"
            >
              {extraCards.map((item, i) => (
                <ImageCard
                  key={`extra-${i}`}
                  src={item.image}
                  eager={false}
                  className="exc-extra-card h-[320px]"
                />
              ))}
            </div>
          )}

          <div className="mt-14">
            <button
              onClick={handleToggleExpand}
              className="exc-btn font-rethink cursor-pointer rounded-[10px] border border-[#ae1431] px-7 bg-[#ae1431] py-3 text-[13px] uppercase tracking-[0.16em] text-white transition-all duration-200 hover:bg-[#111] hover:text-white hover:border-[#111]"
            >
              {expanded ? "Show Less" : "Explore Excellence"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile < 900px ──────────────────────────────────────── */}
      <div className="w-full overflow-x-clip px-4 min-[900px]:hidden">
        {/* Heading */}
        <div className="mb-9">
          <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#b0b0b0]">
            Our Domains
          </p>
          <h2 className="font-display text-[26px] leading-[1.15] sm:text-[32px] tracking-[-0.02em] text-[#111]">
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
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#c0c0c0]">
                0{active + 1} / 0{CATEGORIES.length}
              </span>
              <span className="font-display text-[17px] leading-none tracking-[0.05em] text-[#111]">
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

        {/* Initial 4 cards */}
        <div className="mob-exc-grid mb-2 grid grid-cols-2 gap-2 sm:gap-2.5 overflow-x-clip">
          {initialCards.map((item, i) => (
            <ImageCard
              key={`mob-init-${i}`}
              src={item.image}
              eager={i < 2}
              className="mob-exc-card aspect-square min-w-0 rounded-[16px]"
            />
          ))}
        </div>

        {/* Extra 4 cards on mobile */}
        {expanded && (
          <div
            ref={mobileExtraRef}
            className="grid grid-cols-2 gap-2 sm:gap-2.5 overflow-x-clip mb-2"
          >
            {extraCards.map((item, i) => (
              <ImageCard
                key={`mob-extra-${i}`}
                src={item.image}
                eager={false}
                className="mob-exc-extra-card aspect-square min-w-0 rounded-[16px]"
              />
            ))}
          </div>
        )}

        {/* Dot indicators */}
        <div className="mt-6 mb-7 flex justify-center gap-1.5">
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
        <button
          onClick={handleToggleExpand}
          className="mob-exc-btn font-rethink w-full cursor-pointer rounded-[12px] border border-[#ae1431] bg-[#ae1431] py-[15px] text-[11px] uppercase tracking-[0.18em] text-white transition-all duration-200 active:border-[#111] active:bg-[#111] active:text-white"
        >
          {expanded ? "Show Less" : "Explore Excellence"}
        </button>
      </div>
    </section>
  );
}