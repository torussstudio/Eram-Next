"use client";

import { useRef } from "react";
import { Calendar, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function AnimatedWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em]" style={{ paddingBottom: "0.08em" }}>
          <span className="quote-word inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function ClosingSection() {
  const router = useRouter();

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const buttons = buttonsRef.current?.querySelectorAll("button");
      const words = quoteRef.current?.querySelectorAll(".quote-word");

      gsap.set(headingRef.current, { opacity: 0, y: 24 });
      gsap.set(descRef.current, { opacity: 0, y: 18 });
      if (buttons?.length) gsap.set(buttons, { opacity: 0, y: 16 });
      gsap.set(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      if (words?.length) gsap.set(words, { y: "115%" });

      // ── Header block (heading, copy, buttons) ───────────────────
      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0)
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.15)
        .to(
          buttons?.length ? buttons : [],
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.3,
        );

      // ── Divider draw-in ──────────────────────────────────────────
      gsap.to(dividerRef.current, {
        scaleX: 1,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      // ── Closing quote — word-by-word reveal ──────────────────────
      if (words?.length) {
        gsap.to(words, {
          y: "0%",
          duration: 0.9,
          ease: "power4.out",
          stagger: { each: 0.025 },
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-[#e9e3d8] text-[#1a1a1a] pt-[50px] md:pt-[75px] pb-[80px] md:pb-[110px] px-[16px] sm:px-[20px] md:px-[28px]"
    >
      {/* SAME CONTAINER SYSTEM */}
      <div className="max-w-[1500px] mx-auto px-[10px] md:px-[12px]">
        <div className="max-w-[1100px] mx-auto px-[16px] sm:px-[20px] md:px-[28px]">
          {/* TOP GRID */}
          <div className="grid md:grid-cols-2 gap-[40px] md:gap-[80px] items-start">
            {/* LEFT */}
            <div className="max-w-[620px]">
              <h2
                ref={headingRef}
                className="
  font-display
  text-[36px] sm:text-[40px] md:text-[38px]
  leading-[1.15]
  tracking-[-0.02em]
  mb-[20px] md:mb-[26px]
"
              >
                Where Sport, Ceremony, and Gathering Unfold.
              </h2>

              <p
                ref={descRef}
                className="
                text-[14.5px] md:text-[15px]
                leading-[1.9]
                text-[#4a433c]
                font-rethink
              "
              >
                The ERAM Sports Arena extends the campus into a space of scale.
                Its open-air amphitheatre and floodlit multi-court design
                reflect a long-term vision: to create infrastructure that
                supports performance, visibility, and shared experience. As both
                sports ground and event venue, the Arena strengthens the campus
                as a space built for participation and presence.
              </p>
            </div>

            {/* RIGHT */}
            <div
              ref={buttonsRef}
              className="font-rethink flex flex-col items-start md:items-end gap-[14px] md:mt-[120px]"
            >
              <button
                onClick={() => {
                  router.push("/gallery?type=sports");
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
                className="
        group
        relative overflow-hidden
        bg-[#ae1431]
        text-white
        hover:bg-black
        px-[22px] md:px-[26px]
        py-[14px] md:py-[15px]
        text-[12px]
        tracking-[0.18em]
        uppercase
        flex items-center gap-3
        cursor-pointer
        rounded-[10px]
        transition-colors duration-300
      "
              >
                Explore the ERAM Ecosystem
                <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                className="
     group
     relative overflow-hidden

    border border-[#1a1a1a]
    text-[#111]
    hover:bg-black
    hover:text-white
    

    px-[22px] md:px-[26px]
    py-[14px] md:py-[15px]

    text-[12px]
    tracking-[0.18em]
    uppercase

    flex items-center gap-3
    cursor-pointer
    rounded-[10px]
    transition-colors duration-300
  "
              >
                Host an Event
                <Calendar
                  className="
    relative z-10 w-4 h-4 opacity-70
    transition-all duration-300
    group-hover:opacity-100
  "
                />
              </button>
            </div>
          </div>

          {/* DIVIDER */}
          <div
            ref={dividerRef}
            className="border-t border-[#cfc6bb] mt-[50px] md:mt-[70px] mb-[30px] md:mb-[40px]"
          />

          {/* QUOTE */}
          <p
            ref={quoteRef}
            className="
          font-rethink
         
              text-[24px]

            sm:text-[28px]

            md:text-[40px]

            lg:text-[48px]

            text-[#7a7268]
          "
          >
            <AnimatedWords text='"Built not for scale alone — but for sustained opportunity: sports, cultural, and communal."' />
          </p>
        </div>
      </div>
    </section>
  );
}