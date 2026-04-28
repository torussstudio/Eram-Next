import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    id: "pillar-1",
    label: "/01",
    title: "Education",
    desc: "Structured institutions, special needs schools, and teacher training programs expanding access and excellence.",
  },
  {
    id: "pillar-2",
    label: "/02",
    title: "Health & Sanitation",
    desc: "Preventive medical camps, surgical access, dialysis support, and sustainable public sanitation solutions.",
  },
  {
    id: "pillar-3",
    label: "/03",
    title: "Humanitarian & Rehabilitation",
    desc: "Housing, repatriation support, rehabilitation aid, and targeted livelihood initiatives for vulnerable communities.",
  },
  {
    id: "pillar-4",
    label: "/04",
    title: "Youth & Sports",
    desc: "National athlete support, professional sports patronage, and the development of the ERAM Sports Arena.",
  },
  {
    id: "pillar-5",
    label: "/05",
    title: "Environment",
    desc: "Water conservation, river restoration, check dams, and over 180 wells serving rural Palakkad communities.",
  },
  {
    id: "pillar-6",
    label: "/06",
    title: "Community Infrastructure & Welfare",
    desc: "Ambulance sponsorship, sanitation infrastructure, and interreligious harmony programs.",
  },
];

export default function StructuredFramework({ setActive }) {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const noteRef    = useRef(null);
  const cellRefs   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const kids = Array.from(headerRef.current.children);
      gsap.set(kids, { y: 48, opacity: 0, filter: "blur(8px)" });
      gsap.to(kids, {
        y: 0, opacity: 1, filter: "blur(0px)",
        duration: 1.1, ease: "expo.out", stagger: 0.13,
        scrollTrigger: { trigger: headerRef.current, start: "top 82%" },
      });

      const scan = sectionRef.current.querySelector(".scan-line");
      if (scan) {
        gsap.fromTo(scan,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1.5, ease: "power3.inOut",
            scrollTrigger: { trigger: scan, start: "top 88%" } }
        );
      }

      gsap.set(cellRefs.current, { opacity: 0, y: 52 });
      gsap.to(cellRefs.current, {
        opacity: 1, y: 0,
        duration: 0.8, ease: "power4.out",
        stagger: { amount: 0.5 },
        clearProps: "all",
        scrollTrigger: { trigger: cellRefs.current[0], start: "top 85%" },
      });

      gsap.fromTo(noteRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: noteRef.current, start: "top 93%" } }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (id, index) => {
    if (setActive) setActive(index);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: "smooth",
      });
    }, 300);
  };

  return (
    <>
      {/* Tailwind cannot express pseudo-element & group-hover combos below without a tiny style block */}
      <style>{`
        .sf-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 25% 55%, rgba(179,32,29,0.13) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
          z-index: 0;
        }
        .sf-card:hover::before { opacity: 1; }
        .sf-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          height: 2px; width: 100%;
          background: linear-gradient(90deg, #B3201D 0%, transparent 75%);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
          z-index: 1;
        }
        .sf-card:hover::after { transform: scaleX(1); }
      `}</style>

      <section
        ref={sectionRef}
        className="bg-[#0f0f0f] text-white py-[clamp(60px,10vw,120px)] overflow-hidden"
      >
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,5vw,40px)]">

          {/* ── HEADER ── */}
          <div
            ref={headerRef}
            className="flex flex-col gap-[clamp(14px,2.5vw,24px)] mb-[clamp(48px,8vw,96px)]"
          >
            <div className="flex items-center gap-3">
              <span className="inline-block w-7 h-px bg-white/30" />
              <span className="text-[10px] tracking-[0.32em] uppercase text-white/45 font-sans">
                THE TRUST FRAMEWORK
              </span>
            </div>

            <div className="flex flex-wrap items-end gap-[clamp(16px,4vw,56px)] justify-between">
              <h2 className="font-serif text-[clamp(1.9rem,4.2vw,3.4rem)] font-light leading-[1.12] max-w-[540px] m-0 tracking-[-0.01em]">
                A Structured Approach<br />to Social Responsibility
              </h2>
              <p className="text-[clamp(13px,1.4vw,14px)] leading-[1.85] text-white/60 max-w-[360px] m-0 font-sans">
                The Trust operates through clearly defined focus areas, ensuring every initiative is part of a governed and accountable system.
              </p>
            </div>

            <div
              className="scan-line h-px"
              style={{ background: "linear-gradient(90deg, rgba(179,32,29,0.9) 0%, rgba(255,255,255,0.06) 100%)" }}
            />
          </div>

          {/* ── GRID ── */}
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))] border-t border-l border-b rounded-3xl border-white/[0.08] overflow-hidden  ">
            {data.map((item, i) => (
              <div
                key={i}
                className="border-r border-b border-white/[0.08] relative isolate"
                ref={(el) => (cellRefs.current[i] = el)}
              >
                <div
                  className="sf-card relative p-[clamp(24px,3.5vw,40px)] min-h-[clamp(190px,22vw,240px)] flex flex-col justify-between cursor-pointer overflow-hidden transition-colors duration-[350ms] ease-[ease] bg-transparent active:bg-[rgba(179,32,29,0.06)]"
                  onClick={() => handleCardClick(item.id, i)}
                >
                  <div className="relative z-[2]">
                    <span className="block text-[10px] tracking-[0.22em] text-[#B3201D] font-sans mb-[14px] transition-[letter-spacing,color] duration-[400ms,300ms] ease-[ease] group-hover:tracking-[0.32em] group-hover:text-[#E53935]">
                      {item.label}
                    </span>
                    <h3 className="font-serif text-[clamp(15px,1.8vw,18px)] font-normal m-0 mb-[10px] leading-[1.3] text-white transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[clamp(12px,1.2vw,13px)] leading-[1.78] text-white/50 m-0 font-sans transition-colors duration-[350ms]">
                      {item.desc}
                    </p>
                  </div>
                  <span className="c-arrow relative z-[2] text-white/25 text-[18px] mt-[clamp(14px,2.5vw,22px)] inline-block opacity-0 translate-x-[-4px] translate-y-[4px] scale-[0.8] transition-[transform,color,opacity] duration-[400ms,300ms,300ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    ↗
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── NOTE ── */}
          <p
            ref={noteRef}
            className="text-center text-[11px] text-white/[0.38] mt-[clamp(28px,4vw,52px)] tracking-[0.06em] font-sans"
          >
            Each initiative is planned with long-term sustainability, institutional oversight, and measurable outcomes.
          </p>

        </div>
      </section>
    </>
  );
}