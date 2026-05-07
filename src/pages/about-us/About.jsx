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

// import { gsap, ScrollTrigger } from "../../lib/gsap";

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


import { lazy, Suspense } from "react";

// =========================
// ABOVE THE FOLD
// =========================

import AboutHero from "../../components/sections/about/AboutHero";
import PurposeSection from "../../components/sections/about/PurposeSection";

// =========================
// BELOW THE FOLD
// =========================

const StructuredLearningSection = lazy(() =>
  import(
    "../../components/sections/about/StructuredLearningSection"
  )
);

const SystemsThatSustainExcellence = lazy(() =>
  import(
    "../../components/sections/about/SystemsThatSustainExcellence"
  )
);

const SpacesDesignedForOpportunity = lazy(() =>
  import(
    "../../components/sections/about/SpacesDesignedForOpportunity"
  )
);

const ERAMSportsArena = lazy(() =>
  import(
    "../../components/sections/about/ERAMSportsArena"
  )
);

// =========================
// SKELETON
// =========================

function SectionSkeleton({
  height = "min-h-[80vh]",
}) {
  return (
    <section
      className={`
        w-full
        ${height}
        bg-white
        px-[20px]
        py-[80px]
        md:px-[40px]
        md:py-[120px]
      `}
    >
      <div className="mx-auto max-w-[1400px] animate-pulse">
        <div className="mb-5 h-4 w-[120px] rounded-full bg-[#ececec]" />

        <div className="space-y-4">
          <div className="h-12 w-full max-w-[500px] rounded-2xl bg-[#ececec]" />
          <div className="h-5 w-full max-w-[700px] rounded-xl bg-[#f2f2f2]" />
          <div className="h-5 w-full max-w-[620px] rounded-xl bg-[#f2f2f2]" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="h-[260px] rounded-[28px] bg-[#f3f3f3]" />
          <div className="h-[260px] rounded-[28px] bg-[#f3f3f3]" />
        </div>
      </div>
    </section>
  );
}

// =========================
// WRAPPER
// =========================

function LazySection({
  children,
  height,
}) {
  return (
    <Suspense
      fallback={<SectionSkeleton height={height} />}
    >
      {children}
    </Suspense>
  );
}

// =========================
// PAGE
// =========================

export default function About() {
  return (
    <main className="relative overflow-hidden bg-white">
      {/* Hero */}
      <AboutHero />

      {/* Immediate content */}
      <PurposeSection />

      {/* Lazy sections */}
      <LazySection height="min-h-[90vh]">
        <StructuredLearningSection />
      </LazySection>

      <LazySection height="min-h-[85vh]">
        <SystemsThatSustainExcellence />
      </LazySection>

      <LazySection height="min-h-[85vh]">
        <SpacesDesignedForOpportunity />
      </LazySection>

      <LazySection height="min-h-[80vh]">
        <ERAMSportsArena />
      </LazySection>
    </main>
  );
}