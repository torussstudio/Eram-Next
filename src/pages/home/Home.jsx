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


import { lazy, Suspense } from "react";

import ArenaSection from "../../components/sections/home/ArenaSection"
import BeyondSection from "../../components/sections/home/BeyondSection"
import CTASection from "../../components/sections/home/CTASection"
import ExcellenceSection from "../../components/sections/home/ExcellenceSection"
import Hero from "../../components/sections/home/Hero"
import ImpactSection from "../../components/sections/home/ImpactSection"
import ModelSection from "../../components/sections/home/ModelSection"
import SystemsSection from "../../components/sections/home/SystemsSection"

const AboutSection = lazy(() => import("../../components/sections/home/AboutSection"));
const InstitutionsSection = lazy(() => import("../../components/sections/home/InstitutionsSection"));
// repeat for others

export default function Home() {
  return (
    <main>
      <Hero />

      <Suspense fallback={null}>
        <AboutSection />
        <InstitutionsSection />
        <SystemsSection />
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