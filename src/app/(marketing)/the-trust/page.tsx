"use client";

import React, { lazy, Suspense, useState } from "react";
import TrustHero from "@/components/sections/trust/TrustHero";

const CommitmentSection = lazy(() =>
  import("@/components/sections/trust/CommitmentSection")
);

const StructuredFramework = lazy(() =>
  import("@/components/sections/trust/StructuredFramework")
);

const EducationSection = lazy(() =>
  import("@/components/sections/trust/EducationSection")
);

const PhilosophySection = lazy(() =>
  import("@/components/sections/trust/PhilosophySection")
);

const LegacySection = lazy(() =>
  import("@/components/sections/trust/LegacySection")
);

export default function TheTrustPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <main>
      {/* Above-the-fold */}
      <TrustHero />

      {/* Deferred sections */}
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
