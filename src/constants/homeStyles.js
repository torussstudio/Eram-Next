// export const shell =
//   'mx-auto mt-[-3px] w-[min(1520px,calc(100vw-32px))] max-[920px]:w-[min(1280px,calc(100vw-20px))]'

// export const section = 'py-[28px] pb-[104px] max-[640px]:pb-20'

// export const sectionBand = 'bg-[linear-gradient(180deg,rgba(17,17,17,0.035),rgba(17,17,17,0.02))]'

// const revealDelays = [
//   '',
//   '[animation-delay:90ms]',
//   '[animation-delay:180ms]',
//   '[animation-delay:270ms]',
//   '[animation-delay:360ms]',
// ]

// export function getRevealClass(index = 0) {
//   return `animate-rise ${revealDelays[index] ?? ''}`.trim()
// }


export const shell =
'mx-auto mt-[-3px] w-[calc(100vw-80px)] max-[920px]:w-[calc(100vw-44px)]'

export const section =
'py-[28px] pb-[104px] max-[640px]:pb-20'

export const sectionBand =
'bg-[linear-gradient(180deg,rgba(17,17,17,0.035),rgba(17,17,17,0.02))]'

const revealDelays = [
  '',
  '[animation-delay:90ms]',
  '[animation-delay:180ms]',
  '[animation-delay:270ms]',
  '[animation-delay:360ms]',
]

export function getRevealClass(index = 0) {
  return `animate-rise ${revealDelays[index] ?? ''}`.trim()
}