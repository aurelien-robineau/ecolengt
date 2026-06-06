import { describe, expect, it } from 'vitest'

import {
  DEFAULT_SAMPLE_RATE,
  SILENCE_AT_START_S,
  segmentDownbeatStartTimesSeconds,
} from '@/features/le-train-metronome/lib/audioGenerator'
import {
  REFERENCE_BODY_SEQUENCE,
  REFERENCE_MAX_BPM,
  buildMetronomeDownloadFilename,
  buildSequence,
  buildTempoTableMilestones,
  findCurrentTempoColumnIndex,
  findCurrentTempoRampDirection,
  peakBpmFromSequence,
  roundBpm,
  scaleRatio,
} from '@/features/le-train-metronome/lib/sequenceBuilder'

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

  it('builds the reference tempo table for max BPM 92', () => {
    const tempos = buildTempoTableMilestones({
      bpm: 92,
      bpmType: 'max',
      countInBars: 0,
      mechanicalTempos: false,
    })
    expect(tempos).toEqual([72, 76, 80, 84, 88, 92, 88, 72, 42])
  })

  it('scales the tempo table peak with max BPM type', () => {
    const sequence = buildSequence({
      bpm: 110,
      bpmType: 'max',
      countInBars: 4,
      mechanicalTempos: false,
    })
    const tempos = buildTempoTableMilestones({
      bpm: 110,
      bpmType: 'max',
      countInBars: 0,
      mechanicalTempos: false,
    })

    expect(tempos[tempos.length - 4]).toBe(110)
    expect(peakBpmFromSequence(sequence)).toBe(110)
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

    expect(reference).toEqual([72, 76, 80, 84, 88, 92, 88, 72, 42])
    expect(scaled.length).toBe(reference.length)
    expect(scaled).toEqual([60, 63, 69, 72, 76, 76, 76, 60, 36])
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

  it('maps playback time to the active tempo-table column', () => {
    const config = {
      bpm: 92,
      bpmType: 'max' as const,
      countInBars: 0,
      mechanicalTempos: false,
    }
    const sequence = buildSequence(config)

    const segmentStartTimes = segmentDownbeatStartTimesSeconds(sequence, 1, DEFAULT_SAMPLE_RATE)

    expect(findCurrentTempoColumnIndex(config, SILENCE_AT_START_S)).toBe(0)
    expect(findCurrentTempoColumnIndex(config, segmentStartTimes[1]!)).toBe(0)
    expect(findCurrentTempoColumnIndex(config, segmentStartTimes[2]!)).toBe(1)
    expect(findCurrentTempoColumnIndex(config, segmentStartTimes[3]!)).toBe(1)
    expect(findCurrentTempoColumnIndex(config, segmentStartTimes[4]!)).toBe(2)
    expect(findCurrentTempoColumnIndex(config, segmentStartTimes[11]!)).toBe(5)
    expect(findCurrentTempoColumnIndex(config, segmentStartTimes[12]!)).toBe(6)
    expect(findCurrentTempoColumnIndex(config, segmentStartTimes[14]!)).toBe(7)
    expect(findCurrentTempoColumnIndex(config, segmentStartTimes[15]!)).toBe(8)
  })

  it('detects crescendo and decrescendo segments during playback', () => {
    const config = {
      bpm: 92,
      bpmType: 'max' as const,
      countInBars: 0,
      mechanicalTempos: false,
    }
    const sequence = buildSequence(config)

    const segmentStartTimes = segmentDownbeatStartTimesSeconds(sequence, 1, DEFAULT_SAMPLE_RATE)

    expect(findCurrentTempoRampDirection(config, segmentStartTimes[0]!)).toBeNull()
    expect(findCurrentTempoRampDirection(config, segmentStartTimes[1]!)).toBe('up')
    expect(findCurrentTempoRampDirection(config, segmentStartTimes[2]!)).toBeNull()
    expect(findCurrentTempoRampDirection(config, segmentStartTimes[11]!)).toBe('down')
    expect(findCurrentTempoRampDirection(config, segmentStartTimes[12]!)).toBe('down')
  })

  it('highlights the first tempo column during count-in', () => {
    const config = {
      bpm: 92,
      bpmType: 'max' as const,
      countInBars: 4,
      mechanicalTempos: false,
    }

    expect(findCurrentTempoColumnIndex(config, SILENCE_AT_START_S + 0.5)).toBe(0)
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
