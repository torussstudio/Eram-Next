import { lazy, Suspense } from "react";

// ✅ Keep Hero eager (critical paint)
import Hero from "../../components/sections/schools/mmhss/Hero";

// ✅ Lazy load below-the-fold sections
const Journey = lazy(() =>
  import("../../components/sections/schools/mmhss/Journey")
);

const AcademicStreams = lazy(() =>
  import("../../components/sections/schools/mmhss/AcademicStreams")
);

const Streams = lazy(() =>
  import("../../components/sections/schools/mmhss/Streams")
);

const ParentPartnership = lazy(() =>
  import("../../components/sections/schools/mmhss/ParentPartnership")
);

const BeyondAcademics = lazy(() =>
  import("../../components/sections/schools/mmhss/BeyondAcademics")
);

const GalleryPage = lazy(() =>
  import("../../components/sections/schools/mmhss/GalleryPage")
);

const CommunicationPortal = lazy(() =>
  import("../../components/sections/schools/mmhss/CommunicationPortal")
);

const AdmissionsPage = lazy(() =>
  import("../../components/sections/schools/mmhss/AdmissionsPage")
);

export default function Mmhss() {
  return (
    <main>
      {/* ✅ Above-the-fold */}
      <Hero />

      {/* ✅ Deferred sections */}
      <Suspense fallback={null}>
        <Journey />
        <Streams/>
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