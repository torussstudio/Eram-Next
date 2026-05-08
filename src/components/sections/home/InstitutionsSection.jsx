import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarqueeText from "../../ui/Marquee";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const institutions = [
  { title: "EASE (CBSE)",    image: "/images/ease.webp",  path: "https://ease.edu.in/" },
  { title: "MMPS (HS)",      image: "/images/mmps.webp",   path: "mmps"                             },
  { title: "MMHSS (Hr. Sec)",image: "/images/mmhss.webp", path: "/mmhss"              },
  { title: "AMLP (LP)",      image: "/images/amlp.webp" , path:"/amlp"                               },
  { title: "MMITE (TTI)",    image: "/images/mmite.webp" , path:"/mmite"                              },
];

export default function InstitutionsSection() {
  const sectionRef = useRef(null);
  const navigate   = useNavigate();

  const handleClick = (path) => {
    if (!path) return;
    path.startsWith("http") ? window.open(path, "_blank") : navigate(path);
  };

  useGSAP(() => {
    const defaults = { ease: "power3.out" };

    // Heading block fades up
    gsap.fromTo(
      ".inst-heading",
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        stagger: 0.12,
        ...defaults,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      }
    );

    // Cards stagger in with a subtle lift
    gsap.fromTo(
      ".inst-card",
      { opacity: 0, y: 36, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.75,
        stagger: { amount: 0.45 },
        ...defaults,
        scrollTrigger: { trigger: ".inst-grid", start: "top 85%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="institutions"
      className="bg-[#f5efe8] pt-10 pb-28"
    >
      <div className="mx-auto max-w-[1180px] px-6 sm:px-4">
        <MarqueeText />

        {/* ── Heading ── */}
        <div className="mx-auto mt-10 max-w-[720px] text-center">
          <h2 className="inst-heading font-display text-[44px]  tracking-[-0.02em] text-[#111] md:text-[32px] sm:text-[26px]">
            The ERAM Learning Continuum
          </h2>

          <p className="inst-heading font-rethink mx-auto mt-4 text-[18px] leading-[1.7] text-[#444] sm:text-[15px]">
            An ecosystem designed to guide students from foundation to formation.{" "}
            <span className="text-[#111]">
              From foundational schooling to teacher training, each institution
              strengthens a different stage of the learner's journey.
            </span>
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="inst-grid mt-[70px] grid grid-cols-6 gap-9 sm:mt-12 sm:gap-5 max-[1100px]:grid-cols-4 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1">
          {institutions.map((item, i) => (
            <div
              key={i}
              className="
                inst-card group col-span-2
                rounded-[26px] border border-black/10 bg-white p-[18px]
                shadow-[0_2px_16px_rgba(0,0,0,0.04)]
                transition-shadow duration-300 hover:shadow-[0_6px_32px_rgba(0,0,0,0.10)]
                [&:nth-child(4)]:col-start-2
                [&:nth-child(5)]:col-start-4
                max-[1100px]:[&:nth-child(4)]:col-start-auto
                max-[1100px]:[&:nth-child(5)]:col-start-auto
                sm:rounded-[20px] sm:p-[14px]
              "
            >
              {/* Image */}
              <div className="h-[260px] overflow-hidden rounded-[18px] bg-[#f5efe8] sm:h-[200px] sm:rounded-[14px]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-[1.04]"
                />
              </div>

              {/* Title */}
              <h3 className="font-rethink mt-5 text-[20px] font-medium tracking-wide text-[#111] sm:mt-4 sm:text-[18px]">
                {item.title}
              </h3>

              {/* CTA */}
              <button
                onClick={() => handleClick(item.path)}
                disabled={!item.path}
                className="
                  font-rethink mt-3 inline-flex items-center gap-1
                  border-b-2 border-[#6d6d6d] pb-[3px]
                  text-[12px] uppercase tracking-[0.14em] text-[#6d6d6d]
                  transition-colors duration-200
                  hover:border-black hover:text-black
                  disabled:cursor-default disabled:opacity-40
                "
              >
                View More
                <span className="translate-y-px transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}