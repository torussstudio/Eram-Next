import { memo, useRef } from "react";
import OptimizedImage from "../../ui/OptimizedImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { number: "01", title: "Teacher\ndevelopment\nprograms" },
  { number: "02", title: "CBSE & State\nBoard training\nworkshops" },
  { number: "03", title: "WHO-certified\nteacher training\ninitiatives" },
  { number: "04", title: "Observation\nbased evaluation\nsystems" },
  { number: "05", title: "SQAAF and\nquality assessment\nframeworks" },
  { number: "06", title: "Institutional\nimprovement\ncommittees" },
  { number: "07", title: "Curriculum\nalignment\nreviews" },
];

const CARD_TAGS = [
  ["Training", "Mentorship", "Growth"],
  ["CBSE", "State Board", "Workshops"],
  ["WHO", "Certification", "Initiatives"],
  ["Observation", "Evaluation", "Systems"],
  ["SQAAF", "Quality", "Assessment"],
  ["Institutional", "Committees", "Review"],
  ["Curriculum", "Alignment", "Revision"],
];

const BG_WORDS = [
  "DEVELOP", "TRAINING", "CERTIFY",
  "EVALUATE", "QUALITY", "IMPROVE", "ALIGN",
];

function SystemsThatSustainExcellence() {
  const containerRef    = useRef(null);
  const stackSectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 0px)", () => {

        gsap.fromTo(
          ".systems-eyebrow-line-left",
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
          },
        );
        gsap.fromTo(
          ".systems-eyebrow-line-right",
          { scaleX: 0, transformOrigin: "right center" },
          {
            scaleX: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
          },
        );
        gsap.fromTo(
          ".systems-heading-word",
          { y: "105%", opacity: 0 },
          {
            y: "0%", opacity: 1, duration: 0.85, stagger: 0.07, ease: "power4.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
          },
        );
        gsap.fromTo(
          ".systems-subtext",
          { y: 28, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.3,
            scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
          },
        );
      });

      // ── DESKTOP (md+) ───────────────────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".system-item",
          { y: 50, opacity: 0, rotateX: 8, transformPerspective: 800 },
          {
            y: 0, opacity: 1, rotateX: 0, duration: 0.9,
            stagger: { amount: 0.7, from: "start" }, ease: "power3.out",
            scrollTrigger: { trigger: ".system-grid", start: "top 80%" },
          },
        );
        gsap.fromTo(
          ".system-item-line",
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: ".system-grid", start: "top 80%" },
          },
        );
        gsap.fromTo(
          ".system-img-wrap",
          { scale: 0.93, opacity: 0, borderRadius: "40px" },
          {
            scale: 1, opacity: 1, borderRadius: "26px", duration: 1.3, ease: "expo.out",
            scrollTrigger: { trigger: ".system-img-wrap", start: "top 85%" },
          },
        );
        gsap.to(".system-img", {
          yPercent: 10, ease: "none",
          scrollTrigger: {
            trigger: ".system-img-wrap", start: "top bottom", end: "bottom top",
            scrub: 1, fastScrollEnd: true,
          },
        });
        gsap.fromTo(
          ".system-desc",
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: ".system-img-wrap", start: "top 58%" },
          },
        );
        gsap.fromTo(
          ".system-img-tag",
          { x: 20, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: ".system-img-wrap", start: "top 55%" },
          },
        );
      });

      // ── MOBILE (<768px) ─────────────────────────────────────────────
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".system-item",
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: "expo.out",
            scrollTrigger: { trigger: ".system-grid", start: "top 85%" },
          },
        );
        gsap.fromTo(
          ".system-item-line",
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1, duration: 0.5, stagger: 0.08, ease: "power2.out",
            scrollTrigger: { trigger: ".system-grid", start: "top 85%" },
          },
        );
        gsap.fromTo(
          ".system-img-wrap",
          { clipPath: "inset(100% 0% 0% 0% round 26px)", opacity: 1 },
          {
            clipPath: "inset(0% 0% 0% 0% round 26px)", duration: 1.1, ease: "expo.out",
            scrollTrigger: { trigger: ".system-img-wrap", start: "top 88%" },
          },
        );
        gsap.to(".system-img", {
          yPercent: 6, ease: "none",
          scrollTrigger: {
            trigger: ".system-img-wrap", start: "top bottom", end: "bottom top", scrub: 2,
          },
        });
        gsap.fromTo(
          ".system-desc",
          { filter: "blur(6px)", opacity: 0, y: 16 },
          {
            filter: "blur(0px)", opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: ".system-img-wrap", start: "top 62%" },
          },
        );
        gsap.fromTo(
          ".system-img-tag",
          { y: 12, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: ".system-img-wrap", start: "top 60%" },
          },
        );
      });

      // ── STACKED CARDS — shared builder ─────────────────────────────
      const buildStackTimeline = (scrollEndPx) => {
        const stackSection = stackSectionRef.current;
        if (!stackSection) return;

        const cards = gsap.utils.toArray(".stack-card");
        const total = cards.length; // 7

        const Y_STEP     = 7;
        const ROT_STEP   = 1.5;
        const SCALE_STEP = 0.018;

        // Set ALL bg words to opacity 0 first — GSAP controls them exclusively.
        gsap.set(".stack-bg-word", { opacity: 0 });

        cards.forEach((card, domIndex) => {
          const depth = total - 1 - domIndex;
          gsap.set(card, {
            y: depth * Y_STEP,
            rotation: depth * ROT_STEP,
            scale: 1 - depth * SCALE_STEP,
            zIndex: domIndex + 1,
            transformOrigin: "center bottom",
            opacity: 1,
          });
        });

        const segDur = 1 / total;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:       stackSection,
            start:         "top top",
            end:           `+=${scrollEndPx}`,
            pin:           true,
            pinSpacing:    true,
            scrub:         1.8,
            anticipatePin: 1,
          },
        });

        for (let step = 0; step < total; step++) {
          const frontDOM = total - 1 - step;
          const segStart = step * segDur;

          // Front card flies up
          tl.fromTo(
            cards[frontDOM],
            { y: 0, rotation: 0, scale: 1, opacity: 1 },
            { y: -600, rotation: -12, scale: 0.92, opacity: 0, ease: "power2.inOut", duration: segDur },
            segStart,
          );

          // Remaining cards shift one depth forward
          for (let d = 0; d < frontDOM; d++) {
            const depthBefore = frontDOM - d;
            const depthAfter  = frontDOM - 1 - d;
            tl.fromTo(
              cards[d],
              {
                y: depthBefore * Y_STEP, rotation: depthBefore * ROT_STEP,
                scale: 1 - depthBefore * SCALE_STEP, opacity: 1,
              },
              {
                y: depthAfter * Y_STEP, rotation: depthAfter * ROT_STEP,
                scale: 1 - depthAfter * SCALE_STEP, opacity: 1,
                ease: "power2.inOut", duration: segDur,
              },
              segStart,
            );
          }

          const halfSeg = segDur / 2;

          tl.fromTo(
            `.stack-bg-word[data-index="${step}"]`,
            { opacity: 0 },
            { opacity: 0.065, ease: "none", duration: halfSeg },
            segStart,
          );
          tl.fromTo(
            `.stack-bg-word[data-index="${step}"]`,
            { opacity: 0.065 },
            { opacity: 0, ease: "none", duration: halfSeg },
            segStart + halfSeg,
          );
        }
      };

      // Desktop — generous scroll for smooth reveal
      mm.add("(min-width: 768px)", () => { buildStackTimeline(7 * 320); });

      // Mobile — reduced scroll to eliminate dead-zone gap between sections
      mm.add("(max-width: 767px)", () => { buildStackTimeline(7 * 100); });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>

      {/* ══════════════════════════════════════════
          SECTION 1 — Heading
      ══════════════════════════════════════════ */}
      <section className="bg-[#0f0f0f] overflow-hidden pt-8 pb-6 px-5 md:pt-8 md:pb-6 md:px-6">
        <div className="w-full md:max-w-[1100px] md:mx-auto">
          <div className="text-center max-w-[720px] mx-auto">

            <div className="flex items-center justify-center gap-3 mb-5">
              <div
                className="systems-eyebrow-line-left h-px bg-black/30 w-10"
                style={{ transformOrigin: "left center" }}
              />
              <span className="font-rethink text-[11px] uppercase tracking-[0.2em] text-[#F5EFE8] font-medium">
                Academic Systems
              </span>
              <div
                className="systems-eyebrow-line-right h-px bg-[#F5EFE8] w-10"
                style={{ transformOrigin: "right center" }}
              />
            </div>

            <h2 className="font-display text-[30px] sm:text-[36px] md:text-[44px]  leading-tight text-[#F5EFE8] overflow-hidden">
              {["Systems", "That", "Sustain", "Excellence"].map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                  <span className="systems-heading-word inline-block">{word}</span>
                </span>
              ))}
            </h2>

            <p className="font-rethink systems-subtext mt-4 text-[14px] md:text-[15px] text-[#F5EFE8] leading-relaxed max-w-[560px] mx-auto">
              Sustained academic performance requires consistent faculty
              development and institutional review mechanisms. ERAM integrates
              comprehensive academic systems, including:
            </p>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — Stacked Cards (pinned)
      ══════════════════════════════════════════ */}
      <section
        ref={stackSectionRef}
        className="relative bg-[#0f0f0f]"
        style={{ minHeight: "100vh" }}
      >
        {/* Background giant words — all start at opacity 0; GSAP drives them */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
          aria-hidden="true"
        >
          {BG_WORDS.map((word, i) => (
            <span
              key={i}
              className="stack-bg-word absolute font-black text-[#F5EFE8] leading-none whitespace-nowrap"
              data-index={i}
              style={{
                fontSize: "clamp(70px, 15vw, 185px)",
                letterSpacing: "-0.04em",
                opacity: 0,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Card stack */}
        <div
          className="relative z-10 flex items-center justify-center"
          style={{ minHeight: "100vh" }}
        >
          <div
            className="relative"
            style={{
              width:  "clamp(290px, 44vw, 400px)",
              height: "clamp(360px, 50vw, 480px)",
            }}
          >
            {/* DOM order: "07" first = back, "01" last = front */}
            {[...ITEMS].reverse().map((item, reversedDOMIndex) => {
              const originalItemIndex = ITEMS.length - 1 - reversedDOMIndex;
              return (
                <div
                  key={item.number}
                  className="stack-card absolute inset-0 rounded-[20px] md:rounded-[26px]"
                  style={{
                    background: "#DCE0EA",
                    boxShadow: "0 18px 55px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-10">
                    <div>
                      <p
                        className="font-mono text-black/35 tracking-[0.14em]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 13px)" }}
                      >
                        {item.number}
                      </p>
                      <h3
                        className="font-black text-black uppercase mt-4 md:mt-5"
                        style={{
                          fontSize:      "clamp(22px, 4vw, 40px)",
                          lineHeight:    1.02,
                          letterSpacing: "-0.02em",
                          whiteSpace:    "pre-line",
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="flex flex-col gap-[2px]">
                        {CARD_TAGS[originalItemIndex].map((tag) => (
                          <span
                            key={tag}
                            className="font-rethink font-medium text-black/50 leading-snug"
                            style={{ fontSize: "clamp(10px, 1.3vw, 13px)" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span
                        className="font-black text-black/[0.09] leading-none"
                        style={{ fontSize: "clamp(56px, 8.5vw, 84px)" }}
                      >
                        {item.number}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — Image block
      ══════════════════════════════════════════ */}
      <section className="bg-[#F5EFE8] overflow-hidden py-14 px-5 md:py-20 md:px-6">
        <div className="w-full md:max-w-[1100px] md:mx-auto">
          <div className="system-img-wrap relative rounded-[26px] overflow-hidden transform-gpu h-[260px] sm:h-[320px] md:h-[480px]">
            <div className="system-img w-full h-[120%] absolute -top-[10%]">
              <OptimizedImage
                src="/images/campus.webp"
                alt="campus"
                className="w-full h-full object-cover block"
                sizes="100vw"
                disableTransition
              />
            </div>
            <div className="absolute inset-0 bg-black/40" />
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundSize: "180px 180px",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-10">
              <p className="font-rethink system-desc text-center text-white text-[15px] sm:text-[17px] md:text-[22px] leading-relaxed max-w-[680px] font-light">
                These systems ensure that faculty remain professionally
                equipped, students receive guided mentorship, and institutional
                standards are maintained across all campuses.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default memo(SystemsThatSustainExcellence);