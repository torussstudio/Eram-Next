"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

interface InkHeadingProps {
  text: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}

function InkHeading({ text, headingRef }: InkHeadingProps) {
  const words = text.split(" ");

  return (
    <h2
      ref={headingRef}
      className="font-display text-[clamp(2.2rem,3.4vw,3.5rem)] leading-[1.1] text-[#1a1208] tracking-[-0.01em]"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.2em]">
          <span className="ls-word inline-block">{word}</span>
        </span>
      ))}
    </h2>
  );
}

interface SectionLabelProps {
  labelRef: React.RefObject<HTMLDivElement | null>;
}

function SectionLabel({ labelRef }: SectionLabelProps) {
  return (
    <div ref={labelRef} className="flex items-center gap-3 mb-6">
      <span className="block w-7 h-[1.5px] bg-[#8B1E1E]" />
      <span className="font-rethink text-[11px] tracking-[0.32em] uppercase text-[rgba(26,18,8,0.6)]">
        Our Commitment
      </span>
    </div>
  );
}

interface TypewriterQuoteProps {
  text: string;
  quoteRef: React.RefObject<HTMLParagraphElement | null>;
}

function TypewriterQuote({ text, quoteRef }: TypewriterQuoteProps) {
  return (
    <p
      ref={quoteRef}
      className="font-rethink mt-[1.3rem] text-[15px] text-[rgba(26,18,8,0.5)] tracking-[0.015em]"
    >
      {text}
    </p>
  );
}

interface RevealParagraphProps {
  text: string;
  paraRef: React.RefObject<HTMLParagraphElement | null>;
}

function RevealParagraph({ text, paraRef }: RevealParagraphProps) {
  return (
    <div className="overflow-hidden">
      <p
        ref={paraRef}
        className="font-rethink text-[15px] leading-[1.88] text-[rgba(26,18,8,0.72)] font-light"
      >
        {text}
      </p>
    </div>
  );
}

interface AnimatedDividerProps {
  dividerRef: React.RefObject<SVGSVGElement | null>;
}

function AnimatedDivider({ dividerRef }: AnimatedDividerProps) {
  return (
    <svg
      ref={dividerRef}
      width="100%"
      height="24"
      viewBox="0 0 1100 24"
      preserveAspectRatio="none"
      className="block"
    >
      <line
        className="arm-left"
        x1="550"
        y1="12"
        x2="0"
        y2="12"
        stroke="rgba(139,30,30,0.2)"
        strokeWidth="0.8"
        strokeDasharray="550"
        strokeDashoffset="550"
      />
      <line
        className="arm-right"
        x1="550"
        y1="12"
        x2="1100"
        y2="12"
        stroke="rgba(139,30,30,0.2)"
        strokeWidth="0.8"
        strokeDasharray="550"
        strokeDashoffset="550"
      />
      <circle
        className="dot-left"
        cx="530"
        cy="12"
        r="1.5"
        fill="rgba(139,30,30,0.38)"
      />
      <circle
        className="dot-right"
        cx="570"
        cy="12"
        r="1.5"
        fill="rgba(139,30,30,0.38)"
      />
      <circle className="dot-center" cx="550" cy="12" r="3.5" fill="#8B1E1E" />
    </svg>
  );
}

const PARAGRAPHS = [
  "ERAM Educational & Welfare Trust advances its mission through structured interventions across education, healthcare, rehabilitation, environmental resilience, youth development, and community infrastructure.",
  "Each initiative begins with a clearly identified need and evolves into a designed response — planned, executed, and monitored with institutional discipline. Whether restoring water systems, strengthening public health access, or expanding structured education, the Trust approaches community development as a long-term responsibility.",
  "These efforts form a cohesive model of engagement — one that addresses access gaps, strengthens local systems, and creates measurable, lasting outcomes for the communities we serve.",
];

export default function CommitmentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<SVGSVGElement>(null);
  const para0Ref = useRef<HTMLParagraphElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: labelRef.current, start: "top 88%" },
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

      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.1,
            scrollTrigger: { trigger: quoteRef.current, start: "top 88%" },
          },
        );
      }

      const paras = [
        para0Ref.current,
        para1Ref.current,
        para2Ref.current,
      ].filter(Boolean);
      if (paras.length) {
        gsap.fromTo(
          paras,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.18,
            scrollTrigger: { trigger: paras[0], start: "top 86%" },
          },
        );
      }

      if (dividerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: dividerRef.current, start: "top 90%" },
        });
        tl.fromTo(
          dividerRef.current.querySelectorAll(".arm-left, .arm-right"),
          { strokeDashoffset: 550 },
          { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" },
        )
          .fromTo(
            dividerRef.current.querySelectorAll(".dot-left, .dot-right"),
            { scale: 0, opacity: 0, transformOrigin: "center" },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
              stagger: 0.08,
            },
            "-=0.3",
          )
          .fromTo(
            dividerRef.current.querySelector(".dot-center"),
            { scale: 0, opacity: 0, transformOrigin: "center" },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
            "-=0.2",
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const paraRefs = [para0Ref, para1Ref, para2Ref];

  return (
    <section ref={sectionRef}>
      <div className="max-w-[1100px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,72px)] pb-[clamp(64px,8vw,96px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-[clamp(2rem,5vw,5rem)]">
          <div>
            <SectionLabel labelRef={labelRef} />
            <InkHeading
              text="Our Commitment To Structured Responsibility"
              headingRef={headingRef}
            />
            <TypewriterQuote
              text='"Commitment Beyond Institutions"'
              quoteRef={quoteRef}
            />
          </div>
          <div className="flex flex-col gap-6">
            {PARAGRAPHS.map((text, i) => (
              <RevealParagraph key={i} text={text} paraRef={paraRefs[i]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
