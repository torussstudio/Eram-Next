import { useState } from "react";

import CommitmentSection from "../../components/sections/trust/CommitmentSection";
import EducationSection from "../../components/sections/trust/EducationSection";
import LegacySection from "../../components/sections/trust/LegacySection";
import PhilosophySection from "../../components/sections/trust/PhilosophySection";
import StructuredFramework from "../../components/sections/trust/StructuredFramework";
import TrustHero from "../../components/sections/trust/TrustHero";

export default function TheTrust() {
  const [active, setActive] = useState(null); // ✅ MOVE STATE HERE

  return (
    <main>
      <TrustHero />
      <CommitmentSection />

      
      <StructuredFramework setActive={setActive} />

      
      <EducationSection active={active} setActive={setActive} />

      <PhilosophySection />
      <LegacySection />
    </main>
  );
}