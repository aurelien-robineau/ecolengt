import { DEFAULT_SAMPLE_RATE, findFinaleStartSeconds, generateWavBuffer } from './audioGenerator'
import { buildMetronomeDownloadFilename, buildSequence } from './sequenceBuilder'
import type { MetronomeConfig, SequenceSegment } from './types'

export type MetronomeAudioConfig = Omit<MetronomeConfig, 'sampleRate'>

export type MetronomeAudioResult = {
  blob: Blob
  sequence: SequenceSegment[]
  downloadFilename: string
  finaleStartTime: number
}

export function generateMetronomeAudio(
  config: MetronomeAudioConfig,
  sampleRate: number = DEFAULT_SAMPLE_RATE,
): MetronomeAudioResult {
  const sequence = buildSequence(config)
  const wav = generateWavBuffer(sequence, config.subdivision, config.accentFirst, sampleRate)

  return {
    blob: new Blob([wav.slice()], { type: 'audio/wav' }),
    sequence,
    downloadFilename: buildMetronomeDownloadFilename(sequence),
    finaleStartTime: findFinaleStartSeconds(sequence, config.subdivision, sampleRate),
  }
}
