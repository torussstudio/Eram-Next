import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ActionButton from "../../ui/ActionButton";
import { shell } from "../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef   = useRef(null);
  const containerRef = useRef(null);
  const descRef      = useRef(null);
  const buttonsRef   = useRef(null);

  useGSAP(
    () => {
      // ✅ GSAP owns all initial states — no Tailwind transform conflict
      gsap.set(".hero-line", { y: "110%" });
      gsap.set([descRef.current, buttonsRef.current], { opacity: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(".hero-line", {
        y: "0%",
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      })
        .to(
          descRef.current,
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.8",
        )
        .to(
          buttonsRef.current,
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.8",
        );

      gsap.to(containerRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`${shell}
        isolate relative block mt-[-20px]
        before:content-[''] before:absolute before:-top-[160px] before:bottom-0
        before:w-[100vw] before:left-1/2 before:-translate-x-1/2
        before:bg-[#ae1431] before:-z-10
        pb-[66px] pt-[43px]
        max-[920px]:pb-[56px] max-[640px]:pt-[24px]
      `}
      id="hero"
    >
<div
  ref={containerRef}
  className="
    relative min-h-[650px] rounded-[20px] overflow-hidden

    px-[60px] xl:px-[80px] 2xl:px-[110px]

    pb-[92px] pt-[220px]

    max-[920px]:px-[36px] max-[920px]:pt-[180px]
    max-[640px]:px-6 max-[640px]:pt-[150px]
    max-[420px]:px-4 max-[420px]:pt-[130px]
  "
>
       <video
  className="absolute inset-0 w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  poster="/videos/hero-thumb.jpg"
>
  <source src="/videos/mainhero.mp4" type="video/mp4" />
</video>

        <div className="absolute inset-0 bg-black/40" />

        {/* text container */}
        <div className="relative z-10 max-w-[1500px] pb-[100px] ml-[65px] max-[920px]:ml-[40px] max-[640px]:ml-0">

          {/* heading */}
          <h1
            className="
              font-display
              text-[clamp(4rem,5vw,5.6rem)]
              leading-[0.95] tracking-[-0.02em] text-white
              max-[640px]:text-[clamp(2.3rem,12vw,3.4rem)]
            "
          >
            <div className="overflow-hidden pb-1">
              {/* ✅ Removed translate-y-[110%] — GSAP sets this via gsap.set() */}
              <span className="hero-line block">
                An Institutional
              </span>
            </div>

            <div className="overflow-hidden pb-1">
              <span className="hero-line block">
                Movement of Purpose
              </span>
            </div>
          </h1>

          {/* ✅ Removed opacity-0 translate-y-4 — GSAP sets these */}
          <p
            ref={descRef}
            className="
              mt-[34px] max-w-[680px]
              text-[1rem] leading-[1.65] text-white
              max-[640px]:max-w-full
            "
          >
            ERAM Education was established to build disciplined, value-based
            institutions that expand access to quality learning and reach
            communities that need it most. Founded under the CSR vision of the
            Eram Group of Companies, it upholds structured academic standards
            while serving communities with integrity.
          </p>

          {/* ✅ Removed opacity-0 translate-y-4 — GSAP sets these */}
          <div
            ref={buttonsRef}
            className="mt-11 flex flex-wrap gap-[14px]"
          >
            <ActionButton className="!bg-[#8B1E1E] hover:!bg-black cursor-pointer">
              Explore Our Institutions
            </ActionButton>
            <ActionButton className="!bg-black !text-white hover:!bg-[#8B1E1E] cursor-pointer">
              Admissions Open 2026-27
            </ActionButton>
          </div>

        </div>
      </div>
    </section>
  );
}