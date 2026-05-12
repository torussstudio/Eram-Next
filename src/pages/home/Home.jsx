import { lazy, Suspense } from "react";

// ========================================
// ABOVE THE FOLD (EAGER LOAD)
// ========================================

import Hero from "../../components/sections/home/Hero";
import AboutSection from "../../components/sections/home/AboutSection";
import SystemsSection from "../../components/sections/home/SystemsSection";

// ========================================
// BELOW THE FOLD (LAZY LOAD)
// ========================================

const InstitutionsSection = lazy(() =>
  import("../../components/sections/home/InstitutionsSection")
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

// ========================================
// PRODUCTION READY SKELETON
// ========================================

function SectionSkeleton({
  height = "min-h-[80vh]",
}) {
  return (
    <section
      className={`
        relative overflow-hidden
        w-full
        ${height}
        bg-white
        px-[20px]
        py-[80px]
        md:px-[40px]
        md:py-[120px]
      `}
    >
      <div className="mx-auto w-full max-w-[1400px] animate-pulse">
        {/* Top label */}
        <div className="mb-5 h-4 w-[120px] rounded-full bg-[#ececec]" />

        {/* Heading */}
        <div className="space-y-4">
          <div className="h-12 w-full max-w-[520px] rounded-2xl bg-[#ececec]" />
          <div className="h-5 w-full max-w-[720px] rounded-xl bg-[#f2f2f2]" />
          <div className="h-5 w-full max-w-[650px] rounded-xl bg-[#f2f2f2]" />
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                h-[280px]
                rounded-[30px]
                border border-[#ededed]
                bg-[#f7f7f7]
              "
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================================
// REUSABLE LAZY WRAPPER
// ========================================

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

// ========================================
// HOME PAGE
// ========================================

export default function Home() {
  return (
    <main className="relative overflow-x-clip bg-white">
      {/* ========================================
          HERO
      ======================================== */}
      <Hero />

      {/* ========================================
          IMMEDIATE CONTENT
          (KEEP EAGER FOR UX + SEO)
      ======================================== */}
      <AboutSection />
      <SystemsSection />

      {/* ========================================
          BELOW THE FOLD
      ======================================== */}

      <LazySection height="min-h-[85vh]">
        <InstitutionsSection />
      </LazySection>

      <LazySection height="min-h-[90vh]">
        <ModelSection />
      </LazySection>

      <LazySection height="min-h-[95vh]">
        <ExcellenceSection />
      </LazySection>

      <LazySection height="min-h-[80vh]">
        <BeyondSection />
      </LazySection>

      <LazySection height="min-h-[90vh]">
        <ImpactSection />
      </LazySection>

      <LazySection height="min-h-[80vh]">
        <ArenaSection />
      </LazySection>

      <LazySection height="min-h-[60vh]">
        <CTASection />
      </LazySection>
    </main>
  );
}