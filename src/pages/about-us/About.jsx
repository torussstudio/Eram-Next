import { lazy, Suspense } from 'react'

const AboutHero = lazy(() => import('../../components/sections/about/AboutHero'))
const PurposeSection = lazy(() => import('../../components/sections/about/PurposeSection'))
const StructuredLearningSection = lazy(() => import('../../components/sections/about/StructuredLearningSection'))
const SystemsThatSustainExcellence = lazy(() => import('../../components/sections/about/SystemsThatSustainExcellence'))
const SpacesDesignedForOpportunity = lazy(() => import('../../components/sections/about/SpacesDesignedForOpportunity'))
const ERAMSportsArena = lazy(() => import('../../components/sections/about/ERAMSportsArena'))

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin">
          <div className="w-8 h-8 border-4 border-[#ae1431] border-t-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <main>
      <Suspense fallback={<LoadingFallback />}>
        <AboutHero />
      </Suspense>
      <Suspense fallback={null}>
        <PurposeSection />
      </Suspense>
      <Suspense fallback={null}>
        <StructuredLearningSection />
      </Suspense>
      <Suspense fallback={null}>
        <SystemsThatSustainExcellence />
      </Suspense>
      <Suspense fallback={null}>
        <SpacesDesignedForOpportunity />
      </Suspense>
      <Suspense fallback={null}>
        <ERAMSportsArena />
      </Suspense>
    </main>
  )
}
