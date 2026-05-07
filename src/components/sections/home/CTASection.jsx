import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ActionButton from "../../ui/ActionButton";
import { section, shell } from "../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const ctaRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
        },
      },
    );
  });

  return (
    <section
      id="contact"
      className={`${section} pt-[130px] max-[640px]:pt-[60px] pb-[110px] bg-[#F5EFE8]`}
    >
      <div
        ref={ctaRef}
        className={`
          ${shell}

          flex
          flex-col
          items-center
          justify-center

          text-center

          bg-white

          rounded-[32px]
          max-[640px]:rounded-[22px]

         pt-[80px] pb-[85px]
          max-[640px]:pt-[52px]
          max-[640px]:pb-[56px]

          px-[40px]
          max-[640px]:px-[18px]

          max-w-[1040px]

          mx-auto
        `}
      >
        {/* title */}
        <h2
          className="
            font-display

            text-[40px]

            leading-[1.15]

            tracking-[-0.02em]

            font-[600]

            text-[#111]

            mb-[10px]
            max-[640px]:text-[31px]
          "
        >
          Begin the Journey.
        </h2>

        {/* description */}
        <p
          className="
            text-[15px]

            text-black

            mb-[28px]
            max-[640px]:text-[14px]
            font-rethink
          "
        >
          Admissions are now open across our institutions.
        </p>

        {/* buttons */}
        <div
          className="
            flex

            gap-[14px]

            flex-wrap

            justify-center
            max-[640px]:w-full
          "
        >
          {/* primary */}
          <button
            className="
              h-[42px]

              px-[22px]

              text-[13px]

              tracking-[0.04em]

              rounded-[10px]

              bg-[#ae1431]

              text-white

              hover:opacity-90

              transition
              max-[640px]:w-full
              cursor-pointer
              font-rethink
            "
          >
            APPLY NOW
          </button>

          {/* secondary */}
          <button
            className="
              h-[42px]

              px-[22px]

              text-[13px]

              tracking-[0.04em]

              rounded-[10px]

              border

              border-black/40

              text-[#111]

              hover:bg-[#ae1431]
              hover:text-white

              transition
              max-[640px]:w-full
              cursor-pointer
              font-rethink
            "
          >
            BOOK A CAMPUS VISIT
          </button>
        </div>
      </div>
    </section>
  );
}
