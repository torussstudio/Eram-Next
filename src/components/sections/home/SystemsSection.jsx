import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Static data ─────────────────────────────────────────────────────────── */
const TABS = [
  "LEADERSHIP AND\nMANAGEMENT STRUCTURE",
  "INFRASTRUCTURE AND\nOPERATIONAL EXCELLENCE",
  "INSTITUTIONAL\nSYSTEMS & LEADERSHIP",
];

const TABS_SHORT = ["Leadership", "Infrastructure", "Institutional"];

const CARDS_DATA = [
  [
    { n: "01", t: "Strategic Leadership",           img: "/images/card1.webp" },
    { n: "02", t: "Structured Academics",            img: "/images/card2.webp" },
    { n: "03", t: "Operational Discipline",          img: "/images/card3.webp" },
    { n: "04", t: "Community-Rooted Vision",         img: "/images/card4.webp" },
    { n: "05", t: "Faculty-Centric Approach",        img: "/images/card5.webp" },
    { n: "06", t: "Infrastructure Excellence",       img: "/images/card6.webp" },
    { n: "07", t: "Sports & Exposure Integration",   img: "/images/card7.webp" },
    { n: "08", t: "Value-Anchored Education",        img: "/images/card8.webp" },
  ],
  [
    { n: "01", t: "Academic Planning Support",                  img: "/images/cardinfra1.webp" },
    { n: "02", t: "Active involvement of Trust leadership",     img: "/images/cardinfra2.webp" },
    { n: "03", t: "Direct relationship with Principals & HODs", img: "/images/cardinfra3.webp" },
    { n: "04", t: "Regular review meetings",                    img: "/images/cardinfra4.webp" },
  ],
  [
    { n: "01", t: "Amphitheatre & cultural spaces",        img: "/images/cardinstit1.png" },
    { n: "02", t: "Modern classrooms & labs",              img: "/images/institute.png"   },
    { n: "03", t: "Sports grounds & athletics facilities", img: "/images/cardinstit3.png" },
    { n: "04", t: "Community-Rooted Vision",               img: "/images/cardinstit4.png" },
  ],
];

const CARD_WIDTH = 320;
const CARD_GAP   = 18;
const SCROLL_BY  = 2;

/* ─── Arrow icon ──────────────────────────────────────────────────────────── */
const ArrowIcon = ({ active }) => (
  <svg
    width="12" height="12" viewBox="0 0 12 12" fill="none"
    style={{ transform: active ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
  >
    <path
      d="M2 6h8M6 2l4 4-4 4"
      stroke={active ? "white" : "#888"}
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

/* ─── Desktop carousel arrow button ──────────────────────────────────────── */
function CarouselArrow({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      className="
        group
        flex-none
        flex items-center justify-center

        w-[42px] h-[42px]
        rounded-full
        border-[2px] border-[#cfcfcf]

        bg-transparent
        transition-all duration-300 ease-out

        hover:bg-[#ae1431]
        hover:border-[#ae1431]
        hover:scale-110
        hover:shadow-[0_0_18px_rgba(174,20,49,0.28)]

        active:scale-95

        cursor-pointer
      "
    >
      <svg
        width="16" height="16" viewBox="0 0 16 16" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-300 stroke-[#555] group-hover:stroke-white"
      >
        {direction === "left" ? (
          <path d="M10 13L5 8L10 3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M6 3L11 8L6 13" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function SystemsSection() {
  const [activeTab,  setActiveTab]  = useState(0);
  const [activeCard, setActiveCard] = useState(0);

  const sectionRef       = useRef(null);
  const tabBarRef        = useRef(null);
  const indicatorRef     = useRef(null);
  const tabRefs          = useRef([]);
  const mobTabRefs       = useRef([]);
  const desktopCardRefs  = useRef([]);
  const mobCardRefs      = useRef([]);
  const desktopScrollRef = useRef(null); // ← new: ref for desktop scroll container

  const cards = CARDS_DATA[activeTab];

  /* ── Desktop carousel scroll ──────────────────────────────────────────── */
  const scrollCarousel = (direction) => {
    const el = desktopScrollRef.current;
    if (!el) return;
    const step = (CARD_WIDTH + CARD_GAP) * SCROLL_BY;
    el.scrollBy({ left: direction === "right" ? step : -step, behavior: "smooth" });
  };

  /* ── Slide indicator ──────────────────────────────────────────────────── */
  const slideIndicator = (index) => {
    const btn = tabRefs.current[index];
    const bar = tabBarRef.current;
    if (!btn || !bar || !indicatorRef.current) return;
    const barLeft = bar.getBoundingClientRect().left;
    const { left, width } = btn.getBoundingClientRect();
    gsap.to(indicatorRef.current, {
      left: left - barLeft,
      width,
      duration: 0.4,
      ease: "power3.inOut",
    });
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => slideIndicator(activeTab));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => { slideIndicator(activeTab); }, [activeTab]);

  /* ── Tab switch — animate cards in ───────────────────────────────────── */
  useEffect(() => {
    const dCards = desktopCardRefs.current.filter(Boolean);
    if (dCards.length) {
      gsap.set(dCards, { y: 40, opacity: 0, scale: 0.93, rotateX: 6 });
      gsap.to(dCards, {
        y: 0, opacity: 1, scale: 1, rotateX: 0,
        duration: 0.55,
        stagger: { each: 0.1, ease: "power2.in" },
        ease: "expo.out",
        clearProps: "transform",
      });
    }

    if (window.innerWidth >= 900) return;
    const mCards = mobCardRefs.current.filter(Boolean);
    if (mCards.length) {
      gsap.set(mCards, { x: 50, opacity: 0, scale: 0.95 });
      gsap.to(mCards, {
        x: 0, opacity: 1, scale: 1,
        duration: 0.5, stagger: 0.09,
        ease: "expo.out",
        clearProps: "transform",
      });
    }
  }, [activeTab]);

  /* ── Card pulse helpers ───────────────────────────────────────────────── */
  const pulseEl = (refs, index, scaleDown, dur) => {
    const el = refs.current[index];
    if (!el) return;
    gsap.timeline()
      .to(el, { scale: scaleDown, duration: dur,       ease: "power2.in" })
      .to(el, { scale: 1,         duration: dur * 4.2, ease: "elastic.out(1, 0.42)" });
  };

  /* ── Mobile tab spring ────────────────────────────────────────────────── */
  const animateMobTab = (index) => {
    const el = mobTabRefs.current[index];
    if (!el) return;
    gsap.fromTo(el,
      { scale: 0.88, opacity: 0.6 },
      { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.8)" }
    );
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
    setActiveCard(0);
  };

  /* ── Scroll entrance (mobile only) ───────────────────────────────────── */
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 899px)", () => {
      const st = (trigger, start = "top 82%") => ({
        scrollTrigger: { trigger, start },
      });

      gsap.fromTo(".mob-sys-heading",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", ...st(sectionRef.current) }
      );
      gsap.fromTo(".mob-sys-para",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.80, delay: 0.18, ease: "power2.out", ...st(sectionRef.current) }
      );
      gsap.fromTo(".mob-tab-bar",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.70, ease: "expo.out", ...st(sectionRef.current, "top 78%") }
      );
      gsap.fromTo(".mob-sys-card",
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.70, stagger: 0.1, ease: "power3.out", ...st(".mob-sys-cards", "top 88%") }
      );
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="bg-[#f5efe8] py-[90px] max-[899px]:pt-[24px] max-[899px]:pb-[48px] overflow-hidden"
    >

      {/* ── Desktop ≥ 900px ──────────────────────────────────────────────── */}
      <div className="hidden min-[900px]:block">

        {/* Tab bar */}
        <div className="flex justify-center mb-[70px] px-[20px]">
          <div ref={tabBarRef} className="relative flex gap-[160px] border-b-[4px] border-[#e5e5e5]">
            {TABS.map((item, i) => (
              <button
                key={i}
                ref={(el) => (tabRefs.current[i] = el)}
                onClick={() => handleTabClick(i)}
                className="relative pb-[18px] text-[18px] font-medium tracking-[0.12em] uppercase whitespace-nowrap transition-colors duration-300 cursor-pointer"
                style={{ color: activeTab === i ? "#ae1431" : "#777" }}
              >
                {item.split("\n").map((line, idx) => (
                  <span key={idx} className="block">{line}</span>
                ))}
              </button>
            ))}
            <span
              ref={indicatorRef}
              className="absolute -bottom-[4px] h-[6px] rounded-t-full bg-[#ae1431] pointer-events-none"
              style={{ left: 0, width: 0 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto w-[min(1200px,calc(100vw-120px))] flex items-start gap-[80px]">

          {/* Text */}
          <div className="max-w-[420px] ml-[40px]">
            <h2 className="font-display mb-[32px] text-[42px] leading-[1.1] text-[#111]">
              Systems That<br />Sustain Excellence
            </h2>
            <p className="font-rethink text-[14.5px] leading-[1.8] text-black">
              An integrated framework of management oversight, faculty
              excellence, and purpose-built infrastructure sustaining quality
              across every institution, ensuring continuous assessment, teacher
              development, institutional monitoring, and transparent processes.
            </p>
          </div>

          {/* Cards + Arrows */}
          <div className="flex items-center gap-[14px] flex-1 min-w-0">

            {/* ← Left */}
            <CarouselArrow direction="left" onClick={() => scrollCarousel("left")} />

            {/* Scrollable strip */}
            <div
              ref={desktopScrollRef}
              className="flex snap-x snap-mandatory gap-[18px] overflow-x-auto scroll-smooth pb-[20px] scrollbar-hide flex-1 min-w-0"
            >
              {cards.map((card, i) => (
                <div
                  key={`${activeTab}-${i}`}
                  ref={(el) => (desktopCardRefs.current[i] = el)}
                  onClick={() => { setActiveCard(i); pulseEl(desktopCardRefs, i, 0.92, 0.12); }}
                  className="group relative cursor-pointer flex h-[220px] w-[320px] flex-shrink-0 snap-start overflow-hidden rounded-[22px] p-[34px]"
                >
                  <img
                    src={card.img} alt={card.t}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="relative z-10 flex h-full w-full flex-col justify-between">
                    <span style={{ color: activeCard === i ? "#f1d7dd" : "rgba(255,255,255,0.7)" }}>
                      /{card.n}
                    </span>
                    <span className="font-rethink flex justify-end text-[26px] font-medium leading-[1.2] text-white">
                      {card.t}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* → Right */}
            <CarouselArrow direction="right" onClick={() => scrollCarousel("right")} />
          </div>

        </div>

        {/* CTA */}
        <div className="mt-[70px] flex justify-center px-[20px]">
          <button className="font-rethink rounded-[8px] border border-[#cfcfcf] px-[36px] py-[14px] text-[12px] font-[500] uppercase tracking-[0.16em] text-[#111] transition-all duration-300 hover:border-black hover:bg-black hover:text-white cursor-pointer">
            EXPLORE OUR SYSTEMS & STANDARDS
          </button>
        </div>
      </div>

      {/* ── Mobile < 900px ───────────────────────────────────────────────── */}
      <div className="min-[900px]:hidden px-[22px]">

        {/* Header */}
        <div className="mb-[20px]">
          <h2 className="mob-sys-heading font-display text-[32px] font-black leading-[1.12] text-[#111] mb-[10px]">
            Systems That<br />Sustain Excellence
          </h2>
          <p className="mob-sys-para text-[13.5px] leading-[1.8] text-[#444] max-w-[420px]">
            An integrated framework of management oversight, faculty excellence,
            and purpose-built infrastructure sustaining quality across every
            institution, ensuring continuous assessment, teacher development,
            institutional monitoring, and transparent processes.
          </p>
        </div>

        {/* Mobile tab bar */}
        <div className="mob-tab-bar flex gap-[8px] mb-[20px]">
          {TABS_SHORT.map((label, i) => (
            <button
              key={i}
              ref={(el) => (mobTabRefs.current[i] = el)}
              onClick={() => { handleTabClick(i); animateMobTab(i); }}
              className="flex-1 flex flex-col items-start gap-[6px] rounded-[14px] px-[14px] py-[12px] transition-colors duration-300 border"
              style={{
                background:   activeTab === i ? "#ae1431" : "transparent",
                borderColor:  activeTab === i ? "#ae1431" : "#ddd",
              }}
            >
              <span
                className="text-[10px] font-semibold tracking-[0.18em]"
                style={{ color: activeTab === i ? "rgba(255,255,255,0.55)" : "#aaa" }}
              >
                0{i + 1}
              </span>
              <span
                className="text-[11px] font-medium leading-[1.3] tracking-[0.04em] text-left"
                style={{ color: activeTab === i ? "white" : "#555" }}
              >
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="mob-sys-cards flex flex-col gap-[10px] mb-[24px]">
          {cards.map((card, i) => {
            const isActive = activeCard === i;
            return (
              <div
                key={`${activeTab}-${i}`}
                ref={(el) => (mobCardRefs.current[i] = el)}
                onClick={() => { setActiveCard(i); pulseEl(mobCardRefs, i, 0.94, 0.10); }}
                className="mob-sys-card flex items-center justify-between rounded-[18px] px-[22px] py-[20px] cursor-pointer border"
                style={{
                  background:  isActive ? "#ae1431" : "white",
                  borderColor: isActive ? "#ae1431" : "#e8e8e8",
                  boxShadow:   isActive ? "0 8px 32px rgba(174,20,49,0.22)" : "0 2px 8px rgba(0,0,0,0.04)",
                  transition:  "background 0.3s, border-color 0.3s, box-shadow 0.3s",
                }}
              >
                <div className="flex items-center gap-[18px]">
                  <span
                    className="text-[11px] font-semibold tracking-[0.16em] tabular-nums w-[26px]"
                    style={{ color: isActive ? "rgba(255,255,255,0.45)" : "#bbb" }}
                  >
                    /{card.n}
                  </span>
                  <span
                    className="text-[17px] font-semibold leading-[1.25]"
                    style={{ color: isActive ? "white" : "#111" }}
                  >
                    {card.t}
                  </span>
                </div>

                <div
                  className="flex-shrink-0 w-[32px] h-[32px] rounded-full flex items-center justify-center"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.18)" : "#f2f2f2",
                    transition: "background 0.3s",
                  }}
                >
                  <ArrowIcon active={isActive} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <button className="w-full rounded-[14px] border border-[#cfcfcf] py-[16px] text-[11px] font-[600] uppercase tracking-[0.18em] text-[#111] transition-all duration-300 active:bg-black active:text-white active:border-black">
          EXPLORE OUR SYSTEMS & STANDARDS
        </button>

      </div>
    </section>
  );
}