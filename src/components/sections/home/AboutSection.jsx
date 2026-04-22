

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shell } from "../../../constants/homeStyles";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Reveal top text
    gsap.fromTo('.about-text', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Reveal grid items
    gsap.fromTo('.about-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 80%',
        }
      }
    );
  });
  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="bg-[#ae1431] py-[100px]"
    >
      <div className="mx-auto w-[min(1320px,calc(100vw-120px))]">

        {/* Top Grid */}
        <div className="grid grid-cols-[300px_1fr] gap-x-[100px]

        max-[1100px]:grid-cols-1
        max-[1100px]:gap-y-[40px]">

          {/* label */}
          <div className="about-text max-[1100px]:pl-0 pl-[100px]">
            <span className="text-[18px] tracking-[0.15em] uppercase text-[#f5efe8] font-medium">
              ABOUT US
            </span>
          </div>

          {/* content */}
          <div className="pl-[300px]

          max-[1280px]:pl-[160px]
          max-[1100px]:pl-0">

            <h2 className="about-text font-display text-[48px] leading-[1.15]  text-[#f5efe8]

            max-w-[600px]

            max-[640px]:text-[34px]">

              An Institutional
              <br />
              Movement of Purpose

            </h2>

            <p className="about-text mt-[24px] text-[14.5px] leading-[1.75] text-[#f5efe8]

            max-w-[520px]">

              ERAM Education was established to build disciplined, value-based
              institutions that expand access to quality learning and reach
              communities that need it most. Founded under the CSR vision of the
              Eram Group of Companies, it upholds structured academic standards
              while serving communities with integrity.

            </p>

          </div>

        </div>



        {/* cards */}
        <div className="about-grid mt-[80px]">

          {/* row 1 */}
          <div className="grid grid-cols-3 gap-[24px]

          max-[1100px]:grid-cols-2
          max-[640px]:grid-cols-1">

            {/* text block */}
            <div className="about-card flex items-end

            min-h-[380px]

            pb-[115px]

            pl-[140px]

            max-[1280px]:pl-[60px]
            max-[1100px]:pl-0
            max-[1100px]:pb-[40px]">

              <p className=" font-display text-[32px] leading-[1.25]  text-[#f5efe8]

              max-[640px]:text-[26px]">

                Committed
                <br />
                to Access.
                <br />
                Dedicated to
                <br />
                Excellence

              </p>

            </div>



            {/* card */}
            <div className="about-card rounded-[20px] bg-[#d8d8d8]

            min-h-[420px]">

            </div>



            {/* card */}
            <div className="rounded-[20px] bg-[#d8d8d8]

            min-h-[420px]">

            </div>

          </div>



          {/* row 2 */}
          <div className="grid grid-cols-3 gap-[24px] mt-[24px]

          max-[1100px]:grid-cols-2
          max-[640px]:grid-cols-1">

            <div className="about-card rounded-[24px] bg-[#d8d8d8]

            min-h-[450px]">

            </div>



            <div className="about-card rounded-[24px] bg-[#d8d8d8]

            min-h-[450px]">

            </div>

          </div>

        </div>



      </div>
    </section>
  )
}