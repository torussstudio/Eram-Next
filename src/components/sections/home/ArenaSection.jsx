import { useRef } from "react";
import ActionButton from "../../ui/ActionButton";
import { section, sectionBand, shell } from "../../../constants/homeStyles";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ArenaSection() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const gridRef = useRef(null);
  const leftColRef = useRef(null);
  const rightPanelRef = useRef(null);
  const eramTextRef = useRef(null);
  const arenaOutlineRef = useRef(null);

  useGSAP(
    () => {
      /* ── initial states ── */
      gsap.set(heroVideoRef.current, {
        scale: 1.22,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(gridRef.current, { opacity: 0, force3D: true });
      gsap.set(leftColRef.current, { x: -36, force3D: true });
      gsap.set(rightPanelRef.current, { x: 36, force3D: true });
      gsap.set(eramTextRef.current, { opacity: 0, y: 20, force3D: true });

      // SPORTS ARENA — cinematic initial state
      gsap.set(arenaOutlineRef.current, {
        opacity: 0,
        y: 110,
        letterSpacing: "0.32em",
        skewX: 6,
        force3D: true,
      });

      /* ── pinned scrub timeline ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
        },
        defaults: { ease: "none" },
      });

      // 0.00 – 0.55 : hero video zooms out
      tl.to(heroVideoRef.current, { scale: 1, duration: 0.55 }, 0);

      // 0.30 – 0.65 : hero fades out
      tl.to(heroRef.current, { opacity: 0, duration: 0.35 }, 0.3);

      // 0.35 – 0.70 : grid fades + slides in
      tl.to(gridRef.current, { opacity: 1, duration: 0.35 }, 0.35);
      tl.to(leftColRef.current, { x: 0, duration: 0.35 }, 0.35);
      tl.to(rightPanelRef.current, { x: 0, duration: 0.35 }, 0.35);

      // 0.60 – 0.78 : "THE ERAM" fades in
      tl.to(eramTextRef.current, { opacity: 1, y: 0, duration: 0.18 }, 0.6);

      // 0.68 – 1.00 : "SPORTS ARENA" — cinematic luxury entrance
      tl.to(
        arenaOutlineRef.current,
        {
          opacity: 1,
          y: 0,
          letterSpacing: "-0.045em",
          skewX: 0,
          duration: 0.32,
          ease: "power3.out",
        },
        0.68,
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="arena"
      className={`${section} ${sectionBand} bg-[#F5EFE8] -mb-[1px]`}
      style={{ transform: "translateZ(0)", height: "100vh" }}
    >
      {/*
        ─────────────────────────────────────────────────────
        WHITE CARD
        overflow-hidden is here → clips SPORTS ARENA text,
        so no empty space leaks below the card.
        SPORTS ARENA is absolute inside this div.
        ─────────────────────────────────────────────────────
      */}
      <div
        className={`
          ${shell}
          !max-w-[1580px]
          !w-[calc(100vw-64px)]
          max-[640px]:!w-[calc(100vw-24px)]
          bg-white
          rounded-[32px]
          max-[640px]:rounded-[22px]
          px-[110px]
          pt-[120px]
          pb-[80px]
          max-[900px]:px-[28px]
          max-[900px]:pt-[80px]
          max-[900px]:pb-[56px]
          max-[640px]:px-[18px]
          max-[640px]:pt-[56px]
          max-[640px]:pb-[36px]
          relative
          overflow-hidden
        `}
      >
        {/* ── HERO: full-card video, z-10 ── */}
        <div
          ref={heroRef}
          className="absolute inset-0 z-[10] overflow-hidden rounded-[32px] max-[640px]:rounded-[22px]"
          style={{ willChange: "opacity" }}
        >
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ willChange: "transform" }}
          >
            <source src="/videos/arena.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/*
          SPORTS ARENA — absolute INSIDE the white card.
          Card's overflow-hidden clips it cleanly.
          No empty space below card anymore.
        */}
        <div
          ref={arenaOutlineRef}
          className="
            absolute z-[20]
            left-[30px]
            bottom-[-55px]
            font-display
            text-[clamp(7.2rem,13.2vw,14rem)]
            font-[700]
            tracking-[-0.045em]
            leading-[0.88]
            text-transparent
            [-webkit-text-stroke:1.6px_black]
            pointer-events-none
            select-none
            whitespace-nowrap
            max-[1000px]:left-[10px]
            max-[1000px]:bottom-[-30px]
            max-[1000px]:text-[clamp(4.8rem,15vw,8.2rem)]
            max-[640px]:left-1/2
            max-[640px]:-translate-x-1/2
            max-[640px]:bottom-[-14px]
            max-[640px]:text-[clamp(2.2rem,14vw,3.6rem)]
            max-[640px]:[-webkit-text-stroke:1.1px_black]
          "
          style={{ willChange: "transform, opacity, letter-spacing" }}
        >
          SPORTS ARENA
        </div>

        {/* ── GRID CONTENT, z-20 ── */}
        <div
          ref={gridRef}
          className="
            relative z-[20]
            grid
            gap-[40px]
            [grid-template-columns:minmax(0,0.85fr)_minmax(0,1.15fr)]
            max-[1000px]:grid-cols-1
            max-[640px]:gap-[28px]
          "
          style={{ willChange: "opacity" }}
        >
          {/* LEFT */}
          <div
            ref={leftColRef}
            className="max-w-[460px]"
            style={{ willChange: "transform" }}
          >
            <h2
              className="
                font-display
                text-[34px]
                leading-[1.22]
                font-[700]
                tracking-[-0.02em]
                text-[#111]
                mb-[20px]
                max-[640px]:text-[28px]
              "
            >
              A Destination for
              <br />
              Sport & Performance
            </h2>

            <p
              className="
                text-[14.5px]
                leading-[1.75]
                text-[#222]
                mb-[34px]
                max-[640px]:text-[14px]
                max-[640px]:mb-[26px]
              "
            >
              The ERAM Sports Arena reflects the Trust's long-term commitment to
              athletics, performance, and community engagement. Designed to host
              institutional and external events, it marks a new chapter in
              sports integration.
            </p>

            <div className="flex gap-[14px] flex-wrap max-[640px]:gap-[10px]">
              <ActionButton>Explore The Arena</ActionButton>
              <ActionButton variant="secondary">
                Discover Our Infrastructure
              </ActionButton>
            </div>
          </div>

          {/* RIGHT */}
          <div
            ref={rightPanelRef}
            className="
              relative
              min-h-[520px]
              max-[1000px]:min-h-[300px]
              max-[640px]:min-h-[200px]
              overflow-hidden
              rounded-[24px]
            "
            style={{ willChange: "transform" }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/arena.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/25" />

            {/* THE ERAM */}
            <div
              ref={eramTextRef}
              className="
                absolute
                right-[20px]
                bottom-[10px]
                font-display
                text-[clamp(3.4rem,4.6vw,5.4rem)]
                font-[900]
                tracking-[-0.045em]
                text-white
                max-[640px]:left-1/2
                max-[640px]:-translate-x-1/2
                max-[640px]:right-auto
                max-[640px]:bottom-0
                max-[640px]:text-[clamp(2.1rem,11vw,2.6rem)]
                max-[640px]:text-center
                max-[640px]:whitespace-nowrap
              "
              style={{ willChange: "transform, opacity" }}
            >
              THE ERAM
            </div>
          </div>
        </div>
        {/* end grid */}
      </div>
      {/* end white card */}
    </section>
  );
}
