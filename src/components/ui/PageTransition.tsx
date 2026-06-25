"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import Education1 from "@/components/icons/Education1";

const FULL_WIDTH = 195.82; // matches viewBox width in Education1

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const isTransitioningRef = useRef(false);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const idleTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".logo-holder", {
        opacity: 0,
      });

      gsap.set(".eram-mark", {
        opacity: 0,
        scale: 0.5,
        transformOrigin: "center center",
      });

      // fill-reveal rects start at 0 width (text fully un-filled)
      gsap.set(".eram-fill-rect", { attr: { width: 0 } });
      gsap.set(".education-fill-rect", { attr: { width: 0 } });

      const tl = gsap.timeline();

      tl.set(".logo-holder", {
        opacity: 1,
      })

        .to(".eram-mark", {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "expo.out",
        })

        // classic ink-fill: eram text fills left -> right
        .to(
          ".eram-fill-rect",
          {
            attr: { width: FULL_WIDTH },
            duration: 1.2,
            ease: "power2.inOut",
          },
          "-=0.1",
        )

        // then education text fills left -> right
        .to(".education-fill-rect", {
          attr: { width: FULL_WIDTH },
          duration: 1.3,
          ease: "power2.inOut",
        })
        // total fill phase above = 2.5s

        .to({}, { duration: 0.5 })

        .to(".left-panel", {
          xPercent: -100,
          duration: 0.85,
          ease: "power3.inOut",
        })

        .to(
          ".right-panel",
          {
            xPercent: 100,
            duration: 0.85,
            ease: "power3.inOut",
          },
          "<",
        )

        .to(
          ".logo-holder",
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
          },
          "<",
        )

        .set(overlayRef.current, {
          display: "none",
        });
    }, overlayRef);

    const clearSafetyTimeout = () => {
      if (safetyTimeoutRef.current) {
        clearTimeout(safetyTimeoutRef.current);
        safetyTimeoutRef.current = null;
      }
    };

    const stopIdleAnimation = () => {
      if (idleTweenRef.current) {
        idleTweenRef.current.kill();
        idleTweenRef.current = null;
      }
      gsap.set(".logo-holder", { scale: 1 });
    };

    const startIdleAnimation = () => {
      stopIdleAnimation();
      idleTweenRef.current = gsap.to(".logo-holder", {
        scale: 1.06,
        duration: 0.7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    };

    const forceCleanup = () => {
      stopIdleAnimation();
      gsap.killTweensOf([".left-panel", ".right-panel", ".logo-holder"]);
      gsap.set(overlayRef.current, { display: "none" });
      isTransitioningRef.current = false;
    };

    const handleNavbarTransition = (e: Event) => {
      const customEvent = e as CustomEvent<{ path: string }>;
      const path = customEvent.detail?.path;

      if (!path || !overlayRef.current || isTransitioningRef.current) return;

      isTransitioningRef.current = true;

      // Reset mark + text to their un-filled starting state so the
      // same ink-fill sequence used on first load plays here too.
      gsap.set(".eram-mark", {
        opacity: 0,
        scale: 0.5,
      });

      gsap.set(".eram-fill-rect", { attr: { width: 0 } });
      gsap.set(".education-fill-rect", { attr: { width: 0 } });

      gsap.set(".logo-holder", {
        opacity: 1,
        scale: 1,
      });

      gsap.set(overlayRef.current, {
        display: "block",
      });

      // Safety net: force-remove overlay if navigation never completes
      clearSafetyTimeout();
      safetyTimeoutRef.current = setTimeout(() => {
        forceCleanup();
      }, 6000);

      const tl = gsap.timeline({
        onComplete: () => {
          if (path === pathnameRef.current) {
            const exitTl = gsap.timeline({
              onComplete: () => {
                gsap.set(overlayRef.current, {
                  display: "none",
                });
                isTransitioningRef.current = false;
                clearSafetyTimeout();
              },
            });

            exitTl
              .to(".left-panel", {
                xPercent: -100,
                duration: 0.45,
                ease: "power3.inOut",
              })
              .to(
                ".right-panel",
                {
                  xPercent: 100,
                  duration: 0.2,
                  ease: "power3.inOut",
                },
                "<",
              )
              .to(
                ".logo-holder",
                {
                  opacity: 0,
                  scale: 0.95,
                  duration: 0.1,
                },
                "<",
              );
          } else {
            // Page is covered now — start a subtle breathing loop so the
            // logo doesn't look frozen while the next route loads.
            startIdleAnimation();
            router.prefetch(path);
            router.push(path);
          }
        },
      });

      gsap.set(".left-panel", { xPercent: -100 });
      gsap.set(".right-panel", { xPercent: 100 });

      tl.to(".left-panel", {
        xPercent: 0,
        duration: 0.55,
        ease: "power3.inOut",
      })
        .to(
          ".right-panel",
          {
            xPercent: 0,
            duration: 0.55,
            ease: "power3.inOut",
          },
          "<",
        )

        // ── classic ink-fill, same sequence as first-load ──
        .to(
          ".eram-mark",
          {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: "expo.out",
          },
          "-=0.15",
        )
        .to(
          ".eram-fill-rect",
          {
            attr: { width: FULL_WIDTH },
            duration: 0.7,
            ease: "power2.inOut",
          },
          "-=0.1",
        )
        .to(".education-fill-rect", {
          attr: { width: FULL_WIDTH },
          duration: 0.8,
          ease: "power2.inOut",
        });
      // total time before navigate = 2.25s
    };

    window.addEventListener(
      "eram-page-transition",
      handleNavbarTransition as EventListener,
    );

    return () => {
      window.removeEventListener(
        "eram-page-transition",
        handleNavbarTransition as EventListener,
      );
      clearSafetyTimeout();
      stopIdleAnimation();
      ctx.revert();
    };
  }, [router]);

  useEffect(() => {
    if (isTransitioningRef.current) {
      // New route has rendered — stop the breathing loop before revealing
      if (idleTweenRef.current) {
        idleTweenRef.current.kill();
        idleTweenRef.current = null;
      }
      gsap.set(".logo-holder", { scale: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, {
            display: "none",
          });
          isTransitioningRef.current = false;
          if (safetyTimeoutRef.current) {
            clearTimeout(safetyTimeoutRef.current);
            safetyTimeoutRef.current = null;
          }
        },
      });

      tl.to(".left-panel", {
        xPercent: -100,
        duration: 0.2,
        ease: "power3.inOut",
      })
        .to(
          ".right-panel",
          {
            xPercent: 100,
            duration: 0.45,
            ease: "power3.inOut",
          },
          "<",
        )
        .to(
          ".logo-holder",
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.25,
          },
          "<",
        );
    }
  }, [pathname]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[99999] overflow-hidden">
      <div className="left-panel absolute inset-y-0 left-0 w-1/2 bg-[#F5EFE8]" />
      <div className="right-panel absolute inset-y-0 right-0 w-1/2 bg-[#F5EFE8]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="logo-holder w-[240px] md:w-[320px]">
          <Education1 />
        </div>
      </div>
    </div>
  );
}