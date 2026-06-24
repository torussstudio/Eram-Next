// "use client";

// import React, { lazy, Suspense, useState } from "react";
// import TrustHero from "@/components/sections/trust/TrustHero";

// const CommitmentSection = lazy(() =>
//   import("@/components/sections/trust/CommitmentSection")
// );

// const StructuredFramework = lazy(() =>
//   import("@/components/sections/trust/StructuredFramework")
// );

// const EducationSection = lazy(() =>
//   import("@/components/sections/trust/EducationSection")
// );

// const PhilosophySection = lazy(() =>
//   import("@/components/sections/trust/PhilosophySection")
// );

// const LegacySection = lazy(() =>
//   import("@/components/sections/trust/LegacySection")
// );

// export default function TheTrustPage() {
//   const [active, setActive] = useState<number | null>(0);

//   return (
//     <main>
//       <TrustHero />

//       <Suspense fallback={null}>
//         <CommitmentSection />

//         <StructuredFramework setActive={setActive} />

//         <EducationSection
//           active={active}
//           setActive={setActive}
//         />

//         <PhilosophySection />

//         <LegacySection />
//       </Suspense>
//     </main>
//   );
// }



"use client";

import { useState } from "react";

import TrustHero from "@/components/sections/trust/TrustHero";
import CommitmentSection from "@/components/sections/trust/CommitmentSection";
import StructuredFramework from "@/components/sections/trust/StructuredFramework";
import EducationSection from "@/components/sections/trust/EducationSection";
import PhilosophySection from "@/components/sections/trust/PhilosophySection";
import LegacySection from "@/components/sections/trust/LegacySection";

export default function TheTrustPage() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <main>
      <TrustHero />

      <CommitmentSection />

      <StructuredFramework setActive={setActive} />

      <EducationSection
        active={active}
        setActive={setActive}
      />

      <PhilosophySection />

      <LegacySection />
    </main>
  );
}