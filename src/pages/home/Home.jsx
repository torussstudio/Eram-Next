// import AboutSection from "../../components/sections/home/AboutSection"
// import ArenaSection from "../../components/sections/home/ArenaSection"
// import BeyondSection from "../../components/sections/home/BeyondSection"
// import CTASection from "../../components/sections/home/CTASection"
// import ExcellenceSection from "../../components/sections/home/ExcellenceSection"
// import Hero from "../../components/sections/home/Hero"
// import ImpactSection from "../../components/sections/home/ImpactSection"
// import InstitutionsSection from "../../components/sections/home/InstitutionsSection"
// import ModelSection from "../../components/sections/home/ModelSection"
// import SystemsSection from "../../components/sections/home/SystemsSection"

// export default function Home() {
//   return (
//     <main>
//       <Hero />
//       <AboutSection />
//       <InstitutionsSection />
//       <SystemsSection />
//       <ModelSection />
//       <ExcellenceSection />
//       <BeyondSection />
//       <ImpactSection />
//       <ArenaSection />
//       <CTASection />
//     </main>
//   )
// }


// import { lazy, Suspense } from "react";

// import ArenaSection from "../../components/sections/home/ArenaSection"
// import BeyondSection from "../../components/sections/home/BeyondSection"
// import CTASection from "../../components/sections/home/CTASection"
// import ExcellenceSection from "../../components/sections/home/ExcellenceSection"
// import Hero from "../../components/sections/home/Hero"
// import ImpactSection from "../../components/sections/home/ImpactSection"
// import ModelSection from "../../components/sections/home/ModelSection"
// import SystemsSection from "../../components/sections/home/SystemsSection"

// const AboutSection = lazy(() => import("../../components/sections/home/AboutSection"));
// const InstitutionsSection = lazy(() => import("../../components/sections/home/InstitutionsSection"));
// // repeat for others

// export default function Home() {
//   return (
//     <main>
//       <Hero />

//       <Suspense fallback={null}>
//         <AboutSection />
//         <SystemsSection />
//         <InstitutionsSection />
//         <ModelSection />
//         <ExcellenceSection />
//         <BeyondSection />
//         <ImpactSection />
//         <ArenaSection />
//         <CTASection />
//       </Suspense>
//     </main>
//   );
// }




import { lazy, Suspense } from "react";

// Keep Hero eager (important for LCP)
import Hero from "../../components/sections/home/Hero";

// Lazy load BELOW-THE-FOLD sections
const AboutSection = lazy(() =>
  import("../../components/sections/home/AboutSection")
);

const InstitutionsSection = lazy(() =>
  import("../../components/sections/home/InstitutionsSection")
);

const SystemsSection = lazy(() =>
  import("../../components/sections/home/SystemsSection")
);

const ModelSection = lazy(() =>
  import("../../components/sections/home/ModelSection")
);

const ExcellenceSection = lazy(() =>
  import("../../components/sections/home/ExcellenceSection")
);

const BeyondSection = lazy(() =>
  import("../../components/sections/home/BeyondSection")
);

const ImpactSection = lazy(() =>
  import("../../components/sections/home/ImpactSection")
);

const ArenaSection = lazy(() =>
  import("../../components/sections/home/ArenaSection")
);

const CTASection = lazy(() =>
  import("../../components/sections/home/CTASection")
);

export default function Home() {
  return (
    <main>
      {/* ✅ Critical above-the-fold */}
      <Hero />

      {/* ✅ Below-the-fold lazy content */}
      <Suspense fallback={null}>
        <AboutSection />
         <SystemsSection />
        <InstitutionsSection />
       
        <ModelSection />
        <ExcellenceSection />
        <BeyondSection />
        <ImpactSection />
        <ArenaSection />
        <CTASection />
      </Suspense>
    </main>
  );
}