import { getLenis } from "../providers/SmoothScrollProvider"

export const scrollToElementById = (id, offset = 80) => {

  const el = document.getElementById(id)

  if (!el) return

  const lenis = getLenis()

  if (lenis) {

    lenis.scrollTo(el, {

      offset: -offset

    })

  } else {

    window.scrollTo({

      top: el.offsetTop - offset,

      behavior: "smooth"

    })

  }

}


export const scrollToTop = () => {

  const lenis = getLenis()

  if (lenis) {

    lenis.scrollTo(0)

  } else {

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    })

  }

}