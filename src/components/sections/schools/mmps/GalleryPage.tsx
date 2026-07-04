// "use client";

// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "@/lib/gsap";
// import { useGSAP } from "@gsap/react";
// import api from "@/lib/api";

// gsap.registerPlugin(ScrollTrigger);

// // This page belongs to MMPS — only images uploaded under the
// // "mmps" school category (from the admin Gallery Manager) show here.
// const SCHOOL_CATEGORY = "mmps";

// interface GalleryItem {
//   _id: string;
//   title: string;
//   category: string;
//   type: string;
//   image: string;
//   publicId: string;
//   aspect: "portrait" | "landscape" | "square";
//   createdAt: string;
// }

// type TypeFilter = "all" | "general" | "sports" | "cultural" | "social" | "academic";

// export default function GalleryPage() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const gridRef = useRef<HTMLDivElement>(null);

//   const [items, setItems] = useState<GalleryItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [activeType, setActiveType] = useState<TypeFilter>("all");
//   const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     api
//       .get("/gallery", { params: { category: SCHOOL_CATEGORY } })
//       .then(({ data }) => setItems(data))
//       .catch((err) => console.error("Failed to fetch gallery images:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   // Close lightbox on Escape
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setLightboxItem(null);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   const types: { id: TypeFilter; label: string }[] = [
//     { id: "all", label: "All" },
//     { id: "general", label: "General" },
//     { id: "sports", label: "Sports" },
//     { id: "cultural", label: "Cultural" },
//     { id: "social", label: "Social" },
//     { id: "academic", label: "Academic" },
//   ];

//   const filteredItems =
//     activeType === "all" ? items : items.filter((i) => i.type === activeType);

//   useGSAP(
//     () => {
//       if (!containerRef.current) return;
//       const q = gsap.utils.selector(containerRef);

//       // ── Initial states before first paint ────────────────────────────
//       gsap.set(q(".anim-tag"), { opacity: 0, y: 12 });
//       gsap.set(q(".anim-desc"), { opacity: 0, y: 10 });

//       // ── Header ────────────────────────────────────────────────────────
//       ScrollTrigger.create({
//         trigger: containerRef.current,
//         start: "top 82%",
//         toggleActions: "play none none none",
//         onEnter: () => {
//           gsap
//             .timeline({ defaults: { ease: "power3.out" } })
//             .to(q(".anim-tag"), { opacity: 1, y: 0, duration: 0.45 })
//             .to(q(".anim-desc"), { opacity: 1, y: 0, duration: 0.5 }, "-=0.15");
//         },
//       });
//     },
//     { scope: containerRef }
//   );

//   // Animate grid cards in whenever the filtered list changes (and isn't loading)
//   useGSAP(
//     () => {
//       if (loading || !gridRef.current) return;
//       const cards = gridRef.current.querySelectorAll(".gallery-card");
//       gsap.set(cards, { opacity: 0, y: 20, filter: "blur(6px)" });
//       gsap.to(cards, {
//         opacity: 1,
//         y: 0,
//         filter: "blur(0px)",
//         duration: 0.6,
//         stagger: 0.06,
//         ease: "power3.out",
//       });
//     },
//     { scope: gridRef, dependencies: [loading, activeType, items.length] }
//   );

//   return (
//     <div ref={containerRef} className="bg-[#1f1f1f] text-white overflow-hidden">
//       <section className="py-16 px-6">
//         <div className="max-w-7xl mx-auto">
//           {/* HEADER */}
//           <div className="mb-12">
//             <div className="anim-tag flex items-center gap-3 mb-4">
//               <span className="font-rethink text-xs tracking-widest text-gray-400 uppercase">
//                 Gallery
//               </span>
//             </div>
//             <p className="anim-desc font-rethink text-gray-400 max-w-xl">
//               Sports competitions, cultural events, school celebrations, and
//               Scout & Guide activities at MMPS.
//             </p>
//           </div>

//           {/* TYPE FILTER PILLS */}
//           <div className="flex flex-wrap gap-2 mb-10">
//             {types.map((t) => (
//               <button
//                 key={t.id}
//                 onClick={() => setActiveType(t.id)}
//                 className={`font-rethink text-xs uppercase tracking-wide px-4 py-2 rounded-full border transition-colors cursor-pointer ${
//                   activeType === t.id
//                     ? "bg-[#ae1431] border-[#ae1431] text-white"
//                     : "border-white/20 text-gray-400 hover:border-white/50 hover:text-white"
//                 }`}
//               >
//                 {t.label}
//               </button>
//             ))}
//           </div>

//           {/* GRID */}
//           {loading ? (
//             <p className="font-rethink text-gray-400">Loading gallery…</p>
//           ) : filteredItems.length === 0 ? (
//             <p className="font-rethink text-gray-400">No images yet.</p>
//           ) : (
//             <div
//               ref={gridRef}
//               className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
//             >
//               {filteredItems.map((item) => (
//                 <button
//                   key={item._id}
//                   onClick={() => setLightboxItem(item)}
//                   className="gallery-card block w-full break-inside-avoid overflow-hidden rounded-lg group cursor-zoom-in"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
//                     loading="lazy"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* LIGHTBOX */}
//       {lightboxItem && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-6 py-10"
//           onClick={() => setLightboxItem(null)}
//         >
//           <button
//             onClick={() => setLightboxItem(null)}
//             className="absolute top-6 right-6 text-white/70 hover:text-white text-sm font-rethink uppercase tracking-wide cursor-pointer"
//             aria-label="Close"
//           >
//             Close ✕
//           </button>
//           <div
//             className="max-w-4xl max-h-full flex flex-col items-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img
//               src={lightboxItem.image}
//               alt={lightboxItem.title}
//               className="max-h-[80vh] w-auto rounded-lg object-contain"
//             />
//             <p className="mt-4 font-rethink text-sm text-gray-300 uppercase tracking-wide">
//               {lightboxItem.title}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import api from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

// This page belongs to MMPS — only images uploaded under the
// "mmps" school category (from the admin Gallery Manager) show here.
const SCHOOL_CATEGORY = "mmps";
const PREVIEW_LIMIT = 15;

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

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState<TypeFilter>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get("/gallery", { params: { category: SCHOOL_CATEGORY } })
      .then(({ data }) => {
        // Only the latest 15 uploads are shown on this preview page —
        // the full set (filtered to MMPS) lives on the main Gallery page.
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
        ease: "power3.out",
      });
    },
    { scope: gridRef, dependencies: [loading, activeType, items.length] }
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

          {/* TYPE FILTER PILLS */}
          <div className="flex flex-wrap gap-2 mb-10">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveType(t.id)}
                className={`font-rethink text-xs uppercase tracking-wide px-4 py-2 rounded-full border transition-colors cursor-pointer ${
                  activeType === t.id
                    ? "bg-[#ae1431] border-[#ae1431] text-white"
                    : "border-white/20 text-gray-400 hover:border-white/50 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
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
                  className="gallery-card block w-full break-inside-avoid overflow-hidden rounded-lg group cursor-zoom-in"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}

          {/* SHOW MORE — sends visitor to the main Gallery page,
              pre-filtered to MMPS, only if more than the preview exists. */}
          {!loading && totalCount > PREVIEW_LIMIT && (
            <div className="mt-12 flex justify-center">
              <Link
                href="/gallery?category=mmps"
                className="font-rethink text-xs uppercase tracking-widest px-6 py-2.5 rounded-full border border-white/25 text-gray-300 hover:border-[#ae1431] hover:text-white hover:bg-[#ae1431] transition-colors duration-200 cursor-pointer"
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