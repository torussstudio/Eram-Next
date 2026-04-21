export default function SpacesDesignedForOpportunity() {
  return (
    <section className="bg-[#F5EFE8] py-16 md:py-24 px-5 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* heading */}
        <div className="max-w-[720px]">
          <h2
            className="
font-display

text-[32px]
sm:text-[40px]
md:text-[48px]

font-semibold

leading-[1.15]

tracking-[-0.02em]

text-black
"
          >
            Spaces Designed for Opportunity
          </h2>

          <p
            className="
mt-4

text-[14px]
md:text-[15px]

text-black/65

leading-[1.65]

max-w-[640px]
"
          >
            ERAM institutions are supported by purpose-built infrastructure that
            strengthens both academic and extracurricular engagement. Facilities
            across campuses include:
          </p>
        </div>

        {/* layout */}
        <div className="mt-12 md:mt-16 flex flex-col lg:flex-row gap-5 md:gap-6">
          {/* LEFT CARD */}
          <div
            className="
relative

w-full
lg:w-[360px]

h-[420px]
sm:h-[480px]
lg:h-[520px]

rounded-[24px]
md:rounded-[28px]

overflow-hidden

shrink-0
"
          >
            <img
              src="/images/classroom.jpg"
              alt=""
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/35" />

            <p
              className="
absolute

bottom-6
sm:bottom-8
lg:bottom-10

left-6
sm:left-8

text-white

text-[22px]
sm:text-[24px]
lg:text-[26px]

leading-[1.25]

font-medium

max-w-[200px]
sm:max-w-[220px]
lg:max-w-[230px]
"
            >
              Modern classrooms
              <br />
              & well-equipped
              <br />
              laboratories
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-5 md:gap-6 flex-1">
            {/* TOP WIDE */}
            <div
              className="
relative

h-[200px]
sm:h-[220px]
md:h-[240px]

rounded-[24px]
md:rounded-[28px]

overflow-hidden
"
            >
              <img
                src="/images/sports.jpg"
                alt=""
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/35" />

              <p
                className="
absolute

bottom-6
sm:bottom-8
lg:bottom-10

left-6
sm:left-8
lg:left-10

text-white

text-[20px]
sm:text-[22px]
lg:text-[26px]

leading-[1.25]

font-medium

max-w-[260px]
sm:max-w-[340px]
lg:max-w-[420px]
"
              >
                Dedicated sports grounds &
                <br />
                athletics facilities
              </p>
            </div>

            {/* BOTTOM GRID */}
            <div className="flex flex-col sm:flex-row gap-5 md:gap-6">
              {/* amphitheatre */}
              <div
                className="
relative

flex-1

h-[200px]
sm:h-[220px]
md:h-[240px]

rounded-[24px]
md:rounded-[28px]

overflow-hidden
"
              >
                <img
                  src="/images/auditorium.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/35" />

                <p
                  className="
absolute

bottom-6
sm:bottom-7
lg:bottom-8

left-6
sm:left-7
lg:left-8

text-white

text-[18px]
sm:text-[20px]
lg:text-[22px]

leading-[1.25]

font-medium

max-w-[170px]
sm:max-w-[190px]
lg:max-w-[210px]
"
                >
                  Amphitheatre &
                  <br />
                  cultural
                  <br />
                  performance spaces
                </p>
              </div>

              {/* transport */}
              <div
                className="
relative

flex-1

h-[200px]
sm:h-[220px]
md:h-[240px]

rounded-[24px]
md:rounded-[28px]

overflow-hidden
"
              >
                <img
                  src="/images/bus.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/35" />

                <p
                  className="
absolute

bottom-6
sm:bottom-7
lg:bottom-8

left-6
sm:left-7
lg:left-8

text-white

text-[18px]
sm:text-[20px]
lg:text-[22px]

leading-[1.25]

font-medium

max-w-[150px]
sm:max-w-[170px]
lg:max-w-[190px]
"
                >
                  Structured
                  <br />
                  transport &
                  <br />
                  safety systems
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
