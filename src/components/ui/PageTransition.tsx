// "use client";

// import { useLayoutEffect, useRef, useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { gsap } from "gsap";
// import Education1 from "@/components/icons/Education1";

// export default function PageTransition() {
//   const overlayRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const pathnameRef = useRef(pathname);
//   const isTransitioningRef = useRef(false);
//   const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     pathnameRef.current = pathname;
//   }, [pathname]);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.set(".logo-holder", {
//         opacity: 0,
//       });

//       gsap.set(".eram-mark", {
//         opacity: 0,
//         scale: 0.5,
//         transformOrigin: "center center",
//       });

//       gsap.set(".eram-text", {
//         opacity: 0,
//         x: -40,
//       });

//       gsap.set(".education-text", {
//         opacity: 0,
//         x: -40,
//       });

//       const tl = gsap.timeline();

//       tl.set(".logo-holder", {
//         opacity: 1,
//       })

//         .to(".eram-mark", {
//           opacity: 1,
//           scale: 1,
//           duration: 0.2,
//           ease: "expo.out",
//         })

//         .to(
//           ".eram-text",
//           {
//             opacity: 1,
//             x: 0,
//             duration: 0.25,
//             ease: "power3.out",
//           },
//           "-=0.05",
//         )

//         .to({}, { duration: 0.05 })

//         .to(".education-text", {
//           opacity: 1,
//           x: 0,
//           duration: 0.25,
//           ease: "power3.out",
//         })

//         .to({}, { duration: 0.1 })

//         .to(".left-panel", {
//           xPercent: -100,
//           duration: 0.5,
//           ease: "power3.inOut",
//         })

//         .to(
//           ".right-panel",
//           {
//             xPercent: 100,
//             duration: 0.5,
//             ease: "power3.inOut",
//           },
//           "<",
//         )

//         .to(
//           ".logo-holder",
//           {
//             opacity: 0,
//             scale: 0.95,
//             duration: 0.15,
//           },
//           "<",
//         )

//         .set(overlayRef.current, {
//           display: "none",
//         });
//     }, overlayRef);

//     const clearSafetyTimeout = () => {
//       if (safetyTimeoutRef.current) {
//         clearTimeout(safetyTimeoutRef.current);
//         safetyTimeoutRef.current = null;
//       }
//     };

//     const forceCleanup = () => {
//       gsap.killTweensOf([".left-panel", ".right-panel", ".logo-holder"]);
//       gsap.set(overlayRef.current, { display: "none" });
//       isTransitioningRef.current = false;
//     };

//     const handleNavbarTransition = (e: Event) => {
//       const customEvent = e as CustomEvent<{ path: string }>;
//       const path = customEvent.detail?.path;

//       if (!path || !overlayRef.current || isTransitioningRef.current) return;

//       isTransitioningRef.current = true;

//       // ── FIX: make the logo parts VISIBLE during the navbar-triggered
//       // transition (earlier these were set to opacity 0, so the overlay
//       // showed empty cream panels with no logo — looked like a blank page).
//       gsap.set(".eram-mark", {
//         opacity: 1,
//         scale: 1,
//       });

//       gsap.set(".eram-text", {
//         opacity: 1,
//         x: 0,
//       });

//       gsap.set(".education-text", {
//         opacity: 1,
//         x: 0,
//       });

//       gsap.set(".logo-holder", {
//         opacity: 1,
//         scale: 1,
//       });

//       gsap.set(overlayRef.current, {
//         display: "block",
//       });

//       // Safety net: if navigation never completes (slow network, error,
//       // route not found), force-remove the overlay after 4s instead of
//       // leaving the user stuck looking at a blank/cream screen forever.
//       clearSafetyTimeout();
//       safetyTimeoutRef.current = setTimeout(() => {
//         forceCleanup();
//       }, 4000);

//       const tl = gsap.timeline({
//         onComplete: () => {
//           if (path === pathnameRef.current) {
//             const exitTl = gsap.timeline({
//               onComplete: () => {
//                 gsap.set(overlayRef.current, {
//                   display: "none",
//                 });
//                 isTransitioningRef.current = false;
//                 clearSafetyTimeout();
//               },
//             });

//             exitTl
//               .to(".left-panel", {
//                 xPercent: -100,
//                 duration: 0.2,
//                 ease: "power3.inOut",
//               })
//               .to(
//                 ".right-panel",
//                 {
//                   xPercent: 100,
//                   duration: 0.2,
//                   ease: "power3.inOut",
//                 },
//                 "<",
//               )
//               .to(
//                 ".logo-holder",
//                 {
//                   opacity: 0,
//                   scale: 0.95,
//                   duration: 0.1,
//                 },
//                 "<",
//               );
//           } else {
//             router.prefetch(path);
//             router.push(path);
//           }
//         },
//       });

//       gsap.set(".left-panel", { xPercent: -100 });
//       gsap.set(".right-panel", { xPercent: 100 });

//       tl.to(".left-panel", {
//         xPercent: 0,
//         duration: 0.15,
//         ease: "power3.inOut",
//       }).to(
//         ".right-panel",
//         {
//           xPercent: 0,
//           duration: 0.15,
//           ease: "power3.inOut",
//         },
//         "<",
//       );
//     };

//     window.addEventListener(
//       "eram-page-transition",
//       handleNavbarTransition as EventListener,
//     );

//     return () => {
//       window.removeEventListener(
//         "eram-page-transition",
//         handleNavbarTransition as EventListener,
//       );
//       clearSafetyTimeout();
//       ctx.revert();
//     };
//   }, [router]);

//   useEffect(() => {
//     if (isTransitioningRef.current) {
//       const tl = gsap.timeline({
//         onComplete: () => {
//           gsap.set(overlayRef.current, {
//             display: "none",
//           });
//           isTransitioningRef.current = false;
//           if (safetyTimeoutRef.current) {
//             clearTimeout(safetyTimeoutRef.current);
//             safetyTimeoutRef.current = null;
//           }
//         },
//       });

//       tl.to(".left-panel", {
//         xPercent: -100,
//         duration: 0.2,
//         ease: "power3.inOut",
//       })
//         .to(
//           ".right-panel",
//           {
//             xPercent: 100,
//             duration: 0.2,
//             ease: "power3.inOut",
//           },
//           "<",
//         )
//         .to(
//           ".logo-holder",
//           {
//             opacity: 0,
//             scale: 0.95,
//             duration: 0.1,
//           },
//           "<",
//         );
//     }
//   }, [pathname]);

//   return (
//     <div ref={overlayRef} className="fixed inset-0 z-[99999] overflow-hidden">
//       <div className="left-panel absolute inset-y-0 left-0 w-1/2 bg-[#F5EFE8]" />
//       <div className="right-panel absolute inset-y-0 right-0 w-1/2 bg-[#F5EFE8]" />

//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="logo-holder w-[240px] md:w-[320px]">
//           <Education1 />
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import Education1 from "@/components/icons/Education1";

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

      gsap.set(".eram-text", {
        opacity: 0,
        x: -40,
      });

      gsap.set(".education-text", {
        opacity: 0,
        x: -40,
      });

      const tl = gsap.timeline();

      tl.set(".logo-holder", {
        opacity: 1,
      })

        .to(".eram-mark", {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "expo.out",
        })

        .to(
          ".eram-text",
          {
            opacity: 1,
            x: 0,
            duration: 0.25,
            ease: "power3.out",
          },
          "-=0.05",
        )

        .to({}, { duration: 0.05 })

        .to(".education-text", {
          opacity: 1,
          x: 0,
          duration: 0.25,
          ease: "power3.out",
        })

        .to({}, { duration: 0.1 })

        .to(".left-panel", {
          xPercent: -100,
          duration: 0.5,
          ease: "power3.inOut",
        })

        .to(
          ".right-panel",
          {
            xPercent: 100,
            duration: 0.5,
            ease: "power3.inOut",
          },
          "<",
        )

        .to(
          ".logo-holder",
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.15,
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

      // Logo parts VISIBLE during the navbar-triggered transition
      gsap.set(".eram-mark", {
        opacity: 1,
        scale: 1,
      });

      gsap.set(".eram-text", {
        opacity: 1,
        x: 0,
      });

      gsap.set(".education-text", {
        opacity: 1,
        x: 0,
      });

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
                duration: 0.2,
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
        duration: 0.15,
        ease: "power3.inOut",
      }).to(
        ".right-panel",
        {
          xPercent: 0,
          duration: 0.15,
          ease: "power3.inOut",
        },
        "<",
      );
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