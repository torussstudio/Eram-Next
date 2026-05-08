import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

/* ─── Constants ───────────────────────────────────────────────────────────── */
const TABS = [
  "LEADERSHIP AND\nMANAGEMENT STRUCTURE",
  "INFRASTRUCTURE AND\nOPERATIONAL EXCELLENCE",
  "INSTITUTIONAL\nSYSTEMS & LEADERSHIP",
];

const TABS_SHORT = ["Leadership", "Infrastructure", "Institutional"];

const CARDS_DATA = [
  [
    { n: "01", t: "Strategic Leadership",         img: "/images/card1.webp" },
    { n: "02", t: "Structured Academics",          img: "/images/card2.webp" },
    { n: "03", t: "Operational Discipline",        img: "/images/card3.webp" },
    { n: "04", t: "Community-Rooted Vision",       img: "/images/card4.webp" },
    { n: "05", t: "Faculty-Centric Approach",      img: "/images/card5.webp" },
    { n: "06", t: "Infrastructure Excellence",     img: "/images/card6.webp" },
    { n: "07", t: "Sports & Exposure Integration", img: "/images/card7.webp" },
    { n: "08", t: "Value-Anchored Education",      img: "/images/card8.webp" },
  ],
  [
    { n: "01", t: "Academic Planning Support",                    img: "/images/cardinfra1.webp" },
    { n: "02", t: "Active involvement of Trust leadership",       img: "/images/cardinfra2.webp" },
    { n: "03", t: "Direct relationship with Principals & HODs",  img: "/images/cardinfra3.webp" },
    { n: "04", t: "Regular review meetings",                      img: "/images/cardinfra4.webp" },
  ],
  [
    { n: "01", t: "Amphitheatre & cultural spaces",       img: "/images/cardinstit1.png" },
    { n: "02", t: "Modern classrooms & labs",             img: "/images/institute.png"   },
    { n: "03", t: "Sports grounds & athletics facilities",img: "/images/cardinstit3.png" },
    { n: "04", t: "Community-Rooted Vision",              img: "/images/cardinstit4.png" },
  ],
];

const SCROLL_BY   = 2;
const CARD_WIDTH  = 320;
const CARD_GAP    = 18;


const TAB_CONFIG = [
  { showText: false, fullWidth: true,  showArrows: true  },
  { showText: false, fullWidth: true,  showArrows: false },
  { showText: true,  fullWidth: false, showArrows: true  },
];

/* ─── Sub-components ──────────────────────────────────────────────────────── */
const ArrowIcon = ({ active }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
    style={{ transform: active ? "rotate(90deg)" : "none", transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1)" }}
  >
    <path d="M2 6h8M6 2l4 4-4 4"
      stroke={active ? "white" : "#888"}
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const CarouselArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
    className="
      group flex-none flex items-center justify-center
      w-[42px] h-[42px] rounded-full
      border-[2px] border-[#cfcfcf] bg-transparent
      transition-all duration-300 ease-out cursor-pointer
      hover:bg-[#ae1431] hover:border-[#ae1431]
      hover:scale-110 hover:shadow-[0_0_18px_rgba(174,20,49,0.28)]
      active:scale-95
    "
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      className="transition-colors duration-300 stroke-[#555] group-hover:stroke-white"
    >
      {direction === "left"
        ? <path d="M10 13L5 8L10 3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M6 3L11 8L6 13"  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      }
    </svg>
  </button>
);

/* ─── Main component ──────────────────────────────────────────────────────── */
export default function SystemsSection() {
  const navigate = useNavigate();
  const [activeTab,  setActiveTab]  = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const busy = useRef(false); // animation lock

  /* refs */
  const sectionRef       = useRef(null);
  const tabBarRef        = useRef(null);
  const indicatorRef     = useRef(null);
  const tabRefs          = useRef([]);
  const mobTabRefs       = useRef([]);
  const desktopCardRefs  = useRef([]);
  const mobCardRefs      = useRef([]);
  const desktopScrollRef = useRef(null);
  const textBlockRef     = useRef(null);

  const cards  = CARDS_DATA[activeTab];
  const config = TAB_CONFIG[activeTab];

  /* ── indicator ── */
  const moveIndicator = useCallback((index) => {
    const btn = tabRefs.current[index];
    const bar = tabBarRef.current;
    if (!btn || !bar || !indicatorRef.current) return;
    const { left, width } = btn.getBoundingClientRect();
    gsap.to(indicatorRef.current, {
      left: left - bar.getBoundingClientRect().left,
      width,
      duration: 0.45,
      ease: "expo.inOut",
      overwrite: true,
    });
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => moveIndicator(activeTab));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => { moveIndicator(activeTab); }, [activeTab]);

  /* ── carousel scroll ── */
  const scrollCarousel = useCallback((dir) => {
    const el = desktopScrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: (dir === "right" ? 1 : -1) * (CARD_WIDTH + CARD_GAP) * SCROLL_BY,
      behavior: "smooth",
    });
  }, []);

  /* ── card pulse ── */
  const pulseEl = useCallback((refs, i) => {
    const el = refs.current[i];
    if (!el) return;
    gsap.timeline()
      .to(el, { scale: 0.94, duration: 0.1,  ease: "power2.in"          })
      .to(el, { scale: 1,    duration: 0.45, ease: "elastic.out(1,0.42)" });
  }, []);

  /* ── tab switch animation ── */
  useEffect(() => {
    const dCards = desktopCardRefs.current.filter(Boolean);

    // out
    gsap.killTweensOf(dCards);
    gsap.to(dCards, {
      opacity: 0, y: -14, scale: 0.98,
      duration: 0.18, ease: "power2.in",
      stagger: 0.03,
      onComplete() {
        // in
        gsap.fromTo(dCards,
          { opacity: 0, y: 32, scale: 0.96, filter: "blur(3px)" },
          {
            opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
            duration: 0.55,
            stagger: { each: 0.06, ease: "power1.inOut" },
            ease: "expo.out",
            clearProps: "filter,transform",
            onComplete() { busy.current = false; },
          }
        );
      },
    });

    // text block (tab 3)
    if (textBlockRef.current) {
      gsap.fromTo(textBlockRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.6, ease: "expo.out", delay: 0.12 }
      );
    }

    // mobile
    if (window.innerWidth < 900) {
      const mCards = mobCardRefs.current.filter(Boolean);
      gsap.killTweensOf(mCards);
      gsap.fromTo(mCards,
        { opacity: 0, x: 36, scale: 0.97 },
        { opacity: 1, x: 0, scale: 1, duration: 0.45, stagger: 0.06, ease: "expo.out", clearProps: "transform" }
      );
    }
  }, [activeTab]);

  /* ── tab click ── */
  const handleTabClick = useCallback((index) => {
    if (busy.current || index === activeTab) return;
    busy.current = true;
    setActiveTab(index);
    setActiveCard(0);
  }, [activeTab]);

  /* ── mobile tab spring ── */
  const animateMobTab = useCallback((index) => {
    const el = mobTabRefs.current[index];
    if (!el) return;
    gsap.fromTo(el,
      { scale: 0.9, opacity: 0.5 },
      { scale: 1,   opacity: 1,   duration: 0.38, ease: "back.out(2)" }
    );
  }, []);

  /* ── scroll entrance ── */
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const trigger = { trigger: sectionRef.current, start: "top 78%" };

      gsap.fromTo(".desk-tabbar",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.75, ease: "expo.out", scrollTrigger: trigger }
      );
      gsap.fromTo(".desk-content",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.85, ease: "expo.out", delay: 0.18, scrollTrigger: trigger }
      );
      gsap.fromTo(".desk-cta",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6,  ease: "power3.out", delay: 0.35, scrollTrigger: trigger }
      );
    });

    mm.add("(max-width: 899px)", () => {
      const t = (trigger, start = "top 82%") => ({ scrollTrigger: { trigger, start } });

      gsap.fromTo(".mob-heading",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", ...t(sectionRef.current) }
      );
      gsap.fromTo(".mob-para",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.14, ...t(sectionRef.current) }
      );
      gsap.fromTo(".mob-tabbar",
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 0.55, ease: "expo.out", ...t(sectionRef.current, "top 76%") }
      );
      gsap.fromTo(".mob-card",
        { opacity: 0, x: 44, scale: 0.97 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, stagger: 0.07, ease: "expo.out", ...t(".mob-cards", "top 88%") }
      );
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  /* ─── Render ──────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="bg-[#f5efe8] py-[90px] max-[899px]:pt-[24px] max-[899px]:pb-[48px] overflow-hidden"
    >

      {/* ══ Desktop ≥ 900px ══════════════════════════════════════════════ */}
      <div className="hidden min-[900px]:block">

        {/* Tab bar */}
        <div className="desk-tabbar flex justify-center mb-[70px] px-[20px]">
          <div ref={tabBarRef} className="relative flex gap-[160px] border-b-[4px] border-[#e5e5e5]">
            {TABS.map((label, i) => (
              <button
                key={i}
                ref={(el) => (tabRefs.current[i] = el)}
                onClick={() => handleTabClick(i)}
                className="relative pb-[18px] text-[18px] font-medium tracking-[0.12em] uppercase whitespace-nowrap transition-colors duration-300 cursor-pointer"
                style={{ color: activeTab === i ? "#ae1431" : "#777" }}
              >
                {label.split("\n").map((line, j) => <span key={j} className="block">{line}</span>)}
              </button>
            ))}
            <span
              ref={indicatorRef}
              className="absolute -bottom-[4px] h-[6px] rounded-t-full bg-[#ae1431] pointer-events-none"
              style={{ left: 0, width: 0 }}
            />
          </div>
        </div>

        {/* Cards area */}
        <div className={`desk-content mx-auto w-[min(1200px,calc(100vw-120px))] flex items-start gap-[80px] ${!config.showText ? "justify-center" : ""}`}>

          {/* Text block — tab 3 only */}
          {config.showText && (
            <div ref={textBlockRef} className="max-w-[420px] ml-[40px] flex-shrink-0">
              <h2 className="font-display mb-[32px] text-[42px] leading-[1.1] text-[#111]">
                Systems That<br />Sustain Excellence
              </h2>
              <p className="font-rethink text-[14.5px] leading-[1.8] text-black">
                An integrated framework of management oversight, faculty excellence,
                and purpose-built infrastructure sustaining quality across every
                institution, ensuring continuous assessment, teacher development,
                institutional monitoring, and transparent processes.
              </p>
            </div>
          )}

          {/* Carousel */}
          <div className={`flex items-center gap-[14px] min-w-0 ${config.showText ? "flex-1" : "w-full"}`}>

            {config.showArrows && <CarouselArrow direction="left"  onClick={() => scrollCarousel("left")}  />}

            <div
              ref={desktopScrollRef}
              className="flex snap-x snap-mandatory gap-[18px] overflow-x-auto scroll-smooth pb-[20px] scrollbar-hide flex-1 min-w-0"
            >
              {cards.map((card, i) => (
                <div
                  key={`${activeTab}-${i}`}
                  ref={(el) => (desktopCardRefs.current[i] = el)}
                  className="group relative cursor-pointer flex flex-shrink-0 snap-start overflow-hidden rounded-[22px] p-[34px] bg-black"
                  style={{
                    width:  config.fullWidth ? "calc(25% - 14px)" : "320px",
                    height: config.fullWidth ? "320px"            : "220px",
                  }}
                >
                  <img src={card.img} alt={card.t}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/55 transition-all duration-500 group-hover:bg-black/35" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                  <div className="relative z-10 flex h-full w-full flex-col justify-between">
                    <span style={{ color: activeCard === i ? "#f1d7dd" : "rgba(255,255,255,0.7)" }}>
                      /{card.n}
                    </span>
                    <span className="font-rethink flex justify-end text-[26px] font-medium leading-[1.2] text-[#f8f8f8] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                      {card.t}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {config.showArrows && <CarouselArrow direction="right" onClick={() => scrollCarousel("right")} />}
          </div>
        </div>

        {/* CTA */}
        <div className="desk-cta mt-[70px] flex justify-center px-[20px]">
          <button 
          onClick={() => navigate("/about-us")}
          className="font-rethink rounded-[8px] border border-[#cfcfcf] px-[36px] py-[14px] text-[12px] font-[500] uppercase tracking-[0.16em] text-[#111] transition-all duration-300 hover:border-black hover:bg-black hover:text-white cursor-pointer">
            EXPLORE OUR SYSTEMS & STANDARDS
          </button>
        </div>
      </div>

      {/* ══ Mobile < 900px ═══════════════════════════════════════════════ */}
      <div className="min-[900px]:hidden px-[22px]">

        <div className="mb-[20px]">
          <h2 className="mob-heading font-display text-[32px] font-black leading-[1.12] text-[#111] mb-[10px]">
            Systems That<br />Sustain Excellence
          </h2>
          <p className="mob-para text-[13.5px] leading-[1.8] text-[#444] max-w-[420px]">
            An integrated framework of management oversight, faculty excellence,
            and purpose-built infrastructure sustaining quality across every
            institution, ensuring continuous assessment, teacher development,
            institutional monitoring, and transparent processes.
          </p>
        </div>

        {/* Mobile tabs */}
        <div className="mob-tabbar flex gap-[8px] mb-[20px]">
          {TABS_SHORT.map((label, i) => (
            <button
              key={i}
              ref={(el) => (mobTabRefs.current[i] = el)}
              onClick={() => { handleTabClick(i); animateMobTab(i); }}
              className="flex-1 flex flex-col items-start gap-[6px] rounded-[14px] px-[14px] py-[12px] transition-colors duration-300 border"
              style={{
                background:   activeTab === i ? "#ae1431"    : "transparent",
                borderColor:  activeTab === i ? "#ae1431"    : "#ddd",
              }}
            >
              <span className="text-[10px] font-semibold tracking-[0.18em]"
                style={{ color: activeTab === i ? "rgba(255,255,255,0.55)" : "#aaa" }}>
                0{i + 1}
              </span>
              <span className="text-[11px] font-medium leading-[1.3] tracking-[0.04em] text-left"
                style={{ color: activeTab === i ? "white" : "#555" }}>
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile card list */}
        <div className="mob-cards flex flex-col gap-[10px] mb-[24px]">
          {cards.map((card, i) => {
            const isActive = activeCard === i;
            return (
              <div
                key={`${activeTab}-${i}`}
                ref={(el) => (mobCardRefs.current[i] = el)}
                onClick={() => { setActiveCard(i); pulseEl(mobCardRefs, i); }}
                className="mob-card flex items-center justify-between rounded-[18px] px-[22px] py-[20px] cursor-pointer border"
                style={{
                  background:  isActive ? "#ae1431" : "#111",
                  borderColor: isActive ? "#ae1431" : "#222",
                  boxShadow:   isActive ? "0 8px 32px rgba(174,20,49,0.22)" : "0 2px 8px rgba(0,0,0,0.04)",
                  transition:  "background 0.3s, border-color 0.3s, box-shadow 0.3s",
                }}
              >
                <div className="flex items-center gap-[18px]">
                  <span className="text-[11px] font-semibold tracking-[0.16em] tabular-nums w-[26px]"
                    style={{ color: isActive ? "rgba(255,255,255,0.45)" : "#bbb" }}>
                    /{card.n}
                  </span>
                  <span className="text-[17px] font-semibold leading-[1.25] text-white">
                    {card.t}
                  </span>
                </div>
                <div className="flex-shrink-0 w-[32px] h-[32px] rounded-full flex items-center justify-center"
                  style={{ background: isActive ? "rgba(255,255,255,0.18)" : "#1d1d1d", transition: "background 0.3s" }}>
                  <ArrowIcon active={isActive} />
                </div>
              </div>
            );
          })}
        </div>

        <button 
        onClick={() => navigate("/about-us")}
        className="w-full rounded-[14px] border border-[#cfcfcf] py-[16px] text-[11px] font-[600] uppercase tracking-[0.18em] text-[#111] transition-all duration-300 active:bg-black active:text-white active:border-black">
          EXPLORE OUR SYSTEMS & STANDARDS
        </button>
      </div>

    </section>
  );
}