import { memo, useRef } from "react";
import OptimizedImage from "../../ui/OptimizedImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SystemsThatSustainExcellence() {
  const containerRef = useRef(null);

  const items = [
    {
      number: "/01",
      title: (
        <>
          Teacher
          <br />
          development
          <br />
          programs
        </>
      ),
    },
    {
      number: "/02",
      title: (
        <>
          CBSE & State
          <br />
          Board training
          <br />
          workshops
        </>
      ),
    },
    {
      number: "/03",
      title: (
        <>
          WHO-certified
          <br />
          teacher training
          <br />
          initiatives
        </>
      ),
    },
    {
      number: "/04",
      title: (
        <>
          Observation
          <br />
          based evaluation
          <br />
          systems
        </>
      ),
    },
  ];

  useGSAP(
    () => {
      // Heading
      gsap.to(".systems-text", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      });

      // Features grid
      gsap.to(".system-item", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".system-grid", start: "top 80%" },
      });

      // Image container reveal
      gsap.to(".system-img-wrap", {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: { trigger: ".system-img-wrap", start: "top 85%" },
      });

      // Image parallax scrub
    gsap.to(".system-img", {
  yPercent: 10,
  ease: "none",
  scrollTrigger: {
    trigger: ".system-img-wrap",
    start: "top bottom",
    end: "bottom top",
    scrub: 0.2
  },
})

      // Image overlay description
      gsap.to(".system-desc", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".system-img-wrap", start: "top 60%" },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="bg-[#F5EFE8] py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* heading */}
        <div className="text-center max-w-[720px] mx-auto">
          <h2
            className="
systems-text
opacity-0 translate-y-8
font-display

text-[34px]
md:text-[44px]

font-semibold

leading-tight

text-black
"
          >
            Systems That Sustain Excellence
          </h2>

          <p
            className="
systems-text
opacity-0 translate-y-8
mt-4

text-[15px]

text-black/70

leading-relaxed
"
          >
            The Trust integrates comprehensive academic systems that support
            consistency and continuous improvement, including:
          </p>
        </div>

        {/* features */}
        <div
          className="
system-grid
mt-20

grid
grid-cols-2
md:grid-cols-4

gap-y-14
gap-x-10
"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="
system-item
opacity-0 translate-y-10
relative

pl-6

border-l
border-black/30

min-h-[140px]
md:min-h-[170px]
"
            >
              <p
                className="
text-[18px]

text-black/70

mb-6
"
              >
                {item.number}
              </p>

              <p
                className="
mt-17

text-[20px]

font-medium

leading-[1.35]

text-black
"
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* image block */}
        <div className="mt-20">
          <div
            className="
system-img-wrap
opacity-0 scale-[0.95]
relative

rounded-[26px]

overflow-hidden
"
          >
            <OptimizedImage
              src="/images/campus.webp"
              alt="campus"
className="system-img will-change-transform w-full h-[320px] md:h-[480px] object-cover"
              sizes="100vw"
              disableTransition
            />

            <div
              className="
absolute
inset-0

bg-black/35
"
            />

            <p
              className="
system-desc
opacity-0 translate-y-5
absolute

inset-0

flex
items-center
justify-center

px-6

text-center

text-white

text-[18px]
md:text-[22px]

leading-relaxed

max-w-[760px]

mx-auto
"
            >
              These systems ensure that faculty remain professionally equipped,
              students receive guided mentorship, and institutional standards
              are maintained across all campuses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(SystemsThatSustainExcellence);
