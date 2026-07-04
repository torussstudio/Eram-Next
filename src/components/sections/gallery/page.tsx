"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import api from "@/lib/api";

type CategoryId = "general" | "mmhss" | "mmps" | "amlp" | "mmite" | "ease";
type TypeId = "general" | "sports" | "cultural" | "social" | "academic";

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: CategoryId;
  type: TypeId;
  aspect: "portrait" | "landscape" | "square";
}

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "general", label: "General" },
  { id: "mmhss", label: "MMHSS" },
  { id: "mmps", label: "MMPS" },
  { id: "amlp", label: "AMLP" },
  { id: "mmite", label: "MMITE" },
  { id: "ease", label: "EASE" },
];

const TYPES: { id: TypeId; label: string }[] = [
  { id: "general", label: "General" },
  { id: "sports", label: "Sports" },
  { id: "cultural", label: "Cultural" },
  { id: "social", label: "Social" },
  { id: "academic", label: "Academic" },
];

const PAGE_SIZE = 30;

const VALID_CATEGORY_IDS = CATEGORIES.map((c) => c.id) as string[];

export default function GalleryClient() {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState<CategoryId | "all">(
    () => {
      const fromUrl = searchParams.get("category");
      return fromUrl && VALID_CATEGORY_IDS.includes(fromUrl)
        ? (fromUrl as CategoryId)
        : "all";
    },
  );
  const [activeType, setActiveType] = useState<TypeId | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});

  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Fetch from backend whenever filters change — server-side filtering
  // since the dataset is expected to grow past 100+ images.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    const params = new URLSearchParams({
      category: activeCategory,
      type: activeType,
    });

    api
      .get(`/gallery?${params.toString()}`)
      .then(({ data }: { data: any[] }) => {
        if (cancelled) return;
        const mapped: GalleryItem[] = data.map((d) => ({
          id: d._id,
          image: d.image,
          title: d.title,
          category: d.category,
          type: d.type,
          aspect: d.aspect || "landscape",
        }));
        setFilteredItems(mapped);
        setVisibleCount(PAGE_SIZE); // reset pagination on every new filter fetch
      })
      .catch((err) => {
        console.error("Gallery fetch failed:", err);
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeCategory, activeType]);

  const displayedItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleShowMore = useCallback(() => {
    setVisibleCount((c) => Math.min(c + PAGE_SIZE, filteredItems.length));
  }, [filteredItems.length]);

  const lightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  // Hero entrance
  useGSAP(
    () => {
      if (!heroRef.current) return;
      const els = heroRef.current.querySelectorAll(".hero-reveal");
      gsap.set(els, { opacity: 0, y: 16 });
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.1,
      });
    },
    { scope: heroRef },
  );

  // Re-run entrance animation every time the visible set changes
  // (initial filter load AND each "Show More" click) — only animate
  // the newly appended cards, not the ones already on screen.
  const prevVisibleCountRef = useRef(0);
  useGSAP(
    () => {
      if (!gridRef.current || loading) return;
      const cards = gridRef.current.querySelectorAll(".gallery-card");
      const prevCount = prevVisibleCountRef.current;
      const newCards = Array.from(cards).slice(prevCount);
      const targets = newCards.length > 0 ? newCards : cards;

      gsap.set(targets, { opacity: 0, y: 32, scale: 0.97 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.04,
      });

      prevVisibleCountRef.current = displayedItems.length;
    },
    { scope: gridRef, dependencies: [displayedItems.length, loading] },
  );

  // Reset the "previous count" tracker whenever the underlying filtered
  // set changes (new search/filter), so the fresh batch animates fully.
  useEffect(() => {
    prevVisibleCountRef.current = 0;
  }, [activeCategory, activeType]);

  // Lightbox open transition
  useGSAP(
    () => {
      if (!lightboxItem || !lightboxRef.current) return;
      gsap.set(lightboxRef.current, { opacity: 0 });
      gsap.to(lightboxRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      const stage = lightboxRef.current.querySelector(".lightbox-stage");
      if (stage) {
        gsap.set(stage, { opacity: 0, scale: 0.96, y: 12 });
        gsap.to(stage, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          delay: 0.05,
        });
      }
    },
    { dependencies: [lightboxIndex !== null] },
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx === null) return idx;
      return (idx + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx === null) return idx;
      return (idx - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <main className="font-rethink min-h-screen bg-[#F5EFE8]">
      {/* Hero strip — unchanged */}
      <section
        ref={heroRef}
        className="relative overflow-hidden px-6 pt-24 pb-16 md:px-12 lg:px-20 lg:pt-28 lg:pb-24"
      >
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="hero-reveal text-xs md:text-sm font-display tracking-[0.25em] uppercase text-[#ae1431]">
              Moments &amp; Milestones
            </p>
            <h1 className="hero-reveal font-display mt-3 text-4xl leading-[1.02] text-[#ae1431] md:text-6xl lg:text-7xl">
              The ERAM Gallery
            </h1>
          </div>
          <p className="hero-reveal max-w-md leading-relaxed text-black font-rethink md:text-base lg:justify-self-end lg:text-right">
            A visual record of sport, culture, service, and scholarship across
            every institution in the ERAM ecosystem.
          </p>
        </div>
      </section>

      {/* Filters — unchanged */}
      <section className="sticky top-0 z-30  bg-[#F5EFE8] px-6 py-4 backdrop-blur-md md:px-12 lg:px-20">
        <div className="flex flex-col  gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap  gap-2">
            <FilterPill
              label="All Schools"
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            />
            {CATEGORIES.map((cat) => (
              <FilterPill
                key={cat.id}
                label={cat.label}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterPill
              label="All Types"
              variant="outline"
              active={activeType === "all"}
              onClick={() => setActiveType("all")}
            />
            {TYPES.map((type) => (
              <FilterPill
                key={type.id}
                label={type.label}
                variant="outline"
                active={activeType === type.id}
                onClick={() => setActiveType(type.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Results count */}
      <div className="flex items-center justify-between px-6 pt-8 pb-2 md:px-12 lg:px-20">
        <p className=" uppercase tracking-[0.2em] text-[12px] text-black font-rethink">
          {loading
            ? "Loading photographs…"
            : `Showing ${displayedItems.length} of ${filteredItems.length} ${
                filteredItems.length === 1 ? "photograph" : "photographs"
              }`}
        </p>
      </div>

      {/* Grid */}
      <section className="px-6 pb-24 md:px-12 lg:px-20">
        {error ? (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-black/15 py-24 text-center">
            <p className="font-display text-2xl text-[#ae1431]">
              Couldn&apos;t load the gallery
            </p>
            <p className="mt-2 max-w-sm text-neutral-600">
              Please refresh the page or try again shortly.
            </p>
          </div>
        ) : loading ? (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:_balance]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="mb-5 h-64 w-full animate-pulse rounded-md bg-black/5 break-inside-avoid"
              />
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <>
            <div
              ref={gridRef}
              className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:_balance]"
            >
              {displayedItems.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setLightboxIndex(i)}
                  className="gallery-card group relative mb-5 block w-full overflow-hidden rounded-md break-inside-avoid text-left ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_24px_48px_-20px_rgba(17,5,8,0.25)]"
                >
                  {!loadedMap[item.id] && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-black/5 via-black/[0.03] to-black/5" />
                  )}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onLoad={() =>
                      setLoadedMap((m) => ({ ...m, [item.id]: true }))
                    }
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#110508]/90 via-[#110508]/15 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <span className="mb-1 inline-block w-fit rounded-full bg-[#ae1431] px-2.5 py-0.5 text-[10px] font-rethink uppercase tracking-wider text-white">
                          {TYPES.find((t) => t.id === item.type)?.label}
                        </span>
                        <p className="font-display text-lg text-white">
                          {item.title}
                        </p>
                        <p className="text-xs uppercase tracking-wide text-white/70">
                          {CATEGORIES.find((c) => c.id === item.category)?.label}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="mb-1 shrink-0 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={handleShowMore}
                  className="cursor-pointer rounded-full border border-[#ae1431] bg-transparent px-8 py-2.5 text-xs uppercase tracking-[0.2em] text-[#ae1431] transition-all duration-200 hover:bg-[#ae1431] hover:text-white active:scale-[0.97] md:text-sm"
                >
                  Show More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[12px] border border-dashed border-black/15 py-24 text-center">
            <p className="font-display text-2xl text-[#ae1431]">
              No photographs here yet
            </p>
            <p className="mt-2 max-w-sm text-black">
              Try a different school or event type — new moments are added to
              the gallery regularly.
            </p>
          </div>
        )}
      </section>

      {/* Lightbox — unchanged */}
      {lightboxItem && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#110508]/95 px-4 py-10 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-5 top-5 text-white/70 transition-colors hover:text-white"
            aria-label="Close"
          >
            <X size={26} />
          </button>

          <p className="absolute left-5 top-5 text-xs uppercase tracking-[0.2em] text-white/50">
            {String((lightboxIndex ?? 0) + 1).padStart(2, "0")} /{" "}
            {String(filteredItems.length).padStart(2, "0")}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white md:left-6"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute  right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white md:right-6"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="lightbox-stage max-h-full w-full max-w-3xl"
          >
            <img
              src={lightboxItem.image}
              alt={lightboxItem.title}
              className="max-h-[70vh] w-full rounded-md object-contain"
            />
            <div className="mt-4 text-center">
              <p className="font-display text-xl text-white">
                {lightboxItem.title}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">
                {CATEGORIES.find((c) => c.id === lightboxItem.category)?.label}{" "}
                · {TYPES.find((t) => t.id === lightboxItem.type)?.label}
              </p>
            </div>

            <div className="mt-6 flex justify-center gap-2 overflow-x-auto pb-1">
              {filteredItems.map((item, i) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(i);
                  }}
                  className={`h-12 w-16 shrink-0 overflow-hidden cursor-pointer rounded-sm transition-all duration-200 ${
                    i === lightboxIndex
                      ? "ring-2 ring-[#ae1431] opacity-100"
                      : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function FilterPill({
  label,
  active,
  onClick,
  variant = "solid",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  variant?: "solid" | "outline";
}) {
  return (
    <button
      onClick={onClick}
      className={`relative cursor-pointer rounded-full border px-4 py-1.5 text-xs uppercase tracking-wide transition-all duration-200 active:scale-[0.97] md:text-sm ${
        active
          ? "border-[#ae1431] bg-[#ae1431] text-white shadow-[0_8px_20px_-8px_rgba(174,20,49,0.6)]"
          : variant === "outline"
          ? "border-white hover:border-black bg-white text-[#ae1431] hover:bg-black hover:text-white"
          : "border-white hover:border-black bg-white text-[#ae1431] hover:bg-black hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}