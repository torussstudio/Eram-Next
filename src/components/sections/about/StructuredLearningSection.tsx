"use client";

import { memo, useRef, useCallback, useState, useEffect } from "react";
import OptimizedImage from "../../ui/OptimizedImage";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function StructuredLearningSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
const [canScrollRight, setCanScrollRight] = useState(true);

const updateScrollButtons = useCallback(() => {
  const el = scrollRef.current;
  if (!el) return;

  const isAtStart = el.scrollLeft <= 5;

  const isAtEnd =
    el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;

  setCanScrollLeft(!isAtStart);
  setCanScrollRight(!isAtEnd);
}, []);

useEffect(() => {
  const el = scrollRef.current;
  if (!el) return;

  updateScrollButtons();

  el.addEventListener("scroll", updateScrollButtons);
  window.addEventListener("resize", updateScrollButtons);

  return () => {
    el.removeEventListener("scroll", updateScrollButtons);
    window.removeEventListener("resize", updateScrollButtons);
  };
}, [updateScrollButtons]);

  const scrollByCard = useCallback((direction: number) => {
    const el = scrollRef.current;

    if (!el) return;

    const card = el.querySelector(
      ".structured-card"
    ) as HTMLElement | null;

    const cardWidth = card ? card.offsetWidth + 16 : 260;

    el.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  }, []);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        gsap.to(".structured-text", {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            invalidateOnRefresh: true,
            start: "top 75%",
          },
        });

        gsap.to(".structured-btn", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            invalidateOnRefresh: true,
            start: "top 75%",
          },
        });

        gsap.to(".structured-card", {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".structured-scroll-container",
            invalidateOnRefresh: true,
            start: "top 85%",
          },
        });

        const leaderTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".leadership-container",
            invalidateOnRefresh: true,
            start: "top 75%",
          },
        });

        leaderTl.to(".leadership-text", {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        });

        leaderTl.to(
          ".leadership-profile",
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.7"
        );

        gsap
          .utils
          .toArray<HTMLElement>(".leadership-profile")
          .forEach((profile) => {
            const img = profile.querySelector(".leadership-img");

            gsap.to(img, {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: profile,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            });
          });

        const listTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".leadership-bottom-text",
            invalidateOnRefresh: true,
            start: "top 85%",
          },
        });

        listTl.to(".leadership-bottom-heading", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        });

        listTl.to(
          ".leadership-list-item",
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5"
        );

        gsap.to(".structured-final", {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".structured-final",
            invalidateOnRefresh: true,
            start: "top 85%",
          },
        });
      } else {
        gsap.fromTo(
          ".structured-text",
          {
            clipPath: "inset(0 100% 0 0)",
            opacity: 1,
          },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.9,
            stagger: 0.14,
            ease: "expo.out",
            scrollTrigger: {
              trigger: containerRef.current,
              invalidateOnRefresh: true,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          ".structured-btn",
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: containerRef.current,
              invalidateOnRefresh: true,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          ".structured-card",
          {
            y: 60,
            opacity: 0,
            transformPerspective: 600,
          },
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".structured-scroll-container",
              invalidateOnRefresh: true,
              start: "top 88%",
            },
          }
        );

        gsap.fromTo(
          ".leadership-text",
          {
            filter: "blur(8px)",
            opacity: 0,
            y: 20,
          },
          {
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".leadership-container",
              invalidateOnRefresh: true,
              start: "top 82%",
            },
          }
        );

        gsap
          .utils
          .toArray<HTMLElement>(".leadership-profile")
          .forEach((el, i) => {
            gsap.fromTo(
              el,
              {
                x: i % 2 === 0 ? -50 : 50,
                opacity: 0,
                scale: 0.95,
              },
              {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: el,
                  invalidateOnRefresh: true,
                  start: "top 88%",
                },
              }
            );
          });

        gsap
          .utils
          .toArray<HTMLElement>(".leadership-profile")
          .forEach((profile) => {
            const img = profile.querySelector(".leadership-img");

            gsap.to(img, {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: profile,
                invalidateOnRefresh: true,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            });
          });

        gsap.fromTo(
          ".leadership-bottom-heading",
          {
            x: -30,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".leadership-bottom-text",
              invalidateOnRefresh: true,
              start: "top 88%",
            },
          }
        );

        gsap.fromTo(
          ".leadership-list-item",
          {
            x: -24,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: ".leadership-bottom-text",
              invalidateOnRefresh: true,
              start: "top 88%",
            },
          }
        );

        gsap.fromTo(
          ".structured-final",
          {
            scale: 0.92,
            opacity: 0,
            y: 30,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ".structured-final",
              invalidateOnRefresh: true,
              start: "top 88%",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const CARDS = [
    {
      num: "/01",
      img: "/images/student.avif",
      alt: "student",
      text: "Rigorous curriculum alignment (State & CBSE)",
    },
    {
      num: "/02",
      img: "/images/teacher.avif",
      alt: "teacher",
      text: "Teacher-guided mentorship models",
    },
    {
      num: "/03",
      img: "/images/student.avif",
      alt: "class",
      text: "Continuous evaluation & improvement cycles",
    },
    {
      num: "/04",
      img: "/images/student.avif",
      alt: "student",
      text: "Holistic integration of academics, sports, and culture",
    },
    {
      num: "/05",
      img: "/images/teacher.avif",
      alt: "teacher",
      text: "Exposure-driven learning beyond textbooks",
    },
  ];

  const PROFILES = [
    {
      src: "/images/person1.avif",
      alt: "Dr. Siddeek Ahmed",
      objPos: "object-[72%_center]",
      name: "Dr. SIDDEEK AHMED",
      role: "Chairman & MD \nERAM Holdings",
      messageTitle: "Chairman's Message",
      message:
        "Education is a powerful force that shapes intellect, character, and values. At ERAM, we are committed to providing value-based quality education to every student, irrespective of background. Through structured learning and strong moral principles, we aim to nurture disciplined, responsible individuals who strive for excellence and contribute meaningfully to society. May God Almighty bless us all!",
    },
    {
      src: "/images/person2.avif",
      alt: "Mr. Abdhussamad C K",
      objPos: "object-[60%_20%]",
       name: "Mr. ABDUSSAMAD C K",
      role:
        "Secretary & Manager\nEram Educational And Welfare Trust",
      messageTitle: "Manager's Message",
      message:
        "Education is a shared commitment between dedicated teachers, motivated students, and supportive parents. At ERAM, we focus on quality learning supported by technology-enabled pedagogy and holistic development. Through academic and co-curricular engagement, workshops, and structured guidance, we nurture talent, strengthen character, and instill moral values, preparing students to grow as responsible and capable citizens.",
    },
  ];

  const LIST_ITEMS = [
    "Continuous academic supervision",
    "Institutional planning and performance monitoring",
    "Direct engagement with Principals & HODs",
    "Policy alignment across institutions",
    "Transparent operational practices",
    "Long-term strategic planning",
  ];

  return (
    <section
      ref={containerRef}
      className="
        bg-[#ae1431]
        text-white
        overflow-hidden

        py-16
        md:py-20

        px-5
        md:px-4
      "
    >
      <div
        className="
          w-full

          md:max-w-[1200px]
          md:mx-auto

          md:px-8
          lg:px-12
        "
      >
        {/* TOP GRID */}
        <div
          className="
            grid

            gap-8

            md:grid-cols-2
            md:gap-12

            items-center
          "
        >
          {/* LEFT */}
          <div className="w-full md:max-w-[420px] -mb-12">
            <h2
              className="
                structured-text

                md:opacity-0
                md:translate-y-8

                font-display

                text-[32px]
                sm:text-[36px]
                md:text-[38px]

                leading-[1.08]
              "
            >
              Structured Learning.
              <br />
              Meaningful Growth.
            </h2>

            <p
              className="
                structured-text

                md:opacity-0
                md:translate-y-8

                mt-4
                md:mt-5

                text-[14px]
                md:text-[14.5px]

                text-white/80

                leading-[1.75]

                font-rethink
              "
            >
              The Trust believes that excellence emerges from systems, not
              chance. Its institutions operate within a disciplined academic
              framework supported by:
            </p>

            <button
              className="
                structured-btn

                md:opacity-0
                md:translate-y-5

                mt-5
                md:mt-6

                border
                border-white/60

                px-5
                py-2

                rounded-lg

                text-sm

                flex
                items-center
                gap-2

                hover:bg-white
                hover:text-[#b5122b]

                transition-all
                duration-300

                cursor-pointer

                font-rethink
              "
            >
              EXPLORE MORE

              <Play className="text-xs transition-colors" />
            </button>
          </div>

          {/* CAROUSEL WRAPPER */}
          <div className="structured-scroll-container -mx-5 md:mx-0 overflow-hidden">
            {/* ARROWS */}
            <div className="flex justify-end gap-3 px-5 md:px-0 mb-3">
             <button
  onClick={() => scrollByCard(-1)}
  disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`
  w-11
  h-11

  md:w-12
  md:h-12

  rounded-full

  border
  flex
  items-center
  justify-center

  transition-all
  duration-300

  ${
    !canScrollLeft
      ? "border-white/20 opacity-50 cursor-not-allowed"
      : "border-white/50 cursor-pointer hover:scale-90 hover:border-transparent"
  }
`}
              >
                <ChevronLeft
  size={18}
  className={!canScrollLeft ? "text-white/30" : ""}
/>
              </button>

              <button
  onClick={() => scrollByCard(1)}
  disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`
  w-11
  h-11

  md:w-12
  md:h-12

  rounded-full

  border
  flex
  items-center
  justify-center

  transition-all
  duration-300

  ${
    !canScrollRight
      ? "border-white/20 opacity-50 cursor-not-allowed"
      : "border-white/50 cursor-pointer hover:scale-90 hover:border-transparent"
  }
`}
              >
                <ChevronRight
  size={18}
  className={!canScrollRight ? "text-white/30" : ""}
/>
              </button>
            </div>

            {/* SCROLLABLE CARDS */}
            <div
              ref={scrollRef}
              className="
                flex

                gap-4
                md:gap-5

                overflow-x-auto

                scroll-smooth

                scrollbar-hide

                px-5
                md:px-0

                pb-2
              "
            >
              {CARDS.map((card, i) => (
                <div
                  key={i}
                  className="
                    structured-card

                    relative

                    flex-shrink-0

                    overflow-hidden

                    rounded-[20px]

                    transform-gpu

                    min-w-[240px]
                    h-[260px]

                    sm:min-w-[260px]
                    sm:h-[280px]

                    md:min-w-[260px]
                    md:h-[220px]

                    lg:min-w-[280px]
                    lg:h-[240px]
                  "
                >
                  <OptimizedImage
                    src={card.img}
                    alt={card.alt}
                    className="leadership-img w-full h-full object-cover"
                    sizes="(max-width: 768px) 260px, 360px"
                    disableTransition
                  />

                  <div className="absolute inset-0" />

                  <span
                    className="
                      absolute

                      top-5
                      left-5

                      md:top-10
                      md:left-12

                      text-[14px]
                      md:text-[18px]

                      text-white
                    "
                  >
                    {card.num}
                  </span>

                  <p
                    className="
                      absolute

                      bottom-5
                      left-5
                      right-5

                      md:bottom-6
                      md:left-12
                      md:right-10

                      text-[13px]
                      md:text-[20px]

                      

                      leading-[1.35]

                      text-white

                      font-rethink
                    "
                  >
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-12 md:my-16 border-t border-white/40" />

        {/* LEADERSHIP SECTION */}
        <div
          className="
            leadership-container

            grid

            gap-6

            md:grid-cols-2
            md:gap-12

            items-start
          "
        >
          <h3
            className="
              leadership-text

              md:opacity-0
              md:translate-y-8

              font-display

              text-[30px]

              sm:text-[26px]

              md:text-[32px]

              leading-[1.18]

              ml-0

              md:ml-[90px]
            "
          >
            Strategic Leadership &
            <br />
            Academic Oversight
          </h3>

          <p
            className="
              leadership-text

              md:opacity-0
              md:translate-y-8

              text-[14px]
              md:text-[14.5px]

              text-white/80

              leading-[1.75]

              w-full

              md:max-w-[420px]

              ml-0
              md:ml-[20px]

              font-rethink
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
            mt-10
            md:mt-12

            grid

            grid-cols-1

            md:grid-cols-[460px_460px]

            justify-center

            gap-5
            md:gap-8
          "
        >
          {PROFILES.map((person, i) => (
            <div
              key={i}
              className="
                leadership-profile

                group

                md:opacity-0
                md:translate-y-12

                relative

                w-full

                md:max-w-[460px]

                overflow-hidden

                rounded-[26px]

                transform-gpu
              "
            >
              {/* IMAGE */}
              <div
                className="
                  relative

                  w-full

                  h-[440px]

                  md:h-[520px]

                  overflow-hidden
                "
              >
                <div className="leadership-img w-full h-[108%] absolute inset-0 -top-[4%]">
                  <OptimizedImage
                    src={person.src}
                    alt={person.alt}
                    className={`w-full h-full object-cover block ${person.objPos} transition-opacity duration-500 ease-in-out group-hover:opacity-45`}
                    sizes="(max-width: 768px) 100vw, 460px"
                    disableTransition
                  />
                </div>
              </div>

              {/* HOVER OVERLAY */}
              <div
                className="
                  absolute
                  inset-0

                  flex
                  flex-col

                  justify-center
                  items-center

                  px-7

                  md:px-10

                  bg-[#b5122b]/70

                  backdrop-blur-[1px]

                  opacity-0

                  group-hover:opacity-100

                  transition-opacity
                  duration-500
                  ease-in-out

                  rounded-[26px]

                  pointer-events-none

                  group-hover:pointer-events-auto
                "
              >
                <span className="block w-10 h-[2px] bg-white/50 mb-5 rounded-full" />

                <p
                  className="
                    font-display

                    text-[15px]

                    md:text-[17px]

                    uppercase

                    tracking-widest

                    text-white/60

                    mb-3
                  "
                >
                  {person.messageTitle}
                </p>

                <p
                  className="
                    font-rethink

                    text-[14px]

                    md:text-[15px]

                    text-white/90

                    leading-relaxed

                    text-center
                  "
                >
                  {person.message}
                </p>

                <span className="block w-10 h-[2px] bg-white/50 mt-5 rounded-full" />
              </div>

              {/* MOBILE INFO */}
              <div className="md:hidden">
                <div className="absolute inset-x-0 bottom-0 h-[150px] bg-gradient-to-t from-black/85 via-black/50 to-transparent rounded-b-[26px]" />

                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p
                        className="
                          text-[20px]

                          

                          text-white

                          leading-tight

                          tracking-[0.2px]

                          truncate
                        "
                      >
                        {person.name}
                      </p>

                      <p
                        className="
                          mt-[3px]

                          text-[11px]

                          text-white/65

                          

                          uppercase

                          tracking-widest

                          leading-snug

                          whitespace-pre-line
                        "
                      >
                        {person.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* DESKTOP CHIP */}
              <div
                className="
                  absolute

                  bottom-6
                  left-6

                  hidden
                  md:block

                  w-[380px]

                  max-w-[90%]

                  rounded-2xl

                  bg-black/55

                  backdrop-blur-md

                  px-5
                  py-4
                "
              >
                <p
                  className="
                    text-[20px]

                    

                    text-white

                    leading-tight

                    tracking-[0.2px]
                  "
                >
                  {person.name}
                </p>

                <p
                  className="
                    font-rethink

                    mt-1

                    text-[13px]

                    text-white/75

                    

                    leading-snug

                    whitespace-pre-line
                  "
                >
                  – {person.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="my-12 md:my-16 border-t border-white/40" />

        {/* BOTTOM TEXT */}
        <div
          className="
            leadership-bottom-text

            mt-12

            md:mt-14

            grid

            gap-6

            md:grid-cols-2
            md:gap-10

            items-start
          "
        >
          <p
            className="
              leadership-bottom-heading

              md:opacity-0
              md:translate-y-5

              text-[18px]

              md:text-[18px]

             

              text-white

              ml-0

              md:ml-22
            "
          >
            This governance structure
            <br />
            enables:
          </p>

          <ul
            className="
              space-y-[10px]

              md:space-y-2

              text-[14px]

              md:text-[14.5px]

              text-white/80

              ml-0

              md:ml-[40px]
            "
          >
            {LIST_ITEMS.map((item, i) => (
              <li
                key={i}
                className="
                  font-rethink

                  leadership-list-item

                  md:opacity-0
                  md:translate-x-5

                  flex
                  items-start

                  gap-[10px]
                "
              >
                <span className="mt-[5px] w-[5px] h-[5px] rounded-full bg-white/50 flex-shrink-0 md:hidden" />

                <span className="hidden md:inline leading-none mt-[2px]">
                  •
                </span>

                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FINAL */}
        <h3
          className="
            structured-final

            md:opacity-0
            md:translate-y-8

            mt-16

            md:mt-20

            text-[24px]

            sm:text-[28px]

            md:text-[40px]

            lg:text-[48px]

          

            leading-[1.2]

            text-white

            max-w-full

            md:max-w-[980px]

            ml-0

            md:ml-22
          "
        >
          The result is a unified educational system
          <br className="hidden sm:block" />
          supported by accountability and clarity.
        </h3>
      </div>
    </section>
  );
}

export default memo(StructuredLearningSection);