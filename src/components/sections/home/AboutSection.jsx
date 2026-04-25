import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    /* ── DESKTOP ≥ 1100px — original, untouched ─────────────────── */
    mm.add("(min-width: 1100px)", () => {
      gsap.fromTo(
        ".about-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".about-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-grid", start: "top 80%" },
        },
      );
    });

    /* ── MOBILE + TABLET < 1100px — new unique animations ───────── */
    mm.add("(max-width: 1099px)", () => {
      /* Label — skew-slide in */
      gsap.fromTo(
        ".mob-label",
        { skewX: -14, opacity: 0, x: -32 },
        {
          skewX: 0,
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        },
      );

      /* Heading — word-by-word clip reveal (each .mob-word) */
      gsap.fromTo(
        ".mob-word",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.75,
          stagger: 0.065,
          ease: "power4.out",
          scrollTrigger: { trigger: ".mob-heading-wrap", start: "top 85%" },
        },
      );

      /* Para — slide from right + fade */
      gsap.fromTo(
        ".mob-para",
        { opacity: 0, x: 44 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.25,
          scrollTrigger: { trigger: ".mob-para", start: "top 88%" },
        },
      );

      /* Quote — scale from 0.88 */
      gsap.fromTo(
        ".mob-quote",
        { scale: 0.88, opacity: 0, transformOrigin: "left center" },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: ".mob-quote", start: "top 88%" },
        },
      );

      /* Cards — 3D flip-in stagger */
      gsap.fromTo(
        ".mob-card",
        {
          rotateX: 55,
          opacity: 0,
          transformOrigin: "top center",
          transformPerspective: 900,
        },
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: { trigger: ".mob-cards-wrap", start: "top 88%" },
        },
      );
    });

    return () => mm.revert();
  });

  /* splits string into individually clipped word spans */
  const wordSpans = (text) =>
    text.split(" ").map((w, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden align-bottom mr-[0.28em]"
      >
        <span className="mob-word inline-block">{w}</span>
      </span>
    ));

  return (
    <section ref={sectionRef} id="about-us" className="bg-[#ae1431] py-[100px]">
      {/* ════════════════════════════════════════════════════════════
          DESKTOP ≥ 1100px — original layout, zero changes
      ════════════════════════════════════════════════════════════ */}
      <div className="hidden min-[1100px]:block mx-auto w-[min(1100px,calc(100vw-120px))]">
        <div className="grid grid-cols-[300px_1fr] gap-x-[100px]">
          <div className="about-text pl-[65px]">
            <span className="text-[18px] tracking-[0.15em] uppercase text-[#f5efe8] font-medium">
              ABOUT US
            </span>
          </div>

          <div className="pl-[300px] max-[1280px]:pl-[160px]">
            <h2 className="about-text font-display text-[48px] leading-[1.15] text-[#f5efe8] max-w-[600px]">
              An Institutional
              <br />
              Movement of Purpose
            </h2>
            <p className="about-text mt-[24px] text-[14.5px] leading-[1.75] text-[#f5efe8] max-w-[520px]">
              ERAM Education was established to build disciplined, value-based
              institutions that expand access to quality learning and reach
              communities that need it most. Founded under the CSR vision of the
              Eram Group of Companies, it upholds structured academic standards
              while serving communities with integrity.
            </p>
          </div>
        </div>

        <div className="about-grid mt-[80px]">
          <div className="grid grid-cols-3 gap-[24px]">
            <div className="about-card flex items-end min-h-[260px] pb-[115px] pl-[40px] max-[1280px]:pl-[60px]">
              <p className="font-display text-[32px] leading-[1.25] text-[#f5efe8]">
                Committed
                <br />
                to Access.
                <br />
                Dedicated to
                <br />
                Excellence
              </p>
            </div>
            <div className="about-card rounded-[20px] bg-[#d8d8d8] min-h-[300px]" />
            <div className="rounded-[20px] bg-[#d8d8d8] min-h-[300px]" />
          </div>
          <div className="grid grid-cols-3 gap-[24px] mt-[24px]">
            <div className="about-card rounded-[24px] bg-[#d8d8d8] min-h-[320px]" />
            <div className="about-card rounded-[24px] bg-[#d8d8d8] min-h-[320px]" />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          MOBILE + TABLET < 1100px — same text, new design + anims
      ════════════════════════════════════════════════════════════ */}
      <div className="min-[1100px]:hidden">
        <div className="px-[28px] max-[480px]:px-[20px]">
          {/* Label */}
          <div className="mob-label mb-[36px]">
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#f5efe8] font-medium">
              ABOUT US
            </span>
            <div className="mt-[6px] h-[1.5px] w-full bg-[#f5efe8]/40 rounded-full" />
          </div>

          {/* Heading — word-by-word reveal */}
          <div
            className="mob-heading-wrap font-display text-[42px] leading-[1.18] text-[#f5efe8] mb-[28px]
                          max-[480px]:text-[34px] max-[360px]:text-[28px]"
          >
            {wordSpans("An Institutional Movement of Purpose")}
          </div>

          {/* Para */}
          <p className="mob-para text-[14px] leading-[1.85] text-[#f5efe8]/75 max-w-[500px] mb-[44px]">
            ERAM Education was established to build disciplined, value-based
            institutions that expand access to quality learning and reach
            communities that need it most. Founded under the CSR vision of the
            Eram Group of Companies, it upholds structured academic standards
            while serving communities with integrity.
          </p>

          {/* Quote — original card text displayed as editorial pull-quote */}
          <div className="mob-quote mb-[52px] border-l-[3px] border-[#f5efe8]/50 pl-[22px]">
            <p
              className="font-display text-[26px] leading-[1.3] text-[#f5efe8]
                          max-[480px]:text-[22px]"
            >
              Committed
              <br />
              to Access.
              <br />
              Dedicated to
              <br />
              Excellence
            </p>
          </div>
        </div>

        {/* Cards — offset masonry grid */}
        <div
          className="mob-cards-wrap px-[28px] max-[480px]:px-[20px]
                        grid grid-cols-2 gap-[14px]
                        max-[560px]:grid-cols-1"
        >
          <div
            className="mob-card rounded-[22px] bg-[#d8d8d8]
                          min-h-[200px] max-[560px]:min-h-[180px]"
          />

          <div
            className="mob-card rounded-[22px] bg-[#d8d8d8]
                          min-h-[240px] max-[560px]:min-h-[180px]
                          mt-0 min-[561px]:mt-[-40px]"
          />

          <div
            className="mob-card rounded-[22px] bg-[#d8d8d8]
                          min-h-[200px] max-[560px]:min-h-[180px]
                          mt-0 min-[561px]:mt-[40px]"
          />

          <div
            className="mob-card rounded-[22px] bg-[#d8d8d8]
                          min-h-[200px] max-[560px]:min-h-[180px]"
          />
        </div>
      </div>
    </section>
  );
}
