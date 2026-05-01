import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { excellenceDomains } from "../../../constants/homeData";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["ACADEMIC", "SPORTS", "CULTURAL", "PROFESSIONAL"];

export default function ExcellenceSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  /* ── directional card transition ─────────────────────────────── */
  const goTo = (nextIdx) => {
    if (nextIdx === active || nextIdx < 0 || nextIdx >= CATEGORIES.length)
      return;
    if (window.innerWidth >= 900) {
      setActive(nextIdx);
      return;
    }

    const dir = nextIdx > active ? 1 : -1;
    gsap.to(".mob-exc-card", {
      x: dir * -40,
      opacity: 0,
      duration: 0.22,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => setActive(nextIdx),
    });
  };

  /* ── enter new category ───────────────────────────────────────── */
  useEffect(() => {
    if (window.innerWidth >= 900) return;
    gsap.fromTo(
      ".mob-exc-card",
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: "power3.out" },
    );
  }, [active]);

  /* ── desktop category switch ──────────────────────────────────── */
  useEffect(() => {
    if (window.innerWidth < 900) return;
    gsap.fromTo(
      ".exc-card",
      { opacity: 0, y: 20, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      },
    );
  }, [active]);

  /* ── scroll entrance ─────────────────────────────────────────── */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        gsap.fromTo(
          ".exc-heading",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
          },
        );
        gsap.fromTo(
          ".exc-menu-item",
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
          },
        );
        gsap.fromTo(
          ".exc-card",
          { scale: 0.9, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".exc-grid", start: "top 85%" },
          },
        );
        gsap.fromTo(
          ".exc-btn",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: ".exc-grid", start: "top 75%" },
          },
        );
      });

      mm.add("(max-width: 899px)", () => {
        gsap.fromTo(
          ".mob-exc-word",
          { y: "105%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "power4.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
          },
        );
        gsap.fromTo(
          ".mob-nav-row",
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          },
        );
        gsap.fromTo(
          ".mob-exc-card",
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: ".mob-exc-grid", start: "top 88%" },
          },
        );
        gsap.fromTo(
          ".mob-exc-btn",
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: { trigger: ".mob-exc-btn", start: "top 95%" },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-white py-[120px] max-[900px]:py-[64px]"
      id="gallery"
    >
      {/* ════════════════════════════════════════════════════════════
          DESKTOP ≥ 900px — original, untouched
      ════════════════════════════════════════════════════════════ */}
      <div className="hidden min-[900px]:grid max-w-[1180px] mx-auto px-[24px] grid-cols-[260px_1fr] gap-[60px]">
        <div className="pt-[20px] sticky top-[120px] self-start z-30 flex flex-col gap-[22px]">
          {CATEGORIES.map((item, i) => {
            const isActive = active === i;
            return (
              <button
                key={item}
                onClick={() => setActive(i)}
                className={`exc-menu-item text-left text-[22px] tracking-[0.16em] font-[400] transition-all duration-200 ${isActive ? "text-[#111]" : "text-[#a3a3a3] hover:text-[#666] cursor-pointer"}`}
              >
                {isActive && <span>//</span>}
                {item}
              </button>
            );
          })}
        </div>

        <div className="max-w-[680px] ml-[80px]">
          <h2 className="exc-heading font-display text-[48px] font-[600] tracking-[-0.02em] text-[#111] mb-[56px]">
            Excellence Across Every Domain
          </h2>
          <div className="exc-grid grid grid-cols-2 gap-[32px]">
            {excellenceDomains.map((item, i) => (
              <div
                key={i}
                className="exc-card h-[320px] rounded-[28px] border border-[#cfcfcf] bg-[#f5efe8] flex items-center justify-center"
              >
                <svg width="42" height="42" opacity="0.45">
                  <rect width="42" height="42" fill="#9a9a9a" />
                </svg>
              </div>
            ))}
          </div>
          <div className="mt-[56px] flex justify-center">
            <button className="exc-btn px-[28px] py-[12px] text-[13px] tracking-[0.16em] uppercase text-[#222] border border-[#bfbfbf] rounded-[10px] mr-[450px] max-[1200px]:mr-0 transition-all duration-200 hover:bg-[#111] hover:text-white">
              Explore Excellence
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          MOBILE < 900px — neat, clean, refined
      ════════════════════════════════════════════════════════════ */}
      <div className="min-[900px]:hidden px-[20px]">
        {/* ── Heading ────────────────────────────────────────────── */}
        <div className="mb-[36px]">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#b0b0b0] font-semibold mb-[14px]">
            Our Domains
          </p>
          <h2 className="font-display text-[32px] font-[600] tracking-[-0.02em] text-[#111] leading-[1.2]">
            {"Excellence Across Every Domain".split(" ").map((w, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom mr-[0.22em]"
              >
                <span className="mob-exc-word inline-block">{w}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* ── Navigation row ─────────────────────────────────────── */}
        <div className="mob-nav-row mb-[24px]">
          {/* prev / label / next */}
          <div className="flex items-center justify-between mb-[10px]">
            <button
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              className="w-[36px] h-[36px] rounded-full border border-[#e4e4e4] flex items-center justify-center transition-colors duration-200 disabled:opacity-20"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M7.5 2L3.5 6l4 4"
                  stroke="#111"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex flex-col items-center gap-[3px]">
              <span className="text-[9px] font-semibold tracking-[0.22em] text-[#c0c0c0] uppercase">
                0{active + 1} / 0{CATEGORIES.length}
              </span>
              <span className="font-display text-[17px] font-semibold tracking-[0.05em] text-[#111] leading-none">
                {CATEGORIES[active]}
              </span>
            </div>

            <button
              onClick={() => goTo(active + 1)}
              disabled={active === CATEGORIES.length - 1}
              className="w-[36px] h-[36px] rounded-full border border-[#e4e4e4] flex items-center justify-center transition-colors duration-200 disabled:opacity-20"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M4.5 2l4 4-4 4"
                  stroke="#111"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* progress track */}
          <div className="h-[2px] bg-[#f0f0f0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#111] rounded-full transition-all duration-350 ease-out"
              style={{ width: `${((active + 1) / CATEGORIES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* ── Cards — clean uniform 2-col grid ───────────────────── */}
        <div className="mob-exc-grid grid grid-cols-2 gap-[10px] mb-[24px]">
          {excellenceDomains.map((item, i) => (
            <div
              key={`${active}-${i}`}
              className="mob-exc-card rounded-[20px] border border-[#ebebeb] bg-[#f5efe8] flex items-center justify-center"
              className="
mob-exc-card
aspect-square
rounded-[20px]
border border-[#ebebeb]
bg-[#f5efe8]
flex items-center justify-center
"
            >
              <svg width="34" height="34" opacity="0.35">
                <rect width="34" height="34" fill="#9a9a9a" />
              </svg>
            </div>
          ))}
        </div>

        {/* ── Dot row ────────────────────────────────────────────── */}
        <div className="flex justify-center gap-[6px] mb-[28px]">
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

        {/* ── Button ─────────────────────────────────────────────── */}
        <button className="mob-exc-btn w-full rounded-[12px] border border-[#d8d8d8] py-[15px] text-[11px] font-[600] tracking-[0.18em] uppercase text-[#222] transition-all duration-200 active:bg-[#111] active:text-white active:border-[#111]">
          Explore Excellence
        </button>
      </div>
    </section>
  );
}
