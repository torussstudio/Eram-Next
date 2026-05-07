// import AcademicStreams from "../../components/sections/schools/mmhss/AcademicStreams";
// import AdmissionsPage from "../../components/sections/schools/mmhss/AdmissionsPage";
// import BeyondAcademics from "../../components/sections/schools/mmhss/BeyondAcademics";
// import CommunicationPortal from "../../components/sections/schools/mmhss/CommunicationPortal";
// import GalleryPage from "../../components/sections/schools/mmhss/GalleryPage";
// import Hero from "../../components/sections/schools/mmhss/Hero";
// import Journey from "../../components/sections/schools/mmhss/Journey";
// import ParentPartnership from "../../components/sections/schools/mmhss/ParentPartnership";

// export default function Mmhss(){
//     return(
//         <main>
//             <Hero />
//             <Journey />
//             <AcademicStreams />
//             <ParentPartnership />
//             <BeyondAcademics/>
//             <GalleryPage />
//             <CommunicationPortal/>
//             <AdmissionsPage />
//         </main>
//     )
// }


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