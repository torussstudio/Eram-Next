// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // ✅ GSAP safe init
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
//   ScrollTrigger.config({ ignoreMobileResize: true });
// }


// import AboutHero from "../../components/sections/about/AboutHero";
// import PurposeSection from "../../components/sections/about/PurposeSection";
// import StructuredLearningSection from "../../components/sections/about/StructuredLearningSection";
// import SystemsThatSustainExcellence from "../../components/sections/about/SystemsThatSustainExcellence";
// import SpacesDesignedForOpportunity from "../../components/sections/about/SpacesDesignedForOpportunity";
// import ERAMSportsArena from "../../components/sections/about/ERAMSportsArena";

// export default function About() {
//   return (
//     <main>
//       <AboutHero />
//       <PurposeSection />
//       <StructuredLearningSection />
//       <SystemsThatSustainExcellence />
//       <SpacesDesignedForOpportunity />
//       <ERAMSportsArena />
//     </main>
//   );
// }

// src/pages/about-us/About.jsx

import { gsap, ScrollTrigger } from "../../lib/gsap";

import AboutHero from "../../components/sections/about/AboutHero";
import PurposeSection from "../../components/sections/about/PurposeSection";
import StructuredLearningSection from "../../components/sections/about/StructuredLearningSection";
import SystemsThatSustainExcellence from "../../components/sections/about/SystemsThatSustainExcellence";
import SpacesDesignedForOpportunity from "../../components/sections/about/SpacesDesignedForOpportunity";
import ERAMSportsArena from "../../components/sections/about/ERAMSportsArena";

export default function About() {
  return (
    <main>
      <AboutHero />
      <PurposeSection />
      <StructuredLearningSection />
      <SystemsThatSustainExcellence />
      <SpacesDesignedForOpportunity />
      <ERAMSportsArena />
    </main>
  );
}