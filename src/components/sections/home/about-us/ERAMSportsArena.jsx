import { memo } from 'react'
import OptimizedImage from '../../../ui/OptimizedImage'

function ERAMSportsArena() {
  return (
    <section className="bg-[#F5EFE8] px-5 sm:px-6 py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto">
        {/* TOP HEADER */}

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <h2
            className="
font-display

text-[30px]
sm:text-[34px]
md:text-[44px]

font-semibold

leading-[1.2]

text-black
"
          >
            The ERAM
            <br />
            Sports Arena
          </h2>

          <p
            className="
text-[14px]
md:text-[15px]

text-black/70

leading-[1.65]

max-w-[600px]
"
          >
            The ERAM Sports Arena further reflects the Trust’s long-term
            commitment to athletics and community engagement. Designed to
            support institutional competitions and external sporting events, the
            Arena marks a significant milestone in integrating sports excellence
            within the educational ecosystem.
          </p>
        </div>

        {/* IMAGE CARD */}

        <div className="mt-10 md:mt-14">
          <div
            className="
relative

rounded-[24px]
md:rounded-[28px]

overflow-hidden
"
          >
            <OptimizedImage
              src="/images/sports-ground.jpg"
              alt="sports"
              className="w-full h-[260px] sm:h-[320px] md:h-[480px] object-cover"
              sizes="100vw"
            />

            <div className="absolute inset-0 bg-black/30" />

            <p
              className="
absolute

bottom-6
sm:bottom-10
md:bottom-[60px]

left-6
sm:left-10
md:left-20

right-6
md:right-10

text-white

text-[14px]
sm:text-[16px]
md:text-[22px]

font-semibold

leading-[1.4]

max-w-[260px]
sm:max-w-[360px]
md:max-w-[520px]
"
            >
              Infrastructure at ERAM is planned not for scale alone, but for
              sustained opportunity.
            </p>
          </div>
        </div>

        {/* CTA BLOCK */}

        <div className="mt-10 md:mt-14">
          <div
            className="
relative

rounded-[24px]
md:rounded-[28px]

overflow-hidden
"
          >
            <OptimizedImage
              src="/images/classroom-dark.jpg"
              alt="cta"
              className="w-full h-[220px] sm:h-[260px] md:h-[320px] object-cover"
              sizes="100vw"
            />

            <div className="absolute inset-0 bg-black/60" />

            <div
              className="
absolute inset-0

flex flex-col

items-center
justify-center

text-center

px-5 sm:px-6
"
            >
              <p
                className="
text-white/90

text-[14px]
sm:text-[15px]
md:text-[16px]

font-medium

leading-[1.65]

max-w-[320px]
sm:max-w-[460px]
md:max-w-[560px]

mx-auto
"
              >
                ERAM Educational & Welfare Trust continues to build an
                integrated educational ecosystem rooted in discipline, guided by
                responsibility, & strengthened by community engagement.
              </p>

              <div className="mt-5 md:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  className="
bg-[#b5122b]

text-white

px-5
py-2.5

rounded-lg

text-sm

font-medium

hover:opacity-90

transition
"
                >
                  ADMISSIONS OPEN
                </button>

                <button
                  className="
border border-white/60

text-white

px-5
py-2.5

rounded-lg

text-sm

font-medium

hover:bg-white
hover:text-black

transition
"
                >
                  EXPLORE OUR INSTITUTIONS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(ERAMSportsArena)
