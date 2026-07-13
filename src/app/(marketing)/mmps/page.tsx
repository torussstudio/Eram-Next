import type { Metadata } from "next";
import dynamicImport from "next/dynamic";
import Hero from "@/components/sections/schools/mmps/Hero";

export const metadata: Metadata = {
  title: "MMPS — Mariyumma Memorial Public School | ERAM Education",
  description:
    "High school in Palakkad with 14 consecutive years of 100% pass rate. 750+ students. Strong academics with sports excellence.",
  openGraph: {
    title: "MMPS — Mariyumma Memorial Public School",
    description: "20+ years of operation. 100% pass rate. 750+ students.",
    images: [{ url: "/images/mmps.webp", width: 1200, height: 630 }],
  },
};

const Journey = dynamicImport(
  () => import("@/components/sections/schools/mmps/Journey"),
);
const Streams = dynamicImport(
  () => import("@/components/sections/schools/mmps/Streams"),
);
const AcademicStreams = dynamicImport(
  () => import("@/components/sections/schools/mmps/AcademicStreams"),
);
const ParentPartnership = dynamicImport(
  () => import("@/components/sections/schools/mmps/ParentPartnership"),
);
const BeyondAcademics = dynamicImport(
  () => import("@/components/sections/schools/mmps/BeyondAcademics"),
);
const GalleryPage = dynamicImport(
  () => import("@/components/sections/schools/mmps/GalleryPage"),
);
const CommunicationPortal = dynamicImport(
  () => import("@/components/sections/schools/mmps/CommunicationPortal"),
);
const AdmissionsPage = dynamicImport(
  () => import("@/components/sections/schools/mmps/AdmissionsPage"),
);

export default function MmpsPage() {
  return (
    <main>
      {/* Above-the-fold */}
      <Hero />

      {/* Deferred segments */}
      <Journey />
      <Streams />
      <AcademicStreams />
      <ParentPartnership />
      <div className="mt-8 md:mt-12 lg:mt-16">
        <BeyondAcademics school="mmps" />
      </div>
      <GalleryPage />
      <CommunicationPortal />
      <AdmissionsPage />
    </main>
  );
}
