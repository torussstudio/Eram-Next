import type { Metadata } from "next";
import dynamicImport from "next/dynamic";
import Hero from "@/components/sections/schools/mmite/Hero";

export const metadata: Metadata = {
  title: "MMITE — Mariyumma Memorial Institute of Teacher Education | ERAM Education",
  description:
    "D.El.Ed teacher training institute with 20+ years of preparing qualified educators. NCERT affiliated. 45/53 KTET passers in 2025.",
  openGraph: {
    title: "MMITE — Mariyumma Memorial Institute of Teacher Education",
    description: "20+ years of structured teacher preparation. NCERT affiliated.",
    images: [{ url: "/images/mmite.webp", width: 1200, height: 630 }],
  },
};


const Journey = dynamicImport(() => import("@/components/sections/schools/mmite/Journey"));
const Streams = dynamicImport(() => import("@/components/sections/schools/mmite/Streams"));
const AcademicStreams = dynamicImport(() => import("@/components/sections/schools/mmite/AcademicStreams"));
const ParentPartnership = dynamicImport(() => import("@/components/sections/schools/mmite/ParentPartnership"));
const BeyondAcademics = dynamicImport(() => import("@/components/sections/schools/mmite/BeyondAcademics"));
const GalleryPage = dynamicImport(() => import("@/components/sections/schools/mmite/GalleryPage"));
const CommunicationPortal = dynamicImport(() => import("@/components/sections/schools/mmite/CommunicationPortal"));
const AdmissionsPage = dynamicImport(() => import("@/components/sections/schools/mmite/AdmissionsPage"));

export default function MmitePage() {
  return (
    <main>
      {/* Above-the-fold */}
      <Hero />

      {/* Deferred segments */}
      <Journey />
      <Streams />
      <AcademicStreams />
      <ParentPartnership />
      <BeyondAcademics />
      <GalleryPage />
      <CommunicationPortal />
      <AdmissionsPage />
    </main>
  );
}
