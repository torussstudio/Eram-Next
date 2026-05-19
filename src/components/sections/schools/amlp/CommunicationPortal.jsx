import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { num: "/01", title: "Fee Management",  desc: "Structured fee payment access for parents" },
  { num: "/02", title: "Attendance Updates",   desc: "Daily attendance communicated directly to parents" },
  { num: "/03", title: "Academic Resources",   desc: "Learning materials and progress shared digitally" },
  { num: "/04", title: "Campus Announcements",      desc: "All school notices in one unified interface" },
];

const feedItems = [
  { color: "bg-green-400",  text: "Grade 3 formative assessment results ready. Reports shared with parents.",              meta: "Academic · 2 minutes ago" },
  { color: "bg-yellow-400", text: "Attendance for today: Grade 1 – 100%, Grade 2 – 96%, Grade 3 – 98%.",          meta: "Attendance · 18 minutes ago" },
  { color: "bg-blue-400",   text: "Annual Day preparation — rehearsal schedule shared for all grades.",       meta: "Notice · 1 hour ago" },
  { color: "bg-yellow-400", text: "Fee payment reminder: Term 2 dues. Access portal for payment details.",             meta: "Admin· 3 hours ago" },
  { color: "bg-green-400",  text: "Cultural activity photos from last week's programme uploaded to gallery.",         meta: "gALLERY· Yesterday" },
];

export default function CommunicationPortal() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // ── Set all initial states before first paint ─────────────────────
      gsap.set(
        [
          ".anim-tag",
          ".anim-heading",
          ".anim-body",
          ".anim-grid-item",
          ".anim-btn",
          ".anim-feed-header",
          ".anim-feed-item",
        ],
        { opacity: 0, y: 20 }
      );

      const leftTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          once: true,
        },
      });

      leftTl
        .to(".anim-tag",     { opacity: 1, y: 0, duration: 0.45 })
        .to(".anim-heading", { opacity: 1, y: 0, duration: 0.6  }, "-=0.15")
        .to(".anim-body",    { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, "-=0.3")
        .to(".anim-grid-item", {
            opacity: 1, y: 0,
            duration: 0.5,
            stagger: { each: 0.08, grid: [2, 2], from: "start" },
          }, "-=0.2")
        .to(".anim-btn",     { opacity: 1, y: 0, duration: 0.45 }, "-=0.1");

      gsap.set([".anim-feed-header", ".anim-feed-item"], { x: 16 });

      const feedTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: ".anim-feed-wrap",
          start: "top 80%",
          once: true,
        },
      });

      feedTl
        .to(".anim-feed-header", { opacity: 1, x: 0, y: 0, duration: 0.45 })
        .to(".anim-feed-item", {
            opacity: 1, x: 0, y: 0,
            duration: 0.5,
            stagger: 0.07,        // fast enough to feel live, slow enough to read
          }, "-=0.15");
    },
    { scope: containerRef }
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
              Communication Portal
            </span>
          </div>

          <h1 className="font-display anim-heading text-4xl md:text-5xl leading-tight mb-6">
            Centralised Access <br/> for Parents.
          </h1>

          <p className="font-rethink anim-body text-white/80 max-w-xl mb-4 text-[15.5px] md:text-[14.5px]">
           Administrative communication and coordination extend through the 
           unified ERAM Student & Parent Portal. Parents can access fee 
           payment systems, academic resources, and campus-wide 
           announcements through a single, structured interface.
          </p>

        <p className="font-rethink anim-body text-white/80 max-w-xl mb-4 text-[14.5px] md:text-[15.5px]">
           The portal ensures structured communication across all ERAM 
           institutions — keeping every parent informed and every student supported.
          </p>

          {/* FEATURE GRID */}
          <div className="anim-grid-wrap grid grid-cols-2 gap-[2px] mb-10 rounded-2xl overflow-hidden">
            {features.map((f, i) => (
              <div
                key={i}
                className="anim-grid-item bg-[#7a1410] p-8 hover:bg-[#8f1712] transition-colors duration-200"
              >
                <span className="text-xs text-white/50">{f.num}</span>
                <h3 className="mt-3 font-serif font-bold text-white">{f.title}</h3>
                <p className="font-rethink text-sm text-white/70 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>

          <button className="font-rethink anim-btn bg-white text-[#ae1431] px-6 py-3 text-sm tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all duration-200 cursor-pointer rounded-[10px]">
            Access the Parent Portal
            <ArrowRight size={16} />
          </button>
        </div>

        {/* ── RIGHT — LIVE FEED ── */}
        <div className="anim-feed-wrap lg:mt-0 mt-8">
          <div className="anim-feed-header text-sm text-white/70 bg-[#5a0e0e] px-4 py-3 mb-[2px]">
            AMLP — Live Communication Feed
          </div>

          <div className="flex flex-col gap-[2px]">
            {feedItems.map((item, i) => (
              <div
                key={i}
                className="anim-feed-item bg-[#7a1410] py-4 px-3 flex gap-3
                  border-l-2 border-transparent hover:border-white/40
                  transition-colors duration-200 cursor-default rounded-[10px]"
              >
                <span className={`w-2 h-2 mt-[6px] rounded-full shrink-0 ${item.color}`} />
                <div>
                  <p className="font-rethink text-sm">{item.text}</p>
                  <span className=" font-rethink text-xs text-white/50 block mt-1">{item.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}