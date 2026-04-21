import AboutHero from '../../components/sections/home/about-us/AboutHero'
import ERAMSportsArena from '../../components/sections/home/about-us/ERAMSportsArena'
import PurposeSection from '../../components/sections/home/about-us/PurposeSection'
import SpacesDesignedForOpportunity from '../../components/sections/home/about-us/SpacesDesignedForOpportunity'
import StructuredLearningSection from '../../components/sections/home/about-us/StructuredLearningSection'
import SystemsThatSustainExcellence from '../../components/sections/home/about-us/SystemsThatSustainExcellence'

export default function About() {
  return (
    <main>
      <AboutHero/>
      <PurposeSection/>
      <StructuredLearningSection/>
      <SystemsThatSustainExcellence/>
      <SpacesDesignedForOpportunity/>
      <ERAMSportsArena/>
    </main>
  )
}
