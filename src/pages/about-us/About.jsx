// import { lazy, Suspense } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.config({ ignoreMobileResize: true });

// const AboutHero = lazy(
//   () => import("../../components/sections/about/AboutHero"),
// );
// const PurposeSection = lazy(
//   () => import("../../components/sections/about/PurposeSection"),
// );
// const StructuredLearningSection = lazy(
//   () => import("../../components/sections/about/StructuredLearningSection"),
// );
// const SystemsThatSustainExcellence = lazy(
//   () => import("../../components/sections/about/SystemsThatSustainExcellence"),
// );
// const SpacesDesignedForOpportunity = lazy(
//   () => import("../../components/sections/about/SpacesDesignedForOpportunity"),
// );
// const ERAMSportsArena = lazy(
//   () => import("../../components/sections/about/ERAMSportsArena"),
// );

// // Loading fallback component
// function LoadingFallback() {
//   return (
//     <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center">
//       <div className="text-center">
//         <div className="inline-block animate-spin">
//           <div className="w-8 h-8 border-4 border-[#ae1431] border-t-transparent rounded-full"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function About() {
//   return (
//     <main>
//       <Suspense fallback={<LoadingFallback />}>
//         <AboutHero />
//       </Suspense>
//       <Suspense fallback={null}>
//         <PurposeSection />
//       </Suspense>
//       <Suspense fallback={null}>
//         <StructuredLearningSection />
//       </Suspense>
//       <Suspense fallback={null}>
//         <SystemsThatSustainExcellence />
//       </Suspense>
//       <Suspense fallback={null}>
//         <SpacesDesignedForOpportunity />
//       </Suspense>
//       <Suspense fallback={null}>
//         <ERAMSportsArena />
//       </Suspense>
//     </main>
//   );
// }

// import { lazy, Suspense, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // ✅ GSAP safe init
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
//   ScrollTrigger.config({ ignoreMobileResize: true });
// }

// // ✅ Critical sections (no lazy)
// import AboutHero from "../../components/sections/about/AboutHero";
// import PurposeSection from "../../components/sections/about/PurposeSection";

// // ✅ Lazy only heavy sections
// const StructuredLearningSection = lazy(() =>
//   import("../../components/sections/about/StructuredLearningSection")
// );
// const SystemsThatSustainExcellence = lazy(() =>
//   import("../../components/sections/about/SystemsThatSustainExcellence")
// );
// const SpacesDesignedForOpportunity = lazy(() =>
//   import("../../components/sections/about/SpacesDesignedForOpportunity")
// );
// const ERAMSportsArena = lazy(() =>
//   import("../../components/sections/about/ERAMSportsArena")
// );

// // ✅ Small loader (not full screen)
// function SectionLoader() {
//   return (
//     <div className="py-10 flex justify-center">
//       <div className="w-6 h-6 border-4 border-[#ae1431] border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );
// }

// export default function About() {
//   // ✅ Preload for smooth scroll experience
//   useEffect(() => {
//     import("../../components/sections/about/StructuredLearningSection");
//     import("../../components/sections/about/SystemsThatSustainExcellence");
//     import("../../components/sections/about/SpacesDesignedForOpportunity");
//     import("../../components/sections/about/ERAMSportsArena");
//   }, []);

//   return (
//     <main>
//       {/* Instant render */}
//       <AboutHero />
//       <PurposeSection />

//       {/* Lazy group */}
//       <Suspense fallback={<SectionLoader />}>
//         <StructuredLearningSection />
//         <SystemsThatSustainExcellence />
//         <SpacesDesignedForOpportunity />
//         <ERAMSportsArena />
//       </Suspense>
//     </main>
//   );
// }


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ✅ GSAP safe init
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// ✅ Import all sections normally (NO lazy)
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