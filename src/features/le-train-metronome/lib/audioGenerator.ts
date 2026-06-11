import { applyRampCurve, type RampCurve } from './rampCurve'
import type { SequenceSegment } from './types'

export const DEFAULT_SAMPLE_RATE = 22_050
export const BEATS_PER_BAR = 2
/** Pad duration (seconds) before the first click — filled with inaudible dither (matches Python). */
export const SILENCE_AT_START_S = 1.0

const CLICK_DURATION_S = 0.03
/** Float-scale Gaussian noise amplitude — matches Python `randn * 1e-5`. */
const DITHER_AMPLITUDE = 1e-5
/** Absolute int16 peak for the pre-roll keep-alive tone (~-42 dBFS). Applied after normalize. */
const DEVICE_WAKE_UP_PEAK = 250
const DEVICE_WAKE_UP_HZ = 30
const FREQ_ACCENT_HZ = 2_000
const FREQ_BEAT_HZ = 1_000
const FREQ_SUBDIVISION_HZ = 800

type ClickStep = {
  accent: 'accent' | 'beat' | 'subdivision'
  durationSeconds: number
}

const RAMP_WALL_CLOCK_ITERATIONS = 12

function interpolateBeatDuration(
  x: number,
  durationStart: number,
  durationEnd: number,
  curve: RampCurve,
): number {
  return durationStart + (durationEnd - durationStart) * applyRampCurve(x, curve)
}

/**
 * Option A — beat durations from wall-clock progress x = t/D.
 *
 * Each interval k uses f(x) where x is elapsed segment time / total segment time,
 * converged by fixed-point iteration so spacing matches Duration(t) = D_start + (D_end − D_start)·f(t/D).
 */
export function computeRampBeatDurations(
  totalBeats: number,
  bpmStart: number,
  bpmEnd: number,
  curve: RampCurve = 'linear',
): number[] {
  if (totalBeats <= 0) return []

  const durationStart = 60 / bpmStart
  const durationEnd = 60 / bpmEnd

  if (bpmStart === bpmEnd) {
    return Array.from({ length: totalBeats }, () => durationStart)
  }

  if (totalBeats === 1) {
    return [durationStart]
  }

  const interpolate = (x: number) => interpolateBeatDuration(x, durationStart, durationEnd, curve)

  let durations = Array.from({ length: totalBeats }, (_, beatIdx) =>
    interpolate(beatIdx / (totalBeats - 1)),
  )

  for (let iter = 0; iter < RAMP_WALL_CLOCK_ITERATIONS; iter++) {
    const totalDuration = durations.reduce((sum, duration) => sum + duration, 0)
    let elapsed = 0
    const next: number[] = []

    for (let beatIdx = 0; beatIdx < totalBeats; beatIdx++) {
      const x = totalDuration > 0 ? elapsed / totalDuration : 0
      const duration = interpolate(x)
      next.push(duration)
      elapsed += duration
    }

    durations = next
  }

  return durations
}

/** Instantaneous BPM at normalized wall-clock progress x ∈ [0, 1] (Option A). */
export function bpmAtRampProgress(
  x: number,
  bpmStart: number,
  bpmEnd: number,
  curve: RampCurve = 'linear',
): number {
  const duration = interpolateBeatDuration(x, 60 / bpmStart, 60 / bpmEnd, curve)
  return 60 / duration
}

/** Duration in seconds for one beat of a ramp segment. */
export function beatDurationSeconds(
  beatIdx: number,
  totalBeats: number,
  bpmStart: number,
  bpmEnd: number,
  curve: RampCurve = 'linear',
): number {
  const durations = computeRampBeatDurations(totalBeats, bpmStart, bpmEnd, curve)
  return durations[beatIdx] ?? durations[durations.length - 1] ?? 60 / bpmStart
}

function segmentRampCurve(segment: SequenceSegment): RampCurve {
  return segment.rampCurve ?? 'linear'
}

export function segmentDurationSeconds(segment: SequenceSegment): number {
  const durations = computeRampBeatDurations(
    segment.bars * BEATS_PER_BAR,
    segment.bpmStart,
    segment.bpmEnd,
    segmentRampCurve(segment),
  )
  return durations.reduce((sum, duration) => sum + duration, 0)
}

/** Finds the bar count whose ramp duration is closest to (but not exceeding) the target. */
export function barsForTargetDurationSeconds(
  durationSeconds: number,
  bpmStart: number,
  bpmEnd: number,
  curve: RampCurve,
): number {
  if (durationSeconds <= 0) return 1

  let low = 1
  let high = 2

  while (
    segmentDurationSeconds({ bars: high, bpmStart, bpmEnd, rampCurve: curve }) <= durationSeconds
  ) {
    high *= 2
    if (high > 10_000) break
  }

  while (low < high) {
    const mid = Math.ceil((low + high) / 2)
    const dur = segmentDurationSeconds({ bars: mid, bpmStart, bpmEnd, rampCurve: curve })
    if (dur <= durationSeconds) low = mid
    else high = mid - 1
  }

  return Math.max(1, low)
}

export function sequenceDurationSeconds(sequence: SequenceSegment[]): number {
  return sequence.reduce((sum, segment) => sum + segmentDurationSeconds(segment), 0)
}

/** First segment of the slow finale (ramp to minimum tempo, then hold). */
export function findFinaleStartSegmentIndex(sequence: SequenceSegment[]): number {
  let minBpm = Infinity
  for (const segment of sequence) {
    minBpm = Math.min(minBpm, segment.bpmStart, segment.bpmEnd)
  }

  for (let i = 0; i < sequence.length; i++) {
    const { bpmStart, bpmEnd } = sequence[i]
    if (bpmEnd === minBpm && bpmStart > bpmEnd) return i
    if (bpmStart === minBpm && bpmEnd === minBpm) return i
  }

  return Math.max(0, sequence.length - 1)
}

/**
 * Wall-clock downbeat onsets (s) for each segment boundary — matches WAV click placement
 * (float timeline + rounded sample index, same model as `generateWavBuffer`).
 * Returns `sequence.length + 1` entries: segment starts plus final end time.
 */
export function segmentDownbeatStartTimesSeconds(
  sequence: SequenceSegment[],
  subdivision: number,
  sampleRate: number = DEFAULT_SAMPLE_RATE,
): number[] {
  const starts: number[] = []
  let positionSamples = SILENCE_AT_START_S * sampleRate

  for (const segment of sequence) {
    starts.push(Math.round(positionSamples) / sampleRate)

    const beatDurations = computeRampBeatDurations(
      segment.bars * BEATS_PER_BAR,
      segment.bpmStart,
      segment.bpmEnd,
      segmentRampCurve(segment),
    )

    for (const beatDuration of beatDurations) {
      const stepDuration = beatDuration / subdivision

      for (let subIdx = 0; subIdx < subdivision; subIdx++) {
        positionSamples += stepDuration * sampleRate
      }
    }
  }

  starts.push(Math.round(positionSamples) / sampleRate)
  return starts
}

/** Wall-clock offset (s) at the first click of the finale segment — matches WAV timeline. */
export function findFinaleStartSeconds(
  sequence: SequenceSegment[],
  subdivision: number = 1,
  sampleRate: number = DEFAULT_SAMPLE_RATE,
): number {
  const finaleIndex = findFinaleStartSegmentIndex(sequence)
  return segmentDownbeatStartTimesSeconds(sequence, subdivision, sampleRate)[finaleIndex]!
}

function precomputeClick(freqHz: number, sampleRate: number): Int16Array {
  const n = Math.max(1, Math.floor(sampleRate * CLICK_DURATION_S))
  const click = new Int16Array(n)
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate
    const tone = Math.sin(2 * Math.PI * freqHz * t)
    const fade = 1 - i / n
    click[i] = Math.round(tone * fade * 0.8 * 32_767)
  }
  return click
}

function buildClickSteps(
  sequence: SequenceSegment[],
  subdivision: number,
  accentFirst: boolean,
): ClickStep[] {
  const steps: ClickStep[] = []

  for (const segment of sequence) {
    const beatDurations = computeRampBeatDurations(
      segment.bars * BEATS_PER_BAR,
      segment.bpmStart,
      segment.bpmEnd,
      segmentRampCurve(segment),
    )

    for (let beatIdx = 0; beatIdx < beatDurations.length; beatIdx++) {
      const stepDuration = beatDurations[beatIdx]! / subdivision

      for (let subIdx = 0; subIdx < subdivision; subIdx++) {
        let accent: ClickStep['accent'] = 'subdivision'
        if (subIdx === 0) {
          if (accentFirst && beatIdx % BEATS_PER_BAR === 0) {
            accent = 'accent'
          } else {
            accent = 'beat'
          }
        }
        steps.push({ accent, durationSeconds: stepDuration })
      }
    }
  }

  return steps
}

/** Downbeat onset times (s) using float timeline + rounded sample index (Python model). */
export function downbeatOnsetsSeconds(
  sequence: SequenceSegment[],
  subdivision: number,
  sampleRate: number,
): number[] {
  const steps = buildClickSteps(sequence, subdivision, false)
  const onsets: number[] = []
  let positionSamples = SILENCE_AT_START_S * sampleRate

  for (let i = 0; i < steps.length; i++) {
    if (i % subdivision === 0) {
      onsets.push(Math.round(positionSamples) / sampleRate)
    }
    positionSamples += steps[i].durationSeconds * sampleRate
  }

  return onsets
}

function randomNormal(): number {
  let u = 0
  let v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

/** Inaudible dither to keep sound devices active — matches Python `render_final_audio`. */
function fillInaudibleDither(pcm: Int16Array): void {
  for (let i = 0; i < pcm.length; i++) {
    pcm[i] = Math.round(randomNormal() * DITHER_AMPLITUDE * 32_767)
  }
}

/**
 * Low-level keep-alive in the pre-roll pad. External DACs and Bluetooth often treat
 * near-silent dither as digital zero and miss the first click unless the output path
 * is opened earlier. Applied after normalize so the level stays absolute.
 */
function mixDeviceWakeUpSignal(pcm: Int16Array, sampleRate: number): void {
  const padEnd = Math.min(pcm.length, Math.ceil(SILENCE_AT_START_S * sampleRate))
  for (let i = 0; i < padEnd; i++) {
    const t = i / sampleRate
    const tone = Math.sin(2 * Math.PI * DEVICE_WAKE_UP_HZ * t) * DEVICE_WAKE_UP_PEAK
    pcm[i] = Math.max(-32_768, Math.min(32_767, Math.round(tone)))
  }
}

function writeWavHeader(pcmByteLength: number, sampleRate: number): Buffer {
  const header = Buffer.alloc(44)
  header.write('RIFF', 0)
  header.writeUInt32LE(36 + pcmByteLength, 4)
  header.write('WAVE', 8)
  header.write('fmt ', 12)
  header.writeUInt32LE(16, 16)
  header.writeUInt16LE(1, 20)
  header.writeUInt16LE(1, 22)
  header.writeUInt32LE(sampleRate, 24)
  header.writeUInt32LE(sampleRate * 2, 28)
  header.writeUInt16LE(2, 32)
  header.writeUInt16LE(16, 34)
  header.write('data', 36)
  header.writeUInt32LE(pcmByteLength, 40)
  return header
}

function mixClick(pcm: Int16Array, offset: number, click: Int16Array): void {
  const end = Math.min(offset + click.length, pcm.length)
  for (let i = offset; i < end; i++) {
    const mixed = pcm[i] + click[i - offset]
    pcm[i] = Math.max(-32_768, Math.min(32_767, mixed))
  }
}

function normalizePcm(pcm: Int16Array): void {
  let peak = 0
  for (let i = 0; i < pcm.length; i++) {
    peak = Math.max(peak, Math.abs(pcm[i]))
  }
  if (peak === 0) return
  const gain = (0.9 * 32_767) / peak
  for (let i = 0; i < pcm.length; i++) {
    pcm[i] = Math.round(pcm[i] * gain)
  }
}

export function totalPcmSamples(steps: ClickStep[], sampleRate: number): number {
  const clickPad = Math.max(1, Math.floor(sampleRate * CLICK_DURATION_S))
  const silencePad = Math.ceil(SILENCE_AT_START_S * sampleRate)
  const timelineSamples = steps.reduce((sum, step) => sum + step.durationSeconds * sampleRate, 0)
  return silencePad + Math.ceil(timelineSamples) + clickPad
}

/**
 * Builds a mono 16-bit PCM WAV entirely in memory.
 * Click placement uses float timeline advancement (same model as metronome_generator.py).
 */
export function generateWavBuffer(
  sequence: SequenceSegment[],
  subdivision: number,
  accentFirst: boolean,
  sampleRate: number = DEFAULT_SAMPLE_RATE,
): Buffer {
  const steps = buildClickSteps(sequence, subdivision, accentFirst)
  const clicks = {
    accent: precomputeClick(FREQ_ACCENT_HZ, sampleRate),
    beat: precomputeClick(FREQ_BEAT_HZ, sampleRate),
    subdivision: precomputeClick(FREQ_SUBDIVISION_HZ, sampleRate),
  }
  const maxClickLength = Math.max(
    clicks.accent.length,
    clicks.beat.length,
    clicks.subdivision.length,
  )

  const pcm = new Int16Array(totalPcmSamples(steps, sampleRate))
  fillInaudibleDither(pcm)
  let positionSamples = SILENCE_AT_START_S * sampleRate

  for (const step of steps) {
    const index = Math.round(positionSamples)
    mixClick(pcm, index, clicks[step.accent])
    positionSamples += step.durationSeconds * sampleRate
  }

  const pcmLength = Math.max(
    Math.ceil(positionSamples),
    SILENCE_AT_START_S * sampleRate + maxClickLength,
  )
  const trimmed = pcm.subarray(0, pcmLength)
  normalizePcm(trimmed)
  mixDeviceWakeUpSignal(trimmed, sampleRate)

  const pcmBuffer = Buffer.from(trimmed.buffer, trimmed.byteOffset, trimmed.byteLength)
  const header = writeWavHeader(pcmBuffer.length, sampleRate)
  return Buffer.concat([header, pcmBuffer])
}

export function parseWavHeader(buffer: Buffer): {
  sampleRate: number
  channels: number
  bitsPerSample: number
  dataSize: number
} {
  if (buffer.length < 44) {
    throw new Error('WAV buffer too short')
  }
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WAVE') {
    throw new Error('Invalid WAV header')
  }
  return {
    sampleRate: buffer.readUInt32LE(24),
    channels: buffer.readUInt16LE(22),
    bitsPerSample: buffer.readUInt16LE(34),
    dataSize: buffer.readUInt32LE(40),
  }
}
