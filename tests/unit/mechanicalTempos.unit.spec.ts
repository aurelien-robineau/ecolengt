import { describe, expect, it } from 'vitest'

import {
  MECHANICAL_METRONOME_BPMS,
  MECHANICAL_METRONOME_MAX_BPM,
  MECHANICAL_METRONOME_MIN_BPM,
  applyMechanicalTemposToSequence,
  snapToMechanicalMetronomeBpm,
} from '@/features/le-train-metronome/lib/mechanicalTempos'
import {
  buildSequence,
  defaultSequenceConfig,
} from '@/features/le-train-metronome/lib/sequenceBuilder'

describe('mechanicalTempos', () => {
  it('spans 10–240 with discrete markings', () => {
    expect(MECHANICAL_METRONOME_MIN_BPM).toBe(10)
    expect(MECHANICAL_METRONOME_MAX_BPM).toBe(240)
    expect(MECHANICAL_METRONOME_BPMS[0]).toBe(10)
    expect(MECHANICAL_METRONOME_BPMS[15]).toBe(40)
    expect(MECHANICAL_METRONOME_BPMS[16]).toBe(42)
    expect(MECHANICAL_METRONOME_BPMS[MECHANICAL_METRONOME_BPMS.length - 1]).toBe(240)
    expect(MECHANICAL_METRONOME_BPMS.length).toBeLessThan(240 - 10 + 1)
  })

  it('uses steps of 2 from 10 to 40', () => {
    const lowMarks = MECHANICAL_METRONOME_BPMS.filter((bpm) => bpm <= 40)
    expect(lowMarks).toEqual([10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40])
  })

  it('snaps to the nearest mechanical marking, not every integer', () => {
    expect(snapToMechanicalMetronomeBpm(91)).toBe(92)
    expect(snapToMechanicalMetronomeBpm(95)).toBe(96)
    expect(snapToMechanicalMetronomeBpm(77)).toBe(76)
    expect(snapToMechanicalMetronomeBpm(72)).toBe(72)
  })

  it('clamps below and above the mechanical range', () => {
    expect(snapToMechanicalMetronomeBpm(5)).toBe(10)
    expect(snapToMechanicalMetronomeBpm(250)).toBe(240)
  })

  it('changes the tempo path versus integer rounding alone', () => {
    const config = defaultSequenceConfig({ bpm: 100, countInBars: 4 })
    const integerOnly = buildSequence({ ...config, mechanicalTempos: false })
    const mechanical = buildSequence({ ...config, mechanicalTempos: true })

    expect(mechanical).not.toEqual(integerOnly)
  })

  it('keeps every snapped tempo on the mechanical scale', () => {
    const sequence = buildSequence(
      defaultSequenceConfig({ bpm: 95, countInBars: 4, mechanicalTempos: true }),
    )
    const marks = new Set<number>(MECHANICAL_METRONOME_BPMS)

    for (const segment of sequence) {
      expect(marks.has(segment.bpmStart)).toBe(true)
      expect(marks.has(segment.bpmEnd)).toBe(true)
    }
  })

  it('does not alter the sequence when mechanical snapping is disabled', () => {
    const free = buildSequence(defaultSequenceConfig({ bpm: 95, countInBars: 4 }))
    const snapped = applyMechanicalTemposToSequence(free)
    const withFlag = buildSequence(
      defaultSequenceConfig({ bpm: 95, countInBars: 4, mechanicalTempos: true }),
    )

    expect(withFlag).toEqual(snapped)
  })
})
