
import { lazy, Suspense } from "react";

// ✅ Keep Hero eager (critical paint)
import Hero from "../../components/sections/schools/mmite/Hero";

// ✅ Lazy load below-the-fold sections
const Journey = lazy(() =>
  import("../../components/sections/schools/mmite/Journey")
);

const AcademicStreams = lazy(() =>
  import("../../components/sections/schools/mmite/AcademicStreams")
);

const ParentPartnership = lazy(() =>
  import("../../components/sections/schools/mmite/ParentPartnership")
);

const BeyondAcademics = lazy(() =>
  import("../../components/sections/schools/mmite/BeyondAcademics")
);

const GalleryPage = lazy(() =>
  import("../../components/sections/schools/mmite/GalleryPage")
);

const CommunicationPortal = lazy(() =>
  import("../../components/sections/schools/mmite/CommunicationPortal")
);

const AdmissionsPage = lazy(() =>
  import("../../components/sections/schools/mmite/AdmissionsPage")
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