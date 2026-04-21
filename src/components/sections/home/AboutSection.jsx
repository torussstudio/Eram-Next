

import { shell } from "../../../constants/homeStyles"

export default function AboutSection() {
  return (
    <section
      id="about-us"
      className="bg-[#ae1431] py-[100px]"
    >
      <div className={shell}>

        {/* Top Grid */}
        <div className="grid grid-cols-[300px_1fr] gap-x-[100px]

        max-[1100px]:grid-cols-1
        max-[1100px]:gap-y-[40px]">

          {/* label */}
          <div className="max-[1100px]:pl-0 pl-[100px]">
            <span className="text-[18px] tracking-[0.15em] uppercase text-[#f5efe8] font-medium">
              ABOUT US
            </span>
          </div>

          {/* content */}
          <div className="pl-[300px]

          max-[1280px]:pl-[160px]
          max-[1100px]:pl-0">

            <h2 className=" font-display text-[48px] leading-[1.15]  text-[#f5efe8]

            max-w-[600px]

            max-[640px]:text-[34px]">

              An Institutional
              <br />
              Movement of Purpose

            </h2>

            <p className="mt-[24px] text-[14.5px] leading-[1.75] text-[#f5efe8]

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
        <div className="mt-[80px]">

          {/* row 1 */}
          <div className="grid grid-cols-3 gap-[24px]

          max-[1100px]:grid-cols-2
          max-[640px]:grid-cols-1">

            {/* text block */}
            <div className="flex items-end

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
            <div className="rounded-[20px] bg-[#d8d8d8]

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

            <div className="rounded-[24px] bg-[#d8d8d8]

            min-h-[450px]">

            </div>



            <div className="rounded-[24px] bg-[#d8d8d8]

            min-h-[450px]">

            </div>

          </div>

        </div>



      </div>
    </section>
  )
}