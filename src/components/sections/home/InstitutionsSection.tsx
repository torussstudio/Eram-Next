"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import { useGSAP } from "@gsap/react";
import MarqueeText from "../../ui/Marquee";
import { useRouter } from "next/navigation";


const institutions = [
  {
    title: "EASE (CBSE)",
    image: "/images/ease.avif",
    path: "https://ease.edu.in/",
  },
  { title: "MMHSS (Hr. Sec)", image: "/images/mmhss.avif", path: "/mmhss" },
  { title: "MMPS (HS)", image: "/images/mmps.webp", path: "mmps" },
  { title: "AMLP (LP)", image: "/images/amlp.avif", path: "/amlp" },
  { title: "MMITE (D. El. Ed)", image: "/images/mmite.webp", path: "/mmite" },
];

export default function InstitutionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [shouldInit, setShouldInit] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldInit(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleClick = (path: string) => {
    if (!path) return;
    path.startsWith("http") ? window.open(path, "_blank") : router.push(path);
  };

  useGSAP(
    () => {
      if (!shouldInit) return;
      const mm = gsap.matchMedia();

      // ── Desktop only (768px+) ──────────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        const defaults = { ease: "power3.out" };

        gsap.fromTo(
          ".inst-heading",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ...defaults,
            scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
          },
        );

        gsap.fromTo(
          ".inst-card",
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: { amount: 0.45 },
            ...defaults,
            scrollTrigger: { trigger: ".inst-grid", start: "top 85%" },
          },
        );
      });

      // ── Mobile — no animations, elements fully visible ─────────────
      mm.add("(max-width: 767px)", () => {
        gsap.set(".inst-heading", { opacity: 1, y: 0 });
        gsap.set(".inst-card", { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [shouldInit] },
  );

  return (
    <section
      ref={sectionRef}
      id="institutions"
      className="content-visibility-auto bg-[#f5efe8] pt-10 pb-28"
    >
     <div className="mx-auto max-w-[1180px] px-6 sm:px-4 -mt-4 sm:mt-0">
  <MarqueeText />

        {/* ── Heading ── */}
        <div className="mx-auto mt-10 w-full max-w-[980px] px-[20px] text-center">
          <h2
            className="inst-heading font-display text-[44px] tracking-[-0.02em] text-[#111] 
    md:text-[32px] max-[640px]:text-[20px]"
          >
            The ERAM Learning Continuum
          </h2>
          <p
            className="inst-heading font-rethink
    mx-auto mt-4
    w-full max-w-[900px]
    px-[20px]
    text-center
    text-[22px] leading-[1.7]
    text-[#111]
    max-[640px]:max-w-full max-[640px]:px-0 max-[640px]:text-[13px] 
    max-[640px]:leading-[1.55] max-[640px]:mt-2 max-[640px]:text-center
  "
          >
            An ecosystem designed to guide students from foundation to
            formation.{" "}
            <span className="text-[#444]">
              From foundational schooling to teacher training, each institution
              strengthens a different stage of the learner's journey.
            </span>
          </p>
        </div>
        {/* ── Cards ── */}
        <div className="inst-grid mt-[78px] grid grid-cols-6 gap-9 sm:mt-12 sm:gap-5 max-[1100px]:grid-cols-4 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1 max-[500px]:mt-[30px]">
          {institutions.map((item, i) => (
            <div
              key={i}
              className="
        inst-card
        group
        relative
        col-span-2

        overflow-hidden

        rounded-[28px]
        border
        border-black/[0.06]

        bg-white

        p-[18px]

        shadow-[0_2px_18px_rgba(0,0,0,0.04)]

        transition-all
        duration-500
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[4px]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)]

        [&:nth-child(4)]:col-start-2
        [&:nth-child(5)]:col-start-4

        max-[1100px]:[&:nth-child(4)]:col-start-auto
        max-[1100px]:[&:nth-child(5)]:col-start-auto

        sm:rounded-[22px]
        sm:p-[14px]
      "
            >
              {/* subtle glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute top-[-80px] right-[-60px] h-[180px] w-[180px] rounded-full bg-[#ae1431]/[0.06] blur-[70px]" />
              </div>

              {/* image */}
              <div
                className="
          relative
          h-[260px]
          overflow-hidden
          rounded-[20px]

          bg-[#f5efe8]

          sm:h-[220px]
          sm:rounded-[16px]
        "
              >
                {/* overlay */}
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="
            h-full
            w-full
            object-cover

            transition-transform
            duration-[1200ms]
            ease-[cubic-bezier(.22,1,.36,1)]

            group-hover:scale-[1.06]
          "
                />
              </div>

              {/* content */}
              <div className="relative z-[2]">
                <h3
                  className="
            font-rethink

            mt-5

            text-[20px]
            
            tracking-[0.01em]
            text-[#111]

            sm:mt-4
            sm:text-[18px]
          "
                >
                  {item.title}
                </h3>

                {/* divider */}
                <div className="mt-3 h-px w-full bg-black/[0.06]" />

                {/* CTA */}
                <button
                  onClick={() => handleClick(item.path)}
                  disabled={!item.path}
                  className="
            font-rethink

            mt-4

            inline-flex
            items-center
            gap-[8px]

            rounded-[8px]

            border
            border-black/[0.08]

            bg-[#faf8f5]

            px-[14px]
            py-[10px]

            text-[11px]
            uppercase
            tracking-[0.16em]
            text-[#444]

            transition-all
            duration-300

            hover:border-[#ae1431]/20
            hover:bg-[#ae1431]
            hover:text-white

            disabled:cursor-default
            disabled:opacity-40

            cursor-pointer
          "
                >
                  <span>View More</span>
              
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
