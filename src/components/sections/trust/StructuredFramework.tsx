"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { data } from "../../../constants/homeData";

gsap.registerPlugin(ScrollTrigger);

export default function StructuredFramework({
  setActive,
}: {
  setActive: (active: number | null) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✅ Guard: headerRef children null check
      if (headerRef.current) {
        const kids = Array.from(headerRef.current.children);
        if (kids.length) {
          gsap.set(kids, { y: 48, opacity: 0, filter: "blur(8px)" });
          gsap.to(kids, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.13,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 82%",
            },
          });
        }
      }

    
      const scan = sectionRef.current?.querySelector(".scan-line");
      if (scan) {
        gsap.fromTo(
          scan,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: { trigger: scan, start: "top 88%" },
          },
        );
      }

      const validCells = cellRefs.current.filter(Boolean);
      if (validCells.length) {
        gsap.set(validCells, { opacity: 0, y: 52 });
        gsap.to(validCells, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: { amount: 0.5 },
          clearProps: "all",
          scrollTrigger: {
            trigger: validCells[0], 
            start: "top 85%",
          },
        });
      }

      
      if (noteRef.current) {
        gsap.fromTo(
          noteRef.current,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: noteRef.current,
              start: "top 93%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (id: string, index: number) => {
  if (setActive) {
    setActive(index);
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const el = document.getElementById(id);

      if (!el) return;

      const offset = 90;

      const top =
        el.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  });
};

  return (
    <section
      ref={sectionRef}
       className="bg-[#0f0f0f] text-white py-16 overflow-hidden"
    >
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,5vw,40px)]">
        {/* ── HEADER ── */}
        <div
          ref={headerRef}
          className="flex flex-col gap-[clamp(14px,2.5vw,24px)] mb-[clamp(48px,8vw,96px)]"
        >
          <div className="flex items-center gap-3">
            <span className="font-rethink text-[10px] tracking-[0.32em] uppercase text-white/45">
              THE TRUST FRAMEWORK
            </span>
          </div>

          <div className="flex flex-wrap items-end gap-[clamp(16px,4vw,56px)] justify-between">
            <h2 className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-light leading-[1.12] max-w-[620px] m-0 tracking-[-0.01em]">
              A Structured Approach to Social Responsibility
            </h2>
            <p className="font-rethink text-[14.5px] leading-[1.85] text-white/60 max-w-[360px] m-0 ">
              The Trust operates through clearly defined focus areas, ensuring
              every initiative is part of a governed and accountable system.
            </p>
          </div>
        </div>

        {/* ── GRID ── */}
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))] border-t border-l border-b rounded-3xl border-white/[0.08] overflow-hidden">
          {data.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                cellRefs.current[i] = el;
              }}
              className="border-r border-b border-white/[0.08] relative isolate"
            >
              <div
                className="
                  relative p-[clamp(24px,3.5vw,40px)] min-h-[clamp(190px,22vw,240px)]
                  flex flex-col justify-between cursor-pointer overflow-hidden
                  transition-colors duration-[350ms] bg-transparent
                  active:bg-[rgba(179,32,29,0.06)]
                  before:content-[''] before:absolute before:inset-0
                  before:bg-[radial-gradient(ellipse_at_25%_55%,rgba(179,32,29,0.13)_0%,transparent_60%)]
                  before:opacity-0 before:[transition:opacity_0.45s_ease]
                  before:pointer-events-none before:z-0
                  hover:before:opacity-100
                  after:content-[''] after:absolute after:top-0 after:left-0
                  after:h-[2px] after:w-full
                  after:bg-[linear-gradient(90deg,#ae1431_0%,transparent_75%)]
                  after:scale-x-0 after:origin-left
                  after:[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1)]
                  after:pointer-events-none after:z-[1]
                  hover:after:scale-x-100
                "
                onClick={() => handleCardClick(item.id, i)}
              >
                <div className="relative z-[2]">
                  <span className="font-rethink block text-[10px] tracking-[0.22em] text-[#ae1431]  mb-[14px] transition-[letter-spacing,color] duration-[400ms] ease-[ease]">
                    {item.label}
                  </span>
                  <h3 className="font-display text-[clamp(15px,1.8vw,18px)]  m-0 mb-[10px] leading-[1.3] text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[clamp(12px,1.2vw,13px)] leading-[1.78] text-white/50 m-0 font-rethink transition-colors duration-[350ms]">
                    {item.desc}
                  </p>
                </div>
                <span className="relative z-[2] text-white/25 text-[18px] mt-[clamp(14px,2.5vw,22px)] inline-block opacity-0 translate-x-[-4px] translate-y-[4px] scale-[0.8] transition-[transform,color,opacity] duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                  ↗
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── NOTE ── */}
        <p
          ref={noteRef}
          className="font-rethink text-center text-[14.5px] text-white/[0.38] mt-[clamp(28px,4vw,52px)] tracking-[0.06em]"
        >
          Each initiative is planned with long-term sustainability,
          institutional oversight, and measurable outcomes.
        </p>
      </div>
    </section>
  );
}
