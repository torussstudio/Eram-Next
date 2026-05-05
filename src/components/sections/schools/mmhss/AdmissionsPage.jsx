import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const institutions = [
  { type: "LP School",         name: "AMLP",  desc: "Aided Mappila LP School",                      isActive: false },
  { type: "High School",       name: "MMPS",  desc: "Mariyumma Memorial Public School",              isActive: false },
  { type: "Higher Secondary",  name: "MMHSS", desc: "Mariyumma Memorial Hr. Sec. School",            isActive: true  },
  { type: "CBSE School",       name: "EASE",  desc: "ERAM Academy for Sports & Excellence",          isActive: false },
  { type: "Teacher Training",  name: "MMITE", desc: "Mariyumma Memorial Institute of Teacher Ed.",   isActive: false },
];

export default function AdmissionsPage() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // ─── Set initial states before any paint ───────────────────────────
      gsap.set(".anim-top-bar",    { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".anim-hero-tag",   { opacity: 0, y: 12 });
      gsap.set(".anim-hero-title", { opacity: 0, y: 24 });
      gsap.set(".anim-hero-desc",  { opacity: 0, y: 16 });
      gsap.set(".anim-hero-btn",   { opacity: 0, y: 12 });
      gsap.set(".anim-inst-label", { opacity: 0 });
      gsap.set(".anim-inst-card",  { opacity: 0, y: 32 });

      // ─── Hero sequence ─────────────────────────────────────────────────
      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });

      hero
        // 1. Red bar draws in
        .to(".anim-top-bar", {
          scaleX: 1,
          duration: 0.9,
          ease: "expo.inOut",
        })
        // 2. Tagline fades up — slightly overlaps bar finish
        .to(".anim-hero-tag", {
          opacity: 1, y: 0,
          duration: 0.55,
        }, "-=0.25")
        // 3. Title sweeps up — the headline deserves its own beat
        .to(".anim-hero-title", {
          opacity: 1, y: 0,
          duration: 0.7,
        }, "-=0.15")
        // 4. Body copy follows, softer
        .to(".anim-hero-desc", {
          opacity: 1, y: 0,
          duration: 0.6,
        }, "-=0.4")
        // 5. Buttons stagger in together
        .to(".anim-hero-btn", {
          opacity: 1, y: 0,
          duration: 0.5,
          stagger: 0.1,
        }, "-=0.35");

      // ─── Institutions — scroll-triggered ───────────────────────────────
      const inst = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: ".anim-inst-wrap",
          start: "top 80%",
          once: true,           // fires exactly once; avoids replaying on scroll-up
        },
      });

      inst
        .to(".anim-inst-label", {
          opacity: 1,
          duration: 0.5,
        })
        .to(".anim-inst-card", {
          opacity: 1, y: 0,
          duration: 0.65,
          stagger: { each: 0.08, ease: "power1.inOut" },
        }, "-=0.2");
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="font-sans overflow-hidden">

      {/* TOP RED BORDER */}
      <div className="anim-top-bar h-[3px] bg-[#8B1A14]" />

      {/* HERO */}
      <section className="bg-[#F5EFE8] px-10 py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">

          {/* LEFT */}
          <div className="max-w-xl">
            <div className="anim-hero-tag flex items-center gap-3 mb-6">
              <span className="text-[11px] tracking-widest uppercase text-[#8B1A14] font-medium">
                Admissions 2026–27
              </span>
            </div>

            <h1 className="anim-hero-title font-serif text-[#1a1209] text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] mb-8">
              Begin the Journey at MMHSS.
            </h1>

            <p className="anim-hero-desc text-[#3a3228] text-[14.5px] md:text-[15.5px] leading-relaxed max-w-sm">
              Admissions are now open for Higher Secondary streams — Biology
              Science, Computer Science, and Commerce. Join an institution with
              a proven record of academic excellence, structured discipline, and
              consistent results.
            </p>
          </div>

          {/* RIGHT — BUTTONS */}
          <div className="flex flex-col gap-3 pt-22 lg:min-w-[280px]">
            <button className="anim-hero-btn bg-[#8B1A14] text-white px-10 py-4 text-[13px] tracking-widest uppercase flex items-center justify-between gap-4 hover:bg-[#7a1410] transition-colors duration-200 cursor-pointer rounded-[10px]">
              Apply Now — 2026–27
              <ArrowRight size={15} />
            </button>
            <button className="anim-hero-btn border border-[#1a1209] text-[#1a1209] px-6 py-4 text-[13px] tracking-widest uppercase hover:bg-[#1a1209] hover:text-white transition-colors duration-200 cursor-pointer rounded-[10px] ">
              Book a Campus Visit
            </button>
          </div>

        </div>
      </section>

      {/* INSTITUTIONS */}
      <section className="anim-inst-wrap bg-[#F5EFE8] px-10 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="anim-inst-label text-[12px] tracking-widest uppercase text-[#6b6256] mb-6">
            Explore All ERAM Institutions
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-1  rounded-2xl overflow-hidden">
            {institutions.map((inst, i) =>
              inst.isActive ? (
                <div key={i} className="anim-inst-card bg-[#8B1A14] p-6">
                  <p className="text-[10px] tracking-widest uppercase text-white/50 mb-3">
                    {inst.type}
                  </p>
                  <p className="font-serif text-white text-xl font-bold mb-1">
                    {inst.name}
                  </p>
                  <p className="text-sm text-white/65">{inst.desc}</p>
                </div>
              ) : (
                <div
                  key={i}
                  className="anim-inst-card bg-white p-6 cursor-pointer group hover:bg-[#1a1209] transition-colors duration-200"
                >
                  <p className="text-[10px] tracking-widest uppercase text-[#8a8278] group-hover:text-white/50 mb-3 transition-colors duration-200">
                    {inst.type}
                  </p>
                  <p className="font-serif text-[#1a1209] group-hover:text-white text-xl font-bold mb-1 transition-colors duration-200">
                    {inst.name}
                  </p>
                  <p className="text-xs text-[#6b6256] group-hover:text-white/60 transition-colors duration-200">
                    {inst.desc}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

    </div>
  );
}