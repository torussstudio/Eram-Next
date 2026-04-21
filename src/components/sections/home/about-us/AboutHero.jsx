import { memo } from 'react'
import OptimizedImage from '../../../ui/OptimizedImage'

function AboutHero() {
  return (
    <section className="bg-[#F5EFE8] py-9 px-4">
      <div className="max-w-[1400px] mx-auto">
        {/* Rounded container */}
        <div className="rounded-[28px] overflow-hidden shadow-sm">
          {/* HERO */}
          <div className="relative h-[560px] md:h-[760px] w-full">
            {/* Background Image */}
            <OptimizedImage
              src="/images/about-hero.jpg"
              alt="students"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              sizes="100vw"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="ml-6 md:ml-48 text-white">
                <div className="max-w-[520px]">
                  <h1 className="font-display text-3xl md:text-5xl font-semibold leading-tight">
                    A Legacy of Structure.
                    <br />A Future of Opportunity.
                  </h1>

                  <p className="mt-4 text-sm md:text-base text-white/90 leading-relaxed">
                    Founded under the CSR vision of the Eram Group, ERAM
                    Educational & Welfare Trust was established to expand access
                    to disciplined, value-based education while upholding
                    structured academic standards across its institutions.
                  </p>

                  <button className="mt-6 bg-white text-black px-5 py-2.5 rounded-[10px] text-sm font-medium flex items-center gap-2 hover:bg-gray-200 transition">
                    EXPLORE OUR INSTITUTIONS
                    <span>▶</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(AboutHero)
