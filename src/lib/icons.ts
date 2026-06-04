/** Public SVG assets under `/public/icons`. */
export const iconPaths = {
  accentBeats: '/icons/accent-beats-solid-full.svg',
  chevronLeft: '/icons/chevron-left-solid-full.svg',
  chevronRight: '/icons/chevron-right-solid-full.svg',
  close: '/icons/xmark-solid-full.svg',
  download: '/icons/download-solid-full.svg',
  drum: '/icons/drum-solid-full.svg',
  menu: '/icons/bars-solid-full.svg',
  metronome: '/icons/metronome-solid-full.svg',
  openInNew: '/icons/open-in-new.svg',
  pause: '/icons/pause-solid-full.svg',
  play: '/icons/play-solid-full.svg',
  stop: '/icons/stop-solid-full.svg',
} as const

export type IconName = keyof typeof iconPaths
