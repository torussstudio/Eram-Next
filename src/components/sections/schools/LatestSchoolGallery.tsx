"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import api from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  _id?: string;
  id?: string;
  title: string;
  image?: string;
  icon?: any;
}

interface LatestSchoolGalleryProps {
  category: string;
  fallbackItems: GalleryItem[];
}

export default function LatestSchoolGallery({ category, fallbackItems }: LatestSchoolGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    api.get(`/gallery/latest/${category}`)
      .then(({ data }) => {
        if (!active) return;
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        } else {
          setItems(fallbackItems);
        }
      })
      .catch((err) => {
        console.error(`Failed to fetch latest gallery for ${category}:`, err);
        if (active) setItems(fallbackItems);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [category, fallbackItems]);

  useGSAP(
    () => {
      if (!containerRef.current || loading) return;
      const q = gsap.utils.selector(containerRef);

      // Initial states
      gsap.set(q(".anim-card"), { opacity: 0, y: 36 });

      // Cards ScrollTrigger
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
    { scope: containerRef, dependencies: [items, loading] }
  );

  if (loading) {
    return (
      <div className="anim-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 rounded-2xl overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[260px] border border-white/10 bg-[#2a2a2a] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <div className="anim-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 rounded-2xl overflow-hidden">
        {items.slice(0, 4).map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item._id || item.id || i}
              className="anim-card relative h-[260px] border border-white/10 bg-[#2a2a2a]
                overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
              {item.image ? (
                <>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/20" />
                </>
              ) : Icon ? (
                <div className="absolute inset-0 flex items-center justify-center opacity-50">
                  <Icon size={36} className="text-white" />
                </div>
              ) : null}

              {/* Bottom Gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent" />

              {/* Title */}
              <div className="absolute bottom-5 left-5 right-5 z-10 font-rethink">
                <h3 className="text-sm tracking-[0.18em] uppercase text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
