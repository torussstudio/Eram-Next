"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import api from "@/lib/api";
import { ChevronDown, Check } from "lucide-react";
import { useSearchParams } from 'next/navigation';


gsap.registerPlugin(ScrollTrigger);

const SCHOOL_CATEGORY = "mmhss";
const PREVIEW_LIMIT = 12;

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  type: string;
  image: string;
  publicId: string;
  aspect: "portrait" | "landscape" | "square";
  createdAt: string;
}

type TypeFilter = "all" | "general" | "sports" | "cultural" | "social" | "academic";

// ─── Dropdown (same component/style as Events page) ─────────────────────────

function Dropdown<T extends string>({
  value,
  onChange,
  options,
  align = "left",
}: {
  value: T;
  onChange: (val: T) => void;
  options: { id: T; label: string }[];
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.id === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useGSAP(
    () => {
      if (!panelRef.current) return;
      if (open) {
        gsap.set(panelRef.current, { display: "block" });
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, y: -6, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: "power2.out" },
        );
      } else {
        gsap.to(panelRef.current, {
          opacity: 0,
          y: -6,
          scale: 0.98,
          duration: 0.12,
          ease: "power2.in",
          onComplete: () => {
            if (panelRef.current) panelRef.current.style.display = "none";
          },
        });
      }
    },
    { dependencies: [open] },
  );

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-2 cursor-pointer rounded-full border px-5 py-2.5 md:px-5 md:py-2 text-sm md:text-sm font-rethink uppercase tracking-wide transition-colors duration-200 whitespace-nowrap ${
          open
            ? "border-[#ae1431] bg-[#ae1431] text-white"
            : "border-black/15 bg-white text-[#ae1431] hover:border-[#ae1431]/40"
        }`}
      >
        {selected.label}
        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        ref={panelRef}
        role="listbox"
        style={{ display: "none" }}
        className={`absolute top-[calc(100%+8px)] z-40 w-48 origin-top overflow-hidden rounded-xl border border-black/10 bg-white p-1.5 shadow-[0_20px_40px_-12px_rgba(17,5,8,0.25)] ${
          align === "right" ? "right-0" : "left-0"
        }`}
      >
        {options.map((opt) => {
          const isActive = opt.id === value;
          return (
            <button
              key={opt.id}
              type="button"
              role="option"
              aria-selected={isActive}
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-4 py-2.5 text-left text-sm md:text-base font-rethink uppercase tracking-wide transition-colors duration-150 ${
                isActive
                  ? "bg-[#ae1431] text-white"
                  : "text-neutral-700 hover:bg-[#ae1431]/8 hover:text-[#ae1431]"
              }`}
            >
              {opt.label}
              {isActive && <Check size={16} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState<TypeFilter>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  

   const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    api
      .get("/gallery", { params: { category: SCHOOL_CATEGORY } })
      .then(({ data }) => {
        // Only the latest 15 uploads are shown on this preview page —
        // the full set (filtered to MMHSS) lives on the main Gallery page.
        const sorted = [...data].sort(
          (a: GalleryItem, b: GalleryItem) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setTotalCount(sorted.length);
        setItems(sorted.slice(0, PREVIEW_LIMIT));
      })
      .catch((err) => console.error("Failed to fetch gallery images:", err))
      .finally(() => setLoading(false));
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxItem(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const types: { id: TypeFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "general", label: "General" },
    { id: "sports", label: "Sports" },
    { id: "cultural", label: "Cultural" },
    { id: "social", label: "Social" },
    { id: "academic", label: "Academic" },
  ];

  const filteredItems =
    activeType === "all" ? items : items.filter((i) => i.type === activeType);

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
              "-=0.45"
            );
        },
      });
    },
    { scope: containerRef }
  );

  // Animate grid cards in whenever the filtered list changes (and isn't loading)
  useGSAP(
    () => {
      if (loading || !gridRef.current) return;
      const cards = gridRef.current.querySelectorAll(".gallery-card");
      gsap.set(cards, { opacity: 0, y: 20, filter: "blur(6px)" });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.06,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
    },
    { scope: gridRef, dependencies: [loading, activeType, items.length] }
  );

  return (
    <div ref={containerRef} className="bg-[#F5EFE8] text-black">
      <section id="gallery" className="pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <div className="anim-hero-tag flex items-center gap-3 mb-6 justify-center sm:justify-start">
              <span className="font-rethink text-[12px] tracking-widest uppercase text-[#ae1431] ">
                Gallery
              </span>
            </div>

            <h1 className="font-display anim-hero-title text-[#1a1209] text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-[-0.02em] mb-8 text-center sm:text-left">
              <span className="sm:hidden">
                Moments and milestones that shape every learner and define the ERAM community.
              </span>
              <span className="hidden sm:inline">
                Moments and milestones that <br/>shape every learner and define <br/>the ERAM community.
              </span>
            </h1>

          </div>

          {/* TYPE FILTER — same dropdown component as Events page, on all screens */}
              <p className="font-rethink text-xs uppercase tracking-widest text-gray-400 mb-3">
  Explore our moments
</p>
          <div className="mb-10 flex items-center justify-between gap-3">
            <Dropdown
              value={activeType}
              onChange={setActiveType}
              align="left"
              options={types}
            />

            <span className="font-rethink text-[12px] tracking-[0.14em] uppercase text-black text-right">
              {filteredItems.length} RESULTS
            </span>
          </div>

          {/* GRID */}
          {loading ? (
            <p className="font-rethink text-gray-400">Loading gallery…</p>
          ) : filteredItems.length === 0 ? (
            <p className="font-rethink text-gray-400">No images yet.</p>
          ) : (
            <div
              ref={gridRef}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {filteredItems.map((item) => (
                <button
                  key={item._id}
                  onClick={() => setLightboxItem(item)}
                  className="gallery-card relative block w-full break-inside-avoid overflow-hidden rounded-lg group cursor-zoom-in"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* HOVER OVERLAY — category + title only, no school name */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4
                               bg-gradient-to-t from-black/70 via-black/10 to-transparent
                               opacity-0 group-hover:opacity-100
                               transition-opacity duration-300"
                  >
                    <span
                      className="self-start mb-2 font-rethink text-[10px] uppercase tracking-widest
                                 text-white bg-[#ae1431] px-2.5 py-1 rounded-full"
                    >
                      {item.type}
                    </span>
                    <p className="self-start font-rethink text-sm text-white uppercase tracking-wide">
                      {item.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!loading && totalCount > PREVIEW_LIMIT && (
            <div className="mt-12 flex justify-center">
             <Link
  href="/gallery?category=mmhss"
  scroll={true}
  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
  className="font-rethink text-xs uppercase tracking-widest px-6 py-2.5 rounded-full border border-white/25 text-gray-300 border-[#ae1431] text-white bg-[#ae1431] hover:bg-black hover:border-black transition-colors duration-200 cursor-pointer"
>
  Show More
</Link>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-6 py-10"
          onClick={() => setLightboxItem(null)}
        >
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-sm font-rethink uppercase tracking-wide cursor-pointer"
            aria-label="Close"
          >
            Close ✕
          </button>
          <div
            className="max-w-4xl max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxItem.image}
              alt={lightboxItem.title}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <p className="mt-4 font-rethink text-sm text-gray-300 uppercase tracking-wide">
              {lightboxItem.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}