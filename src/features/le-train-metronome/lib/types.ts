import type { RampCurve } from './rampCurve'

export type SequenceSegment = {
  bars: number
  bpmStart: number
  bpmEnd: number
  /** Easing curve for ramps (bpmStart ≠ bpmEnd). Defaults to linear. */
  rampCurve?: RampCurve
}

export type BpmType = 'start' | 'max'

export const COUNT_IN_BAR_OPTIONS = [0, 1, 2, 4, 8] as const
export const DEFAULT_COUNT_IN_BARS = 2

export const SUBDIVISION_OPTIONS = [
  { value: 1, label: 'Noire' },
  { value: 2, label: 'Croche' },
  { value: 3, label: 'Triolet' },
  { value: 4, label: 'Double croche' },
  { value: 5, label: 'Quintolet' },
  { value: 6, label: 'Sextolet' },
  { value: 7, label: 'Septolet' },
  { value: 8, label: 'Triple croche' },
] as const

export type MetronomeConfig = {
  bpm: number
  bpmType: BpmType
  countInBars: number
  subdivision: number
  accentFirst: boolean
  /** Snap every segment tempo to the nearest mechanical metronome marking (10–240). */
  mechanicalTempos: boolean
  /** Easing curve applied to every tempo ramp in the workout sequence. */
  rampCurve: RampCurve
  sampleRate?: number
}

export type MetronomeSequenceConfig = Pick<
  MetronomeConfig,
  'bpm' | 'bpmType' | 'countInBars' | 'mechanicalTempos' | 'rampCurve'
>

export type MetronomeGeneratePayload = {
  sequence: SequenceSegment[]
  subdivision: number
  accentFirst: boolean
  sampleRate: number
}
