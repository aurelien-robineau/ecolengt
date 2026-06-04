import { describe, expect, it } from 'vitest'

import {
  REFERENCE_BODY_SEQUENCE,
  REFERENCE_MAX_BPM,
  REFERENCE_START_BPM,
  buildMetronomeDownloadFilename,
  buildSequence,
  buildTempoPathDisplay,
  buildTempoTableMilestones,
  peakBpmFromSequence,
  roundBpm,
  scaleRatio,
} from '@/lib/metronome/sequenceBuilder'

describe('sequenceBuilder', () => {
  it('keeps reference peak at 92 BPM when bpmType is max and bpm is 92', () => {
    const sequence = buildSequence({
      bpm: 92,
      bpmType: 'max',
      countInBars: 4,
      mechanicalTempos: false,
    })
    expect(peakBpmFromSequence(sequence)).toBe(REFERENCE_MAX_BPM)
    expect(sequence[0]).toEqual({ bars: 4, bpmStart: 72, bpmEnd: 72 })
  })

  it('scales peak proportionally for max BPM type', () => {
    const sequence = buildSequence({
      bpm: 110,
      bpmType: 'max',
      countInBars: 2,
      mechanicalTempos: false,
    })
    const ratio = 110 / REFERENCE_MAX_BPM
    const mainBlock = sequence.find((s) => s.bars === 58)
    expect(mainBlock?.bpmStart).toBe(roundBpm(92 * ratio))
    expect(mainBlock?.bpmEnd).toBe(roundBpm(92 * ratio))
  })

  it('anchors start BPM type to reference start tempo', () => {
    expect(scaleRatio(72, 'start')).toBe(1)
    const sequence = buildSequence({
      bpm: 72,
      bpmType: 'start',
      countInBars: 4,
      mechanicalTempos: false,
    })
    expect(sequence[1]?.bpmStart).toBe(72)
    expect(peakBpmFromSequence(sequence)).toBe(REFERENCE_MAX_BPM)
  })

  it('prepends configurable count-in bars', () => {
    const sequence = buildSequence({
      bpm: 92,
      bpmType: 'max',
      countInBars: 2,
      mechanicalTempos: false,
    })
    expect(sequence[0].bars).toBe(2)
    expect(sequence.length).toBe(REFERENCE_BODY_SEQUENCE.length + 1)
  })

  it('omits count-in when intro bars is 0', () => {
    const sequence = buildSequence({
      bpm: 92,
      bpmType: 'max',
      countInBars: 0,
      mechanicalTempos: false,
    })
    expect(sequence.length).toBe(REFERENCE_BODY_SEQUENCE.length)
    expect(sequence[0].bars).toBe(REFERENCE_BODY_SEQUENCE[0].bars)
  })

  it('builds the reference tempo path for max BPM 92', () => {
    const path = buildTempoPathDisplay({
      bpm: 92,
      bpmType: 'max',
      countInBars: 4,
      mechanicalTempos: false,
    })
    expect(path.ascent.map((m) => m.display)).toEqual([72, 76, 80, 84, 88, 92])
    expect(path.descent.map((m) => m.display)).toEqual([88, 72, 42])
    expect(path.peak).toBe(92)
  })

  it('keeps separate milestones that round to the same BPM but differ before rounding', () => {
    const path = buildTempoPathDisplay({
      bpm: 86,
      bpmType: 'max',
      countInBars: 4,
      mechanicalTempos: true,
    })
    const all = [...path.ascent, ...path.descent]
    const pair = all.find(
      (milestone, index) =>
        index > 0 &&
        milestone.display === all[index - 1].display &&
        milestone.exact !== all[index - 1].exact,
    )

    expect(pair).toBeDefined()
  })

  it('scales the tempo path with max BPM type', () => {
    const path = buildTempoPathDisplay({
      bpm: 110,
      bpmType: 'max',
      countInBars: 4,
      mechanicalTempos: false,
    })
    expect(path.ascent[path.ascent.length - 1].display).toBe(110)
    expect(path.peak).toBe(110)
  })

  it('builds download filename from count-in start and peak BPM', () => {
    const sequence = buildSequence({
      bpm: 92,
      bpmType: 'max',
      countInBars: 4,
      mechanicalTempos: false,
    })
    expect(buildMetronomeDownloadFilename(sequence)).toBe('Le Train - Métronome de 72 à 92.wav')
  })

  it('builds the tempo table with fixed columns for mechanical max BPM 78', () => {
    const reference = buildTempoTableMilestones({
      bpm: REFERENCE_MAX_BPM,
      bpmType: 'max',
      countInBars: 0,
      mechanicalTempos: false,
    })
    const scaled = buildTempoTableMilestones({
      bpm: 78,
      bpmType: 'max',
      countInBars: 0,
      mechanicalTempos: true,
    })

    expect(reference.map((m) => m.display)).toEqual([72, 76, 80, 84, 88, 92, 88, 72, 42])
    expect(scaled.length).toBe(reference.length)
    expect(scaled.map((m) => m.display)).toEqual([60, 63, 69, 72, 76, 76, 76, 60, 36])
  })

  it('keeps tempo table column count aligned with reference across max BPM range', () => {
    const referenceCount = buildTempoTableMilestones({
      bpm: REFERENCE_MAX_BPM,
      bpmType: 'max',
      countInBars: 0,
      mechanicalTempos: false,
    }).length

    const mismatches: Array<{ bpm: number; mechanical: boolean; count: number }> = []

    for (let bpm = 26; bpm <= 92; bpm++) {
      for (const mechanicalTempos of [false, true]) {
        const count = buildTempoTableMilestones({
          bpm,
          bpmType: 'max',
          countInBars: 0,
          mechanicalTempos,
        }).length
        if (count !== referenceCount) {
          mismatches.push({ bpm, mechanical: mechanicalTempos, count })
        }
      }
    }

    expect(mismatches).toEqual([])
  })

  it('rounds scaled tempos to integers', () => {
    const sequence = buildSequence({
      bpm: 100,
      bpmType: 'max',
      countInBars: 4,
      mechanicalTempos: false,
    })
    for (const segment of sequence) {
      expect(Number.isInteger(segment.bpmStart)).toBe(true)
      expect(Number.isInteger(segment.bpmEnd)).toBe(true)
      expect(segment.bpmStart).toBe(roundBpm(segment.bpmStart))
      expect(segment.bpmEnd).toBe(roundBpm(segment.bpmEnd))
    }
  })
})
