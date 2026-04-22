import { getLenis } from "../providers/SmoothScrollProvider"

export const useSmoothScroll = () => {

  const scrollToElement = (target, offset = 80) => {

    let el

    if (typeof target === "string") {

      el = document.getElementById(target)

    } 
    else if (target?.current) {

      el = target.current

    } 
    else {

      el = target

    }

    if (!el) return

    const lenis = getLenis()

    if (lenis) {

      lenis.scrollTo(el, {

        offset: -offset

      })

    }

  }

  return scrollToElement

}