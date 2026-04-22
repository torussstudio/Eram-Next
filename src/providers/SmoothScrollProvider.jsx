import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

let lenis

export const getLenis = () => lenis

export default function SmoothScrollProvider({ children }) {

  useEffect(() => {

    lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // sync GSAP with Lenis
    lenis.on("scroll", ScrollTrigger.update)

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value)
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    })

    ScrollTrigger.addEventListener("refresh", () => lenis.resize())

    ScrollTrigger.refresh()

    return () => {
      lenis.destroy()
    }

  }, [])

  return children
}