"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://eram-backend-ejgy.onrender.com";

// ─── Types ───────────────────────────────────────────────────────────────────

type DownloadItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  institution?: string;
  fileType: string; // PDF, PNG, JPEG, DOC, DOCX, XLS, XLSX
  fileExtension: string; // ".pdf", ".png", etc — used to build the download filename
  href: string;
};

type RawDownload = {
  _id: string;
  title: string;
  description: string;
  category: "prospectus" | "forms" | "circulars" | "policies";
  institution: "general" | "ease" | "mmhss" | "mmite" | "mmps" | "amlp";
  fileType: string;
  fileExtension: string;
  fileUrl: string;
};

const CATEGORY_LABEL: Record<string, string> = {
  prospectus: "Prospectus",
  forms: "Forms",
  circulars: "Circulars",
  policies: "Policies",
};

const INSTITUTION_LABEL: Record<string, string> = {
  general: "General",
  ease: "EASE",
  mmhss: "MMHSS",
  mmite: "MMITE",
  mmps: "MMPS",
  amlp: "AMLP",
};

function mapDownload(d: RawDownload): DownloadItem {
  return {
    id: d._id,
    title: d.title,
    description: d.description,
    category: CATEGORY_LABEL[d.category] || d.category,
    institution:
      d.institution && d.institution !== "general"
        ? INSTITUTION_LABEL[d.institution]
        : undefined,
    fileType: d.fileType || "PDF",
    fileExtension: d.fileExtension || ".pdf",
    href: d.fileUrl,
  };
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconDownload({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// ─── File-type badge (mono, colour-coded ink, no illustration) ───────────────

const FILE_TYPE_STYLES: Record<string, string> = {
  PDF: "text-[#ae1431] border-[#ae1431]/35 bg-[#ae1431]/10",
  DOC: "text-[#5b7fb5] border-[#5b7fb5]/35 bg-[#5b7fb5]/10",
  DOCX: "text-[#5b7fb5] border-[#5b7fb5]/35 bg-[#5b7fb5]/10",
  XLS: "text-[#3f9a6e] border-[#3f9a6e]/35 bg-[#3f9a6e]/10",
  XLSX: "text-[#3f9a6e] border-[#3f9a6e]/35 bg-[#3f9a6e]/10",
  PNG: "text-[#b58a3f] border-[#b58a3f]/35 bg-[#b58a3f]/10",
  JPEG: "text-[#b58a3f] border-[#b58a3f]/35 bg-[#b58a3f]/10",
  JPG: "text-[#b58a3f] border-[#b58a3f]/35 bg-[#b58a3f]/10",
};

function FileTypeTag({ type }: { type: string }) {
  const styles = FILE_TYPE_STYLES[type.toUpperCase()] || FILE_TYPE_STYLES.PDF;
  return (
    <span
      className={`font-rethink text-[10px] tracking-[0.14em] px-1.5 py-[3px] border ${styles}`}
    >
      {type.toUpperCase()}
    </span>
  );
}

// ─── DownloadRow — ledger entry ───────────────────────────────────────────────

function DownloadRow({
  item,
  index,
}: {
  item: DownloadItem;
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!rowRef.current) return;
    gsap.fromTo(
      rowRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: (index % 8) * 0.045,
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      },
    );
  }, [item.id]);

  return (
    <div
      ref={rowRef}
      className="opacity-0 group relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[56px_1fr_auto_auto] items-center gap-4 md:gap-6 px-1 md:px-2 py-5 md:py-6 border-b border-[#1a1613]/10 transition-colors duration-300 hover:bg-white/50"
    >
      {/* index */}
      <span className="font-display hidden md:block text-[1.6rem] leading-none text-[#1a1613]/[0.16] group-hover:text-[#ae1431]/50 transition-colors duration-300 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* title / meta */}
      <div className="min-w-0 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-rethink text-[9px] tracking-[0.16em] uppercase text-[#1a1613]/30 md:hidden">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-[1.05rem] md:text-[1.2rem] leading-snug text-[#1a1613] transition-colors duration-200">
            {item.title}
          </h3>
        </div>
        <p className="font-rethink text-[13px] text-[#1a1613]/55 leading-relaxed max-w-[560px] line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <FileTypeTag type={item.fileType} />
          <span className="font-rethink text-[10px] tracking-[0.14em] uppercase text-[#1a1613]/40">
            {item.category}
          </span>
          {item.institution && (
            <>
              <span className="text-[#1a1613]/20">·</span>
              <span className="font-rethink text-[10px] tracking-[0.14em] uppercase text-[#ae1431]/80">
                {item.institution}
              </span>
            </>
          )}
        </div>
      </div>

      {/* stamp — appears on hover, desktop only */}
      <div className="hidden md:flex items-center justify-center w-16">
        <span
          className="font-rethink text-[8px] tracking-[0.14em] uppercase text-[#ae1431] border border-[#ae1431]/50 rounded-full w-14 h-14 flex items-center justify-center text-center leading-tight opacity-0 scale-75 -rotate-12 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-[-8deg] transition-all duration-300 ease-out"
        >
          verified
          <br />
          copy
        </span>
      </div>

      {/* action */}
      <a
        href={`${BACKEND_URL}/api/downloads/${item.id}/download`}
        download={`${item.title}${item.fileExtension}`}
        onClick={(e) => e.stopPropagation()}
        aria-label={`Download ${item.title}`}
        className="justify-self-end flex items-center gap-2 shrink-0 border border-[#1a1613]/20 group-hover:border-[#ae1431] group-hover:bg-[#ae1431] text-[#1a1613]/60 group-hover:text-white px-3.5 py-2.5 md:px-4 md:py-2.5 transition-all duration-300"
      >
        <IconDownload />
        <span className="font-rethink hidden sm:inline text-[11px] tracking-[0.1em] uppercase">
          Get
        </span>
      </a>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CATEGORIES = [
    "All",
    "Prospectus",
    "Forms",
    "Circulars",
    "Policies",
  ] as const;
  type Category = (typeof CATEGORIES)[number];

  const INSTITUTIONS = [
    "All Type",
    "General",
    "EASE",
    "MMHSS",
    "MMITE",
    "MMPS",
    "AMLP",
  ] as const;
  type Institution = (typeof INSTITUTIONS)[number];

  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeInstitution, setActiveInstitution] =
    useState<Institution>("All Type");
  const [query, setQuery] = useState("");

  const heroRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  // sliding tab indicator
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[activeCategory];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeCategory, downloads]);

  // ── Fetch downloads from backend (unchanged) ──
  useEffect(() => {
    const controller = new AbortController();

    async function fetchDownloads() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${BACKEND_URL}/api/downloads`, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch downloads");
        const data: RawDownload[] = await res.json();
        setDownloads(data.map(mapDownload));
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Could not load documents. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDownloads();
    return () => controller.abort();
  }, []);

  const matchesInstitution = (d: DownloadItem, inst: Institution) =>
    inst === "All Type" ||
    (inst === "General" ? !d.institution : d.institution === inst);

  const matchesQuery = (d: DownloadItem, q: string) =>
    q.trim() === "" ||
    d.title.toLowerCase().includes(q.trim().toLowerCase()) ||
    d.description.toLowerCase().includes(q.trim().toLowerCase());

  const filtered = downloads.filter(
    (d) =>
      (activeCategory === "All" || d.category === activeCategory) &&
      matchesInstitution(d, activeInstitution) &&
      matchesQuery(d, query),
  );

  // Hero entrance
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (eyebrowRef.current) {
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
      );
    }
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".word");
      tl.fromTo(
        words,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
        "-=0.3",
      );
    }
    if (subRef.current) {
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4",
      );
    }
    if (dividerRef.current) {
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.inOut",
          transformOrigin: "left center",
        },
        "-=0.4",
      );
    }
    if (filterRef.current) {
      tl.fromTo(
        filterRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.5",
      );
    }
  }, []);

  const countPerCategory = (cat: Category) =>
    downloads.filter(
      (d) =>
        (cat === "All" || d.category === cat) &&
        matchesInstitution(d, activeInstitution) &&
        matchesQuery(d, query),
    ).length;

  const countPerInstitution = (inst: Institution) =>
    downloads.filter(
      (d) =>
        (activeCategory === "All" || d.category === activeCategory) &&
        matchesInstitution(d, inst) &&
        matchesQuery(d, query),
    ).length;

  const headlineWords = ["Resources &", "Downloads"];

  return (
    <main className="min-h-[100dvh] bg-[#F5EFE8] text-[#1a1613] selection:bg-[#ae1431] selection:text-white">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-36 pb-10 px-5 md:px-12 lg:px-20 max-w-6xl mx-auto"
      >
        {/* faint registry ruling in the background */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[image:repeating-linear-gradient(to_bottom,transparent,transparent_39px,rgba(26,22,19,0.05)_40px)]" />

        <div
          ref={eyebrowRef}
          className="opacity-0 relative flex items-center gap-4 mb-8"
        >
          <span className="font-rethink text-[13px] tracking-[0.22em] uppercase text-[#1a1613]/50">
            Archive
          </span>
          <span className="h-px w-12 bg-[#ae1431]" />
          <span className="font-rethink text-[13px] tracking-[0.22em] uppercase text-[#1a1613]/50">
            ERAM Education Trust
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="relative font-display text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight text-[#1a1613] overflow-hidden"
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="word inline-block mr-4 opacity-0">
              {i === 1 ? (
                <em className="not-italic text-[#ae1431]">{word}</em>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>

        <p
          ref={subRef}
          className="opacity-0 relative font-rethink mt-6 text-base text-[#1a1613]/60 max-w-[520px] leading-relaxed"
        >
          Official documents, forms, prospectuses and policy circulars from
          ERAM Education and its institutions — indexed and current.
        </p>

        <div
          ref={dividerRef}
          className="scale-x-0 relative mt-12 h-px bg-[#1a1613]/10 origin-left"
        />
      </section>

      {/* ── Filter Bar ───────────────────────────────────────── */}
      <section className="sticky top-0 z-20 bg-[#F5EFE8]/90 backdrop-blur-md border-b border-[#1a1613]/10 px-5 md:px-12 lg:px-20">
        <div
          ref={filterRef}
          className="opacity-0 max-w-6xl mx-auto flex flex-col gap-4 py-4"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* category tabs with sliding indicator */}
            <div className="relative flex items-center gap-1 overflow-x-auto scrollbar-none">
              <div
                className="absolute bottom-0 h-[2px] bg-[#ae1431] transition-all duration-300 ease-out left-[var(--tab-left)] w-[var(--tab-width)]"
                style={
                  {
                    "--tab-left": `${indicator.left}px`,
                    "--tab-width": `${indicator.width}px`,
                  } as React.CSSProperties
                }
              />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  ref={(el) => {
                    tabRefs.current[cat] = el;
                  }}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-rethink relative flex cursor-pointer items-center gap-1.5 px-4 py-2.5 text-[11px] tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-200 ${
                    activeCategory === cat
                      ? "text-[#1a1613]"
                      : "text-[#1a1613]/40 hover:text-[#1a1613]/70"
                  }`}
                >
                  {cat}
                  <span
                    className={`font-rethink text-[9px] ${
                      activeCategory === cat
                        ? "text-[#ae1431]"
                        : "text-[#1a1613]/30"
                    }`}
                  >
                    {countPerCategory(cat)}
                  </span>
                </button>
              ))}
            </div>

            {/* search */}
            <div className="flex items-center gap-2 border border-[#1a1613]/15 focus-within:border-[#ae1431]/60 bg-white/40 px-3 py-2 min-w-0 lg:min-w-[220px] transition-colors duration-200">
              <IconSearch className="text-[#1a1613]/35 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documents"
                className="font-rethink bg-transparent text-[13px] text-[#1a1613]/80 placeholder:text-[#1a1613]/30 outline-none w-full"
              />
            </div>
          </div>

          {/* institution pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {INSTITUTIONS.map((inst) => (
              <button
                key={inst}
                onClick={() => setActiveInstitution(inst)}
                className={`font-rethink flex items-center gap-1.5 cursor-pointer whitespace-nowrap px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase border rounded-full transition-all duration-200 ${
                  activeInstitution === inst
                    ? "border-[#ae1431] bg-[#ae1431]/10 text-[#1a1613]"
                    : "border-[#1a1613]/12 text-[#1a1613]/45 hover:border-[#1a1613]/25 hover:text-[#1a1613]/75"
                }`}
              >
                {inst}
                <span className="text-[#1a1613]/35">
                  {countPerInstitution(inst)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ledger ───────────────────────────────────────────── */}
      <section className="px-5 md:px-12 lg:px-20 py-14 max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-4">
          <span className="font-rethink text-[10px] tracking-[0.18em] uppercase text-[#1a1613]/40">
            {activeCategory === "All" ? "All Resources" : activeCategory}
            {activeInstitution !== "All Type" ? ` · ${activeInstitution}` : ""}
          </span>
          {!loading && (
            <span className="font-rethink text-[10px] tracking-[0.18em] uppercase text-[#1a1613]/40">
              {filtered.length}{" "}
              {filtered.length === 1 ? "entry" : "entries"}
            </span>
          )}
        </div>

        {/* column header — desktop only */}
        {!loading && !error && filtered.length > 0 && (
          <div className="hidden md:grid grid-cols-[56px_1fr_auto_auto] gap-6 px-2 pb-3 border-b border-[#1a1613]/15">
            <span className="font-rethink text-[9px] tracking-[0.16em] uppercase text-[#1a1613]/35">
              No.
            </span>
            <span className="font-rethink text-[9px] tracking-[0.16em] uppercase text-[#1a1613]/35">
              Document
            </span>
            <span className="font-rethink text-[9px] tracking-[0.16em] uppercase text-[#1a1613]/35 w-16 text-center">
              Status
            </span>
            <span className="font-rethink text-[9px] tracking-[0.16em] uppercase text-[#1a1613]/35 justify-self-end">
              Action
            </span>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[56px_1fr_auto] md:grid-cols-[56px_1fr_auto_auto] gap-6 items-center py-6 border-b border-[#1a1613]/10 animate-pulse"
              >
                <div className="h-6 w-8 bg-[#1a1613]/[0.06]" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-1/3 bg-[#1a1613]/[0.08]" />
                  <div className="h-3 w-2/3 bg-[#1a1613]/[0.05]" />
                </div>
                <div className="hidden md:block h-14 w-14 rounded-full bg-[#1a1613]/[0.05]" />
                <div className="h-9 w-16 bg-[#1a1613]/[0.06] justify-self-end" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-3 border border-[#1a1613]/10 bg-white/40">
            <p className="font-rethink text-[11px] tracking-[0.16em] uppercase text-[#ae1431]">
              {error}
            </p>
          </div>
        )}

        {/* Rows */}
        {!loading && !error && (
          <div key={`${activeCategory}-${activeInstitution}-${query}`}>
            {filtered.map((item, i) => (
              <DownloadRow key={item.id} item={item} index={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-2 border border-[#1a1613]/10 bg-white/40">
            <p className="font-rethink text-[11px] tracking-[0.16em] uppercase text-[#1a1613]/60">
              No documents match this filter
            </p>
            <p className="font-rethink text-[13px] text-[#1a1613]/40">
              Try a different category, institution, or search term.
            </p>
          </div>
        )}
      </section>

      {/* ── Contact Strip ─────────────────────────────────────── */}
      <section className="border-t border-[#1a1613]/10 px-5 md:px-12 lg:px-20 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-rethink text-[10px] tracking-[0.18em] uppercase text-[#1a1613]/45 mb-2">
              Can't find what you need?
            </p>
            <p className="font-rethink text-[#1a1613]/65 max-w-md leading-relaxed">
              Contact the admissions office directly for institution-specific
              documents, custom certificates, or records requests.
            </p>
          </div>
          <a
            href="/contact"
            className="group flex items-center gap-3 border rounded-[12px] border-[#ae1431] bg-[#ae1431] hover:bg-black px-6 py-3.5 text-[12px] tracking-[0.18em] uppercase text-white  transition-all duration-300"
          >
            <span className="font-rethink">Contact Us</span>
            <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}