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
        bg-[#0f0f0f]
        relative
        overflow-hidden
        py-[120px]
        max-[1024px]:py-[100px]
        max-[768px]:py-[80px]
        max-[480px]:py-[64px]
      "
      id="model"
    >
      {/* Desktop: absolute video | Mobile: hidden here, shown below */}
      <div
        className="
          absolute
          top-[40px]
          left-[400px]
          -translate-x-1/2
          w-[42vw]
          max-w-[420px]
          aspect-[4/3]
          overflow-hidden
          rounded-[24px]
          max-[900px]:w-[55vw]
          max-[640px]:hidden
        "
      >
        <video
          className="w-full h-full object-cover opacity-[0.9]"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/model-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="max-w-[1180px] mx-auto px-[24px] relative">

        {/* Heading block */}
        <div
          className="
            model-heading
            max-w-[640px]
            ml-auto
            translate-x-[120px]
            -translate-y-[110px]
            max-[1100px]:translate-x-0
            max-[900px]:-translate-y-[40px]
            max-[640px]:translate-y-0
            max-[640px]:ml-0
            max-[640px]:max-w-full
            max-[640px]:text-center
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
              max-[480px]:text-[28px]
            "
          >
            The ERAM
            <br />
            Educational Model
          </h2>

          <p
            className="
              font-rethink
              mt-[18px]
              text-[16px]
              leading-[1.7]
              text-white
              max-w-[520px]
              max-[900px]:text-[15px]
              max-[640px]:max-w-full
              max-[640px]:text-[15px]
            "
          >
            Our academic framework combines a rigorous curriculum and a
            disciplined structure that supports every learner academically,
            culturally, and socially.
          </p>
        </div>

        {/* Mobile-only video — below heading */}
        <div
          className="
            hidden
            max-[640px]:block
            w-full
            aspect-[4/3]
            overflow-hidden
            rounded-[20px]
            mt-[32px]
            mb-[40px]
          "
        >
          <video
            className="w-full h-full object-cover opacity-[0.9]"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/model-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Pillars container */}
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
            max-[560px]:grid-cols-2
            max-[400px]:grid-cols-1
            max-[640px]:mt-0
          "
        >
          {modelPillars.map((item, i) => (
            <div
              key={i}
              className="
                model-pillar
                text-center
                font-rethink
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
                  className="h-[55px] opacity-[0.9]"
                />
              </div>

              <p
                className="
                  text-[17px]
                  leading-[1.4]
                  text-[#222]
                  font-[500]
                  max-[560px]:text-[15px]
                "
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>

{/* Academic systems — Carousel */}
<div className="model-systems-container mt-[90px] ml-[80px] max-[1100px]:ml-[40px] max-[900px]:ml-0 max-[900px]:mt-[70px] max-[640px]:mt-[60px]">
  <h3 className="text-center text-[25px] tracking-[0.12em] font-[400] text-[#f5efe8] max-[900px]:text-[20px] max-[640px]:text-[16px] max-[640px]:tracking-[0.08em]">
    ACADEMIC SYSTEMS & FACULTY DEVELOPMENT
  </h3>

  {/* Carousel wrapper */}
  <div className="relative mt-[70px] max-[900px]:mt-[50px] max-[560px]:mt-[36px]">

    {/* Left Arrow — mobile-ൽ കാണിക്കും, ചെറുതാക്കി */}
    <button
      onClick={() => {
        document.getElementById('faculty-carousel').scrollBy({ left: -340, behavior: 'smooth' });
      }}
      className="
        absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10
        w-[42px] h-[42px] rounded-full border-2 border-[#f5efe8]/40
        bg-transparent flex items-center justify-center
        transition-all duration-300 hover:bg-[#f5efe8]/10 hover:border-[#f5efe8]
        cursor-pointer
        max-[560px]:w-[32px] max-[560px]:h-[32px]
        max-[560px]:translate-x-0 max-[560px]:left-[4px]
        max-[560px]:bg-[#f5efe8]/10
      "
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#f5efe8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        className="max-[560px]:w-[12px] max-[560px]:h-[12px]">
        <path d="M10 13L5 8L10 3" />
      </svg>
    </button>

    {/* Scrollable track */}
    <div
      id="faculty-carousel"
      className="
        flex gap-[60px] overflow-x-auto scroll-smooth scrollbar-hide
        px-[16px]
        max-[900px]:gap-[34px]
        max-[560px]:gap-[20px]
        max-[560px]:px-[44px]
        max-[560px]:snap-x max-[560px]:snap-mandatory
      "
      style={{ cursor: 'grab' }}
      onMouseDown={(e) => {
        const el = e.currentTarget;
        el.style.cursor = 'grabbing';
        const startX = e.pageX - el.offsetLeft;
        const scrollLeft = el.scrollLeft;
        const onMove = (ev) => { el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX); };
        const onUp = () => { el.style.cursor = 'grab'; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
      }}
    >
      {facultySystems.map((item, i) => (
        <div
          key={i}
          className="
            model-system relative pl-[20px] flex-shrink-0
            w-[220px]
            max-[900px]:w-[200px]
            max-[560px]:w-[clamp(160px,55vw,200px)]
            max-[560px]:pl-[14px]
            max-[560px]:snap-start
          "
        >
          {/* divider line */}
          <span className="absolute left-0 top-[4px] w-[2px] bg-[#f5efe8] h-[180px] max-[900px]:h-[160px] max-[560px]:h-[120px]" />

          {/* number */}
          <div className="text-[25px] tracking-[0.16em] font-[500] text-[#f5efe8] max-[560px]:text-[16px]">
            /0{i + 1}
          </div>

          {/* text */}
          <p
            className="
              font-rethink mt-[100px] text-[26px] leading-[1.15] text-[#f5efe8]
              max-[900px]:mt-[72px] max-[900px]:text-[22px]
              max-[560px]:mt-[36px] max-[560px]:text-[15px]
              max-[560px]:leading-[1.4]
            "
            dangerouslySetInnerHTML={{ __html: item }}
          />
        </div>
      ))}
    </div>

    {/* Right Arrow */}
    <button
      onClick={() => {
        document.getElementById('faculty-carousel').scrollBy({ left: 340, behavior: 'smooth' });
      }}
      className="
        absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10
        w-[42px] h-[42px] rounded-full border-2 border-[#f5efe8]/40
        bg-transparent flex items-center justify-center
        transition-all duration-300 hover:bg-[#f5efe8]/10 hover:border-[#f5efe8]
        cursor-pointer
        max-[560px]:w-[32px] max-[560px]:h-[32px]
        max-[560px]:translate-x-0 max-[560px]:right-[4px]
        max-[560px]:bg-[#f5efe8]/10
      "
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#f5efe8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        className="max-[560px]:w-[12px] max-[560px]:h-[12px]">
        <path d="M6 3L11 8L6 13" />
      </svg>
    </button>
  </div>
</div>
      </div>
    </section>
  );
}