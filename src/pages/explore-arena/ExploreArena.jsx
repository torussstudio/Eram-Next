// import AnchoredSection from "../../components/sections/home/explore-the-arena/AnchoredSection";
// import ClosingSection from "../../components/sections/home/explore-the-arena/ClosingSection";
// import CommunitySection from "../../components/sections/home/explore-the-arena/CommunitySection";
// import Hero from "../../components/sections/home/explore-the-arena/Hero";
// import PerformanceSection from "../../components/sections/home/explore-the-arena/PerformanceSection";
// import ScaleSection from "../../components/sections/home/explore-the-arena/ScaleSection";

// export default function ExploreArena() {
//   return (
//     <main>
//         <Hero/>
//         <PerformanceSection/>
//         <AnchoredSection/>
//         <CommunitySection/>
//         <ScaleSection/>
//         <ClosingSection/>
//     </main>
//   );
// }

import { lazy, Suspense } from "react";

// ✅ Keep Hero eager (above-the-fold)
import Hero from "../../components/sections/home/explore-the-arena/Hero";

// ✅ Lazy load below-the-fold sections
const PerformanceSection = lazy(() =>
  import("../../components/sections/home/explore-the-arena/PerformanceSection")
);

const AnchoredSection = lazy(() =>
  import("../../components/sections/home/explore-the-arena/AnchoredSection")
);

const CommunitySection = lazy(() =>
  import("../../components/sections/home/explore-the-arena/CommunitySection")
);

const ScaleSection = lazy(() =>
  import("../../components/sections/home/explore-the-arena/ScaleSection")
);

const ClosingSection = lazy(() =>
  import("../../components/sections/home/explore-the-arena/ClosingSection")
);

export default function ExploreArena() {
  return (
    <main>
      {/* ✅ Above-the-fold */}
      <Hero />

      {/* ✅ Deferred sections */}
      <Suspense fallback={null}>
        <PerformanceSection />
        <AnchoredSection />
        <CommunitySection />
        <ScaleSection />
        <ClosingSection />
      </Suspense>
    </main>
  );
}