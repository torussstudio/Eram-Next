"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyeTextRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);
  const bgNumRef = useRef<HTMLSpanElement>(null);

  const router = useRouter()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (eyeTextRef.current) {
        gsap.fromTo(
          eyeTextRef.current,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: eyeTextRef.current, start: "top 88%" },
          },
        );
      }

      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".ls-word");
        if (words.length) {
          gsap.fromTo(
            words,
            { y: "115%", opacity: 0 },
            {
              y: "0%",
              opacity: 1,
              duration: 1.05,
              ease: "expo.out",
              stagger: 0.055,
              scrollTrigger: { trigger: headingRef.current, start: "top 84%" },
            },
          );
        }
      }

      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.1,
            scrollTrigger: { trigger: descRef.current, start: "top 86%" },
          },
        );
      }

      const btns = [btn1Ref.current, btn2Ref.current].filter(Boolean);
      if (btns.length) {
        gsap.fromTo(
          btns,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: "power4.out",
            stagger: 0.13,
            scrollTrigger: { trigger: btns[0], start: "top 90%" },
          },
        );
      }

      if (bgNumRef.current) {
        gsap.fromTo(
          bgNumRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const wrapWords = (text: string) =>
    text.split(" ").map((w, i) => (
      <span key={i} className="mr-[0.22em]">
        <span className="ls-word inline-block">{w}</span>
      </span>
    ));

  return (
    <section ref={sectionRef} className="bg-[#F5EFE8] py-16 relative">
      <div className="max-w-[1250px] mx-auto px-[clamp(16px,5vw,40px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(32px,5vw,60px)] items-start">
          <div>
            <div className="flex items-center gap-3 mb-[clamp(18px,3vw,26px)]">
              <span
                ref={eyeTextRef}
                className="font-rethink text-[12px] tracking-[0.3em] uppercase text-[#ae1431]"
              >
                BEGIN HERE
              </span>
            </div>

            <h2
              ref={headingRef}
              className="
                font-display
                leading-[1.08]
                text-[#111]
                m-0
                text-[50px]
                max-[900px]:text-[clamp(1rem,4.5vw,2.4rem)]
                max-[640px]:text-[clamp(1rem,6.5vw,1.8rem)]
              "
            >
              <span className="whitespace-nowrap">
                {wrapWords("A Legacy of Responsibility.")}
              </span>
              <span className="whitespace-nowrap">
                {wrapWords("A Future of Impact.")}
              </span>
            </h2>

            <p
              ref={descRef}
              className="font-rethink mt-[clamp(20px,3.5vw,36px)] text-[15px] leading-[1.9] text-black/60 max-w-[560px]"
            >
              ERAM Educational &amp; Welfare Trust continues to expand its
              impact through system-driven interventions, strengthening
              institutions, restoring access, and reinforcing community
              resilience across sectors.
              <br />
              Its initiatives are structured projects aligned with institutional
              oversight and long-term responsibility, reinforcing values of
              discipline, access, and structured growth.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end md:mt-[90px] mt-[10px]">
            <button
            onClick={() => router.push("/contact")}
              ref={btn1Ref}
            className="group relative bg-[#ae1431] text-white px-[clamp(14px,1.8vw,20px)] py-[clamp(12px,1.5vw,15px)] text-[11px] tracking-[0.18em] rounded-[12px] uppercase flex items-center justify-center gap-3 overflow-hidden w-auto self-start md:self-auto hover:bg-black transition-all duration-300 cursor-pointer">
              <span className="font-rethink relative z-10">
                Partner in Responsible Impact
              </span>
             <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
           onClick={() => {
                    router.push("/");

                    const scrollToInstitutions = (attempts = 0) => {
                      const section = document.getElementById("institutions");

                      if (section) {
                        const yOffset = -90;
                        const y =
                          section.getBoundingClientRect().top +
                          window.pageYOffset +
                          yOffset;

                        window.scrollTo({
                          top: y,
                          behavior: "smooth",
                        });
                      } else if (attempts < 30) {
                        setTimeout(
                          () => scrollToInstitutions(attempts + 1),
                          100,
                        );
                      }
                    };

                    setTimeout(() => scrollToInstitutions(), 300);
                  }}
              ref={btn2Ref}
               className="group relative border rounded-[12px] border-black/35 text-[#111] px-[clamp(14px,1.8vw,20px)] py-[clamp(12px,1.5vw,15px)] text-[11px] tracking-[0.18em] uppercase flex items-center justify-center gap-3 overflow-hidden w-auto self-start md:self-auto hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            >
              <span className="font-rethink relative z-10 group-hover:text-white transition-colors duration-300">
                Discover Our Academic Framework
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}