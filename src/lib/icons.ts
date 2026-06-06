/** Public SVG assets under `/public/icons`. */
export const iconPaths = {
  chevronLeft: '/icons/chevron-left-solid-full.svg',
  chevronRight: '/icons/chevron-right-solid-full.svg',
  close: '/icons/xmark-solid-full.svg',
  drum: '/icons/drum-solid-full.svg',
  menu: '/icons/bars-solid-full.svg',
  openInNew: '/icons/open-in-new.svg',
  instagram: '/icons/instagram-logo.svg',
  facebook: '/icons/facebook-logo.svg',
} as const

export type IconName = keyof typeof iconPaths
