/** SVG assets used only by the Le Train metronome feature (`/public/icons`). */
export const metronomeIconPaths = {
  accentBeats: '/icons/accent-beats-solid-full.svg',
  arrowDownRight: '/icons/arrow-down-right-solid-full.svg',
  arrowUpRight: '/icons/arrow-up-right-solid-full.svg',
  download: '/icons/download-solid-full.svg',
  metronome: '/icons/metronome-solid-full.svg',
  pause: '/icons/pause-solid-full.svg',
  play: '/icons/play-solid-full.svg',
  stop: '/icons/stop-solid-full.svg',
} as const

export type MetronomeIconName = keyof typeof metronomeIconPaths
