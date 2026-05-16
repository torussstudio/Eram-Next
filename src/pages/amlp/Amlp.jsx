
import { lazy, Suspense } from "react";

// ✅ Keep Hero eager (critical paint)
import Hero from "../../components/sections/schools/amlp/Hero";

// ✅ Lazy load below-the-fold sections
const Journey = lazy(() =>
  import("../../components/sections/schools/amlp/Journey")
);

const AcademicStreams = lazy(() =>
  import("../../components/sections/schools/amlp/AcademicStreams")
);

const ParentPartnership = lazy(() =>
  import("../../components/sections/schools/amlp/ParentPartnership")
);

const BeyondAcademics = lazy(() =>
  import("../../components/sections/schools/amlp/BeyondAcademics")
);

const GalleryPage = lazy(() =>
  import("../../components/sections/schools/amlp/GalleryPage")
);

const CommunicationPortal = lazy(() =>
  import("../../components/sections/schools/amlp/CommunicationPortal")
);

const AdmissionsPage = lazy(() =>
  import("../../components/sections/schools/amlp/AdmissionsPage")
);

export default function Mmhss() {
  return (
    <main>
      {/* ✅ Above-the-fold */}
      <Hero />

      {/* ✅ Deferred sections */}
      <Suspense fallback={null}>
        <Journey />
        <AcademicStreams />
        <ParentPartnership />
        <BeyondAcademics />
        <GalleryPage />
        <CommunicationPortal />
        <AdmissionsPage />
      </Suspense>
    </main>
  );
}