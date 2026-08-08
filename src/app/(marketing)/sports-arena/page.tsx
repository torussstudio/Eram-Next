// import React from "react";
// import dynamicImport from "next/dynamic";
// import Hero from "@/components/sections/explore-the-arena/Hero";

// const PerformanceSection = dynamicImport(
//   () => import("@/components/sections/explore-the-arena/PerformanceSection"),
//   { ssr: true }
// );

// const AnchoredSection = dynamicImport(
//   () => import("@/components/sections/explore-the-arena/AnchoredSection"),
//   { ssr: true }
// );

// const CommunitySection = dynamicImport(
//   () => import("@/components/sections/explore-the-arena/CommunitySection"),
//   { ssr: true }
// );

// const ScaleSection = dynamicImport(
//   () => import("@/components/sections/explore-the-arena/ScaleSection"),
//   { ssr: true }
// );

// const ClosingSection = dynamicImport(
//   () => import("@/components/sections/explore-the-arena/ClosingSection"),
//   { ssr: true }
// );

// export default function ExploreArenaPage() {
//   return (
//     <main>
//       {/* Above-the-fold */}
//       <Hero />

//       {/* Deferred segments */}
//       <PerformanceSection />
//       <AnchoredSection />
//       <CommunitySection />
//       <ScaleSection />
//       <ClosingSection />
//     </main>
//   );
// }





"use client";

import React, { useEffect, useState } from "react";
import dynamicImport from "next/dynamic";
import Hero from "@/components/sections/explore-the-arena/Hero";
import HostEventModal from "@/components/sections/explore-the-arena/Hosteventmodal";

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

const HOST_MODAL_SEEN_KEY = "eram-sports-arena-host-modal-seen";
const HOST_MODAL_DELAY_MS = 10000;

export default function ExploreArenaPage() {
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);

  useEffect(() => {
    // Don't auto-pop again in the same tab/session once it's been shown.
    const alreadySeen = sessionStorage.getItem(HOST_MODAL_SEEN_KEY);
    if (alreadySeen) return;

    const timer = setTimeout(() => {
      setIsHostModalOpen(true);
      sessionStorage.setItem(HOST_MODAL_SEEN_KEY, "true");
    }, HOST_MODAL_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {/* Above-the-fold */}
      <Hero />

      {/* Deferred segments */}
      <PerformanceSection />
      <AnchoredSection />
      <CommunitySection />
      <ScaleSection />
      <ClosingSection onHostEventClick={() => setIsHostModalOpen(true)} />

      <HostEventModal
        isOpen={isHostModalOpen}
        onClose={() => setIsHostModalOpen(false)}
      />
    </main>
  );
}