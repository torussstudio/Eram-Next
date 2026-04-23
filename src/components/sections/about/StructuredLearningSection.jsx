import { memo, useRef } from 'react'
import OptimizedImage from '../../ui/OptimizedImage'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPlay } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger)

function StructuredLearningSection() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // 1. Top Section Intro
    gsap.to('.structured-text', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%'
      }
    })

    gsap.to('.structured-btn', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%'
      }
    })

    // 2. Horizontal Cards - batch optimization
    gsap.to('.structured-card', {
      x: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.structured-scroll-container',
        start: 'top 85%'
      }
    })

    // 3. Leadership Section
    const leaderTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.leadership-container',
        start: 'top 75%'
      }
    })

    leaderTl.to('.leadership-text',
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }
    )

    leaderTl.to('.leadership-profile',
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out' },
      "-=0.7"
    )

    // Parallax on leader images - optimized with fastScrollEnd
    gsap.utils.toArray('.leadership-profile').forEach((profile) => {
      const img = profile.querySelector('.leadership-img')
      gsap.to(img, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: profile,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          fastScrollEnd: true
        }
      })
    })

    // 4. Bottom Text & Lists
    const listTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.leadership-bottom-text',
        start: 'top 85%'
      }
    })

    listTl.to('.leadership-bottom-heading',
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )

    listTl.to('.leadership-list-item',
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
      "-=0.5"
    )

    gsap.to('.structured-final',
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', 
        scrollTrigger: { trigger: '.structured-final', start: 'top 85%' }
      }
    )

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="bg-[#b5122b] text-white px-4 py-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
        {/* TOP GRID */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="max-w-[420px]">
            <h2 className="structured-text opacity-0 translate-y-8 font-display text-[30px] md:text-[38px] font-semibold leading-tight">
              Structured Learning.
              <br />
              Meaningful Growth.
            </h2>

            <p className="structured-text opacity-0 translate-y-8 mt-5 text-[14px] text-white/80 leading-relaxed">
              The Trust believes that excellence emerges from systems, not
              chance. Its institutions operate within a disciplined academic
              framework supported by:
            </p>

           <button className="structured-btn opacity-0 translate-y-5 mt-6 border border-white/60 px-5 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-white hover:text-[#b5122b] transition">
  EXPLORE MORE
  <FaPlay className="text-xs transition-colors" />
</button>
          </div>

          {/* RIGHT SCROLL CARDS */}
          <div className="structured-scroll-container overflow-hidden">
            <div
              className="
flex gap-5
overflow-x-auto
scroll-smooth
scrollbar-hide
pb-2
"
            >
              {/* CARD 1 */}
              <div
                className="
structured-card
relative

min-w-[300px]
md:min-w-[360px]

h-[220px]
md:h-[260px]

rounded-[20px]
overflow-hidden

flex-shrink-0
"
              >
                <OptimizedImage
                  src="/images/student.webp"
                  alt="student"
                  className="leadership-img w-full h-[115%] object-cover grayscale"
                  sizes="(max-width: 768px) 100vw, 360px"
                  disableTransition
                />

                <div className="absolute inset-0 bg-black/25" />

                <span className="absolute top-10 left-12 text-[18px] text-white">
                  /01
                </span>

                <p
                  className="
absolute
bottom-6
left-12
right-10

text-[18px]
md:text-[20px]

font-medium

leading-[1.35]

text-white

max-w-[260px]
"
                >
                  Rigorous curriculum alignment (State & CBSE)
                </p>
              </div>

              {/* CARD 2 */}
              <div
                className="
structured-card
opacity-0 translate-x-12
relative

min-w-[300px]
md:min-w-[360px]

h-[220px]
md:h-[260px]

rounded-[20px]
overflow-hidden

flex-shrink-0
"
              >
                <OptimizedImage
                  src="/images/teacher.webp"
                  alt="teacher"
                 className="leadership-img w-full h-[115%] object-cover grayscale"
                  sizes="(max-width: 768px) 100vw, 360px"
                  disableTransition
                />

                <div className="absolute inset-0 bg-black/25" />

                <span className="absolute top-10 left-12 text-[18px] text-white">
                  /02
                </span>

                <p
                  className="
absolute
bottom-9
left-12
right-10

text-[18px]
md:text-[20px]

font-medium

leading-[1.35]

text-white

max-w-[260px]
"
                >
                  Teacher-guided mentorship models
                </p>
              </div>

              {/* CARD 3 */}
              <div
                className="
structured-card
opacity-0 translate-x-12
relative

min-w-[300px]
md:min-w-[360px]

h-[220px]
md:h-[260px]

rounded-[20px]
overflow-hidden
transform-gpu

flex-shrink-0
"
              >
                <OptimizedImage
                  src="/images/student.webp"
                  alt="class"
                  className="leadership-img w-full h-[115%] object-cover grayscale"
                  sizes="(max-width: 768px) 100vw, 360px"
                  disableTransition
                />

                <div className="absolute inset-0 bg-black/25" />

                <span className="absolute top-10 left-12 text-[18px] text-white">
                  /03
                </span>

                <p
                  className="
absolute
bottom-6
left-6
right-10

text-[18px]
md:text-[20px]

font-medium

leading-[1.35]

text-white

max-w-[260px]
"
                >
                  Continuous evaluation & improvement cycles
                </p>
              </div>

 <div
                className="
structured-card
relative

min-w-[300px]
md:min-w-[360px]

h-[220px]
md:h-[260px]

rounded-[20px]
overflow-hidden

flex-shrink-0
"
              >
                <OptimizedImage
                  src="/images/student.webp"
                  alt="student"
                  className="leadership-img w-full h-[115%] object-cover grayscale"
                  sizes="(max-width: 768px) 100vw, 360px"
                  disableTransition
                />

                <div className="absolute inset-0 bg-black/25" />

                <span className="absolute top-10 left-12 text-[18px] text-white">
                  /04
                </span>

                <p
                  className="
absolute
bottom-6
left-12
right-10

text-[18px]
md:text-[20px]

font-medium

leading-[1.35]

text-white

max-w-[260px]
"
                >
                 Holistic integration of academics, sports, and culture 
                </p>
              </div>

 <div
                className="
structured-card
relative

min-w-[300px]
md:min-w-[360px]

h-[220px]
md:h-[260px]

rounded-[20px]
overflow-hidden

flex-shrink-0
"
              >
                <OptimizedImage
                  src="/images/teacher.webp"
                  alt="student"
                  className="leadership-img w-full h-[115%] object-cover grayscale"
                  sizes="(max-width: 768px) 100vw, 360px"
                  disableTransition
                />

                <div className="absolute inset-0 bg-black/25" />

                <span className="absolute top-10 left-12 text-[18px] text-white">
                  /05
                </span>

                <p
                  className="
absolute
bottom-6
left-12
right-10

text-[18px]
md:text-[20px]

font-medium

leading-[1.35]

text-white

max-w-[260px]
"
                >
                  Exposure-driven learning beyond textbooks 
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* divider */}
        <div className="my-16 border-t border-white/40" />

        {/* LEADERSHIP SECTION */}
        <div className="leadership-container grid md:grid-cols-2 gap-12 items-start">
          <h3
            className="
leadership-text
opacity-0 translate-y-8
font-display

text-[24px]
sm:text-[26px]
md:text-[32px]

font-semibold
leading-snug

ml-0
md:ml-[160px]
"
          >
            Strategic Leadership &
            <br />
            Academic Oversight
          </h3>

          <p
            className="
leadership-text
opacity-0 translate-y-8
text-[14px]
text-white/80
leading-relaxed

max-w-[420px]

ml-0
md:ml-[20px]
"
          >
            Trust leadership maintains direct engagement with Principals and
            Heads of Departments across institutions. Regular review meetings,
            academic planning sessions, and performance evaluations ensure that
            standards remain aligned and institutional goals are consistently
            monitored.
          </p>
        </div>

        {/* PROFILE CARDS */}
        <div
          className="
mt-12

grid
grid-cols-1
md:grid-cols-[460px_460px]

justify-center

gap-6
md:gap-8
"
        >
          <div
            className="
leadership-profile
opacity-0 translate-y-12
relative
rounded-[26px]
overflow-hidden
transform-gpu

w-full
max-w-[460px]
"
          >
            <div className="w-full h-[420px] md:h-[520px] overflow-hidden relative">
              <div className="leadership-img w-full h-[115%] absolute -top-[7.5%]">
                <OptimizedImage
                  src="/images/person1.webp"
                  alt="Dr. Siddeek Ahmed"
                 className="w-full h-full object-cover grayscale block object-[72%_center]"
                  sizes="(max-width: 768px) 100vw, 460px"
                  disableTransition
                />
              </div>
            </div>

            <div
              className="
absolute

bottom-6
left-6

w-[380px]
max-w-[90%]

bg-black/55
backdrop-blur-md

px-5
py-4

rounded-2xl
"
            >
              <p
                className="
text-[20px]

font-semibold

text-white

leading-tight
tracking-[0.2px]
"
              >
                Dr. Siddeek Ahmed
              </p>

              <p
                className="
mt-1

text-[13px]

text-white/75

font-medium

leading-snug
"
              >
                – President & Managing Trustee
              </p>
            </div>
          </div>

          <div
            className="
leadership-profile
opacity-0 translate-y-12
relative
rounded-[26px]
overflow-hidden
transform-gpu

w-full
max-w-[460px]
"
          >
            <div className="w-full h-[420px] md:h-[520px] overflow-hidden relative">
              <div className="leadership-img w-full h-[115%] absolute -top-[7.5%]">
                <OptimizedImage
                  src="/images/person2.webp"
                  alt="Mr. Abdussamod C K"
                   className="w-full h-full object-cover grayscale block object-[15%_center]"
                  sizes="(max-width: 768px) 100vw, 460px"
                  disableTransition
                />
              </div>
            </div>

            <div
              className="
absolute

bottom-6
left-6

w-[380px]
max-w-[90%]

bg-black/55
backdrop-blur-md

px-5
py-4

rounded-2xl
"
            >
              <p
                className="
text-[20px]

font-semibold

text-white

leading-tight
tracking-[0.2px]
"
              >
                Mr. Abdussamod C K
              </p>

              <p
                className="
mt-1

text-[13px]

text-white/75

font-medium

leading-snug
"
              >
                – Secretary & Manager
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM TEXT */}
        <div className="leadership-bottom-text mt-14 grid md:grid-cols-2 gap-10 items-start">
          <p
            className="
leadership-bottom-heading
opacity-0 translate-y-5
text-[16px]
md:text-[18px]

font-medium
text-white

ml-22
"
          >
            This governance structure
            <br />
            enables:
          </p>

          <ul
            className="
space-y-2

text-[13px]
text-white/80

ml-0
md:ml-[40px]
"
          >
            <li className="leadership-list-item opacity-0 translate-x-5">• Continuous academic supervision</li>
            <li className="leadership-list-item opacity-0 translate-x-5">• Institutional planning and performance monitoring</li>
            <li className="leadership-list-item opacity-0 translate-x-5">• Direct engagement with Principals & HODs</li>
            <li className="leadership-list-item opacity-0 translate-x-5">• Policy alignment across institutions</li>
            <li className="leadership-list-item opacity-0 translate-x-5">• Transparent operational practices</li>
            <li className="leadership-list-item opacity-0 translate-x-5">• Long-term strategic planning</li>
          </ul>
        </div>

        {/* FINAL LINE */}
        <h3
    className="
      structured-final
      opacity-0 translate-y-8
      mt-20

      text-[26px]
      sm:text-[30px]
      md:text-[40px]
      lg:text-[48px]

      font-medium
      leading-[1.18]

      text-white
      max-w-[980px]
      ml-0 md:ml-22
    "
  >
    The result is a unified educational system
    <br />
    supported by accountability and clarity.
  </h3>
      </div>
    </section>
  )
}

export default memo(StructuredLearningSection)
