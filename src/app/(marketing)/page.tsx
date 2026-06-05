import dynamicImport from "next/dynamic";
import Hero from "@/components/sections/home/Hero";

import AboutSection from "@/components/sections/home/AboutSection";
import SystemsSection from "@/components/sections/home/SystemsSection";
import InstitutionsSection from "@/components/sections/home/InstitutionsSection";

// Lazy-loaded sections with custom structural skeletons for optimal LCP and CLS
const ModelSection = dynamicImport(() => import("@/components/sections/home/ModelSection"), {
  loading: () => <SectionSkeleton height="min-h-[90vh]" />,
  ssr: true,
});

const ExcellenceSection = dynamicImport(() => import("@/components/sections/home/ExcellenceSection"), {
  loading: () => <SectionSkeleton height="min-h-[95vh]" />,
  ssr: true,
});

const BeyondSection = dynamicImport(() => import("@/components/sections/home/BeyondSection"), {
  loading: () => <SectionSkeleton height="min-h-[80vh]" />,
  ssr: true,
});

const ImpactSection = dynamicImport(() => import("@/components/sections/home/ImpactSection"), {
  loading: () => <SectionSkeleton height="min-h-[90vh]" />,
  ssr: true,
});

const ArenaSection = dynamicImport(() => import("@/components/sections/home/ArenaSection"), {
  loading: () => <SectionSkeleton height="min-h-[80vh]" />,
  ssr: true,
});

const CTASection = dynamicImport(() => import("@/components/sections/home/CTASection"), {
  loading: () => <SectionSkeleton height="min-h-[60vh]" />,
  ssr: true,
});

function SectionSkeleton({ height = "min-h-[80vh]" }: { height?: string }) {
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

export default function Home() {
  return (
    <main className="relative overflow-x-clip bg-white">
      {/* Above-the-fold */}
      <Hero />
      <AboutSection />
      <SystemsSection />
      
      {/* Below-the-fold */}
      <InstitutionsSection />
      <ModelSection />
      <ExcellenceSection />
      <BeyondSection />
      <ImpactSection />
      <ArenaSection />
      <CTASection />
    </main>
  );
}
