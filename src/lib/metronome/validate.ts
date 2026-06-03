import { getBpmInputLimits } from './bpmLimits'
import { DEFAULT_SAMPLE_RATE } from './audioGenerator'
import { MECHANICAL_METRONOME_MAX_BPM, MECHANICAL_METRONOME_MIN_BPM } from './mechanicalTempos'
import { COUNT_IN_BAR_OPTIONS } from './types'
import type { BpmType, MetronomeConfig, MetronomeGeneratePayload } from './types'
const MIN_SUBDIVISION = 1
const MAX_SUBDIVISION = 8

export function validateMetronomeConfig(body: unknown): MetronomeConfig | null {
  if (!body || typeof body !== 'object') return null

  const raw = body as Record<string, unknown>
  const bpm = Number(raw.bpm)
  const bpmType = raw.bpmType
  const countInBars = Number(raw.countInBars)
  const subdivision = Number(raw.subdivision)
  const accentFirst = raw.accentFirst
  const mechanicalTempos = raw.mechanicalTempos
  const sampleRate = raw.sampleRate === undefined ? undefined : Number(raw.sampleRate)

  if (bpmType !== 'start' && bpmType !== 'max') {
    return null
  }

  const { min: minBpm, max: maxBpm } = getBpmInputLimits(bpmType)

  if (
    !Number.isFinite(bpm) ||
    !Number.isInteger(bpm) ||
    bpm < minBpm ||
    bpm > maxBpm ||
    !Number.isInteger(countInBars) ||
    !(COUNT_IN_BAR_OPTIONS as readonly number[]).includes(countInBars) ||
    !Number.isInteger(subdivision) ||
    subdivision < MIN_SUBDIVISION ||
    subdivision > MAX_SUBDIVISION ||
    typeof accentFirst !== 'boolean' ||
    (mechanicalTempos !== undefined && typeof mechanicalTempos !== 'boolean')
  ) {
    return null
  }

  if (
    sampleRate !== undefined &&
    (!Number.isFinite(sampleRate) || sampleRate < 8_000 || sampleRate > 48_000)
  ) {
    return null
  }

  return {
    bpm,
    bpmType,
    countInBars,
    subdivision,
    accentFirst,
    mechanicalTempos: mechanicalTempos === true,
    sampleRate,
  }
}

export function validateGeneratePayload(body: unknown): MetronomeGeneratePayload | null {
  if (!body || typeof body !== 'object') return null

  const raw = body as Record<string, unknown>
  const subdivision = Number(raw.subdivision)
  const accentFirst = raw.accentFirst
  const sampleRate = Number(raw.sampleRate ?? DEFAULT_SAMPLE_RATE)
  const sequence = raw.sequence

  if (
    !Array.isArray(sequence) ||
    !Number.isInteger(subdivision) ||
    subdivision < MIN_SUBDIVISION ||
    subdivision > MAX_SUBDIVISION ||
    typeof accentFirst !== 'boolean' ||
    !Number.isFinite(sampleRate) ||
    sampleRate < 8_000 ||
    sampleRate > 48_000
  ) {
    return null
  }

  const parsedSequence = []
  for (const item of sequence) {
    if (!item || typeof item !== 'object') return null
    const seg = item as Record<string, unknown>
    const bars = Number(seg.bars)
    const bpmStart = Number(seg.bpmStart)
    const bpmEnd = Number(seg.bpmEnd)
    if (
      !Number.isInteger(bars) ||
      bars < 1 ||
      !Number.isFinite(bpmStart) ||
      bpmStart < MECHANICAL_METRONOME_MIN_BPM ||
      bpmStart > MECHANICAL_METRONOME_MAX_BPM ||
      !Number.isFinite(bpmEnd) ||
      bpmEnd < MECHANICAL_METRONOME_MIN_BPM ||
      bpmEnd > MECHANICAL_METRONOME_MAX_BPM
    ) {
      return null
    }
    parsedSequence.push({ bars, bpmStart, bpmEnd })
  }

  if (parsedSequence.length === 0) return null

  return {
    sequence: parsedSequence,
    subdivision,
    accentFirst,
    sampleRate,
  }
}
