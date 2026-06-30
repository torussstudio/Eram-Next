"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import LatestSchoolGallery from "../LatestSchoolGallery";

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
          <LatestSchoolGallery category="mmhss" fallbackItems={galleryItems} />
        </div>
      </section>
    </div>
  );
}
