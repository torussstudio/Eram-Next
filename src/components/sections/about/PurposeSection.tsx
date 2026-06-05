"use client";

import { memo, useEffect, useRef } from "react";
import OptimizedImage from "../../ui/OptimizedImage";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function PurposeSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  const items = [
    {
      title: (
        <>
          Expanding equitable <br /> access to education
        </>
      ),
      icon: "/icons/access.webp",
    },
    {
      title: (
        <>
          Upholding uncompromising <br /> academic rigor
        </>
      ),
      icon: "/icons/rigor.webp",
    },
    {
      title: (
        <>
          Supporting holistic <br /> student development
        </>
      ),
      icon: "/icons/development.webp",
    },
    {
      title: (
        <>
          Serving communities <br /> with institutional responsibility
        </>
      ),
      icon: "/icons/community.webp",
    },
  ];

  useGSAP(
    () => {
      // Top text reveal - faster stagger
      gsap.to(".purpose-text", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Grid reveal (image + list)
      const gridTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".purpose-grid",
          start: "top 75%",
          invalidateOnRefresh: true,
        },
      });

      gridTl.to(".purpose-image", {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gridTl.to(
        ".purpose-items h3",
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=1",
      );

      gridTl.to(
        ".purpose-item",
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.8",
      );

      gridTl.to(
        ".purpose-btn",
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="bg-[#F5EFE8] px-4 py-6 md:py-10">
      <div
        className="
    max-w-[1200px]

    ml-4
    sm:ml-8
    md:ml-16
    lg:ml-[180px]
    xl:ml-[300px]
    "
      >
        {/* heading */}
        <div className="max-w-[460px] md:max-w-[520px] lg:max-w-[660px]">
          <h2 className="purpose-text opacity-0 translate-y-10 font-display text-[36px] md:text-[36px] lg:text-[44px]  leading-tight text-black">
            Purpose Led.
            <br />
            Community Grounded.
          </h2>

          <p className="font-rethink purpose-text opacity-0 translate-y-10 mt-5 md:mt-6 text-[14.5px] md:text-[15px] leading-relaxed text-black/70">
            ERAM Educational & Welfare Trust was formed as the educational and
            social responsibility arm of the Eram Group. Its founding vision was
            clear: to create structured academic institutions that provide
            meaningful access to education, particularly for underserved and
            backward communities.
          </p>

          <p className="font-rethink purpose-text opacity-0 translate-y-10 mt-3 md:mt-4 text-[14.5px] md:text-[15px] leading-relaxed text-black/70">
            The Trust operates with the belief that excellence is sustained
            through systems. From foundational schooling to higher secondary
            education and professional teacher training, ERAM has built an
            integrated ecosystem where discipline, mentorship, and opportunity
            coexist.
          </p>
        </div>

        {/* grid */}
        <div
          className="
      purpose-grid
      mt-12 md:mt-16

      grid
      md:grid-cols-2

      gap-10 md:gap-14

      items-center
      "
        >
          {/* image */}
          <div className="purpose-image opacity-0 translate-y-8 scale-95 rounded-[22px] overflow-hidden transform-gpu">
            <div className="aspect-[4/3] w-full">
              <OptimizedImage
                src="/images/campus.webp"
                alt="campus"
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                disableTransition
              />
            </div>
          </div>

          {/* right content */}
          <div className="purpose-items">
            <h3 className="font-rethink text-[18px] md:text-[20px] font-medium text-black mb-6 md:mb-8 opacity-0 translate-y-5">
              Across its institutions, the
              <br />
              Trust remains committed to:
            </h3>

            <div className="space-y-5 md:space-y-6">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="
  purpose-item
  opacity-0
  translate-x-8

  flex
  items-start

  gap-[12px]

  md:items-center
  md:gap-4
"
                >
                 <div
  className="
    flex-shrink-0

    w-[46px]
    h-[46px]

    md:w-14
    md:h-14

    rounded-full
    bg-[#ae1431]

    flex
    items-center
    justify-center

    mt-[2px]
    md:mt-0
  "
>
                  <OptimizedImage
  src={item.icon}
  alt=""
  className="
    w-[22px]
    h-[22px]

    md:w-8
    md:h-8

    object-contain
  "
  sizes="25px"
  disableTransition
/>
                  </div>

                 <p
  className="
    text-[13px]
    md:text-[14px]

    font-medium

    text-black/85

    leading-[1.42]

    pt-[2px]
    md:pt-0
  "
>
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            <button
              className="
    purpose-btn
    opacity-0 translate-y-4
    mt-7 md:mt-8

    border
    border-black/40

    px-5
    py-2

    rounded-[10px]

    text-[13px]
    md:text-sm

    font-medium

    flex
    items-center
    gap-2

    hover:bg-[#ae1431]
    hover:text-white

    transition
    cursor-pointer
    font-rethink
  "
            >
              EXPLORE MORE
              <Play className="text-xs transition-all duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(PurposeSection);
