import type { Metadata } from "next";
import dynamicImport from "next/dynamic";
import Hero from "@/components/sections/schools/mmhss/Hero";

export const metadata: Metadata = {
  title: "MMHSS — Mariyumma Memorial Higher Secondary School | ERAM Education",
  description:
    "Top-ranked higher secondary school in Palakkad with 21 consecutive years of 100% pass rate. Offering Science, Commerce, and Humanities streams.",
  openGraph: {
    title: "MMHSS — Mariyumma Memorial Higher Secondary School",
    description: "Top 10 among 150 schools in Palakkad. 21 years, 100% pass rate.",
    images: [{ url: "/images/mmhss.avif", width: 1200, height: 630 }],
  },
};


const Journey = dynamicImport(() => import("@/components/sections/schools/mmhss/Journey"));
const Streams = dynamicImport(() => import("@/components/sections/schools/mmhss/Streams"));
const AcademicStreams = dynamicImport(() => import("@/components/sections/schools/mmhss/AcademicStreams"));
const ParentPartnership = dynamicImport(() => import("@/components/sections/schools/mmhss/ParentPartnership"));
const BeyondAcademics = dynamicImport(() => import("@/components/sections/schools/mmhss/BeyondAcademics"));
const GalleryPage = dynamicImport(() => import("@/components/sections/schools/mmhss/GalleryPage"));
const CommunicationPortal = dynamicImport(() => import("@/components/sections/schools/mmhss/CommunicationPortal"));
const AdmissionsPage = dynamicImport(() => import("@/components/sections/schools/mmhss/AdmissionsPage"));

export default function MmhssPage() {
  return (
    <main>
      {/* Above-the-fold */}
      <Hero />

      {/* Deferred segments */}
      <Journey />
      <Streams />
      <AcademicStreams />
      <ParentPartnership />
      <BeyondAcademics school="mmhss" />
      <GalleryPage />
      <CommunicationPortal />
      <AdmissionsPage />
    </main>
  );
}
