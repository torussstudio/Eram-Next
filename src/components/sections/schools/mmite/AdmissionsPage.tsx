"use client";

import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const institutions = [
  {
    type: "CBSE School",
    name: "EASE",
    desc: "ERAM Academy for Sports & Excellence",
    path: "https://ease.edu.in/",
  },
  {
    type: "Higher Secondary",
    name: "MMHSS",
    desc: "Mariyumma Memorial Hr. Sec. School",
    path: "/mmhss",
  },
  {
    type: "High School",
    name: "MMPS",
    desc: "Mariyumma Memorial Public School",
    path: "/mmps",
  },
  {
    type: "LP School",
    name: "AMLP",
    desc: "Aided Mappila LP School",
    path: "/amlp",
  },
  {
    type: "Teacher Training",
    name: "MMITE",
    desc: "Mariyumma Memorial Institute of Teacher Ed.",
    path: "/mmite",
  },
  
];

export default function AdmissionsPage() {
  const router = useRouter()
  const containerRef = useRef(null);
  const pathname = usePathname();
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const q = gsap.utils.selector(containerRef);

      gsap.set(q(".anim-top-bar"), {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(q(".anim-hero-tag"), { opacity: 0, y: 12 });
      gsap.set(q(".anim-hero-title"), { opacity: 0, y: 24 });
      gsap.set(q(".anim-hero-desc"), { opacity: 0, y: 16 });
      gsap.set(q(".anim-hero-btn"), { opacity: 0, y: 12 });
      gsap.set(q(".anim-inst-label"), { opacity: 0 });
      gsap.set(q(".anim-inst-card"), { opacity: 0, y: 32 });

      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero
        .to(q(".anim-top-bar"), {
          scaleX: 1,
          duration: 0.9,
          ease: "expo.inOut",
        })
        .to(q(".anim-hero-tag"), { opacity: 1, y: 0, duration: 0.55 }, "-=0.25")
        .to(
          q(".anim-hero-title"),
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.15",
        )
        .to(q(".anim-hero-desc"), { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(
          q(".anim-hero-btn"),
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.35",
        );

      const instWrap = q(".anim-inst-wrap")[0];
      if (instWrap) {
        const inst = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: instWrap,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
        inst.to(q(".anim-inst-label"), { opacity: 1, duration: 0.5 }).to(
          q(".anim-inst-card"),
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: { each: 0.08, ease: "power1.inOut" },
          },
          "-=0.2",
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="font-rethink overflow-hidden">
      {/* TOP RED BORDER */}
      <div className="anim-top-bar h-[3px] bg-[#ae1431]" />

      {/* HERO */}
      <section className="bg-[#F5EFE8] px-10 py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
          {/* LEFT */}
          <div className="max-w-xl">
            <div className="anim-hero-tag flex items-center gap-3 mb-6">
              <span className="font-rethink text-[11px] tracking-widest uppercase text-[#ae1431] font-medium">
                Admissions
              </span>
            </div>

            <h1 className="font-display anim-hero-title text-[#1a1209] text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] mb-8">
              Begin Your Formation at MMITE.
            </h1>

            <p className="font-rethink anim-hero-desc text-[#3a3228] text-[14.5px] md:text-[15.5px] leading-relaxed max-w-sm">
              Applications are now open for the D.El.Ed programme — a two-year
              course for aspiring educators seeking structured academic
              formation, qualification-focused preparation, and professional
              mentorship. Eligibility: +2 Pass. Intake limited to 50 students
              per batch.
            </p>
          </div>

          {/* RIGHT — BUTTONS */}
          <div className="flex flex-col items-start pt-4 lg:pt-[60px] gap-3 lg:min-w-[320px]">
            <button
             onClick={()=>router.push("/contact")}
              ref={btn1Ref}
              className="group relative bg-[#ae1431] text-white px-[clamp(14px,1.8vw,20px)] py-[clamp(12px,1.5vw,15px)] text-[13px] tracking-[0.18em] rounded-[12px] uppercase flex items-center justify-center gap-3 overflow-hidden w-auto self-start md:self-auto hover:bg-black transition-all duration-300 cursor-pointer">
            
              <span className="font-rethink relative z-10">
               APPLY NOW [2026-27]
              </span>
                            <Play className="relative z-10 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />

            </button>

            <button
             onClick={()=>router.push("/contact")}
              ref={btn2Ref}
               className="group relative border rounded-[12px] border-black/35 text-[#111] px-[clamp(14px,1.8vw,20px)] py-[clamp(12px,1.5vw,15px)] text-[13px] tracking-[0.18em] uppercase flex items-center justify-center gap-3 overflow-hidden w-auto self-start md:self-auto hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            >
              <span className="font-rethink relative z-10 group-hover:text-white transition-colors duration-300">
                Book a Campus Visit
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* INSTITUTIONS */}
     <section className="anim-inst-wrap bg-[#F5EFE8] px-6 pt-2 pb-8">
        <div className="max-w-7xl mx-auto">
          <p className="anim-inst-label text-[12px] tracking-widest uppercase text-[#6b6256] mb-6">
            Explore All ERAM Institutions
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-1 rounded-2xl overflow-hidden">
            {institutions.map((inst, i) => {
              const isActive = pathname === inst.path;
              return isActive ? (
                <div key={i} className="anim-inst-card bg-[#ae1431] p-6">
                  <p className="text-[10px] tracking-widest uppercase text-white/50 mb-3">
                    {inst.type}
                  </p>
                  <p className="font-display text-white text-xl font-bold mb-1">
                    {inst.name}
                  </p>
                  <p className="text-sm text-white/65">{inst.desc}</p>
                </div>
              ) : (
                <Link
                  key={i}
                  href={inst.path}
                  target={inst.path.startsWith("http") ? "_blank" : undefined}
                  rel={
                    inst.path.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="anim-inst-card bg-white p-6 cursor-pointer group hover:bg-[#1a1209] transition-colors duration-200 block text-current no-underline"
                >
                  <p className="text-[10px] tracking-widest uppercase text-[#8a8278] group-hover:text-white/50 mb-3 transition-colors duration-200">
                    {inst.type}
                  </p>
                  <p className="font-display text-[#1a1209] group-hover:text-white text-xl  mb-1 transition-colors duration-200">
                    {inst.name}
                  </p>
                  <p className="text-xs font-rethink text-[#6b6256] group-hover:text-white/60 transition-colors duration-200">
                    {inst.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}