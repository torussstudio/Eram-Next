import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LegacySection() {
  const sectionRef = useRef(null);
  const eyeLineRef = useRef(null);
  const eyeTextRef = useRef(null);
  const headingRef = useRef(null);
  const descRef    = useRef(null);
  const btn1Ref    = useRef(null);
  const btn2Ref    = useRef(null);
  const bgNumRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* 1. Eyebrow line scales in from left */
      gsap.fromTo(eyeLineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: eyeLineRef.current, start: "top 88%" } }
      );

      /* 2. Eyebrow text slides in */
      gsap.fromTo(eyeTextRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: eyeTextRef.current, start: "top 88%" } }
      );

      /* 3. Heading words clip up */
      const words = headingRef.current.querySelectorAll(".ls-word");
      gsap.fromTo(words,
        { y: "115%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.05, ease: "expo.out", stagger: 0.055,
          scrollTrigger: { trigger: headingRef.current, start: "top 84%" } }
      );

      /* 4. Description fade up */
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: descRef.current, start: "top 86%" } }
      );

      /* 5. Buttons slide in from right */
      gsap.fromTo([btn1Ref.current, btn2Ref.current],
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.85, ease: "power4.out", stagger: 0.13,
          scrollTrigger: { trigger: btn1Ref.current, start: "top 90%" } }
      );

      /* 6. BG symbol drifts up */
      gsap.fromTo(bgNumRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Per-word clip wrapper */
  const wrapWords = (text) =>
    text.split(" ").map((w, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.22em]">
        <span className="ls-word inline-block">{w}</span>
      </span>
    ));

  return (
    <section ref={sectionRef} className="bg-[#F5EFE8] py-[clamp(60px,10vw,120px)] overflow-hidden relative">
     <div className="max-w-[1250px] mx-auto px-[clamp(16px,5vw,40px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(32px,5vw,60px)] items-start">

          {/* ── LEFT ── */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-[clamp(18px,3vw,26px)]">
              {/* <span
                ref={eyeLineRef}
                className="w-[36px] h-[1px] bg-[#8B1E1E] shrink-0 block"
              /> */}
              <span
                ref={eyeTextRef}
                className="text-[10px] tracking-[0.3em] uppercase text-[#8B1E1E] font-sans"
              >
                BEGIN HERE
              </span>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="font-serif text-[clamp(2.2rem,4vw,4.2rem)] leading-[1.08] text-[#111] font-light m-0"
            >
              <span className="block overflow-hidden">
                {wrapWords("A Legacy of Responsibility.")}
              </span>
              <span className="block overflow-hidden">
                {wrapWords("A Future of Impact.")}
              </span>
            </h2>

            {/* Description */}
            <p
              ref={descRef}
              className="mt-[clamp(20px,3.5vw,36px)] text-[15px] leading-[1.9] text-black/60 max-w-[560px] font-sans"
            >
              ERAM Educational &amp; Welfare Trust continues to expand its impact
              through system-driven interventions — strengthening institutions,
              restoring access, and reinforcing community resilience across
              sectors. Its initiatives are structured projects aligned with
              institutional oversight and long-term responsibility.
            </p>
          </div>

          {/* ── RIGHT ── */}
         <div className="flex flex-col gap-4 md:items-end md:mt-[90px] mt-[10px]">

            {/* Primary button */}
            <button
              ref={btn1Ref}
              className="group relative bg-[#8B1E1E] text-white px-[clamp(20px,2.5vw,30px)] py-[clamp(12px,1.5vw,15px)] text-[11px] tracking-[0.18em] uppercase flex items-center gap-3 overflow-hidden w-full sm:w-auto cursor-pointer"
            >
              {/* wipe reveal */}
              <span className="absolute inset-0 bg-[#111] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="relative z-10">Partner in Responsible Impact</span>
              <span className="relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-[5px]">→</span>
            </button>

            {/* Secondary button */}
            <button
              ref={btn2Ref}
              className="group relative border border-black/35 text-[#111] px-[clamp(20px,2.5vw,30px)] py-[clamp(12px,1.5vw,15px)] text-[11px] tracking-[0.18em] uppercase flex items-center gap-3 overflow-hidden w-full sm:w-auto"
            >
              <span className="absolute inset-0 bg-[#111] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Discover Our Academic Framework</span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 transition-transform group-hover:translate-x-[5px] ease-[cubic-bezier(0.34,1.56,0.64,1)]">→</span>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}