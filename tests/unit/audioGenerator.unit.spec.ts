import { describe, expect, it } from 'vitest'

import {
  DEFAULT_SAMPLE_RATE,
  SILENCE_AT_START_S,
  beatDurationSeconds,
  downbeatOnsetsSeconds,
  findFinaleStartSeconds,
  findFinaleStartSegmentIndex,
  generateWavBuffer,
  parseWavHeader,
  sequenceDurationSeconds,
} from '@/features/le-train-metronome/lib/audioGenerator'
import { buildSequence } from '@/features/le-train-metronome/lib/sequenceBuilder'
import type { SequenceSegment } from '@/features/le-train-metronome/lib/types'

/** Reference Python click placement: float timeline, rounded sample index. */
function referenceDownbeatOnsetsSeconds(
  sequence: SequenceSegment[],
  subdivision: number,
  sampleRate: number,
): number[] {
  const onsets: number[] = []
  let positionSamples = SILENCE_AT_START_S * sampleRate

  for (const segment of sequence) {
    const totalBeats = segment.bars * 2
    for (let beatIdx = 0; beatIdx < totalBeats; beatIdx++) {
      const beatDuration = beatDurationSeconds(
        beatIdx,
        totalBeats,
        segment.bpmStart,
        segment.bpmEnd,
      )
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

  it('prepends one second of inaudible dither before the first click', () => {
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
    expect(maxAbsInPad).toBeGreaterThan(0)
    expect(maxAbsInPad).toBeLessThan(10)

    const onsets = downbeatOnsetsSeconds(shortSequence, 1, DEFAULT_SAMPLE_RATE)
    expect(onsets[0]).toBeCloseTo(SILENCE_AT_START_S, 3)
  })

  it('finale starts at the ramp down to minimum tempo', () => {
    const sequence = buildSequence({
      bpm: 92,
      bpmType: 'max',
      countInBars: 4,
      mechanicalTempos: false,
    })
    const index = findFinaleStartSegmentIndex(sequence)
    expect(sequence[index]).toEqual({ bars: 8, bpmStart: 72, bpmEnd: 42 })

    const wav = generateWavBuffer(sequence, 1, false, DEFAULT_SAMPLE_RATE)
    const header = parseWavHeader(wav)
    const durationSeconds = header.dataSize / (DEFAULT_SAMPLE_RATE * 2)
    const finaleStart = findFinaleStartSeconds(sequence)

    expect(finaleStart).toBeGreaterThan(0)
    expect(finaleStart).toBeLessThan(durationSeconds)
  })

  it('matches Python duration-linear timing on every downbeat', () => {
    const sequence = buildSequence({
      bpm: 92,
      bpmType: 'max',
      countInBars: 4,
      mechanicalTempos: false,
    })
    const subdivision = 2

    const expected = referenceDownbeatOnsetsSeconds(sequence, subdivision, DEFAULT_SAMPLE_RATE)
    const actual = downbeatOnsetsSeconds(sequence, subdivision, DEFAULT_SAMPLE_RATE)

    expect(actual).toEqual(expected)
  })

  it('WAV duration matches the analytical sequence duration', () => {
    const sequence = buildSequence({
      bpm: 110,
      bpmType: 'max',
      countInBars: 4,
      mechanicalTempos: false,
    })
    const wav = generateWavBuffer(sequence, 1, false, DEFAULT_SAMPLE_RATE)
    const header = parseWavHeader(wav)
    const wavDuration = header.dataSize / (DEFAULT_SAMPLE_RATE * 2)
    const analytical = sequenceDurationSeconds(sequence) + SILENCE_AT_START_S

    expect(Math.abs(wavDuration - analytical)).toBeLessThan(0.002)
  })

  it('generates a full Le Train session within a few seconds', () => {
    const sequence = buildSequence({
      bpm: 92,
      bpmType: 'max',
      countInBars: 4,
      mechanicalTempos: false,
    })
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
