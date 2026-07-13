import type { Metadata } from "next";
import dynamicImport from "next/dynamic";
import Hero from "@/components/sections/schools/amlp/Hero";

export const metadata: Metadata = {
  title: "AMLP — Aided Mappila Lower Primary School | ERAM Education",
  description:
    "Established in 1924, AMLP is one of the oldest educational institutions in Palakkad. Government-aided primary school serving generations.",
  openGraph: {
    title: "AMLP — Aided Mappila Lower Primary School",
    description: "Est. 1924. One of the region's oldest institutions. 500+ students.",
    images: [{ url: "/images/amlp.avif", width: 1200, height: 630 }],
  },
};


const Journey = dynamicImport(() => import("@/components/sections/schools/amlp/Journey"));
const Streams = dynamicImport(() => import("@/components/sections/schools/amlp/Streams"));
const AcademicStreams = dynamicImport(() => import("@/components/sections/schools/amlp/AcademicStreams"));
const ParentPartnership = dynamicImport(() => import("@/components/sections/schools/amlp/ParentPartnership"));
const BeyondAcademics = dynamicImport(() => import("@/components/sections/schools/amlp/BeyondAcademics"));
const GalleryPage = dynamicImport(() => import("@/components/sections/schools/amlp/GalleryPage"));
const CommunicationPortal = dynamicImport(() => import("@/components/sections/schools/amlp/CommunicationPortal"));
const AdmissionsPage = dynamicImport(() => import("@/components/sections/schools/amlp/AdmissionsPage"));

export default function AmlpPage() {
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
        <BeyondAcademics school="amlp" />
      </div>
      <GalleryPage />
      <CommunicationPortal />
      <AdmissionsPage />
    </main>
  );
}
