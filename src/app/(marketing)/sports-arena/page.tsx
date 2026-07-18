import React from "react";
import dynamicImport from "next/dynamic";
import Hero from "@/components/sections/explore-the-arena/Hero";

const PerformanceSection = dynamicImport(
  () => import("@/components/sections/explore-the-arena/PerformanceSection"),
  { ssr: true }
);

const AnchoredSection = dynamicImport(
  () => import("@/components/sections/explore-the-arena/AnchoredSection"),
  { ssr: true }
);

const CommunitySection = dynamicImport(
  () => import("@/components/sections/explore-the-arena/CommunitySection"),
  { ssr: true }
);

const ScaleSection = dynamicImport(
  () => import("@/components/sections/explore-the-arena/ScaleSection"),
  { ssr: true }
);

const ClosingSection = dynamicImport(
  () => import("@/components/sections/explore-the-arena/ClosingSection"),
  { ssr: true }
);

export default function ExploreArenaPage() {
  return (
    <main>
      {/* Above-the-fold */}
      <Hero />

      {/* Deferred segments */}
      <PerformanceSection />
      <AnchoredSection />
      <CommunitySection />
      <ScaleSection />
      <ClosingSection />
    </main>
  );
}
