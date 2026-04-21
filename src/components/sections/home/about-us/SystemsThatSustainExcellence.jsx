export default function SystemsThatSustainExcellence() {
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

  return (
    <section className="bg-[#F5EFE8] py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* heading */}

        <div className="text-center max-w-[720px] mx-auto">
          <h2
            className="
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
relative

rounded-[26px]

overflow-hidden
"
          >
            <img
              src="/images/campus.jpg"
              alt="campus"
              className="
w-full

h-[260px]
md:h-[380px]

object-cover
"
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
