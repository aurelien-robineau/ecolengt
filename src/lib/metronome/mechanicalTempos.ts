import type { SequenceSegment } from './types'

/** Allowed snap range (broader than form input bounds). */
export const MECHANICAL_METRONOME_MIN_BPM = 10
export const MECHANICAL_METRONOME_MAX_BPM = 240

/** 10–40 BPM in steps of 2, then Wittner/Maelzel 42–208, then 220 and 240. */
const MECHANICAL_LOW_BPMS = Array.from({ length: (40 - 10) / 2 + 1 }, (_, index) => 10 + index * 2)

const MECHANICAL_WITTNER_BPMS = [
  42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108,
  112, 116, 120, 126, 132, 138, 144, 152, 160, 168, 176, 184, 192, 200, 208,
] as const

export const MECHANICAL_METRONOME_BPMS: readonly number[] = [
  ...MECHANICAL_LOW_BPMS,
  ...MECHANICAL_WITTNER_BPMS,
  220,
  240,
]

const MIN_MARK = MECHANICAL_METRONOME_BPMS[0]
const MAX_MARK = MECHANICAL_METRONOME_BPMS[MECHANICAL_METRONOME_BPMS.length - 1]

export function snapToMechanicalMetronomeBpm(bpm: number): number {
  const rounded = Math.round(bpm)

  if (rounded <= MIN_MARK) return MIN_MARK
  if (rounded >= MAX_MARK) return MAX_MARK

  let closest: (typeof MECHANICAL_METRONOME_BPMS)[number] = MIN_MARK
  let minDistance = Infinity

  for (const mark of MECHANICAL_METRONOME_BPMS) {
    const distance = Math.abs(rounded - mark)
    if (distance < minDistance) {
      minDistance = distance
      closest = mark
    }
  }

  return closest
}

export function applyMechanicalTemposToSequence(sequence: SequenceSegment[]): SequenceSegment[] {
  return sequence.map((segment) => ({
    bars: segment.bars,
    bpmStart: snapToMechanicalMetronomeBpm(segment.bpmStart),
    bpmEnd: snapToMechanicalMetronomeBpm(segment.bpmEnd),
  }))
}
