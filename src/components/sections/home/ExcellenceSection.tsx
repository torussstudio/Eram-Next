"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "../../../lib/gsap";
import { useGSAP } from "@gsap/react";
import { Play } from "lucide-react";
import api from "@/lib/api";

/* ── Constants ──────────────────────────────────────────────────── */
const CATEGORIES = ["SPORTS", "CULTURAL", "SOCIAL", "ACADEMIC"] as const;
type Category = (typeof CATEGORIES)[number];

interface ExcellenceCard {
  id: string;
  image: string;
  title?: string;
}

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

/* ── SkeletonCard ────────────────────────────────────────────────── */
function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-[28px] bg-black/5 ${className}`}
    />
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export default function ExcellenceSection() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const entranceDone = useRef(false);
  const [visible, setVisible] = useState(false);

  const [cardsByCategory, setCardsByCategory] = useState<
    Record<Category, ExcellenceCard[]>
  >({
    SPORTS: [],
    CULTURAL: [],
    SOCIAL: [],
    ACADEMIC: [],
  });
  const [loading, setLoading] = useState(true);

  /* ── Fetch latest 4 images per category from the gallery API ──── */
  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          CATEGORIES.map((cat) =>
            api.get(`/gallery?category=all&type=${cat.toLowerCase()}`),
          ),
        );
        if (cancelled) return;

        const next = { SPORTS: [], CULTURAL: [], SOCIAL: [], ACADEMIC: [] } as Record<
          Category,
          ExcellenceCard[]
        >;

        CATEGORIES.forEach((cat, i) => {
          const data = (results[i].data as any[]) || [];
          next[cat] = data.slice(0, 4).map((d) => ({
            id: d._id,
            image: d.image,
            title: d.title,
          }));
        });

        setCardsByCategory(next);
      } catch (err) {
        console.error("Excellence fetch failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

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

  const initialCards = cardsByCategory[CATEGORIES[active]];
  const desktop = () => window.innerWidth >= 900;

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
    },
    [active],
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

 /* ── Explore Excellence → navigate to gallery filtered by category ─ */
const handleExploreClick = useCallback(() => {
  const type = CATEGORIES[active].toLowerCase();
  window.scrollTo({ top: 0, behavior: "instant" });
  router.push(`/gallery?type=${type}`);
}, [active, router]);
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

          {/* 4 cards */}
          <div className="exc-grid grid grid-cols-2 gap-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={`sk-${i}`} className="h-[320px]" />
              ))
            ) : initialCards.length > 0 ? (
              initialCards.map((item, i) => (
                <ImageCard
                  key={item.id}
                  src={item.image}
                  eager={i < 2}
                  className="exc-card h-[320px]"
                />
              ))
            ) : (
              <p className="col-span-2 text-sm text-[#999]">
                No photographs added for this category yet.
              </p>
            )}
          </div>

          <div className="mt-14">
            <button
              onClick={handleExploreClick}
              className="exc-btn font-rethink cursor-pointer rounded-[10px] border border-[#ae1431] px-7 bg-[#ae1431] py-3 text-[13px] uppercase tracking-[0.16em] text-white transition-all duration-200 hover:bg-black hover:text-white hover:border-white flex items-center justify-center gap-2"
            >
              Explore Excellence
              <Play className="w-5 h-5 transition-colors" />
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

        {/* 4 cards */}
        <div className="mob-exc-grid mb-2 grid grid-cols-2 gap-2 sm:gap-2.5 overflow-x-clip">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard
                key={`mob-sk-${i}`}
                className="aspect-square min-w-0 rounded-[16px]"
              />
            ))
          ) : initialCards.length > 0 ? (
            initialCards.map((item, i) => (
              <ImageCard
                key={item.id}
                src={item.image}
                eager={i < 2}
                className="mob-exc-card aspect-square min-w-0 rounded-[16px]"
              />
            ))
          ) : (
            <p className="col-span-2 text-sm text-[#999]">
              No photographs added for this category yet.
            </p>
          )}
        </div>

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
          onClick={handleExploreClick}
          className="mob-exc-btn font-rethink w-full cursor-pointer rounded-[12px] border border-[#ae1431] bg-[#ae1431] py-[15px] text-[11px] uppercase tracking-[0.18em] text-white transition-all duration-200 active:border-[#111] active:bg-[#111] active:text-white flex items-center justify-center gap-2"
        >
          Explore Excellence
          <Play className="w-5 h-5 transition-colors" />
        </button>
      </div>
    </section>
  );
}