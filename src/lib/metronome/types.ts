export type SequenceSegment = {
  bars: number
  bpmStart: number
  bpmEnd: number
}

export type BpmType = 'start' | 'max'

export const COUNT_IN_BAR_OPTIONS = [0, 1, 2, 4] as const
export const DEFAULT_COUNT_IN_BARS = 2

export type MetronomeConfig = {
  bpm: number
  bpmType: BpmType
  countInBars: number
  subdivision: number
  accentFirst: boolean
  /** Snap every segment tempo to the nearest mechanical metronome marking (10–240). */
  mechanicalTempos: boolean
  sampleRate?: number
}

export type MetronomeSequenceConfig = Pick<
  MetronomeConfig,
  'bpm' | 'bpmType' | 'countInBars' | 'mechanicalTempos'
>

export type MetronomeGeneratePayload = {
  sequence: SequenceSegment[]
  subdivision: number
  accentFirst: boolean
  sampleRate: number
}
