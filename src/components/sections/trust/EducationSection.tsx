"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

// ─── Card primitives ───────────────────────────────────────────────
interface BadgeItem {
  value: string;
  label: string;
}

interface CardProps {
  variant?: "white" | "red" | "dark";
  label?: string;
  title?: string;
  meta?: string[];
  body?: string | string[];
  list?: string[];
  badge?: BadgeItem;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

const Card = ({
  variant = "white",
  label,
  title,
  meta = [],
  body,
  list,
  badge,
  image,
  imageAlt,
  children,
}: CardProps) => {
  const base = "font-rethink rounded-2xl p-[26px]";
  const styles = {
    white: `${base} border border-black/10 bg-white/40`,
    red: `${base} bg-[#ae1431] text-white`,
    dark: `${base} bg-[#111111] text-white`,
  };
  const textColor = variant === "white" ? "text-black/70" : "text-white/80";
  const metaColor = variant === "white" ? "text-black/60" : "text-white/70";
  const markerColor =
    variant === "red" ? "marker:text-white" : "marker:text-[#ae1431]";

  return (
    <div className={styles[variant]}>
      {image && (
        <div className="relative mb-6 overflow-hidden rounded-xl">
          <img
            src={image}
            alt={imageAlt || title || "Card image"}
            className="h-[240px] w-full object-cover"
          />
        </div>
      )}

      {label && (
        <span
          className="text-[11px] uppercase tracking-[0.2em] block mb-3"
          style={{
            color:
              variant === "white"
                ? "[#ae1431]"
                : variant === "dark"
                  ? "rgba(255,255,255,0.6)"
                  : "rgba(255,255,255,0.7)",
          }}
        >
          {label}
        </span>
      )}
      {title && (
        <h3 className="font-display text-[18px] leading-[1.4]">{title}</h3>
      )}
      {meta.length > 0 && (
        <div className={`mt-2 text-[12px] space-y-1 ${metaColor}`}>
          {meta.map((m, i) => (
            <p key={i}>{m}</p>
          ))}
        </div>
      )}
      {body && Array.isArray(body)
        ? body.map((b, i) => (
            <p
              key={i}
              className={`mt-3 text-[14px] leading-[1.7] ${textColor}`}
            >
              {b}
            </p>
          ))
        : body && (
            <p className={`mt-3 text-[14px] leading-[1.7] ${textColor}`}>
              {body}
            </p>
          )}
      {list && (
        <ul
          className={`mt-4 space-y-2 text-[14px] list-disc pl-4 ${markerColor} ${textColor}`}
        >
          {list.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      )}
      {badge && (
        <div
          className={`mt-6 px-4 py-3 inline-block rounded-lg ${
            variant === "white" ? "bg-[#ae1431] text-white" : "bg-white/10"
          }`}
        >
          <p className="text-[14px] ">{badge.value}</p>
          <p
            className={`text-[12px] ${variant === "white" ? "text-white/80" : "text-white/70"}`}
          >
            {badge.label}
          </p>
        </div>
      )}
      {children}
    </div>
  );
};

// ─── Pillar header ──────────────────────────────────────────────────
interface PillarHeaderProps {
  num: string;
  label: string;
  title: string;
  subtitle: string;
  active: boolean;
  onClick: () => void;
  headerRef: React.Ref<HTMLDivElement>;
}

const PillarHeader = ({
  num,
  label,
  title,
  subtitle,
  active,
  onClick,
  headerRef,
}: PillarHeaderProps) => (
  <div className="mt-[20px] mb-[20px]" ref={headerRef}>
    <div className="flex items-start justify-between">
      <div>
        <span className="font-rethink text-[11px] tracking-[0.3em] uppercase text-[#ae1431]">
          {label}
        </span>
        <div className="flex items-center gap-6 mt-2">
          <span className="font-display text-[48px] text-black/10">{num}</span>
          <div>
            <h2 className="font-display text-[32px]  leading-[1.2]">
              {title}
            </h2>
            <p className="font-rethink text-[14.5px] text-black/60 mt-1">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={onClick}
        className="mt-[18px] text-[28px] cursor-pointer select-none"
      >
        <span
          style={{
            display: "inline-block",
            transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
            transform: active ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
    </div>
    <div className="mt-5 border-t border-black/10" />
  </div>
);

// ─── Animated Panel Wrapper ─────────────────────────────────────────
interface AnimatedPanelProps {
  children: React.ReactNode;
  visible: boolean;
}

const AnimatedPanel = ({ children, visible }: AnimatedPanelProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // On mount: measure natural height once content is rendered
  useEffect(() => {
    if (!wrapperRef.current || !innerRef.current) return;

    // Kill any running tween
    if (tweenRef.current) tweenRef.current.kill();

    if (visible) {
      // Reveal: animate from 0 to natural height
      const naturalH = innerRef.current.scrollHeight;
      tweenRef.current = gsap.fromTo(
        wrapperRef.current,
        { height: 0, opacity: 0 },
        {
          height: naturalH,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          onComplete: () => {
            // Let it reflow freely after open (handles dynamic resize)
            if (wrapperRef.current) wrapperRef.current.style.height = "auto";
          },
        },
      );

      // Stagger cards inside
      const cards = innerRef.current.querySelectorAll(
        ".rounded-2xl, .rounded-xl",
      );
      gsap.fromTo(
        cards,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.1,
        },
      );
    } else {
      // Collapse
      const currentH = wrapperRef.current.offsetHeight;
      tweenRef.current = gsap.fromTo(
        wrapperRef.current,
        { height: currentH, opacity: 1 },
        { height: 0, opacity: 0, duration: 0.38, ease: "power3.in" },
      );
    }
  }, [visible]);

  return (
    <div ref={wrapperRef} style={{ overflow: "hidden", height: 0, opacity: 0 }}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
};

// ─── Pillar content panels ──────────────────────────────────────────
const panels = [
  // 0 — Education
  () => (
    <div className="pb-[30px]">
      <div className="font-rethink rounded-2xl border border-black/10 bg-white/40 p-[28px] mb-[20px] grid md:grid-cols-2 gap-[40px]">
        <div>
          <span className="text-[11px] uppercase text-[#ae1431]">
            PALAKKAD DISTRICT
          </span>
          <h3 className="mt-3  text-[18px]">
            Structured Educational Institutions
          </h3>
          <p className="mt-3 text-[14px] text-black/70 leading-[1.7]">
            The Trust established a structured network of institutions beginning
            with AMLP, followed by MMPS and MMITE in 2004, then MMHSS in 2005,
            and EASE in 2015. These institutions follow State and CBSE
            curricula, unified into a single academic ecosystem rather than
            isolated schools.
          </p>
          <div className="mt-4 text-[12px] text-black/60 space-y-1">
            <p>
              <strong>Location</strong> — Palakkad District
            </p>
            <p>
              <strong>Institutions</strong> — AMLP, MMPS, MMHSS, MMITE, EASE
            </p>
          </div>
        </div>
        <div>
          <p className="text-[14px] text-black/70 leading-[1.7]">
            The purpose was clear: create disciplined, value-based institutions
            where access and excellence coexist. Infrastructure compliant with
            Board regulations includes:
          </p>
          <ul className="mt-4 space-y-2 text-[14px] list-disc pl-4 marker:text-[#ae1431] text-black/70">
            <li>Proper land and fully equipped academic buildings</li>
            <li>Laboratories and well-stocked libraries</li>
            <li>Dedicated sports infrastructure</li>
            <li>Prescribed safety and compliance standards</li>
          </ul>
          <p className="mt-4 text-[14px] text-black/70 leading-[1.7]">
            The Trust safeguards the autonomy of institutional leadership while
            maintaining academic oversight through structured governance.
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-[20px]">
        <Card
          variant="red"
          label="KOZHIKODE DISTRICT"
          image="/images/impact1.webp"
          imageAlt="Thanal School"
          title="Thanal School for Special Needs"
          meta={[
            "Location — Paleri Village, Kozhikode",
            "Campus Size — 60,000+ sq.ft",
          ]}
          body="A dedicated institution for children with cerebral palsy, autism, intellectual disabilities, multiple disabilities, and sensory impairments — designed as a comprehensive educational support system integrating academics, healthcare, and recreation."
          list={[
            "Academic & administration blocks",
            "Dispensary & dining facilities",
            "Amphitheatre & athletic track",
          ]}
        />
        <Card
          variant="dark"
          label="PALAKKAD DISTRICT"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="WHO-Certified Teacher Training Workshops"
          body="Recognising that institutional quality is sustained through faculty excellence, the Trust implemented structured teacher development programs including WHO-certified workshops — institutionalised as continuous professional development, not periodic compliance."
          list={[
            "Enhanced pedagogical standards",
            "Strengthened classroom delivery",
            "Alignment with evolving academic frameworks",
          ]}
        />
      </div>
    </div>
  ),

  // 1 — Health & Sanitation
  () => (
    <div className="pb-[30px]">
      <div className="grid md:grid-cols-3 gap-[20px] mb-[20px]">
        <Card
          variant="red"
          label="4 YEARS · 30 PANCHAYATS"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="30 Medical Camps & 4,000+ Cataract Surgeries"
          meta={["Coverage: Ottapalam, Kongad, Nellyampathy Tribal Regions"]}
          body="In collaboration with Lions Club International, the Trust conducted 30 medical camps and completed more than 4,000 cataract surgeries across underserved communities — combining outreach with surgical follow-ups to ensure continuity of care."
          badge={{ value: "4,000+", label: "Cataract surgeries completed" }}
        />
        <Card
          variant="white"
          label="2015 · MANKARA"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="Maryumma Memorial Children's Clinic"
          meta={["Location: Mankara Government Hospital, Palakkad"]}
          body="A permanent children's clinic established within the Government Hospital, integrating private CSR investment into public health infrastructure with a child-friendly environment."
          list={[
            "Examination & treatment rooms",
            "Laboratory & injection room",
            "Play area & child-friendly environment",
          ]}
        />
        <Card
          variant="white"
          label="CRITICAL CARE ACCESS"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="Dialysis Support Initiative"
          body="Addressing the growing prevalence of kidney-related illness, particularly in regions affected by sanitation challenges, the Trust provided dialysis machines and extended financial aid to patients requiring critical renal care — bridging access to life-sustaining treatment for economically disadvantaged families."
        />
      </div>
      <div className="grid md:grid-cols-2 gap-[20px]">
        <Card
          variant="dark"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          label="PUBLIC SANITATION INNOVATION"
          title="eToilet – Sustainable Sanitation"
          body={[
            "Through the R&D wing of Eram Scientific, the Trust supported the development and deployment of the award-winning eToilet — a self-cleaning, self-sustaining sanitation unit installed across public spaces in India.",
            "Units require minimal maintenance and are accessible at no cost or minimal charge, integrating technology with civic public infrastructure.",
          ]}
        />
        <Card
          variant="white"
          label="5 PANCHAYATS · PALAKKAD"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="Financial Aid for 242 BPL Families – Toilet Construction"
          meta={[
            "Impact: 242 toilets for BPL families",
            "Collaboration: Kerala Govt. ODF Program",
          ]}
          body="Supporting the Kerala Government's Open Defecation-Free initiative, the Trust provided financial assistance to 242 Below Poverty Line families to construct household toilets across five panchayats."
          badge={{
            value: "242",
            label: "Households with new sanitation access",
          }}
        />
      </div>
    </div>
  ),

  // 2 — Humanitarian
  () => (
    <div className="pb-[30px]">
      <div className="grid md:grid-cols-2 gap-[20px] mb-[20px]">
        <Card
          variant="red"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          label="PERMANENT SHELTER"
          title="Housing Initiative – Shelter for the Homeless"
          meta={[
            "Completed — 60+ Houses",
            "In Progress — 25 Under Construction",
            "Unit Size — 600–1000 sq.ft",
          ]}
          body="More than 50 permanent homes constructed for homeless families, with 25 currently under development. Each home is designed for durable, long-term habitation — a shift from short-term relief to sustainable rehabilitation."
        />
        <Card
          variant="white"
          label="2013 · REPATRIATION"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="Nitaqat Charter Flight Initiative"
          meta={[
            "Impact — 100+ Flight Tickets Sponsored",
            "Route — Dammam to Nedumbassery",
          ]}
          body="During the Saudi Nitaqat labour law crisis, the Trust sponsored a chartered flight for more than 100 affected expatriates — enabling immediate repatriation and family reunification during a period of severe employment instability."
        />
      </div>
      <div className="grid md:grid-cols-2 gap-[20px]">
        <Card
          variant="dark"
          label="NORKA COLLABORATION"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="Swapnasafalyam – Repatriation & Reintegration Support"
          body={[
            "For Malayali expatriates who had completed prison sentences abroad but lacked the means to return, the Trust partnered with NORKA to sponsor return travel and coordinate with authorities for safe, dignified repatriation.",
            "The program facilitated multiple family reunifications and addressed a humanitarian gap often overlooked in expatriate welfare.",
          ]}
        />
        <Card
          variant="white"
          label="REHABILITATION SUPPORT"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="Individual Rehabilitation & Livelihood Support"
          body={[
            "In cases of severe physical trauma resulting in limb loss, the Trust sponsored advanced prosthetic solutions — enabling individuals to regain mobility, continue education, and restore independence.",
            "Beyond emergency relief, the Trust has also supported livelihood-oriented interventions for economically vulnerable families — enabling income generation, reducing dependency, and promoting self-sufficiency.",
          ]}
        />
      </div>
    </div>
  ),

  // 3 — Youth & Sports
  () => (
    <div className="pb-[30px]">
      <div className="grid md:grid-cols-3 gap-[20px]">
        <Card
          variant="red"
          label="NATIONAL SCHOOLS GAMES"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="Athlete Support Program"
          meta={["Support — 36+ Athletes Supported"]}
          body="International-quality sports kits distributed to more than 36 athletes who qualified for the National Schools Games — reducing resource barriers that hinder competitive progression."
        >
          <div className="mt-4">
            <p className="text-[11px] uppercase text-white/60 mb-2">
              Recognised Athletes
            </p>
            <ul className="text-[13px] space-y-2 list-disc pl-4 marker:text-white">
              <li>P.U. Chithra — National Gold Medalist</li>
              <li>Mohammed Asal — National Gold Medalist</li>
            </ul>
          </div>
        </Card>
        <Card
          variant="white"
          label="PROFESSIONAL SPORTS"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="Support for Professional Athletes"
          body="The Trust extended support to Diljith T.S., Indian motor racing and karting champion — assisting his participation in competitive circuits and strengthening pathways from regional talent to national-level professional sport."
        />
        <Card
          variant="dark"
          label="2015 · 2026 MILESTONE"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="EASE & The ERAM Sports Arena"
          body={[
            "In 2015, the ERAM Academy for Sports & Excellence (EASE) was established to integrate sports training within formal academics. In 2026, the Trust advances this vision further with the development of the ERAM Sports Arena.",
            "Designed to host institutional competitions and external sporting events, the Arena marks a significant milestone in integrating sports excellence within the educational ecosystem.",
          ]}
        />
      </div>
    </div>
  ),

  // 4 — Environment
  () => (
    <div className="pb-[30px]">
      <div className="font-rethink rounded-2xl border border-black/10 bg-white/40 p-[28px] mb-[20px] grid md:grid-cols-2 gap-[40px]">
        <div>
          <span className="text-[11px] uppercase text-[#ae1431]">
            MANKARA · KOTTAYI PANCHAYATS
          </span>
          <h3 className="mt-3  text-[18px]">
            Bharathapuzha Shutter Restoration
          </h3>
          <div className="mt-3 text-[13px] text-black/60 space-y-1">
            <p>
              <strong>Location</strong> — Mankara–Kottayi Panchayats, Palakkad
            </p>
            <p>
              <strong>Impact</strong> — Structural intervention for river water
              retention
            </p>
          </div>
          <p className="mt-4 text-[14px] text-black/70 leading-[1.7]">
            Bharathapuzha — Kerala's second-longest river — sustained critical
            damage to wooden causeway shutters, weakening water retention and
            reducing river levels. The Trust replaced deteriorated wooden
            shutters with durable iron structures, restoring controlled water
            retention and reinforcing ecological resilience in the region.
          </p>
        </div>
        <div className="rounded-xl bg-[#E9E1D6] p-[20px] h-fit">
          <span className="text-[11px] uppercase text-black/50">
            ENVIRONMENTAL SCOPE
          </span>
          <ul className="mt-3 space-y-2 text-[13px] list-disc pl-4 marker:text-[#ae1431] text-black/70">
            <li>Iron shutter replacement for structural integrity</li>
            <li>Coordination with local panchayat bodies</li>
            <li>Restored controlled water retention</li>
            <li>Long-term ecological resilience strengthened</li>
          </ul>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-[20px]">
        <Card
          variant="red"
          label="PALAKKAD REGION"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="Drinking Water Infrastructure"
          body="A structured, end-to-end water infrastructure program ensuring sustained access to safe drinking water across rural Palakkad — from source creation to household-level connectivity."
          list={[
            "Construction of over 180 wells",
            "Borewell drilling in water-scarce areas",
            "Elevated water storage tanks built",
            "Plumbing networks & household connectivity",
          ]}
          badge={{
            value: "180+",
            label: "Wells constructed across communities",
          }}
        />
        <Card
          variant="white"
          label="PALAKKAD REGION"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="Multiple Check Dams Constructed"
          meta={["Impact — Strengthened water retention"]}
          body={[
            "To improve groundwater recharge and regulate seasonal flow, the Trust supported the construction of multiple check dams across vulnerable stretches — retaining monsoon runoff and improving soil moisture for surrounding agricultural communities.",
            "By focusing on decentralized water retention, the initiative strengthened long-term ecological stability and agricultural resilience.",
          ]}
        />
      </div>
    </div>
  ),

  // 5 — Community
  () => (
    <div className="pb-[30px]">
      <div className="grid md:grid-cols-3 gap-[20px]">
        <Card
          variant="white"
          label="PALAKKAD DISTRICT"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="Ambulance Sponsorship Initiative"
          body={[
            "The Trust sponsored ambulances for deployment across panchayats and NGOs in Palakkad, strengthening emergency response systems and reducing response time to tertiary care facilities.",
            "The initiative reinforced the essential link between rural communities and emergency healthcare.",
          ]}
        />
        <Card
          variant="red"
          label="KERALA ODF INITIATIVE"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="Toilet Construction Aid – Sanitation Infrastructure"
          meta={[
            "Families — 242 BPL families supported",
            "Districts — 5 Panchayats, Palakkad",
            "Collaboration — Kerala Govt. ODF Program",
          ]}
          body="Financial assistance to 242 Below Poverty Line families for household toilet construction — directly strengthening sanitation access while aligning with statewide public health goals."
        />
        <Card
          variant="dark"
          label="SOCIAL COHESION"
          image="/images/trust/workshop.jpg"
  imageAlt="Teacher Training"
          title="Interreligious Harmony & Social Cohesion Initiatives"
          meta={["Format — Multi-community engagement platforms"]}
          body={[
            "Through dialogue platforms, collaborative community events, and inclusive institutional policies, the Trust has fostered environments where diversity is respected and mutual understanding is encouraged.",
            "These initiatives reinforce the Trust's belief that education and welfare must operate within socially stable and inclusive ecosystems.",
          ]}
        />
      </div>
    </div>
  ),
];

const pillars = [
  {
    num: "01",
    label: "PILLAR ONE",
    title: "Education",
    subtitle: "Expanding Access Through Structured Institutions",
  },
  {
    num: "02",
    label: "PILLAR TWO",
    title: "Health & Sanitation",
    subtitle: "Preventive Care and Sustainable Public Health Solutions",
  },
  {
    num: "03",
    label: "PILLAR THREE",
    title: "Humanitarian & Rehabilitation",
    subtitle: "Direct & Structured Intervention During Social Crisis",
  },
  {
    num: "04",
    label: "PILLAR FOUR",
    title: "Youth & Sports",
    subtitle: "Structured Support for Competitive Potential",
  },
  {
    num: "05",
    label: "PILLAR FIVE",
    title: "Environment",
    subtitle: "Water Conservation & Ecological Responsibility",
  },
  {
    num: "06",
    label: "PILLAR SIX",
    title: "Community Infrastructure & Welfare",
    subtitle: "System-Based Community Support — Strengthening Civic Systems",
  },
];

export default function EducationSection({
  active,
  setActive,
}: {
  active: number | null;
  setActive: (active: number | null) => void;
}) {
  const headerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // ScrollTrigger: fade + slide each pillar header in as it enters viewport
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    headerRefs.current.forEach((el) => {
      if (!el) return;

      gsap.set(el, { opacity: 0, y: 28 });

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        },
      });

      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F5EFE8] pt-[80px] pb-[80px]">
      <div className="max-w-[1100px] mx-auto px-[20px]">
        {pillars.map((p, i) => {
          const Panel = panels[i];
          const isActive = active === i;

          return (
            <div key={i} id={`pillar-${i + 1}`}>
              <PillarHeader
                {...p}
                active={isActive}
                onClick={() => setActive(isActive ? null : i)}
                headerRef={(el) => {
                  headerRefs.current[i] = el;
                }}
              />
              <AnimatedPanel visible={isActive}>
                <Panel />
              </AnimatedPanel>
            </div>
          );
        })}
      </div>
    </section>
  );
}
