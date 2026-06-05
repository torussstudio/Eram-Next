"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    num: "/01",
    title: "Admission Enquiries",
    desc: "Streamlined admission process & eligibility guidance",
  },
  {
    num: "/02",
    title: "Academic Updates",
    desc: "Coursework notices & semester schedules",
  },
  {
    num: "/03",
    title: "Fee Management",
    desc: "Programme fee access & payment systems",
  },
  {
    num: "/04",
    title: "ERAM-Wide Access",
    desc: "Unified portal across all 5 ERAM institutions",
  },
];

const feedItems = [
  {
    color: "bg-green-400",
    text: "Semester 3 teaching practice schedule uploaded. All students to confirm placement schools.",
    meta: "Academic · 15 minutes ago",
  },
  {
    color: "bg-yellow-400",
    text: "2026–27 admissions now open. Eligibility: +2 Pass. Intake: 50 students.",
    meta: "Admissions · 1 hour ago",
  },
  {
    color: "bg-blue-400",
    text: "KTET preparation workshop — Session 4 begins this Saturday, 9 AM.",
    meta: "Qualification Prep · 2 hours ago",
  },
  {
    color: "bg-yellow-400",
    text: "Magazine submissions deadline extended to 30th June. All contributions welcome.",
    meta: "Editorial · 4 hours ago",
  },
  {
    color: "bg-green-400",
    text: "Residential camp dates confirmed — December 10–25. Travel arrangements to be shared shortly.",
    meta: "Programme · Yesterday",
  },
];

export default function CommunicationPortal() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const q = gsap.utils.selector(containerRef);

      // ── Set all initial states before first paint ─────────────────────
      gsap.set(
        q(
          ".anim-tag, .anim-heading, .anim-body, .anim-grid-item, .anim-btn, .anim-feed-header, .anim-feed-item"
        ),
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

      gsap.set(q(".anim-feed-header, .anim-feed-item"), { x: 16 });

      const feedWrap = q(".anim-feed-wrap")[0];
      if (feedWrap) {
        const feedTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: feedWrap,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        feedTl
          .to(q(".anim-feed-header"), { opacity: 1, x: 0, y: 0, duration: 0.45 })
          .to(
            q(".anim-feed-item"),
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.5,
              stagger: 0.07, // fast enough to feel live, slow enough to read
            },
            "-=0.15",
          );
      }
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#ae1431] text-white px-6 py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* ── LEFT ── */}
        <div>
          <div className="anim-tag flex items-center gap-3 mb-6">
            <span className="font-rethink text-xs tracking-widest uppercase text-white/70">
              Communication & Admission
            </span>
          </div>

          <h1 className="font-display anim-heading text-4xl md:text-5xl leading-tight mb-6">
            Structured Access.<br/>Clear Coordination.
          </h1>

          <p className="font-rethink anim-body text-white/80 max-w-xl mb-4 text-[15.5px] md:text-[14.5px]">
            Administrative coordination and admission enquiries 
            are streamlined through the ERAM Student & Parent Portal 
            and institutional communication channels — ensuring clarity
            in admissions, coursework, and academic updates at every stage.
          </p>

          <p className="font-rethink anim-body text-white/80 max-w-xl mb-4 text-[14.5px] md:text-[15.5px]">
           Prospective students and current enrollees access all 
           programme information, fee systems, and notices through 
           a single, unified interface.
          </p>

          {/* FEATURE GRID */}
          <div className="anim-grid-wrap grid grid-cols-2 gap-[2px] mb-10 rounded-2xl overflow-hidden">
            {features.map((f, i) => (
              <div
                key={i}
                className="anim-grid-item bg-[#7a1410] p-8 hover:bg-[#8f1712] transition-colors duration-200"
              >
                <span className="text-xs text-white/50">{f.num}</span>
                <h3 className="mt-3 font-display text-white">
                  {f.title}
                </h3>
                <p className="font-rethink text-sm text-white/70 mt-2">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <button className="font-rethink anim-btn bg-white text-[#ae1431] px-6 py-3 text-sm tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all duration-200 cursor-pointer rounded-[10px]">
            Access Student Portal
            <ArrowRight size={16} />
          </button>
        </div>

        {/* ── RIGHT — LIVE FEED ── */}
        <div className="anim-feed-wrap lg:mt-0 mt-8">
          <div className="anim-feed-header text-sm text-white/70 bg-[#5a0e0e] px-4 py-3 mb-[2px]">
           MMITE — Live Communication Feed
          </div>

          <div className="flex flex-col gap-[2px]">
            {feedItems.map((item, i) => (
              <div
                key={i}
                className="anim-feed-item bg-[#7a1410] py-4 px-3 flex gap-3
                  border-l-2 border-transparent hover:border-white/40
                  transition-colors duration-200 cursor-default rounded-[10px]"
              >
                <span
                  className={`w-2 h-2 mt-[6px] rounded-full shrink-0 ${item.color}`}
                />
                <div>
                  <p className="font-rethink text-sm">{item.text}</p>
                  <span className=" font-rethink text-xs text-white/50 block mt-1">
                    {item.meta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
