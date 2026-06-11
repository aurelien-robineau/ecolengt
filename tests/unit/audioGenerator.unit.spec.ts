import { describe, expect, it } from 'vitest'

import {
  DEFAULT_SAMPLE_RATE,
  SILENCE_AT_START_S,
  beatDurationSeconds,
  computeRampBeatDurations,
  downbeatOnsetsSeconds,
  findFinaleStartSeconds,
  findFinaleStartSegmentIndex,
  generateWavBuffer,
  parseWavHeader,
  segmentDownbeatStartTimesSeconds,
  sequenceDurationSeconds,
} from '@/features/le-train-metronome/lib/audioGenerator'
import {
  buildSequence,
  defaultSequenceConfig,
} from '@/features/le-train-metronome/lib/sequenceBuilder'
import type { SequenceSegment } from '@/features/le-train-metronome/lib/types'

/** Reference click placement: float timeline, rounded sample index. */
function referenceDownbeatOnsetsSeconds(
  sequence: SequenceSegment[],
  subdivision: number,
  sampleRate: number,
): number[] {
  const onsets: number[] = []
  let positionSamples = SILENCE_AT_START_S * sampleRate

  for (const segment of sequence) {
    const beatDurations = computeRampBeatDurations(
      segment.bars * 2,
      segment.bpmStart,
      segment.bpmEnd,
      segment.rampCurve ?? 'linear',
    )

    for (const beatDuration of beatDurations) {
      const stepDuration = beatDuration / subdivision
      for (let subIdx = 0; subIdx < subdivision; subIdx++) {
        if (subIdx === 0) {
          onsets.push(Math.round(positionSamples) / sampleRate)
        }
        positionSamples += stepDuration * sampleRate
      }
    }
  }

  return onsets
}

describe('audioGenerator', () => {
  const shortSequence = [{ bars: 1, bpmStart: 120, bpmEnd: 120 }]

  it('writes a valid WAV header and matching PCM size', () => {
    const wav = generateWavBuffer(shortSequence, 1, true, DEFAULT_SAMPLE_RATE)
    const header = parseWavHeader(wav)

    expect(header.sampleRate).toBe(DEFAULT_SAMPLE_RATE)
    expect(header.channels).toBe(1)
    expect(header.bitsPerSample).toBe(16)
    expect(wav.length).toBe(44 + header.dataSize)
    expect(header.dataSize % 2).toBe(0)
  })

  it('produces non-empty audio for a minimal sequence', () => {
    const wav = generateWavBuffer(shortSequence, 2, false, DEFAULT_SAMPLE_RATE)
    expect(wav.length).toBeGreaterThan(44)

    const pcm = wav.subarray(44)
    let nonZero = 0
    for (let i = 0; i < pcm.length; i += 2) {
      if (pcm.readInt16LE(i) !== 0) nonZero++
    }
    expect(nonZero).toBeGreaterThan(0)
  })

  it('prepends one second of keep-alive audio before the first click', () => {
    const wav = generateWavBuffer(shortSequence, 1, false, DEFAULT_SAMPLE_RATE)
    const pcm = wav.subarray(44)
    const padSamples = Math.floor(SILENCE_AT_START_S * DEFAULT_SAMPLE_RATE)

    let maxAbsInPad = 0
    let nonZeroInPad = 0
    for (let i = 0; i < padSamples; i++) {
      const sample = pcm.readInt16LE(i * 2)
      if (sample !== 0) nonZeroInPad++
      maxAbsInPad = Math.max(maxAbsInPad, Math.abs(sample))
    }

    expect(nonZeroInPad).toBeGreaterThan(100)
    // Strong enough to wake external outputs, still well below click level (~29k peak).
    expect(maxAbsInPad).toBeGreaterThan(100)
    expect(maxAbsInPad).toBeLessThan(500)

    const onsets = downbeatOnsetsSeconds(shortSequence, 1, DEFAULT_SAMPLE_RATE)
    expect(onsets[0]).toBeCloseTo(SILENCE_AT_START_S, 3)
  })

  it('finale starts at the ramp down to minimum tempo', () => {
    const sequence = buildSequence(defaultSequenceConfig({ bpm: 92, countInBars: 4 }))
    const index = findFinaleStartSegmentIndex(sequence)
    expect(sequence[index]).toEqual({
      bars: 8,
      bpmStart: 72,
      bpmEnd: 42,
      rampCurve: 'linear',
    })

    const wav = generateWavBuffer(sequence, 1, false, DEFAULT_SAMPLE_RATE)
    const header = parseWavHeader(wav)
    const durationSeconds = header.dataSize / (DEFAULT_SAMPLE_RATE * 2)
    const finaleStart = findFinaleStartSeconds(sequence, 1, DEFAULT_SAMPLE_RATE)

    expect(finaleStart).toBeGreaterThan(0)
    expect(finaleStart).toBeLessThan(durationSeconds)
  })

  it('matches wall-clock Option A timing on every downbeat', () => {
    const sequence = buildSequence(defaultSequenceConfig({ bpm: 92, countInBars: 4 }))
    const subdivision = 2

    const expected = referenceDownbeatOnsetsSeconds(sequence, subdivision, DEFAULT_SAMPLE_RATE)
    const actual = downbeatOnsetsSeconds(sequence, subdivision, DEFAULT_SAMPLE_RATE)

    expect(actual).toEqual(expected)
  })

  it('segment downbeat starts match the first click of each segment in the WAV', () => {
    const sequence = buildSequence(defaultSequenceConfig({ bpm: 92, countInBars: 4 }))
    const subdivision = 2
    const starts = segmentDownbeatStartTimesSeconds(sequence, subdivision, DEFAULT_SAMPLE_RATE)
    const onsets = downbeatOnsetsSeconds(sequence, subdivision, DEFAULT_SAMPLE_RATE)

    let onsetCursor = 0
    for (let segmentIndex = 0; segmentIndex < sequence.length; segmentIndex++) {
      expect(starts[segmentIndex]).toBeCloseTo(onsets[onsetCursor]!, 6)
      onsetCursor += sequence[segmentIndex]!.bars * 2
    }
  })

  it('WAV duration matches the analytical sequence duration', () => {
    const sequence = buildSequence(defaultSequenceConfig({ bpm: 110, countInBars: 4 }))
    const wav = generateWavBuffer(sequence, 1, false, DEFAULT_SAMPLE_RATE)
    const header = parseWavHeader(wav)
    const wavDuration = header.dataSize / (DEFAULT_SAMPLE_RATE * 2)
    const analytical = sequenceDurationSeconds(sequence) + SILENCE_AT_START_S

    expect(Math.abs(wavDuration - analytical)).toBeLessThan(0.002)
  })

  it('generates a full Le Train session within a few seconds', () => {
    const sequence = buildSequence(defaultSequenceConfig({ bpm: 92, countInBars: 4 }))
    const start = performance.now()
    const wav = generateWavBuffer(sequence, 2, true, DEFAULT_SAMPLE_RATE)
    const elapsed = performance.now() - start

    const header = parseWavHeader(wav)
    const durationSeconds = header.dataSize / (DEFAULT_SAMPLE_RATE * 2)

    expect(durationSeconds).toBeGreaterThan(60)
    expect(elapsed).toBeLessThan(5_000)
    expect(wav.length).toBeGreaterThan(1_000_000)
  })
})
