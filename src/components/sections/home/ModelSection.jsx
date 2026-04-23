import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { facultySystems, modelPillars } from "../../../constants/homeData";

gsap.registerPlugin(ScrollTrigger);

export default function ModelSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Animate Triangle
      gsap.fromTo(
        ".model-triangle",
        { scale: 0.5, rotate: -15, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 0.75,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      );

      // Animate Heading
      gsap.fromTo(
        ".model-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".model-heading",
            start: "top 85%",
          },
        },
      );

      // Stagger Pillars
      gsap.fromTo(
        ".model-pillar",
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".model-pillars-container",
            start: "top 85%",
          },
        },
      );

      // Stagger Systems
      gsap.fromTo(
        ".model-system",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".model-systems-container",
            start: "top 80%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="
        bg-[#ae1431]
        py-[140px]

        relative
        overflow-hidden
        max-[900px]:py-[100px]
      "
      id="model"
    >
      {/* triangle background */}
      <div
        className="
          model-triangle
          absolute

          top-[40px]
          left-1/2
          -translate-x-1/2

          w-[420px]
          h-[320px]

          bg-[#f5efe8]

          opacity-[0.75]
          max-[640px]:w-[300px]
          max-[640px]:h-[220px]
        "
        style={{
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        }}
      />

      <div className="max-w-[1180px] mx-auto px-[24px] relative">
        {/* heading block */}
        <div
          className="

model-heading

max-w-[640px]

ml-auto

translate-x-[120px]

-translate-y-[110px]

max-[1100px]:translate-x-0

max-[900px]:-translate-y-[40px]

"
        >
          <h2
            className="

font-display



text-[52px]

leading-[1.05]

tracking-[-0.02em]

text-[#f5efe8]

max-[900px]:text-[42px]

max-[640px]:text-[32px]

"
          >
            The ERAM
            <br />
            Educational Model
          </h2>

          <p
            className="
              mt-[18px]

              text-[16px]
              leading-[1.7]

              text-black

              max-w-[520px]
              max-[900px]:text-[15px]
            "
          >
            Our academic framework combines a rigorous curriculum and a
            disciplined structure that supports every learner academically,
            culturally, and socially.
          </p>
        </div>

        {/* pillars container */}
        <div
          className="
            model-pillars-container
            mt-[70px]

            bg-[#f5efe8]

            rounded-[28px]

            px-[60px]
            py-[46px]

            grid
            grid-cols-4

            gap-[40px]

            max-[900px]:px-[26px]
            max-[900px]:py-[32px]
            max-[900px]:gap-[26px]
            max-[900px]:grid-cols-2
            max-[560px]:grid-cols-1
          "
        >
          {modelPillars.map((item, i) => (
            <div
              key={i}
              className="
                model-pillar
                text-center
              "
            >
              <div
                className="
                  h-[72px]

                  flex

                  items-center
                  justify-center

                  mb-[16px]
                "
              >
                <img
                  src={item.icon}
                  className="
                    h-[55px]

                    opacity-[0.9]
                  "
                />
              </div>

              <p
                className="
                  text-[17px]

                  leading-[1.4]

                  text-[#222]

                  font-[500]
                "
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* academic systems */}
        <div
          className="

model-systems-container

mt-[90px]

ml-[80px]

max-[1100px]:ml-[40px]

max-[900px]:ml-0

max-[900px]:mt-[70px]

"
        >
          <h3
            className="
    text-center
    text-[25px]

    tracking-[0.12em]

    font-[400]

    text-[#f5efe8]
    max-[900px]:text-[20px]
  "
          >
            ACADEMIC SYSTEMS & FACULTY DEVELOPMENT
          </h3>

          <div
            className="
    mt-[70px]

    grid
    grid-cols-4

    gap-[60px]

    max-[900px]:gap-[34px]
    max-[900px]:grid-cols-2
    max-[560px]:grid-cols-1
  "
          >
            {facultySystems.map((item, i) => (
              <div
                key={i}
                className="
        model-system
        relative

        pl-[26px]
        max-[560px]:pl-[18px]
      "
              >
                {/* divider line */}
                <span
                  className="
          absolute

          left-0
          top-[6px]

          h-[225px]

          w-[2px]

          bg-[#f5efe8]
          max-[560px]:h-[170px]
        "
                />

                {/* number */}
                <div
                  className="
          text-[25px]

          tracking-[0.16em]

          font-[500]

          text-[#f5efe8]
          max-[560px]:text-[20px]
        "
                >
                  /0{i + 1}
                </div>

                {/* text */}
                <p
                  className="
    mt-[100px]
    text-[26px]
    leading-[1.15]
    text-[#f5efe8]
    max-[900px]:mt-[72px]
    max-[900px]:text-[22px]
    max-[560px]:mt-[54px]
    max-[560px]:text-[20px]
  "
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
