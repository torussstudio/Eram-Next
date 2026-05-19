import { useRef } from "react";
import { Drama, PartyPopper, Droplet, HeartPulse } from "lucide-react";
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { title: "CLASSROMM ACTIVITIES",     icon: Drama       },
  { title: "SCHOOL CELEBRATIONS",   icon: PartyPopper },
  { title: "CULTURAL PROGRAMS",    icon: Droplet     },
  { title: "COMMUNITY EVENTS", icon: HeartPulse },
];

export default function GalleryPage() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // ── Initial states before first paint ────────────────────────────
      gsap.set(".anim-tag",     { opacity: 0, y: 12 });
      gsap.set(".anim-desc",    { opacity: 0, y: 10 });
      gsap.set(".anim-card",    { opacity: 0, y: 36 });

      // ── Header — tag then description ─────────────────────────────────
      const headerTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          once: true,
        },
      });

      headerTl
        .to(".anim-tag",  { opacity: 1, y: 0, duration: 0.45 })
        .to(".anim-desc", { opacity: 1, y: 0, duration: 0.5  }, "-=0.15");

      gsap.to(".anim-card", {
        scrollTrigger: {
          trigger: ".anim-grid",
          start: "top 84%",
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
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
            <p className="anim-desc text-gray-400 max-w-xl">
              Classroom activities, school events, cultural celebrations, and community programs at AMLP.
            </p>
          </div>

          {/* GRID */}
          <div className="anim-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 rounded-2xl overflow-hidden">
            {galleryItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="anim-card relative h-[260px] border border-white/10 bg-[#2a2a2a]
                    overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                >
                  {/* ICON */}
                  {/* <div className="absolute inset-0 flex items-center justify-center opacity-50">
                    <Icon size={36} />
                  </div> */}

                  {/* GRADIENT */}
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent" />

                  {/* TITLE */}
                  <div className="absolute bottom-4 left-4 text-sm tracking-wide text-gray-300">
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}