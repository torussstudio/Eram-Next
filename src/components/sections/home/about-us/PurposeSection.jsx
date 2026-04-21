export default function PurposeSection() {
  const items = [
    {
      title: (
        <>
          Expanding <br /> educational access
        </>
      ),
      icon: "/icons/access.png",
    },
    {
      title: (
        <>
          Ensuring <br /> academic rigor
        </>
      ),
      icon: "/icons/rigor.png",
    },
    {
      title: (
        <>
          Supporting <br /> holistic development
        </>
      ),
      icon: "/icons/development.png",
    },
    {
      title: (
        <>
          Serving communities <br /> with responsibility
        </>
      ),
      icon: "/icons/community.png",
    },
  ];

  return (
    <section className="bg-[#F5EFE8] px-4 py-14 md:py-20">
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
          <h2 className="font-display text-[28px] md:text-[34px] lg:text-[40px] font-semibold leading-tight text-black">
            Purpose Led.
            <br />
            Community Grounded.
          </h2>

          <p className="mt-5 md:mt-6 text-[14px] md:text-[15px] leading-relaxed text-black/70">
            ERAM Educational & Welfare Trust was formed as the educational and
            social responsibility arm of the Eram Group. Its founding vision was
            clear: to create structured academic institutions that provide
            meaningful access to education, particularly for underserved and
            backward communities.
          </p>

          <p className="mt-3 md:mt-4 text-[14px] md:text-[15px] leading-relaxed text-black/70">
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
      mt-12 md:mt-16

      grid
      md:grid-cols-2

      gap-10 md:gap-14

      items-center
      "
        >
          {/* image */}
          <img
            src="/images/campus.jpg"
            alt="campus"
            className="
        w-full

        h-[420px]
        sm:h-[360px]
        md:h-[400px]
        lg:h-[460px]

        object-cover
        rounded-[22px]
        "
          />

          {/* right content */}
          <div>
            <h3 className="text-[18px] md:text-[20px] font-medium text-black mb-6 md:mb-8">
              Across its institutions, the
              <br />
              Trust remains committed to:
            </h3>

            <div className="space-y-5 md:space-y-6">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 md:gap-4">
                  <div
                    className="
                w-12 h-12
                md:w-14 md:h-14

                rounded-full
                bg-[#ae1431]

                flex
                items-center
                justify-center
                "
                  >
                    <img
                      src={item.icon}
                      alt=""
                      className="
                  w-6 h-6
                  md:w-8 md:h-8

                  object-contain
                  "
                    />
                  </div>

                  <p className="text-[13.5px] md:text-[14px] font-medium text-black/85 leading-[1.35]">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            <button
              className="
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

          hover:bg-black
          hover:text-white

          transition
          "
            >
              EXPLORE MORE
              <span>▶</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
