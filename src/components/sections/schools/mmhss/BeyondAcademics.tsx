"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { shell } from "../../../../constants/homeStyles";
import Image from "next/image";
import api from "@/lib/api";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type School = "mmhss" | "mmps" | "amlp" | "mmite";

interface BenchmarkEntry {
  _id: string;
  tag?: string;
  title?: string;
  desc?: string;
}

interface ExcellenceEntry {
  _id: string;
  tag?: string;
  title?: string;
  sub?: string;
  desc?: string;
  image?: string;
}

interface StatEntry {
  _id: string;
  value?: string;
  unit?: string;
  label?: string;
}

interface BeyondAcademicsProps {
  school: School;
}

export default function BeyondAcademics({ school }: BeyondAcademicsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [benchmarks, setBenchmarks] = useState<BenchmarkEntry[]>([]);
  const [excellence, setExcellence] = useState<ExcellenceEntry[]>([]);
  const [stats, setStats] = useState<StatEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // ── Fetch data for this school ──────────────────────────────
  useEffect(() => {
    if (!school) {
      setIsLoading(false);
      setError("No school specified.");
      return;
    }

    let cancelled = false;

    async function fetchAll() {
      setIsLoading(true);
      setError("");
      try {
        const [benchRes, excelRes, statRes] = await Promise.all([
          api.get<BenchmarkEntry[]>("/academics", {
            params: { school, section: "benchmark" },
          }),
          api.get<ExcellenceEntry[]>("/academics", {
            params: { school, section: "excellence" },
          }),
          api.get<StatEntry[]>("/academics", {
            params: { school, section: "stat" },
          }),
        ]);

        if (cancelled) return;
        setBenchmarks(benchRes.data);
        setExcellence(excelRes.data);
        setStats(statRes.data);
      } catch (err) {
        if (!cancelled) setError("Could not load this section right now.");
        console.error(err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, [school]);

  // ── GSAP animations — re-run once data has arrived ──────────
  useGSAP(
    () => {
      if (!containerRef.current || isLoading) return;
      const q = gsap.utils.selector(containerRef);

      gsap.set(
        q(
          ".anim-header, .anim-bench-label, .anim-bench, .anim-excel-label, .anim-excel, .anim-stat-label, .anim-stat",
        ),
        { opacity: 0, y: 28 },
      );

      const headerWrap = q(".anim-header-wrap")[0];
      if (headerWrap) {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: headerWrap,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          })
          .to(q(".anim-header"), {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.14,
          });
      }

      function revealScopedSection(
        triggerClass: string,
        labelClass: string,
        cardsClass: string,
      ) {
        const triggerEl = q(triggerClass)[0];
        if (!triggerEl) return;

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: triggerEl,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });

        const labelEls = q(labelClass);
        const cardsEls = q(cardsClass);

        if (labelEls.length > 0) {
          tl.to(labelEls, { opacity: 1, y: 0, duration: 0.45 });
        }
        if (cardsEls.length > 0) {
          tl.to(
            cardsEls,
            { opacity: 1, y: 0, duration: 0.65, stagger: 0.09 },
            "-=0.15",
          );
        }
      }

      revealScopedSection(
        ".anim-bench-wrap",
        ".anim-bench-label",
        ".anim-bench",
      );
      revealScopedSection(
        ".anim-excel-wrap",
        ".anim-excel-label",
        ".anim-excel",
      );
      revealScopedSection(".anim-stat-wrap", ".anim-stat-label", ".anim-stat");

      const statWrap = q(".anim-stat-wrap")[0];
      if (statWrap) {
        ScrollTrigger.create({
          trigger: statWrap,
          start: "top 82%",
          toggleActions: "play none none none",
          onEnter: () => {
            (q(".counter-num") as HTMLElement[]).forEach((el) => {
              const target = parseInt(el.getAttribute("data-target") ?? "", 10);
              if (isNaN(target)) return;
              gsap.to(el, {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                delay: 0.3,
              });
            });
          },
        });
      }
    },
    {
      scope: containerRef,
      dependencies: [isLoading, benchmarks, excellence, stats],
    },
  );

  if (isLoading) {
    return (
      <section className={`${shell} bg-[#F5EFE8]`}>
        <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-16 text-center">
          <p className="font-rethink text-[#8a7d6e] text-sm">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`${shell} bg-[#F5EFE8]`}>
        <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-16 text-center">
          <p className="font-rethink text-[#ae1431] text-sm">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="academics"
      ref={containerRef}
      className={`${shell}  bg-[#F5EFE8]`}
    >
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 pt-6 pb-10 md:pt-8 md:pb-12 lg:pt-10 lg:pb-14">
        {/* ── HEADER ───────────────────────────────────────────── */}
        <div className="anim-header-wrap grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-6 lg:mb-8">
          <div className="anim-header">
            <h2 className="font-display text-[#1a1209] leading-[1.05] tracking-[-0.02em] text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] xl:text-[46px]">
              Representation,
              <br />
              Recognition &amp; Exposure
            </h2>
          </div>

          <div className="anim-header flex items-end">
            <p className="font-rethink text-[14.5px] md:text-[15.5px] leading-[1.85] text-[#6b5f54] max-w-[520px]">
              Academic consistency is matched by active participation beyond the
              classroom , ensuring competitive exposure and character
              development remain central to the student experience.
            </p>
          </div>
        </div>

        {/* ── BENCHMARKS ─────────────────────────────────────── */}
        {benchmarks.length > 0 && (
          <div className="anim-bench-wrap mb-12">
            <p className="anim-bench-label font-display text-[11px] sm:text-[12px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
              Institutional Benchmarks
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {benchmarks.map((card) => (
                <div
                  key={card._id}
                  className="anim-bench group relative p-8 bg-white border border-[#d4cbbf]
                  border-t-4 border-t-[#d4cbbf] hover:border-t-[#ae1431]
                  transition-colors duration-300 rounded-2xl overflow-hidden"
                >
                  <span className="inline-block font-display rounded-[8px] bg-[#fdf6ef] text-[#ae1431] text-[9px] tracking-[0.22em] uppercase px-3 py-1 mb-6 ">
                    {card.tag}
                  </span>

                  <h3 className=" text-[#1a1209] text-[20px] sm:text-[22px] leading-snug tracking-[-0.01em] mb-3">
                    {card.title}
                  </h3>

                  <p className="text-[13px] font-rethink text-[#6b5f54] leading-[1.7] max-w-[480px]">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STUDENT EXCELLENCE ─────────────────────────────── */}
        {excellence.length > 0 && (
          <div className="anim-excel-wrap mb-12">
            <p className="anim-excel-label  font-display text-[11px] sm:text-[12px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
              Student Excellence
            </p>

            <div
              className={`grid gap-1 rounded-2xl overflow-hidden ${
                excellence.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-3"
              }`}
            >
              {excellence.map((card, i) => {
                const isRed = i === 0;
                const isDark = i === 1;

                const bg = isRed
                  ? "bg-[#ae1431]"
                  : isDark
                    ? "bg-[#1a1a1a]"
                    : "bg-white  border  border-[#d4cbbf]";

                const badge = isRed
                  ? "bg-[#ae1431] border border-[#d4cbbf] rounded -[12px] text-white"
                  : isDark
                    ? "bg-[#2a2a2a] border border-[#d4cbbf]  rounded -[12px] text-[#a09488]"
                    : "bg-[#fdf6ef] border border-[#d4cbbf] rounded-[4px]  text-[#ae1431]";

                const titleC =
                  isRed || isDark ? "text-white" : "text-[#1a1209]";

                const subC = isRed
                  ? "text-white/50"
                  : isDark
                  ? "text-white/40"
                  : "text-[#8a7d6e]";

                const descC = isRed
                  ? "text-white/80"
                  : isDark
                  ? "text-white/70"
                  : "text-[#4a3f35]";

                return (
                  <div
                    key={card._id}
                    className={`anim-excel overflow-hidden flex flex-col ${bg}`}
                  >
                    <div className="p-7">
                      <span
                        className={`inline-block text-[12px] tracking-[0.2em] uppercase px-3 py-1 mb-6 ${badge}`}
                      >
                        {card.tag}
                      </span>

                      <div className="relative h-[460px] w-full rounded-2xl overflow-hidden">
                        {card.image && (
                          <Image
                            src={card.image}
                            alt={card.title || ""}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <br />
                      <h3
                        className={`text-[28px] font-display sm:text-[24px] leading-tight mb-1 ${titleC}`}
                      >
                        {card.title}
                      </h3>

                      <p className={`text-[15px] font-rethink mb-5 ${subC}`}>
                        {card.sub}
                      </p>

                      <p
                        className={`text-[17px] font-rethink leading-[1.65] ${descC}`}
                      >
                        {card.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STATS ──────────────────────────────────────────── */}
        {stats.length > 0 && (
          <div className="anim-stat-wrap">
            <p className="anim-stat-label font display text-[11px] sm:text-[12px] tracking-[0.28em] text-[#8a7d6e] uppercase mb-4">
              Civic Leadership &amp; NSS
            </p>

            <div className="mx-auto max-w-5xl">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {stats.map((stat) => (
      <div
        key={stat._id}
        className="anim-stat rounded-2xl bg-[#ae1431] px-8 py-10 text-center"
      >
        <div className="mb-4 flex items-baseline justify-center gap-1">
          <span
            data-target={stat.value}
            className="counter-num text-[56px] sm:text-[64px] leading-none tracking-[-0.02em] text-white"
          >
            0
          </span>

          <span className="font-display text-[40px] text-white/60">
            {stat.unit}
          </span>
        </div>

        <p className="font-rethink whitespace-pre-line text-[12px] leading-[1.65] text-white/55 sm:text-[13px]">
          {stat.label}
        </p>
      </div>
    ))}
  </div>
</div>
          </div>
        )}
      </div>
    </section>
  );
}
