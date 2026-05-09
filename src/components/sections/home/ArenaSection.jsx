import { useRef } from "react";
import ActionButton from "../../ui/ActionButton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ARENA_WORDS = ["SPORTS", "ARENA"];

export default function ArenaSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const btnsRef = useRef(null);
  const outlineRef = useRef(null);
  const lineTopRef = useRef(null);
  const lineBottomRef = useRef(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      const overlay = overlayRef.current;
      const words = outlineRef.current?.querySelectorAll(".a-word");

      /* ── Initial states ───────────────────────────────────────────── */
      gsap.set(card, { scale: 1.08, force3D: true, willChange: "transform" });
      gsap.set(overlay, { opacity: 0.88, willChange: "opacity" });

      gsap.set(lineTopRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        force3D: true,
      });
      gsap.set(lineBottomRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
        force3D: true,
      });

      gsap.set(headingRef.current, {
        opacity: 0,
        y: 56,
        skewY: 1.8,
        force3D: true,
      });
      gsap.set(paraRef.current, { opacity: 0, y: 28, force3D: true });
      gsap.set(btnsRef.current, { opacity: 0, y: 18, force3D: true });

      if (words?.length) {
        gsap.set(words, {
          y: "110%",
          skewX: 6,
          force3D: true,
          willChange: "transform",
        });
      }

      /* ── Scroll-pinned timeline ───────────────────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 34px",
          end: "+=140%",
          scrub: 1.4,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          fastScrollEnd: true,
          preventOverlaps: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      /* Phase 1 — card zoom (0 → 0.28) */
      tl.to(card, { scale: 1, ease: "power2.out", duration: 0.28 }, 0);

      /* Phase 2 — parallax bg throughout */
      tl.to(card, { backgroundPositionY: "62%", duration: 1 }, 0);

      /* Phase 3 — overlay lifts (0.16 → 0.38) */
      tl.to(overlay, { opacity: 0.42, duration: 0.22 }, 0.16);

      /* Phase 4 — lines slice in (0.20 → 0.46) */
      tl.to(
        lineTopRef.current,
        { scaleX: 1, ease: "expo.out", duration: 0.2 },
        0.2,
      ).to(
        lineBottomRef.current,
        { scaleX: 1, ease: "expo.out", duration: 0.2 },
        0.26,
      );

      /* Phase 5 — heading slams in (0.34 → 0.54) */
      tl.to(
        headingRef.current,
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          ease: "expo.out",
          duration: 0.2,
        },
        0.34,
      );

      /* Phase 6 — para fades up (0.44 → 0.62) */
      tl.to(
        paraRef.current,
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.18,
        },
        0.44,
      );

      /* Phase 7 — buttons fade up (0.52 → 0.68) */
      tl.to(
        btnsRef.current,
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.16,
        },
        0.52,
      );

      /* Phase 8 — letters curtain reveal (0.56 → 1.0) */
      if (words?.length) {
        tl.to(
          words,
          {
            y: "0%",
            skewX: 0,
            ease: "expo.out",
            duration: 0.8,
            stagger: { each: 0.03, from: "start" }, // 0.10 → 0.03
          },
          0.56,
        );
      }

      /* Cleanup willChange after scroll settles */
      ScrollTrigger.addEventListener("scrollEnd", () => {
        gsap.set([card, overlay], { willChange: "auto" });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="arena"
      className="
        relative flex items-center justify-center
        bg-[#F5EFE8] overflow-hidden
        p-7
        max-[920px]:px-[14px] max-[920px]:pb-[14px] max-[920px]:pt-[48px]
      "
      style={{ height: "100vh", transform: "translateZ(0)" }}
    >
      {/* ── Card ── */}
      <div
        ref={cardRef}
        className="
          relative mx-auto overflow-hidden
          w-full max-w-[1580px] rounded-[32px]
          max-[640px]:rounded-[22px]
        "
        style={{
          backgroundImage: "url('/images/sportsarena.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          height: "calc(100vh - 56px)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 rounded-[32px] max-[640px]:rounded-[22px]"
          style={{
            background: "black",
            willChange: "opacity",
            backfaceVisibility: "hidden",
          }}
        />

        {/* Slice lines */}
        <div
          ref={lineTopRef}
          className="absolute z-10 left-0 right-0 h-[1px] bg-white/25"
          style={{ top: "28%" }}
        />
        <div
          ref={lineBottomRef}
          className="absolute z-10 left-0 right-0 h-[1px] bg-white/25"
          style={{ top: "72%" }}
        />

        {/* Word-by-word outline reveal */}
        <div
          ref={outlineRef}
          className="
            pointer-events-none select-none
            absolute z-20 bottom-[-70px] left-[30px]
            font-display font-bold leading-[0.88] text-transparent
            text-[clamp(7.2rem,13.2vw,14rem)] tracking-[-0.045em]
            [-webkit-text-stroke:1.6px_white]
            whitespace-nowrap
            max-[1000px]:left-[10px] max-[1000px]:bottom-[-30px]
            max-[1000px]:text-[clamp(4.8rem,15vw,8.2rem)]
            max-[640px]:left-1/2 max-[640px]:-translate-x-1/2
            max-[640px]:bottom-[-14px] max-[640px]:text-[clamp(2.2rem,14vw,3.6rem)]
            max-[640px]:[-webkit-text-stroke:1.1px_white]
          "
        >
          {ARENA_WORDS.map((word, wi) => (
            <span
              key={wi}
              className="inline-block"
              style={{ verticalAlign: "bottom" }}
            >
              {word.split("").map((letter, li) => (
                <span
                  key={li}
                  className="inline-block overflow-hidden"
                  style={{ verticalAlign: "bottom" }}
                >
                  <span className="a-word inline-block">{letter}</span>
                </span>
              ))}

              {wi < ARENA_WORDS.length - 1 && (
                <span
                  className="inline-block"
                  style={{ width: "0.35em" }}
                  aria-hidden="true"
                />
              )}
            </span>
          ))}
        </div>

        {/* Content */}
        <div
          className="
            relative z-30
            px-[110px] pt-[120px] pb-20
            max-[900px]:px-7 max-[900px]:pt-20 max-[900px]:pb-14
            max-[640px]:px-[18px] max-[640px]:pt-14 max-[640px]:pb-9
          "
        >
          <div className="max-w-[460px]">
            <h2
              ref={headingRef}
              className="
                font-display font-bold tracking-[-0.02em] leading-[1.22]
                text-[34px] text-white mb-5
                max-[640px]:text-[28px]
              "
            >
              A Destination for
              <br />
              Sport &amp; Performance
            </h2>

            <p
              ref={paraRef}
              className="
                font-rethink text-[14.5px] leading-[1.75] text-white/80
                mb-[34px] max-[640px]:text-[14px] max-[640px]:mb-[26px]
              "
            >
              The ERAM Sports Arena reflects the Trust's long-term commitment to
              athletics, performance, and community engagement. Designed to host
              institutional and external events, it marks a new chapter in
              sports integration.
            </p>

            <div
              ref={btnsRef}
              className="flex flex-wrap gap-[14px] max-[640px]:gap-[10px]"
            >
              <ActionButton className="font-rethink" to="/explore-arena">
                Explore The Arena
              </ActionButton>
              <ActionButton
                className="font-rethink !bg-[#ae1431] !text-[#f5efe8] !border-[#ae1431] hover:!bg-[#8f1028] hover:!border-[#8f1028]"
                variant="secondary"
              >
                Discover Our Infrastructure
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
