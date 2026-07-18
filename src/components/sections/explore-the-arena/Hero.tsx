"use client";

import { useRef } from "react";
import { Calendar, Play } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Splits text into per-letter spans wrapped in overflow-hidden containers,
// so a y-translate reveal has individual letters to animate against.
function AnimatedHeading({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top"
          style={{ paddingBottom: "0.06em" }}
        >
          <span className="hero-letter inline-block will-change-transform">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}

const GLANCE_STATS = [
  ["1,000", "Seating Capacity"],
  ["10,000", "sq. ft. Built-Up Area"],
  ["Open-Air", "Amphitheatre Design"],
  ["38", "High-Intensity LED Floodlights"],
];

const INFRA_STATS = [
  { value: "1,000", unit: "seats", desc: ["Open-air spectator", "capacity"] },
  {
    value: "10,000",
    unit: "sq.ft.",
    desc: ["Total built-up", "infrastructure area"],
  },
  { value: "47 × 22", unit: "m", desc: ["Primary multi-court", "playing surface"] },
  { value: "8", unit: "poles", desc: ["10m floodlight poles", "with 38 LED lights"] },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const infraGridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── 1. Hero load-in timeline ────────────────────────────────
      const letters = headingRef.current?.querySelectorAll(".hero-letter");
      const statRows = panelRef.current?.querySelectorAll(".glance-row");
      const buttons = buttonsRef.current?.querySelectorAll("button");

      gsap.set(imageRef.current, { scale: 1.12 });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(labelRef.current, { opacity: 0, y: 12 });
      gsap.set(descRef.current, { opacity: 0, y: 16 });
      gsap.set(panelRef.current, { opacity: 0, x: 24 });
      if (buttons?.length) gsap.set(buttons, { opacity: 0, y: 18 });
      if (statRows?.length) gsap.set(statRows, { opacity: 0, y: 10 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(overlayRef.current, { opacity: 1, duration: 0.8 }, 0)
        .to(imageRef.current, { scale: 1, duration: 1.6, ease: "power2.out" }, 0)
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.55 }, 0.25);

      if (letters?.length) {
        gsap.set(letters, { y: "115%", skewX: 4 });
        tl.to(
          letters,
          { y: "0%", skewX: 0, duration: 0.85, stagger: { each: 0.028 } },
          0.35,
        );
      }

      tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.75);

      if (buttons?.length) {
        tl.to(
          buttons,
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
          0.85,
        );
      }

      tl.to(panelRef.current, { opacity: 1, x: 0, duration: 0.7 }, 0.6);

      if (statRows?.length) {
        tl.to(
          statRows,
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
          0.9,
        );
      }

      // ── 2. Scroll-triggered reveal for the infra stats grid ─────
      const infraCards = gsap.utils.toArray<HTMLElement>(".infra-card");
      if (infraCards.length > 0) {
        gsap.set(infraCards, { opacity: 0, y: 30 });
        gsap.set(".infra-topline", { scaleX: 0, transformOrigin: "left center" });

        const infraTl = gsap.timeline({
          scrollTrigger: {
            trigger: infraGridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        infraTl
          .to(infraCards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
          })
          .to(
            ".infra-topline",
            { scaleX: 1, duration: 0.5, ease: "expo.out", stagger: 0.12 },
            "<0.1",
          );
      }

      // ── 3. Gentle parallax on the hero image while scrolling ────
      gsap.to(imageRef.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-[#F5EFE8] py-9 px-3 md:px-6">
      {/* HERO CARD */}
      <div className="rounded-[28px] overflow-hidden shadow-sm max-w-[1600px] mx-auto">
        <div
          className="
            relative overflow-hidden rounded-[28px]
            text-white

            h-[85vh]
            sm:h-[65vh]
            md:h-[70vh]
            lg:h-[75vh]
            xl:h-[85vh]

            min-h-[460px]
            sm:min-h-[520px]
            md:min-h-[560px]

            max-h-[760px]
          "
        >
          {/* IMAGE */}
          <div ref={imageRef} className="absolute inset-0 will-change-transform">
            <img
              src="/images/sports-ground.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* OVERLAY */}
          <div ref={overlayRef} className="absolute inset-0 bg-black/70" />

          {/* CONTENT */}
          <div
            className="
              relative z-10
              h-full
              overflow-y-auto

              w-full
              max-w-[1370px]
              ml-auto

              px-[20px]
              sm:px-[28px]
              md:px-14
              lg:px-20

              pt-16
              pb-6
              md:pt-24
              md:pb-16

              flex
              flex-col
              lg:flex-row

              justify-center
              lg:items-center

              gap-[34px]
              md:gap-[52px]
              lg:gap-40
            "
          >
            {/* LEFT */}
            <div className="flex-1 max-w-[620px]">
              {/* label */}
              <div ref={labelRef} className="flex items-center gap-3 mb-5">
                <p
                  className="
                    font-rethink
                    text-[13px]
                    sm:text-[13px]
                    tracking-[0.28em]
                    text-white
                    uppercase
                  "
                >
                  The Eram Sports Arena
                </p>
              </div>

              {/* heading */}
              <h1
                ref={headingRef}
                className="
                  font-display
                  leading-[1]
                  tracking-[-0.02em]
                  text-[40px]
                  sm:text-[56px]
                  md:text-[72px]
                  lg:text-[88px]
                "
              >
                <AnimatedHeading text="A New Stage" /> <br />
                <AnimatedHeading text="of " />
                <AnimatedHeading text="Scale." className="text-white/60" />
              </h1>

              {/* description */}
              <p
                ref={descRef}
                className="
                  font-rethink
                  mt-5
                  max-w-[560px]
                  text-[14px]
                  sm:text-[15px]
                  md:text-[16px]
                  leading-[1.8]
                  text-white/70
                "
              >
                A 1,000-seat open-air amphitheatre and multi-court venue
                designed to elevate competitive sport, cultural engagement, and
                large-scale campus events. A flagship infrastructure milestone
                within the ERAM ecosystem.
              </p>

              {/* buttons */}
              <div
                ref={buttonsRef}
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:flex-wrap
                  gap-3
                  md:gap-6
                  mt-7
                "
              >
                <button
                  onClick={() => {
                    const section = document.getElementById("scale");
                    if (section) {
                      const yOffset = -90;
                      const y =
                        section.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                  className="
                    group
                    font-rethink
                    inline-flex
                    items-center
                    justify-center
                    gap-2

                    bg-[#ae1431]
                    text-white

                    px-6
                    sm:px-7
                    md:px-8

                    py-3
                    md:py-4

                    rounded-xl

                    text-xs
                    sm:text-sm

                    font-semibold
                    uppercase
                    tracking-[0.12em]

                    cursor-pointer
                    shadow-lg

                    transition-all
                    duration-300

                    hover:bg-black
                    hover:shadow-xl
                    hover:-translate-y-1
                  "
                >
                  <span>Explore the Arena</span>
                  <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  className="
                    group
                    font-rethink
                    inline-flex
                    items-center
                    justify-center
                    gap-2

                    border
                    border-white/40

                    px-6
                    sm:px-7
                    md:px-8

                    py-3
                    md:py-4

                    rounded-xl

                    text-xs
                    sm:text-sm

                    font-semibold
                    uppercase
                    tracking-[0.12em]

                    text-white
                    cursor-pointer

                    transition-all
                    duration-300

                    hover:bg-white
                    hover:text-[#ae1431]
                    hover:border-white
                    hover:-translate-y-1
                  "
                >
                  <span>Host an Event</span>
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 opacity-70 transition-all duration-300 group-hover:opacity-100" />
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div
              ref={panelRef}
              className="
                mt-2
                md:mt-5
                w-[80%]
                sm:w-[300px]
                lg:w-[280px]
                max-[1024px]:max-w-[340px]
                mx-auto
                sm:mx-0
                bg-[#0e0e0e]/60
                backdrop-blur-md
                border
                border-white/10
                rounded-md
                p-5
                lg:self-start
                lg:ml-0
                font-rethink
              "
            >
              {/* top label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="w-5 h-[1px] bg-[#ae1431]" />
                <p
                  className="
                    text-[10px]
                    tracking-[0.28em]
                    text-[#ae1431]
                    uppercase
                  "
                >
                  At a Glance
                </p>
              </div>

              {/* stats */}
              {GLANCE_STATS.map(([title, desc], i) => (
                <div
                  key={i}
                  className={`glance-row py-3 ${
                    i !== 3 ? "border-b border-white/10" : ""
                  }`}
                >
                  <h3 className="text-[20px] font-rethink md:text-[22px]">
                    {title}
                  </h3>
                  <p className="text-[12px] font-display text-white/60 mt-1">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          STATS
      ========================= */}
      <div className="relative z-10 bg-[#F5EFE8]">
        <div className="max-w-[1500px] mx-auto px-[10px] md:px-[12px]">
          <div className="max-w-[1100px] mx-auto px-[16px] sm:px-[20px] md:px-[28px] py-[40px] md:py-[55px]">
            {/* LABEL */}
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-[40px] md:mb-[50px]">
              <p
                className="
                  font-rethink
                  text-[13px]
                  sm:text-[15px]
                  md:text-[18px]
                  tracking-[0.28em]
                  text-[#ae1431]
                  uppercase
                "
              >
                Infrastructure at a glance
              </p>
            </div>

            {/* GRID */}
            <div
              ref={infraGridRef}
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-4
                border-t
                border-black/10
              "
            >
              {INFRA_STATS.map((item, i) => (
                <div
                  key={i}
                  className={`
                    infra-card
                    relative
                    py-[28px]
                    sm:py-[32px]
                    md:py-[42px]
                    px-[14px]
                    sm:px-[18px]
                    md:px-[28px]
                    text-center
                    sm:text-left
                    ${i !== 3 ? "md:border-r" : ""}
                    border-black/10
                  `}
                >
                  {/* RED TOP LINE */}
                  <span className="infra-topline absolute top-0 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 w-[28px] h-[2px] bg-[#a32020]" />

                  {/* VALUE */}
                  <div className="flex items-baseline justify-center sm:justify-start gap-[10px]">
                    <h3
                      className="
                        font-rethink
                        text-[30px]
                        md:text-[38px]
                        text-[#2a1010]
                        tracking-[-0.01em]
                      "
                    >
                      {item.value}
                    </h3>
                    <span
                      className="
                        text-[14px]
                        md:text-[17px]
                        text-[#4a3535]
                        font-display
                        relative
                        top-[-2px]
                      "
                    >
                      {item.unit}
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      mt-[12px]
                      text-[13px]
                      md:text-[14px]
                      text-[#6b5757]
                      leading-[1.7]
                    "
                  >
                    {item.desc.map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}