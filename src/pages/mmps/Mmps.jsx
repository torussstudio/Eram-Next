
import { lazy, Suspense } from "react";

// ✅ Keep Hero eager (critical paint)
import Hero from "../../components/sections/schools/mmps/Hero";

// ✅ Lazy load below-the-fold sections
const Journey = lazy(() =>
  import("../../components/sections/schools/mmps/Journey")
);

const AcademicStreams = lazy(() =>
  import("../../components/sections/schools/mmps/AcademicStreams")
);

const ParentPartnership = lazy(() =>
  import("../../components/sections/schools/mmps/ParentPartnership")
);

const BeyondAcademics = lazy(() =>
  import("../../components/sections/schools/mmps/BeyondAcademics")
);

const GalleryPage = lazy(() =>
  import("../../components/sections/schools/mmps/GalleryPage")
);

const CommunicationPortal = lazy(() =>
  import("../../components/sections/schools/mmps/CommunicationPortal")
);

const AdmissionsPage = lazy(() =>
  import("../../components/sections/schools/mmps/AdmissionsPage")
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