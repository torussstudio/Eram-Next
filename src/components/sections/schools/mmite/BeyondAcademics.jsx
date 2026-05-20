import { useRef } from "react";
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { shell } from "../../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

const benchmarks = [
  {
    tag: "KTET 2025",
    title: "45 out of 53 Students Cleared the Kerala Teacher Eligibility Test",
    desc: "A qualification outcome that reflects focused KTET preparation, structured academic execution, and disciplined mentorship across the two-year programme.",
  },
  {
    tag: "PSC Rankings",
    title: "PSC Top Ranks Secured — 4th and 6th Positions by Alumni",
    desc: "Alumni who passed through MMITE's structured formation have gone on to secure top PSC ranks and placement in reputed educational institutions across the region.",
  },
];

const excellence = [
  {
    tag: "Kerala First",
    title: "Printed Magazine",
    sub: "Academic & Literary Expression",
    desc: "Kerala's first and only Teacher Training Institute with a printed institutional magazine — a platform for academic expression and professional identity.",
  },
  {
    tag: "Academic Engagement",
    title: "Seminars & Workshops",
    sub: "Professional Development Platforms",
    desc: "Structured seminar and workshop participation — strengthening confidence, pedagogical clarity, and professional communication in future educators.",
  },
  {
    tag: "Leadership Formation",
    title: "15-Day Residential Camp",
    sub: "Empathy · Adaptability · Leadership",
    desc: "An immersive residential programme focused on building the personal and professional qualities that define effective, empathetic classroom leaders.",
  },
];

const stats = [
  {
    value: "45/53",
    label: "Students Cleared KTETin \n2025 Batch",
    bg: "bg-[#1a1a1a]",
    valC: "text-white",
    unitC: "text-white/40",
    descC: "text-[#5e554e]",
  },
  {
    value: "4th",
    label: "PSC Top Rank Securedby\n MMITE Alumni",
    bg: "bg-[#8b1020]",
    valC: "text-white",
    unitC: "text-white/60",
    descC: "text-white/55",
  },
  {
    value: "50",
    label: "Students per Batch — \nFocused Individual Mentorship",
    bg: "bg-[#1a1a1a]",
    valC: "text-white",
    unitC: "text-white/40",
    descC: "text-[#5e554e]",
  },
];

// ─── Reusable scroll-reveal factory ──────────────────────────────────────────
// Each section: label fades in first, then cards stagger up behind it.
function revealSection(trigger, labelSel, cardsSel) {
  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: {
      trigger,
      start: "top 82%",
      once: true,
    },
  });

  tl.to(labelSel, { opacity: 1, y: 0, duration: 0.45 })
    .to(cardsSel,  { opacity: 1, y: 0, duration: 0.65, stagger: 0.09 }, "-=0.15");
}

export default function BeyondAcademics() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // ── Set all initial states before first paint ─────────────────────
      gsap.set(
        [
          ".anim-header",
          ".anim-bench-label", ".anim-bench",
          ".anim-excel-label", ".anim-excel",
          ".anim-stat-label",  ".anim-stat",
        ],
        { opacity: 0, y: 28 }
      );

      // ── Header — its own timeline, fires earliest ─────────────────────
      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: ".anim-header-wrap", start: "top 85%", once: true },
      }).to(".anim-header", { opacity: 1, y: 0, duration: 0.7, stagger: 0.14 });

      // ── Benchmarks, Excellence, Stats — shared factory ────────────────
      revealSection(".anim-bench-wrap", ".anim-bench-label", ".anim-bench");
      revealSection(".anim-excel-wrap", ".anim-excel-label", ".anim-excel");
      revealSection(".anim-stat-wrap",  ".anim-stat-label",  ".anim-stat");

      // ── Number counters — triggered once with the stat section ────────
      gsap.utils.toArray(".counter-num").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target"), 10);

        gsap.to(el, {
          scrollTrigger: { trigger: ".anim-stat-wrap", start: "top 82%", once: true },
          textContent: target,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          delay: 0.3,         // slight delay so cards land before numbers run
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className={`${shell} bg-[#F5EFE8]`}>
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-16 md:py-20 lg:py-24">

        {/* ── HEADER ── */}
        <div className="anim-header-wrap grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-14 lg:mb-16">
          <div className="anim-header">
            <h2 className="font-display text-[#1a1209] leading-[1.05] tracking-[-0.02em] text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] xl:text-[46px]">
             Performance
              <br />
              That Speaks
            </h2>
          </div>
          <div className="anim-header flex items-end">
            <p className=" font-rethink text-[14.5px] md:text-[15.5px] leading-[1.85] text-[#6b5f54] max-w-[520px]">
              MMITE demonstrates strong qualification outcomes year after year
              — a direct result of structured training, focused academic execution, 
              and individualised mentorship across every batch.
            </p>
          </div>
        </div>

        {/* ── BENCHMARKS ── */}
        <div className="anim-bench-wrap mb-12">
          <p className="anim-bench-label text-[11px] sm:text-[12px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
            Qualification Benchmarks
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {benchmarks.map((card, i) => (
              <div
                key={i}
                className="anim-bench group relative p-8 bg-white border border-[#d4cbbf]
                  border-t-4 border-t-[#d4cbbf] hover:border-t-[#8b1020]
                  transition-colors duration-300 rounded-2xl overflow-hidden"
              >
                <span className="inline-block bg-[#fdf6ef] text-[#ae1431] text-[9px] tracking-[0.22em] uppercase px-3 py-1 mb-6 font-medium">
                  {card.tag}
                </span>
                <h3 className="font-serif text-[#1a1209] text-[20px] sm:text-[22px] leading-snug tracking-[-0.01em] mb-3">
                  {card.title}
                </h3>
                <p className="text-[13px] text-[#6b5f54] leading-[1.7] max-w-[480px]">
                  {card.desc}
                </p>
                <span className="absolute bottom-4 right-5 font-serif text-[60px] text-[#e8dfd4] leading-none select-none pointer-events-none font-medium tracking-[-0.03em] opacity-70">
                  14
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── STUDENT EXCELLENCE ── */}
        <div className="anim-excel-wrap mb-12">
          <p className="anim-excel-label text-[11px] sm:text-[12px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
            Academic & Creative Engagement
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1  rounded-2xl overflow-hidden">
            {excellence.map((card, i) => {
              const isRed  = i === 0;
              const isDark = i === 1;
              const bg     = isRed  ? "bg-[#8b1020]" : isDark ? "bg-[#1a1a1a]" : "bg-white border border-[#d4cbbf]";
              const badge  = isRed  ? "bg-[#ae1431] text-white" : isDark ? "bg-[#2a2a2a] text-[#a09488]" : "bg-[#fdf6ef] border border-[#d4cbbf] text-[#ae1431]";
              const titleC = isRed || isDark ? "text-white" : "text-[#1a1209]";
              const subC   = isRed  ? "text-white/50"  : isDark ? "text-white/40"  : "text-[#8a7d6e]";
              const descC  = isRed  ? "text-white/80"  : isDark ? "text-white/70"  : "text-[#4a3f35]";

              return (
                <div key={i} className={`anim-excel p-7 ${bg}`}>
                  <span className={`inline-block text-[9px] tracking-[0.2em] uppercase px-3 py-1 mb-6 font-medium ${badge}`}>
                    {card.tag}
                  </span>
                  <h3 className={`font-serif text-[22px] sm:text-[24px] leading-tight mb-1 ${titleC}`}>
                    {card.title}
                  </h3>
                  <p className={`text-[12px] mb-5 ${subC}`}>{card.sub}</p>
                  <p className={`text-[13px] leading-[1.65] ${descC}`}>{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CIVIC LEADERSHIP & NSS ── */}
        <div className="anim-stat-wrap">
          <p className="anim-stat-label text-[11px] sm:text-[12px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
           Outcomes at a Glance
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 rounded-2xl overflow-hidden">
            {stats.map((stat, i) => (
              <div key={i} className={`anim-stat px-8 py-10 ${stat.bg}`}>
                <div className="flex items-baseline gap-1 mb-4">
                  <span
                    data-target={stat.value}
                    className={`counter-num font-serif text-[56px] sm:text-[64px] leading-none font-medium tracking-[-0.02em] ${stat.valC}`}
                  >
                    0
                  </span>
                  <span className={`text-[18px] font-light ${stat.unitC}`}>
                    {stat.unit}
                  </span>
                </div>
                <p className={`text-[12px] sm:text-[13px] leading-[1.65] whitespace-pre-line ${stat.descC}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}