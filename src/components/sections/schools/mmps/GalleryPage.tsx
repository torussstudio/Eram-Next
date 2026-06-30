"use client";

import { useRef } from "react";
import { Drama, PartyPopper, Droplet, HeartPulse } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import LatestSchoolGallery from "../LatestSchoolGallery";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { title: "INTER-SCHOOL SPORTS MEETS", icon: Drama },
  { title: "ANNUAL ATHELETIC EVENTS", icon: PartyPopper },
  { title: "SCHOOL CELEBRATION", icon: Droplet },
  { title: "SCOUT & GUIDE ACTIVITIES", icon: HeartPulse },
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
              Sports competitions, cultural events, school celebrations, and
              Scout & Guide activities at MMPS.
            </p>
          </div>

          {/* GRID */}
          <LatestSchoolGallery category="mmps" fallbackItems={galleryItems} />
        </div>
      </section>
    </div>
  );
}
