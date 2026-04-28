import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const labelLineRef = useRef(null);
  const headLine1Ref = useRef(null);
  const headLine2Ref = useRef(null);
  const descRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // 1. Label line draws in, then label fades up
      tl.to(labelLineRef.current, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          labelRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.3"
        )
        // 2. Heading lines rise up one by one
        .to(
          headLine1Ref.current,
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
          "-=0.1"
        )
        .to(
          headLine2Ref.current,
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
          "-=0.45"
        )
        // 3. Description slides in from left
        .to(
          descRef.current,
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        )
        // 4. Cards stagger up
        .to(
          cardRefs.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.12,
          },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      no: "/01",
      title: "Building Assets That Endure",
      desc: "Every intervention creates infrastructure, systems, or capabilities with lifespans beyond the immediate need — not one-time distributions.",
    },
    {
      no: "/02",
      title: "Strengthening Local Ecosystems",
      desc: "Initiatives are designed to integrate into and reinforce existing community systems rather than creating dependency on external support.",
    },
    {
      no: "/03",
      title: "Enabling Self-Sufficiency",
      desc: "The goal is always to create conditions where communities, families, and individuals can sustain themselves independently.",
    },
    {
      no: "/04",
      title: "Governance-Backed Continuity",
      desc: "Every long-term initiative is anchored in institutional oversight — ensuring accountability, measurability, and continuity across leadership transitions.",
    },
  ];

  return (
    <section ref={sectionRef} className="bg-[#ae1431] text-white py-[100px]">
      <div className="max-w-[1100px] mx-auto px-[40px]">
        {/* TOP LABEL */}
        <div
          ref={labelRef}
          className="flex items-center gap-3 mb-6"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <div
            ref={labelLineRef}
            className="w-[40px] h-[1px] bg-white/40"
            style={{ transformOrigin: "left", transform: "scaleX(0)" }}
          />
          <span className="text-[11px] tracking-[0.28em] uppercase text-white/60">
            OUR PHILOSOPHY
          </span>
        </div>

        {/* HEADING */}
        <h2 className="font-serif text-[clamp(2.8rem,4vw,4.5rem)] leading-[1.1] max-w-[600px]">
          <span
            ref={headLine1Ref}
            className="block"
            style={{ opacity: 0, transform: "translateY(60px)" }}
          >
            The Philosophy
          </span>
          <span
            ref={headLine2Ref}
            className="block"
            style={{ opacity: 0, transform: "translateY(60px)" }}
          >
            Of Sustainability
          </span>
        </h2>

        {/* DESCRIPTION */}
        <div
          ref={descRef}
          className="mt-10 max-w-[650px] border-l border-white/30 pl-6"
          style={{ opacity: 0, transform: "translateX(-20px)" }}
        >
          <p className="text-[15px] leading-[1.8] text-white/85">
            The Trust approaches community development through infrastructure,
            capacity-building, and systems-based execution. Rather than
            short-term distribution models, initiatives are designed to
            strengthen structural foundations — measured not only by immediate
            outcomes, but by the resilience created for future generations.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-16 grid md:grid-cols-4 rounded-3xl gap-0.5 overflow-hidden border border-white/10">
          {cards.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
             className="bg-[#f5efe8] p-[30px] min-h-[180px] flex flex-col justify-between border border-white/10 -ml-px -mt-px"
              style={{ opacity: 0, transform: "translateY(40px)" }}
            >
              <span className="text-[12px] text-black tracking-[0.1em]">
                {item.no}
              </span>
              <div>
                <h3 className="mt-3 font-serif text-black text-[18px]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13px] text-black leading-[1.7]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}