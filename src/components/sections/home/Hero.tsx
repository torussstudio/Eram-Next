"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);

  const sublineRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const buttonsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();
  const smoothScrollTo = useSmoothScroll();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const lines = [titleLine1Ref.current, titleLine2Ref.current];

      /* ───────────────── Desktop ───────────────── */
      mm.add("(min-width: 1280px)", () => {
        const tl = gsap.timeline({ delay: 0.1 });

        tl.fromTo(
          videoRef.current,
          {
            scale: 1.15,
          },
          {
            scale: 1.05,
            duration: 1.2,
            ease: "power3.out",
          },
        )
          .fromTo(
            lines,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.9",
          )
          .fromTo(
            sublineRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.45,
              ease: "power1.out",
            },
            "-=0.5",
          )
          .fromTo(
            descRef.current,
            {
              opacity: 0,
              y: 16,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.4",
          )
          .fromTo(
            buttonsRef.current,
            {
              opacity: 0,
              y: 16,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.55",
          );

        gsap.to(videoRef.current, {
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tl.kill();
        };
      });

      /* ───────────────── Tablet ───────────────── */
      mm.add("(min-width: 768px) and (max-width: 1279px)", () => {
        const tl = gsap.timeline({ delay: 0.08 });

        tl.fromTo(
          lines,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
          },
        )
          .fromTo(
            sublineRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.4,
              ease: "power1.out",
            },
            "-=0.35",
          )
          .fromTo(
            descRef.current,
            {
              opacity: 0,
              y: 12,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
            },
            "-=0.3",
          )
          .fromTo(
            buttonsRef.current,
            {
              opacity: 0,
              y: 12,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
            },
            "-=0.4",
          );

        return () => {
          tl.kill();
        };
      });

      /* ───────────────── Mobile ───────────────── */
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({ delay: 0.05 });

        tl.fromTo(
          lines,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power1.out",
          },
        )
          .fromTo(
            sublineRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.3,
              ease: "power1.out",
            },
            "-=0.15",
          )
          .fromTo(
            descRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.35,
              ease: "power1.out",
            },
            "-=0.12",
          )
          .fromTo(
            buttonsRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.35,
              ease: "power1.out",
            },
            "-=0.15",
          );

        return () => {
          tl.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="bg-[#F5EFE8] py-9 px-3 md:px-6"
    >
      <div
        className="
          relative overflow-hidden rounded-[28px]
          min-h-[560px] sm:min-h-[620px]
          md:min-h-[680px] lg:min-h-[760px]
        "
      >
        {/* ───────────────── Background Video ───────────────── */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/institute.webp"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src="/videos/mainhero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* ───────────────── Content ───────────────── */}
        <div
          className="
    relative z-10 flex min-h-[inherit] items-center
    justify-center xl:justify-start
    text-center xl:text-left

    px-6 py-24
    sm:px-10
    md:px-14
    lg:px-20
    xl:px-28
  "
        >
          <div className="max-w-[720px] text-white mx-auto xl:mx-30">
            {/* Heading */}
            <h1
              className="
                font-display
                leading-[0.95]
                tracking-[-0.04em]
                text-[clamp(3.2rem,5vw,5.2rem)]
              "
            >
              <span ref={titleLine1Ref} className="block">
                Building Foundations.
              </span>

              <span ref={titleLine2Ref} className="block">
                Shaping Futures.
              </span>
            </h1>

            {/* Subline */}
            <p
              ref={sublineRef}
              className="
                mt-6
                font-rethink
                text-[1rem]
                sm:text-[1.15rem]
                md:text-[1.3rem]
                text-white/95
              "
            >
              Holistic, disciplined, and inclusive education for every child.
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="
                mt-5
                max-w-[650px]
                font-rethink
                text-[0.95rem]
                leading-[1.8]
                text-white/85
                sm:text-[1rem]
                md:text-[1.05rem]
              "
            >
              A disciplined educational ecosystem nurturing academic excellence,
              character, and opportunity.
            </p>

            {/* Buttons */}
            <div
              ref={buttonsRef}
              className="
                mt-10
                flex flex-wrap gap-4
              "
            >
             <button
  onClick={() => smoothScrollTo("institutions")}
  className="
    font-rethink
    bg-[#ae1431]
    hover:bg-black
    text-white
    cursor-pointer
    px-8
    py-4
    rounded-[12px]
    text-lg
    md:text-lg
    transition-all
    duration-300
    shadow-lg
    font-semibold
    hover:shadow-xl
    hover:-translate-y-1
    uppercase
  "
>
  Explore Our Institutions
</button>
              <button
  onClick={() => router.push("/contact")}
  className="
    font-rethink
    cursor-pointer
    rounded-xl
    border
    border-white/70
    px-8
    py-4
    text-sm
    font-semibold
    uppercase
    tracking-[0.14em]
    text-white
    transition-all
    duration-300
    hover:border-white
    hover:bg-white
    hover:text-[#a80c2d]
    hover:-translate-y-1
    hover:shadow-xl
  "
>
  Admissions Open 2026–27
</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
