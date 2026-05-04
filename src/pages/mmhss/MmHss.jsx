import AcademicStreams from "../../components/sections/schools/mmhss/AcademicStreams";
import AdmissionsPage from "../../components/sections/schools/mmhss/AdmissionsPage";
import BeyondAcademics from "../../components/sections/schools/mmhss/BeyondAcademics";
import CommunicationPortal from "../../components/sections/schools/mmhss/CommunicationPortal";
import GalleryPage from "../../components/sections/schools/mmhss/GalleryPage";
import Hero from "../../components/sections/schools/mmhss/Hero";
import Journey from "../../components/sections/schools/mmhss/Journey";
import ParentPartnership from "../../components/sections/schools/mmhss/ParentPartnership";

export default function Mmhss(){
    return(
        <main>
            <Hero />
            <Journey />
            <AcademicStreams />
            <ParentPartnership />
            <BeyondAcademics/>
            <GalleryPage />
            <CommunicationPortal/>
            <AdmissionsPage />
        </main>
    )
}