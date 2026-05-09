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
            {/* <span className="inline-block w-7 h-px bg-white/30" /> */}
            <span className="font-rethink text-[10px] tracking-[0.32em] uppercase text-white/45 font-sans">
              THE TRUST FRAMEWORK
            </span>
          </div>

          <div className="flex flex-wrap items-end gap-[clamp(16px,4vw,56px)] justify-between">
           <h2 className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-light leading-[1.12] max-w-[620px] m-0 tracking-[-0.01em]">
  A Structured Approach to Social Responsibility
</h2>
            <p className="font-rethink text-[14.5px] leading-[1.85] text-white/60 max-w-[360px] m-0 font-sans">
              The Trust operates through clearly defined focus areas, ensuring every initiative is part of a governed and accountable system.
            </p>
          </div>

          <div
            className="scan-line h-px"
            style={{ background: "linear-gradient(90deg, rgba(179,32,29,0.9) 0%, rgba(255,255,255,0.06) 100%)" }}
          />
        </div>

        {/* ── GRID ── */}
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))] border-t border-l border-b rounded-3xl border-white/[0.08] overflow-hidden">
          {data.map((item, i) => (
            <div
              key={i}
              className="border-r border-b border-white/[0.08] relative isolate"
              ref={(el) => (cellRefs.current[i] = el)}
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
                  after:bg-[linear-gradient(90deg,#B3201D_0%,transparent_75%)]
                  after:scale-x-0 after:origin-left
                  after:[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1)]
                  after:pointer-events-none after:z-[1]
                  hover:after:scale-x-100
                "
                onClick={() => handleCardClick(item.id, i)}
              >
                <div className="relative z-[2]">
                  <span className=" font-rethink block text-[10px] tracking-[0.22em] text-[#B3201D] font-sans mb-[14px] transition-[letter-spacing,color] duration-[400ms] ease-[ease]">
                    {item.label}
                  </span>
                  <h3 className="font-rethink text-[clamp(15px,1.8vw,18px)] font-normal m-0 mb-[10px] leading-[1.3] text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[clamp(12px,1.2vw,13px)] leading-[1.78] text-white/50 m-0 font-sans transition-colors duration-[350ms]">
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
          className=" font-display text-center text-[14.5px] text-white/[0.38] mt-[clamp(28px,4vw,52px)] tracking-[0.06em]"
        >
          Each initiative is planned with long-term sustainability, institutional oversight, and measurable outcomes.
        </p>

      </div>
    </section>
  );
}