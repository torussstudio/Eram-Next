import dynamicImport from "next/dynamic";
import AboutHero from "@/components/sections/about/AboutHero";
import PurposeSection from "@/components/sections/about/PurposeSection";
import EramJourneyTimeline from "@/components/sections/about/VisionPage";

const StructuredLearningSection = dynamicImport(
  () => import("@/components/sections/about/StructuredLearningSection"),
  {
    loading: () => <SectionSkeleton height="min-h-[90vh]" />,
    ssr: true,
  }
);

const SystemsThatSustainExcellence = dynamicImport(
  () => import("@/components/sections/about/SystemsThatSustainExcellence"),
  {
    loading: () => <SectionSkeleton height="min-h-[85vh]" />,
    ssr: true,
  }
);

const SpacesDesignedForOpportunity = dynamicImport(
  () => import("@/components/sections/about/SpacesDesignedForOpportunity"),
  {
    loading: () => <SectionSkeleton height="min-h-[85vh]" />,
    ssr: true,
  }
);

const ERAMSportsArena = dynamicImport(
  () => import("@/components/sections/about/ERAMSportsArena"),
  {
    loading: () => <SectionSkeleton height="min-h-[80vh]" />,
    ssr: true,
  }
);

function SectionSkeleton({ height = "min-h-[80vh]" }: { height?: string }) {
  return (
    <section
      className={`
        w-full
        ${height}
        bg-white
        px-[20px]
        py-[80px]
        md:px-[40px]
        md:py-[120px]
      `}
    >
      <div className="mx-auto max-w-[1400px] animate-pulse">
        <div className="mb-5 h-4 w-[120px] rounded-full bg-[#ececec]" />

        <div className="space-y-4">
          <div className="h-12 w-full max-w-[500px] rounded-2xl bg-[#ececec]" />
          <div className="h-5 w-full max-w-[700px] rounded-xl bg-[#f2f2f2]" />
          <div className="h-5 w-full max-w-[620px] rounded-xl bg-[#f2f2f2]" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="h-[260px] rounded-[28px] bg-[#f3f3f3]" />
          <div className="h-[260px] rounded-[28px] bg-[#f3f3f3]" />
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-white">
      <AboutHero />
      <PurposeSection />
      <EramJourneyTimeline />
      <StructuredLearningSection />
      <SystemsThatSustainExcellence />
      <SpacesDesignedForOpportunity />
      <ERAMSportsArena />
    </main>
  );
}
