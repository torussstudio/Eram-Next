"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    title: "PLANTING TREE",
    image: "/images/plantingtree.avif",
  },
  {
    title: "READING DAY BOOK DONATION",
    image: "/images/readingdaydonation.avif",
  },
  {
    title: "READING DAY",
    image: "/images/readingday.avif",
  },
  {
    title: "SPECIAL ASSEMBLE",
    image: "/images/specialassemble.avif",
  },
];

export default function GalleryPage() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const q = gsap.utils.selector(containerRef);

      // ── Initial states before first paint ────────────────────────────
      gsap.set(q(".anim-tag"), { opacity: 0, y: 12 });
      gsap.set(q(".anim-desc"), { opacity: 0, y: 10 });
      gsap.set(q(".anim-card"), { opacity: 0, y: 36 });

      // ── Header ────────────────────────────────────────────────────────
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 82%",
        toggleActions: "play none none none",
        onEnter: () => {
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .to(q(".anim-tag"), { opacity: 1, y: 0, duration: 0.45 })
            .to(q(".anim-desc"), { opacity: 1, y: 0, duration: 0.5 }, "-=0.15");
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
              duration: 0.6,
              stagger: 0.08,
              ease: "power3.out",
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
              Classroom activities, school events, cultural celebrations, and
              community programs at AMLP.
            </p>
          </div>

          {/* GRID */}
          <div className="anim-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 rounded-2xl overflow-hidden">
            {galleryItems.map((item, i) => {
              return (
                <div
                  key={i}
                  className="anim-card relative h-[260px] border border-white/10 overflow-hidden group"
                >
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/20" />

                  {/* Bottom Gradient */}
                  <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black via-black/60 to-transparent" />

                  {/* Title */}
                  <div className="absolute bottom-5 left-5 right-5 z-10">
                    <h3 className="font-rethink text-sm tracking-[0.18em] uppercase text-white">
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
