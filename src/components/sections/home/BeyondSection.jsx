


import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ActionButton from "../../ui/ActionButton";
import { section, shell } from "../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

const beyondCards = [
  { code: "/01", title: "STEM CLUBS" },
  { code: "/02", title: "JCI & ROTARY" },
  { code: "/03", title: "TRAINING SESSIONS" },
  { code: "/04", title: "ACTIVITY" },
];

export default function BeyondSection() {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  useGSAP(() => {
    // Heading reveal
    gsap.fromTo('.beyond-heading',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Cards stagger
    gsap.fromTo('.beyond-card',
      { opacity: 0, x: 50 },
      {
        opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.beyond-cards-container',
          start: 'top 85%',
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="beyond"
      className={`${section} pt-[90px] pb-[120px] bg-[#ae1431]`}
    >

      <div className="mx-auto w-[min(1200px,calc(100vw-140px))] text-center">


        {/* title */}
        <h2
          className="
          beyond-heading
          font-display
          mb-[14px]

          text-[36px]
          font-[700]

          leading-[1.2]

          tracking-[-0.02em]

          text-[#f5efe8]

          max-[640px]:text-[28px]
          "
        >

          BEYOND THE CLASSROOM

        </h2>



        {/* description */}
        <p
          className="
          beyond-heading
          mx-auto

          mb-[26px]

          max-w-[560px]

          text-[14px]

          leading-[1.7]

          text-[#f5efe8]

          max-[640px]:text-[13px]
          "
        >

          Clubs, leadership forums, residential programs,
          state-level participation, curated experiences,
          learning that extends beyond textbooks.

        </p>



        {/* button */}
        <div className="beyond-heading mb-[48px] max-[640px]:mb-[34px]">

          <ActionButton
            variant="secondary"
            className="text-[#f5efe8] max-[640px]:!w-auto"
          >

            Explore Student Pathways

          </ActionButton>

        </div>



        {/* cards */}
        <div
          className="
          beyond-cards-container
          mx-auto

          mt-[48px]

          w-[85%]

          overflow-hidden

          max-[1100px]:w-[88%]

          max-[640px]:mt-[34px]
          max-[640px]:w-full
          "
        >

          <div
            className="
            flex

            snap-x
            snap-mandatory

            gap-[22px]

            overflow-x-auto

            pb-[16px]

            scrollbar-hide

            max-[640px]:gap-[12px]
            "
          >

            {beyondCards.map((card, index) => {

              const isActive = activeCard === index;

              return (

                <div
                  key={card.title}

                  onClick={() => setActiveCard(index)}

                  className={`
                  beyond-card
                  cursor-pointer

                  flex

                  h-[225px]
                  w-[350px]

                  flex-none

                  snap-start

                  flex-col
                  justify-between

                  rounded-[22px]

                  border

                  px-[30px]
                  py-[28px]

                  transition-all
                  duration-300

                  max-[640px]:h-[185px]
                  max-[640px]:w-[260px]

                  max-[640px]:rounded-[18px]

                  max-[640px]:px-[20px]
                  max-[640px]:py-[18px]

                  ${
                    isActive
                      ? "border-[#f5efe8] bg-[#f5efe8] text-[#ae1431]"
                      : "border-black/25 bg-transparent text-[#f5efe8]"
                  }
                  `}
                >


                  {/* number */}
                  <div
                    className="
                    flex

                    justify-start

                    text-[25px]

                    font-[700]

                    tracking-[0.16em]

                    opacity-70

                    max-[640px]:text-[19px]
                    "
                    style={{
                      color: isActive
                        ? "#ae1431"
                        : "#f5efe8"
                    }}
                  >

                    {card.code}

                  </div>



                  {/* title */}
                  <div
                    className="
                    flex

                    justify-end

                    text-center

                    text-[23px]

                    font-[500]

                    tracking-[0.01em]

                    max-[640px]:text-[18px]
                    "
                    style={{
                      color: isActive
                        ? "#ae1431"
                        : "#f5efe8"
                    }}
                  >

                    {card.title}

                  </div>


                </div>

              );

            })}

          </div>

        </div>



        {/* divider */}
        <div
          className="
          mx-auto

          mt-[60px]

          w-[85%]

          border-t-[2px]

          border-[#f5efe8]

          max-[1100px]:w-[88%]

          max-[640px]:mt-[40px]
          max-[640px]:w-full
          "
        />


      </div>

    </section>
  );

}