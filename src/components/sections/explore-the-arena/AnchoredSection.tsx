"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const points = [
  "Structured sports training environments for all institutions",
  "Competitive exposure platforms at campus scale",
  "Professional-grade infrastructure accessible to every student",
  "Seamless integration between academics and sports",
];

export default function AnchoredSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const listItems = listRef.current?.querySelectorAll("li");

      gsap.set(labelRef.current, { opacity: 0, x: -14 });
      gsap.set(titleRef.current, { opacity: 0, y: 24 });
      gsap.set(descRef.current, { opacity: 0, y: 18 });
      gsap.set(quoteRef.current, { opacity: 0, y: 14 });
      gsap.set(quoteRef.current, { borderLeftColor: "rgba(174,20,49,0)" });
      if (listItems?.length) gsap.set(listItems, { opacity: 0, x: -12 });
      gsap.set(imageWrapRef.current, {
        clipPath: "inset(0 0 100% 0)",
      });
      gsap.set(imageRef.current, { scale: 1.15 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      tl.to(labelRef.current, { opacity: 1, x: 0, duration: 0.5 }, 0)
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.28)
        .to(quoteRef.current, { opacity: 1, y: 0, duration: 0.55 }, 0.42)
        .to(
          quoteRef.current,
          { borderLeftColor: "rgba(174,20,49,1)", duration: 0.5 },
          0.48,
        )
        .to(
          imageWrapRef.current,
          { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "expo.out" },
          0.1,
        )
        .to(imageRef.current, { scale: 1, duration: 1.3, ease: "power2.out" }, 0.1);

      if (listItems?.length) {
        tl.to(
          listItems,
          { opacity: 1, x: 0, duration: 0.45, stagger: 0.1 },
          0.55,
        );
      }

      // Gentle parallax drift on the court image as the section scrolls by
      gsap.to(imageRef.current, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
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
    <section
      ref={sectionRef}
      className="bg-[#0f0f0f] text-white py-[80px] md:py-[110px] px-[16px] sm:px-[20px] md:px-[28px]"
    >
      {/* OUTER CONTAINER */}
      <div className="max-w-[1500px] mx-auto px-[10px] md:px-[12px]">
        {/* INNER */}
        <div
          className="
          max-w-[1100px] mx-auto 
          px-[16px] sm:px-[20px] md:px-[28px]

          grid 
          grid-cols-1 md:grid-cols-2 

          gap-[40px] md:gap-[80px] 
          items-start
        "
        >
          {/* LEFT */}
          <div className="max-w-full md:max-w-[600px]">
            {/* LABEL */}
            <div ref={labelRef} className="flex items-center gap-3 mb-[20px] md:mb-[28px]">
              <p className="font-rethink text-[10px] md:text-[11px] tracking-[0.28em] text-[#ae1431] uppercase">
                Integrated with the ERAM Ecosystem
              </p>
            </div>

            {/* TITLE */}
            <h2
              ref={titleRef}
              className="
  font-display
  text-[18px] sm:text-[28px] md:text-[36px] lg:text-[42px]
  leading-[1.15] md:leading-[1.1]
  tracking-[-0.02em]
  mb-[18px] md:mb-[26px]
  text-[#eae6df]
"
            >
              Anchored In Structured
              <br />
              sports Development
            </h2>

            {/* DESC */}
            <p
              ref={descRef}
              className="
              text-[14.5px] md:text-[15.5px]
              leading-[1.8] md:leading-[1.9]
              text-[#b8b2a8]
              mb-[22px] md:mb-[28px]
              font-rethink
            "
            >
              The Arena operates in alignment with the ERAM institutional
              ecosystem, reinforcing the Trust's long-standing commitment to
              youth development. It is not a standalone facility — it is the
              physical expression of a broader educational philosophy.
            </p>

            {/* QUOTE */}
            <p
              ref={quoteRef}
              className="
            font-rethink
            font-bold
              text-[16px] md:text-[17px]
              text-[#9f988e]
              mb-[24px] md:mb-[30px]
              border-l border-[#ae1431]
              pl-[14px] md:pl-[16px]
            "
            >
              “The Arena transforms training into performance, and performance
              into opportunity.”
            </p>

            {/* LIST */}
            <ul ref={listRef} className="space-y-[12px] md:space-y-[14px] text-[14px] md:text-[15px] text-[#c9c3ba]">
              {points.map((item, i) => (
                <li key={i} className="font-rethink flex items-start gap-3">
                  <span className="w-[5px] h-[5px] md:w-[6px] md:h-[6px] mt-[6px] md:mt-[7px] bg-[#ae1431] rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <div
            ref={imageWrapRef}
            className="h-[420px] md:h-[520px] overflow-hidden border border-[#2a2a2a] rounded-[28px] will-change-[clip-path]"
          >
            <img
              ref={imageRef}
              src="/images/sports-arena-court.jpeg"
              alt="Eram Sports Arena court"
              className="w-full h-full object-cover will-change-transform"
            />
          </div>
        </div>
      </div>
    </section>
  );
}