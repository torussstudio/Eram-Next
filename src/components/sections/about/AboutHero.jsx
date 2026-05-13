import { memo, useRef, useEffect } from "react";
import OptimizedImage from "../../ui/OptimizedImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import { shell } from "../../../constants/homeStyles";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);


function AboutHero() {
  const containerRef = useRef(null);

  const line0Ref = useRef(null);
  const line1Ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // HERO IMAGE SCALE
      tl.fromTo(
        ".hero-img",
        { scale: 1.15 },
        {
          scale: 1.08,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // HEADING REVEAL
      tl.fromTo(
        ".hero-heading-line",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=1"
      );

      // CONTENT FADE
      tl.to(
        ".hero-content-fade",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.8"
      );

      // PARALLAX — invalidateOnRefresh moved inside scrollTrigger ✅
      gsap.to(".hero-img", {
        y: 60,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true, // ✅ correct position
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={`${shell}  bg-[#F5EFE8] py-9`}
    >
      <div className="overflow-hidden rounded-[28px] shadow-sm transform-gpu [contain:paint] max-[767px]:outline max-[767px]:outline-[4px] max-[767px]:outline-[#F5EFE8]">
        {/* HERO */}
        <div className="relative min-h-[560px] sm:min-h-[620px] md:min-h-[660px] lg:min-h-[760px] w-full">

          {/* IMAGE */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="hero-img absolute inset-0 scale-110 will-change-transform transform-gpu">
              <OptimizedImage
                src="/images/about-hero.webp"
                onLoad={() => ScrollTrigger.refresh()}
                alt="students"
                className="block h-full w-full object-cover"
                loading="eager"
                sizes="100vw"
                disableTransition
              />
            </div>
          </div>

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40 sm:bg-black/35 md:bg-black/30" />

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-center md:items-center">

            {/* MOBILE / TABLET */}
            <div
              className="
                w-full flex flex-col items-center text-center text-white
                px-6 pb-10 sm:px-12 sm:pb-14
                md:hidden
              "
            >
              <h1 className="font-agency text-white font-light tracking-[-0.03em] leading-[0.95] text-[clamp(1.75rem,7vw,5.8rem)] -mt-16">

                <span className="block overflow-hidden pb-1">
                  <span
                    ref={line0Ref}
                    className="hero-heading-line block"
                  >
                    Building Foundations.
                  </span>
                </span>

                <span className="block overflow-hidden pb-1">
                  <span
                    ref={line1Ref}
                    className="hero-heading-line block"
                  >
                    Shaping Futures.
                  </span>
                </span>
              </h1>

              <p
                className="
                font-rethink
                  hero-content-fade mt-4
                  text-[0.8rem] sm:text-[0.9rem]
                  text-white/85 leading-[1.7]
                  max-w-[300px] sm:max-w-[420px]
                  opacity-0 translate-y-8
                "
              >
                Founded under the CSR vision of the Eram Group, ERAM
                Educational &amp; Welfare Trust was established to expand
                access to disciplined, value-based education across its
                institutions.
              </p>

              <button
                className="
                font-rethink
                  hero-content-fade mt-6
                  bg-white text-black
                  px-5 py-2.5 rounded-[12px]
                  text-xs font-medium
                  flex items-center gap-2
                  hover:bg-gray-200
                  transition
                  opacity-0 translate-y-8
                  cursor-pointer
                "
              >
                EXPLORE OUR INSTITUTIONS
                <Play className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* DESKTOP */}
            <div
              className="
                hidden md:block w-full text-white
                ml-[115px] lg:ml-[180px] pr-8
              "
            >
              <div className="max-w-[640px]">

                <h1
                  className="
                    font-display
                    leading-[1.05]
                    text-[clamp(2.2rem,4vw,3.5rem)]
                  "
                >
                  <span className="hero-heading-line">
                    A Legacy of Structure.
                  </span>
                  <span className="hero-heading-line">
                    A Future of Opportunity.
                  </span>
                </h1>

                <p
                  className="
                    hero-content-fade mt-6
                    text-[1.05rem]
                    text-white/90
                    leading-relaxed
                    opacity-0 translate-y-8
                    font-rethink
                  "
                >
                  Founded under the CSR vision of the Eram Group, ERAM
                  Educational &amp; Welfare Trust was established to expand
                  access to disciplined, value-based education while upholding
                  structured academic standards across its institutions.
                </p>

                <p
                  className="
                    hero-content-fade mt-4
                    text-[1rem]
                    text-white/90
                    leading-relaxed
                    opacity-0 translate-y-8
                    font-rethink
                  "
                >
                  More than a network of schools, ERAM represents a structured
                  educational ecosystem where governance, mentorship, and
                  infrastructure work in alignment to shape future-ready
                  individuals.
                </p>

               <button
  type="button"
  onClick={() => {
    navigate("/");

    setTimeout(() => {
      const section = document.getElementById("institutions");

      if (section) {
        const yOffset = -90;

        const y =
          section.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }, 700);
  }}
  className="
    hero-content-fade mt-8
    bg-white text-black
    px-6 py-3 rounded-[12px]
    text-sm font-medium
    flex items-center gap-2
    hover:bg-black hover:text-white
    transition
    opacity-0 translate-y-8
    cursor-pointer group
    font-rethink
  "
>
  EXPLORE OUR INSTITUTIONS

  <Play className="text-xs transition-all duration-300 group-hover:translate-x-1" />
</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AboutHero);