import { describe, expect, it } from 'vitest'

import {
  REFERENCE_BODY_SEQUENCE,
  REFERENCE_MAX_BPM,
  REFERENCE_START_BPM,
  buildMetronomeDownloadFilename,
  buildSequence,
  buildTempoPathDisplay,
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
      bpm: 80,
      bpmType: 'start',
      countInBars: 4,
      mechanicalTempos: false,
    })
    const ratio = 80 / REFERENCE_START_BPM
    expect(sequence[1]?.bpmStart).toBe(roundBpm(72 * ratio))
  })

  it('prepends configurable count-in bars', () => {
    const sequence = buildSequence({
      bpm: 92,
      bpmType: 'max',
      countInBars: 6,
      mechanicalTempos: false,
    })
    expect(sequence[0].bars).toBe(6)
    expect(sequence.length).toBe(REFERENCE_BODY_SEQUENCE.length + 1)
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
