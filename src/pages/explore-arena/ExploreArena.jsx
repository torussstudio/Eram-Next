import AnchoredSection from "../../components/sections/home/explore-the-arena/AnchoredSection";
import ClosingSection from "../../components/sections/home/explore-the-arena/ClosingSection";
import CommunitySection from "../../components/sections/home/explore-the-arena/CommunitySection";
import Hero from "../../components/sections/home/explore-the-arena/Hero";
import PerformanceSection from "../../components/sections/home/explore-the-arena/PerformanceSection";
import ScaleSection from "../../components/sections/home/explore-the-arena/ScaleSection";

export default function ExploreArena() {
  return (
    <main>
        <Hero/>
        <PerformanceSection/>
        <AnchoredSection/>
        <CommunitySection/>
        <ScaleSection/>
        <ClosingSection/>
    </main>
  );
}