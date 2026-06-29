"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    title: "AGRICULTURAL PROGRAMS",
    image: "/images/mmhssagriculture.avif",
  },
  {
    title: "ANTI-DRUG",
    image: "/images/mmhssantidrug.avif",
  },
  {
    title: "INDIPENDANCE DAY",
    image: "/images/mmhssindipendance.avif",
  },
  {
    title: "ONAM CELEBRATION",
    image: "/images/mmhssonam.avif",
  },
];

export default function GalleryPage() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const q = gsap.utils.selector(containerRef);

      const SMOOTH = "cubic-bezier(0.16, 1, 0.3, 1)"; // signature "2026" ease

      // ── Initial states ────────────────────────────────────────────────
      gsap.set(q(".anim-tag"), { opacity: 0, y: 14, filter: "blur(6px)" });
      gsap.set(q(".anim-desc"), { opacity: 0, y: 10, filter: "blur(6px)" });
      gsap.set(q(".anim-card"), { opacity: 0, y: 24, filter: "blur(8px)" });

      // ── Header ────────────────────────────────────────────────────────
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 82%",
        toggleActions: "play none none none",
        onEnter: () => {
          gsap
            .timeline({ defaults: { ease: SMOOTH } })
            .to(q(".anim-tag"), {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.7,
            })
            .to(
              q(".anim-desc"),
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.7,
              },
              "-=0.45",
            );
        },
      });

      // ── Cards ─────────────────────────────────────────────────────────
      const gridEl = q(".anim-grid")[0];
      if (gridEl) {
        ScrollTrigger.create({
          trigger: gridEl,
          start: "top 84%",
          toggleActions: "play none none none",
          onEnter: () => {
            gsap.to(q(".anim-card"), {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: SMOOTH,
              stagger: 0.1,
            });
          },
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="bg-[#1f1f1f] text-white overflow-hidden">
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-12">
            <div className="anim-tag flex items-center gap-3 mb-4">
              <span className="font-rethink text-xs tracking-widest text-gray-400 uppercase">
                Gallery
              </span>
            </div>
            <p className="anim-desc font-rethink text-gray-400 max-w-xl">
              Cultural programs, anti-drug, indipendance day, onam celebrations and campus
              life at MMHSS.
            </p>
          </div>

          {/* GRID */}
          <div className="anim-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 rounded-2xl overflow-hidden">
            {galleryItems.map((item, i) => {
              return (
                <div
                  key={i}
                  className="anim-card relative h-[260px] border border-white/10 bg-[#2a2a2a]
  overflow-hidden group"
                >
                  {/* IMAGE */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/20" />

                  {/* Gradient */}
                  <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Title */}
                  <div className="absolute bottom-5 left-5 z-10">
                    <h3 className="font-rethink text-sm tracking-[0.18em] text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
