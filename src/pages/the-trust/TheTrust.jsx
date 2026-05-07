// import { useState } from "react";

// import CommitmentSection from "../../components/sections/trust/CommitmentSection";
// import EducationSection from "../../components/sections/trust/EducationSection";
// import LegacySection from "../../components/sections/trust/LegacySection";
// import PhilosophySection from "../../components/sections/trust/PhilosophySection";
// import StructuredFramework from "../../components/sections/trust/StructuredFramework";
// import TrustHero from "../../components/sections/trust/TrustHero";

// export default function TheTrust() {
//   const [active, setActive] = useState(null); // ✅ MOVE STATE HERE

//   return (
//     <main>
//       <TrustHero />
//       <CommitmentSection />

//       <StructuredFramework setActive={setActive} />

//       <EducationSection active={active} setActive={setActive} />

//       <PhilosophySection />
//       <LegacySection />
//     </main>
//   );
// }



import { lazy, Suspense, useState } from "react";

// ✅ Keep Hero eager
import TrustHero from "../../components/sections/trust/TrustHero";

// ✅ Lazy load below-the-fold sections
const CommitmentSection = lazy(() =>
  import("../../components/sections/trust/CommitmentSection")
);

const StructuredFramework = lazy(() =>
  import("../../components/sections/trust/StructuredFramework")
);

const EducationSection = lazy(() =>
  import("../../components/sections/trust/EducationSection")
);

const PhilosophySection = lazy(() =>
  import("../../components/sections/trust/PhilosophySection")
);

const LegacySection = lazy(() =>
  import("../../components/sections/trust/LegacySection")
);

export default function TheTrust() {
  const [active, setActive] = useState(null);

  return (
    <main>
      {/* ✅ Above-the-fold */}
      <TrustHero />

      {/* ✅ Deferred sections */}
      <Suspense fallback={null}>
        <CommitmentSection />

        <StructuredFramework setActive={setActive} />

        <EducationSection
          active={active}
          setActive={setActive}
        />

        <PhilosophySection />

        <LegacySection />
      </Suspense>
    </main>
  );
}