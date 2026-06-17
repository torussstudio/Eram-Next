export interface NavItem {
  label: string;
  path: string;
}

export interface Institution {
  code: string;
  shortName: string;
  title: string;
  description: string;
}

export interface ModelPillar {
  icon: string;
  title: string;
}

export interface BeyondCard {
  code: string;
  title: string;
}

export interface ImpactCard {
  code: string;
  title: string;
  description: string;
}

export interface PillarData {
  id: string;
  label: string;
  title: string;
  desc: string;
}

export const navItems: NavItem[] = [
  { label: "About Us", path: "/about-us" },
  { label: "The Trust", path: "/the-trust" },
  { label: "Institutions", path: "#institutions" },
  { label: "Sports Arena", path: "/explore-arena" },
  { label: "Contact", path: "/contact" },
];

export const institutions: Institution[] = [
  {
    code: "/01",
    shortName: "EASE (CBSE)",
    title: "Foundational Schooling",
    description:
      "A strong academic base with disciplined routines, values-led learning, and early formative support.",
  },
  {
    code: "/02",
    shortName: "MMPS (HS)",
    title: "Middle And High School",
    description:
      "Structured progression through core academics, habits of excellence, and student-facing leadership pathways.",
  },
  {
    code: "/03",
    shortName: "MMHSS (Hr. Sec)",
    title: "Higher Secondary Formation",
    description:
      "Board-focused preparation with higher expectations, strong mentoring, and future-facing readiness.",
  },
  {
    code: "/04",
    shortName: "AMLP (LP)",
    title: "Primary Learning",
    description:
      "Early-stage literacy, numeracy, and confidence building inside a caring, consistent environment.",
  },
  {
    code: "/05",
    shortName: "MMITE (TTI)",
    title: "Teacher Training",
    description:
      "The final layer of the continuum, preparing educators who can uphold structure, care, and quality.",
  },
];

export const modelPillars: ModelPillar[] = [
  {
    icon: "/icons/structured.png",
    title: "Structured Academics",
  },
  {
    icon: "/icons/teacher.png",
    title: "Teacher-Guided Attention",
  },
  {
    icon: "/icons/holistic.png",
    title: "Holistic Development",
  },
  {
    icon: "/icons/exposure.png",
    title: "Real-World Exposure",
  },
];

export const facultySystems: string[] = [
  "Teacher<br/>development<br/>programs",
  "CBSE and State<br/>training<br/>workshops",
  "Observation<br/>based<br/>evaluation",
  "SQAAF /<br/>quality<br/>frameworks",
  "Improvement Committees",
  "Curriculum alignment",
];

export const beyondCards: BeyondCard[] = [
  {
    code: "/01",
    title: "Stem clubs",
  },
  {
    code: "/02",
    title: "JCI & Rotary",
  },
  {
    code: "/03",
    title: "Training sessions",
  },
  {
    code: "/04",
    title: "Activity",
  },
];

export const impactCards: ImpactCard[] = [
  {
    code: "/01",
    title: "Free And Subsidised Education",
    description:
      "Improving access to learning for underrepresented and financially vulnerable communities.",
  },
  {
    code: "/02",
    title: "Healthcare Outreach",
    description:
      "Targeted welfare initiatives that support family wellbeing and community resilience.",
  },
  {
    code: "/03",
    title: "Educational Access",
    description:
      "Programs that widen the pathway into disciplined, high-quality institutions.",
  },
  {
    code: "/04",
    title: "Community Resilience",
    description:
      "Trust-led initiatives designed to strengthen social support systems around education.",
  },
];

export const data: PillarData[] = [
  {
    id: "pillar-1",
    label: "/01",
    title: "Education",
    desc: "Structured institutions, special needs schools, and teacher training programs expanding access and excellence.",
  },
  {
    id: "pillar-2",
    label: "/02",
    title: "Health & Sanitation",
    desc: "Preventive medical camps, surgical access, dialysis support, and sustainable public sanitation solutions.",
  },
  {
    id: "pillar-3",
    label: "/03",
    title: "Humanitarian & Rehabilitation",
    desc: "Housing, repatriation support, rehabilitation aid, and targeted livelihood initiatives for vulnerable communities.",
  },
  {
    id: "pillar-4",
    label: "/04",
    title: "Youth & Sports",
    desc: "National athlete support, professional sports patronage, and the development of the ERAM Sports Arena.",
  },
  {
    id: "pillar-5",
    label: "/05",
    title: "Environment",
    desc: "Water conservation, river restoration, check dams, and over 180 wells serving rural Palakkad communities.",
  },
  {
    id: "pillar-6",
    label: "/06",
    title: "Community Infrastructure & Welfare",
    desc: "Ambulance sponsorship, sanitation infrastructure, and interreligious harmony programs.",
  },
];
