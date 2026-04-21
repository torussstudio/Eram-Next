export default function StructuredLearningSection() {
  return (
    <section className="bg-[#b5122b] text-white px-4 py-20 overflow-hidden">
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
        {/* TOP GRID */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="max-w-[420px]">
            <h2 className="font-display text-[30px] md:text-[38px] font-semibold leading-tight">
              Structured Learning.
              <br />
              Meaningful Growth.
            </h2>

            <p className="mt-5 text-[14px] text-white/80 leading-relaxed">
              The Trust believes that excellence emerges from systems, not
              chance. Its institutions operate within a disciplined academic
              framework supported by:
            </p>

            <button className="mt-6 border border-white/60 px-5 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-white hover:text-[#b5122b] transition">
              EXPLORE MORE
              <span>▶</span>
            </button>
          </div>

          {/* RIGHT SCROLL CARDS */}
          <div className="overflow-hidden">
            <div
              className="
flex gap-5
overflow-x-auto
scroll-smooth
scrollbar-hide
pb-2
"
            >
              {/* CARD 1 */}
              <div
                className="
relative

min-w-[300px]
md:min-w-[360px]

h-[220px]
md:h-[260px]

rounded-[20px]
overflow-hidden

flex-shrink-0
"
              >
                <img
                  src="/images/student.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/25" />

                <span className="absolute top-10 left-12 text-[18px] text-white">
                  /01
                </span>

                <p
                  className="
absolute
bottom-6
left-12
right-10

text-[18px]
md:text-[20px]

font-medium

leading-[1.35]

text-white

max-w-[260px]
"
                >
                  Rigorous curriculum alignment (State & CBSE)
                </p>
              </div>

              {/* CARD 2 */}
              <div
                className="
relative

min-w-[300px]
md:min-w-[360px]

h-[220px]
md:h-[260px]

rounded-[20px]
overflow-hidden

flex-shrink-0
"
              >
                <img
                  src="/images/teacher.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/25" />

                <span className="absolute top-10 left-12 text-[18px] text-white">
                  /02
                </span>

                <p
                  className="
absolute
bottom-9
left-12
right-10

text-[18px]
md:text-[20px]

font-medium

leading-[1.35]

text-white

max-w-[260px]
"
                >
                  Teacher-guided mentorship
                </p>
              </div>

              {/* CARD 3 */}
              <div
                className="
relative

min-w-[300px]
md:min-w-[360px]

h-[220px]
md:h-[260px]

rounded-[20px]
overflow-hidden

flex-shrink-0
"
              >
                <img
                  src="/images/class.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/25" />

                <span className="absolute top-5 left-5 text-[13px] text-white/70">
                  /03
                </span>

                <p
                  className="
absolute
bottom-6
left-6
right-10

text-[18px]
md:text-[20px]

font-medium

leading-[1.35]

text-white

max-w-[260px]
"
                >
                  Continuous assessment structure
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="my-16 border-t border-white/40" />

        {/* LEADERSHIP SECTION */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <h3
            className="
font-display

text-[24px]
sm:text-[26px]
md:text-[32px]

font-semibold
leading-snug

ml-0
md:ml-[160px]
"
          >
            Strategic Leadership &
            <br />
            Academic Oversight
          </h3>

          <p
            className="
text-[14px]
text-white/80
leading-relaxed

max-w-[420px]

ml-0
md:ml-[20px]
"
          >
            Trust leadership maintains direct engagement with Principals and
            Heads of Departments across institutions. Regular review meetings,
            academic planning sessions, and performance evaluations ensure that
            standards remain aligned and institutional goals are consistently
            monitored.
          </p>
        </div>

        {/* PROFILE CARDS */}
        <div
          className="
mt-12

grid
grid-cols-1
md:grid-cols-[460px_460px]

justify-center

gap-6
md:gap-8
"
        >
          <div
            className="
relative
rounded-[26px]
overflow-hidden

w-full
max-w-[460px]
"
          >
            <img
              src="/images/person1.jpg"
              alt="person"
              className="
w-full

h-[420px]
md:h-[520px]

object-cover
object-[75%_center]

grayscale
"
            />

            <div
              className="
absolute

bottom-6
left-6

w-[380px]

bg-black/55
backdrop-blur-md

px-5
py-4

rounded-2xl
"
            >
              <p
                className="
text-[20px]

font-semibold

text-white

leading-tight
tracking-[0.2px]
"
              >
                Dr. Siddeek Ahmed
              </p>

              <p
                className="
mt-1

text-[13px]

text-white/75

font-medium

leading-snug
"
              >
                – President & Managing Trustee
              </p>
            </div>
          </div>

          <div
            className="
relative
rounded-[26px]
overflow-hidden

w-full
max-w-[460px]
"
          >
            <img
              src="/images/person2.jpg"
              alt=""
              className="
w-full

h-[420px]
md:h-[520px]

object-cover
object-[10%_center]

grayscale
"
            />

            <div
              className="
absolute

bottom-6
left-6

w-[380px]

bg-black/55
backdrop-blur-md

px-5
py-4

rounded-2xl
"
            >
              <p
                className="
text-[20px]

font-semibold

text-white

leading-tight
tracking-[0.2px]
"
              >
                Mr. Abdussamod C K
              </p>

              <p
                className="
mt-1

text-[13px]

text-white/75

font-medium

leading-snug
"
              >
                – Secretary & Manager
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM TEXT */}
        <div className="mt-14 grid md:grid-cols-2 gap-10 items-start">
          <p
            className="
text-[16px]
md:text-[18px]

font-medium
text-white

ml-0
md:ml-[160px]
"
          >
            This governance structure
            <br />
            enables:
          </p>

          <ul
            className="
space-y-2

text-[13px]
text-white/80

ml-0
md:ml-[40px]
"
          >
            <li>• Continuous academic supervision</li>
            <li>• Institutional planning and performance monitoring</li>
            <li>• Direct engagement with Principals & HODs</li>
            <li>• Policy alignment across institutions</li>
            <li>• Transparent operational practices</li>
            <li>• Long-term strategic planning</li>
          </ul>
        </div>

        {/* FINAL LINE */}
        <h3
          className="
mt-20

text-[26px]
sm:text-[30px]
md:text-[40px]
lg:text-[48px]

font-sm

leading-[1.18]

text-white

max-w-[980px]


md:ml-[30px]
lg:ml-[80px]
xl:ml-[150px]
"
        >
          The result is a unified educational system
          <br />
          supported by accountability and clarity.
        </h3>
      </div>
    </section>
  );
}
