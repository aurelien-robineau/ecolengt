import { describe, expect, it } from 'vitest'

import {
  DEFAULT_SAMPLE_RATE,
  generateWavBuffer,
  parseWavHeader,
} from '@/features/le-train-metronome/lib/audioGenerator'
import { generateMetronomeAudio } from '@/features/le-train-metronome/lib/generateMetronomeAudio'
import { defaultSequenceConfig } from '@/features/le-train-metronome/lib/sequenceBuilder'

describe('generateMetronomeAudio', () => {
  it('returns a valid WAV blob and session metadata for a default workout', () => {
    const config = defaultSequenceConfig({ bpm: 92, countInBars: 4 })
    const result = generateMetronomeAudio({
      ...config,
      subdivision: 2,
      accentFirst: true,
    })

    expect(result.blob).toBeInstanceOf(Blob)
    expect(result.blob.size).toBeGreaterThan(44)
    expect(result.blob.type).toBe('audio/wav')
    expect(result.sequence.length).toBeGreaterThan(0)
    expect(result.downloadFilename).toMatch(/^Le Train - Métronome de \d+ à \d+\.wav$/)
    expect(result.finaleStartTime).toBeGreaterThan(0)

    const wav = generateWavBuffer(result.sequence, 2, true, DEFAULT_SAMPLE_RATE)
    const header = parseWavHeader(wav)
    expect(header.sampleRate).toBe(DEFAULT_SAMPLE_RATE)
    expect(header.dataSize).toBe(wav.length - 44)
    expect(result.blob.size).toBe(wav.length)
  })
})
