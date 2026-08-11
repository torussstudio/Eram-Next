"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://api.eram.edu.in";

const features = [
  {
    num: "/01",
    title: "Academic Monitoring",
    desc: "Real-time progress tracking across all subjects",
  },
  {
    num: "/02",
    title: "Attendance Updates",
    desc: "Daily attendance communicated directly to parents",
  },
  {
    num: "/03",
    title: "Grade-level Notices",
    desc: "Grade and activity-specific announcements & circulars",
  },
  {
    num: "/04",
    title: "Extended Access",
    desc: "Available across all 5 ERAM institutions",
  },
];

// ─── Types (mirrors EventsPage.tsx) ─────────────────────────────────────────

type RawEvent = {
  _id: string;
  title: string;
  description: string;
  category: "academic" | "sports" | "cultural" | "notice";
  type: "event" | "notification" | "circular";
  institution: "general" | "ease" | "mmhss" | "mmite" | "mmps" | "amlp";
  date: string;
  time?: string;
  tag?: string;
  isNew?: boolean;
  isPinned?: boolean;
  image?: string;
  createdAt?: string;
};

interface FeedItem {
  id: string;
  text: string;
  meta: string;
}

const CATEGORY_LABEL: Record<RawEvent["category"], string> = {
  academic: "Academic",
  sports: "Sports",
  cultural: "Cultural",
  notice: "Notice",
};

function timeAgo(dateStr?: string): string {
  if (!dateStr) return "";
  const then = new Date(dateStr).getTime();
  if (Number.isNaN(then)) return "";
  const diffMs = Date.now() - then;
  const mins = Math.floor(diffMs / 60000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function mapToFeedItem(e: RawEvent): FeedItem {
  return {
    id: e._id,
    text: e.title || e.description,
    meta: `${CATEGORY_LABEL[e.category] ?? "Update"} · ${timeAgo(
      e.createdAt || e.date,
    )}`,
  };
}

export default function CommunicationPortal() {
  const containerRef = useRef(null);
  const router = useRouter();

  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(true);

  // ── Fetch live MMPS feed from backend ───────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();

    async function fetchFeed() {
      try {
        setLoadingFeed(true);
        const res = await fetch(`${BACKEND_URL}/api/events`, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch events");
        const data: RawEvent[] = await res.json();

        const relevant = data
          .filter((e) => e.institution === "mmps")
          .sort(
            (a, b) =>
              new Date(b.createdAt || b.date).getTime() -
              new Date(a.createdAt || a.date).getTime(),
          )
          .slice(0, 5);

        setFeedItems(relevant.map(mapToFeedItem));
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setFeedItems([]);
        }
      } finally {
        setLoadingFeed(false);
      }
    }

    fetchFeed();
    return () => controller.abort();
  }, []);

  // ── Left side scroll-triggered intro animation (unchanged) ─────────────
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const q = gsap.utils.selector(containerRef);

      gsap.set(
        q(".anim-tag, .anim-heading, .anim-body, .anim-grid-item, .anim-btn"),
        { opacity: 0, y: 20 },
      );

      const leftTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      leftTl
        .to(q(".anim-tag"), { opacity: 1, y: 0, duration: 0.45 })
        .to(q(".anim-heading"), { opacity: 1, y: 0, duration: 0.6 }, "-=0.15")
        .to(
          q(".anim-body"),
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
          "-=0.3",
        )
        .to(
          q(".anim-grid-item"),
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: { each: 0.08, grid: [2, 2], from: "start" },
          },
          "-=0.2",
        )
        .to(q(".anim-btn"), { opacity: 1, y: 0, duration: 0.45 }, "-=0.1");
    },
    { scope: containerRef },
  );

  // ── Feed reveal — runs once real data has loaded (data arrives async,
  //    so it can't rely on a scroll trigger set at mount before items exist) ──
  useGSAP(
    () => {
      if (!containerRef.current || loadingFeed) return;
      const q = gsap.utils.selector(containerRef);

      const header = q(".anim-feed-header");
      const items = q(".anim-feed-item");
      if (!items.length) return;

      gsap.fromTo(
        header,
        { opacity: 0, x: 16 },
        { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" },
      );
      gsap.fromTo(
        items,
        { opacity: 0, x: 16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    },
    { scope: containerRef, dependencies: [loadingFeed, feedItems] },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#ae1431] text-white px-6 py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ── LEFT ── */}
          <div>
            <div className="anim-tag flex items-center gap-3 mb-6">
              <span className="font-rethink text-xs tracking-widest uppercase text-white/70">
                Communication Portal
              </span>
            </div>

            <h1 className="font-display anim-heading text-4xl md:text-5xl leading-tight mb-6">
              Structured Academic Coordination.
            </h1>

            <p className="font-rethink anim-body text-white/80 max-w-xl mb-4 text-[15.5px] md:text-[14.5px]">
              Academic coordination and administrative communication extend
              through the unified ERAM Student & Parent Portal. Students and
              parents access fee systems, academic resources, and campus-wide
              updates through a single, centralised interface.
            </p>

            <p className="font-rethink anim-body text-white/80 max-w-xl mb-4 text-[14.5px] md:text-[15.5px]">
              Designed to ensure clarity, accountability, and timely
              communication across the entire ERAM ecosystem.
            </p>
            <br></br>
            <button
            onClick={()=>router.push("/student-parent-portal")}
            className="font-rethink  anim-btn bg-[#ae1431] text-white border border-white px-6 py-3 text-sm tracking-widest uppercase flex items-center gap-2 hover:bg-white hover:text-[#ae1431] cursor-pointer rounded-[10px] mb-10">
              Access the Parent Portal
              <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* ── RIGHT — LIVE FEED ── */}
         <div className="anim-feed-wrap lg:mt-0 -mt-7 rounded-2xl overflow-hidden bg-[#7a1410] border border-white/10">
  <div className="anim-feed-header text-sm text-white/70 bg-[#5a0e0e] px-4 py-3">
    MMPS — Live Communication Feed
  </div>

  <div className="flex flex-col">
    {loadingFeed && (
      <div className="py-8 px-3">
        <p className="font-rethink text-sm text-white/50">
          Loading updates…
        </p>
      </div>
    )}

    {!loadingFeed && feedItems.length === 0 && (
      <div className="py-8 px-3">
        <p className="font-rethink text-sm text-white/50">
          No recent updates.
        </p>
      </div>
    )}

    {!loadingFeed &&
      feedItems.map((item) => (
        <div
          key={item.id}
          className="anim-feed-item py-4 px-3 flex gap-3
        border-l-2 border-transparent hover:border-white/40
        hover:bg-white/[0.03]
        transition-colors duration-200 cursor-default"
        >
          <div>
            <p className="font-rethink text-sm">{item.text}</p>
            <span className="font-rethink text-xs text-white/50 block mt-1">
              {item.meta}
            </span>
          </div>
        </div>
      ))}
  </div>
</div>
        </div>
        {/* FEATURE GRID */}
        <div className="anim-grid-wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] rounded-2xl overflow-hidden mt-12">
          {features.map((f, i) => (
            <div
              key={i}
              className="anim-grid-item bg-[#7a1410] p-8 min-h-[180px] hover:bg-[#8f1712] transition-colors duration-200"
            >
              <span className="text-xs text-white/50">{f.num}</span>

              <h3 className="mt-3 text-white font-medium">{f.title}</h3>

              <p className="font-rethink text-sm text-white/70 mt-2">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}