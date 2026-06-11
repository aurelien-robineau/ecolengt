import {
  DEFAULT_SAMPLE_RATE,
  SILENCE_AT_START_S,
  segmentDownbeatStartTimesSeconds,
} from './audioGenerator'
import { applyMechanicalTemposToSequence } from './mechanicalTempos'
import type { RampCurve } from './rampCurve'
import type { BpmType, MetronomeSequenceConfig, SequenceSegment } from './types'

/** Canonical workout body (count-in is prepended separately). */
export const REFERENCE_BODY_SEQUENCE: readonly SequenceSegment[] = [
  { bars: 35, bpmStart: 72, bpmEnd: 72 },
  { bars: 4, bpmStart: 72, bpmEnd: 76 },
  { bars: 6, bpmStart: 76, bpmEnd: 76 },
  { bars: 4, bpmStart: 76, bpmEnd: 80 },
  { bars: 8, bpmStart: 80, bpmEnd: 80 },
  { bars: 4, bpmStart: 80, bpmEnd: 84 },
  { bars: 6, bpmStart: 84, bpmEnd: 84 },
  { bars: 4, bpmStart: 84, bpmEnd: 88 },
  { bars: 4, bpmStart: 88, bpmEnd: 88 },
  { bars: 8, bpmStart: 88, bpmEnd: 92 },
  { bars: 58, bpmStart: 92, bpmEnd: 92 },
  { bars: 4, bpmStart: 92, bpmEnd: 88 },
  { bars: 4, bpmStart: 88, bpmEnd: 72 },
  { bars: 8, bpmStart: 72, bpmEnd: 72 },
  { bars: 8, bpmStart: 72, bpmEnd: 42 },
  { bars: 10, bpmStart: 42, bpmEnd: 42 },
] as const

export const REFERENCE_MAX_BPM = 92
export const REFERENCE_START_BPM = 72
export const REFERENCE_COUNT_IN_BPM = 72

export function roundBpm(value: number): number {
  return Math.round(value)
}

export function scaleRatio(bpm: number, bpmType: BpmType): number {
  const anchor = bpmType === 'max' ? REFERENCE_MAX_BPM : REFERENCE_START_BPM
  return bpm / anchor
}

function applyRampCurveToBody(body: SequenceSegment[], curve: RampCurve): SequenceSegment[] {
  return body.map((segment) =>
    segment.bpmStart !== segment.bpmEnd ? { ...segment, rampCurve: curve } : segment,
  )
}

export function buildSequence(config: MetronomeSequenceConfig): SequenceSegment[] {
  const ratio = scaleRatio(config.bpm, config.bpmType)

  const body = applyRampCurveToBody(
    REFERENCE_BODY_SEQUENCE.map((segment) => ({
      bars: segment.bars,
      bpmStart: roundBpm(segment.bpmStart * ratio),
      bpmEnd: roundBpm(segment.bpmEnd * ratio),
    })),
    config.rampCurve,
  )

  const sequence =
    config.countInBars > 0
      ? [
          {
            bars: config.countInBars,
            bpmStart: roundBpm(REFERENCE_COUNT_IN_BPM * ratio),
            bpmEnd: roundBpm(REFERENCE_COUNT_IN_BPM * ratio),
          },
          ...body,
        ]
      : body

  return config.mechanicalTempos ? applyMechanicalTemposToSequence(sequence) : sequence
}

export function defaultSequenceConfig(
  overrides: Partial<MetronomeSequenceConfig> = {},
): MetronomeSequenceConfig {
  return {
    bpm: overrides.bpm ?? REFERENCE_MAX_BPM,
    bpmType: overrides.bpmType ?? 'max',
    countInBars: overrides.countInBars ?? 4,
    mechanicalTempos: overrides.mechanicalTempos ?? false,
    rampCurve: overrides.rampCurve ?? 'linear',
  }
}

export function peakBpmFromSequence(sequence: SequenceSegment[]): number {
  let peak = 0
  for (const segment of sequence) {
    peak = Math.max(peak, segment.bpmStart, segment.bpmEnd)
  }
  return peak
}

export function formatTempoBpm(bpm: number): string {
  return String(Math.round(bpm))
}

/** Matches `metronome_generator.py` export naming: count-in start → peak BPM. */
export function buildMetronomeDownloadFilename(sequence: SequenceSegment[]): string {
  const bpmFirst = sequence[0]?.bpmStart ?? 0
  const bpmMax = peakBpmFromSequence(sequence)
  return `Le Train - Métronome de ${formatTempoBpm(bpmFirst)} à ${formatTempoBpm(bpmMax)}.wav`
}

type TempoTableAnchor = {
  segmentIndex: number
  field: 'bpmStart' | 'bpmEnd'
}

/** Fixed workout anchors so the tempo table always has one column per reference step. */
const TEMPO_TABLE_ANCHORS: readonly TempoTableAnchor[] = [
  { segmentIndex: 0, field: 'bpmStart' },
  { segmentIndex: 1, field: 'bpmEnd' },
  { segmentIndex: 3, field: 'bpmEnd' },
  { segmentIndex: 5, field: 'bpmEnd' },
  { segmentIndex: 7, field: 'bpmEnd' },
  { segmentIndex: 9, field: 'bpmEnd' },
  { segmentIndex: 11, field: 'bpmEnd' },
  { segmentIndex: 12, field: 'bpmEnd' },
  { segmentIndex: 14, field: 'bpmEnd' },
] as const

/** Display BPMs for the two-row tempo table (count-in excluded). */
export function buildTempoTableMilestones(config: MetronomeSequenceConfig): number[] {
  const displayBody = buildSequence(config).slice(config.countInBars > 0 ? 1 : 0)

  return TEMPO_TABLE_ANCHORS.map(({ segmentIndex, field }) => displayBody[segmentIndex][field])
}

function findSequenceSegmentIndex(
  sequence: SequenceSegment[],
  currentTime: number,
  subdivision: number,
  sampleRate: number = DEFAULT_SAMPLE_RATE,
): number {
  const boundaries = segmentDownbeatStartTimesSeconds(sequence, subdivision, sampleRate)

  for (let segmentIndex = 0; segmentIndex < sequence.length; segmentIndex++) {
    const segmentStart = boundaries[segmentIndex]!
    const segmentEnd = boundaries[segmentIndex + 1]!
    if (currentTime >= segmentStart && currentTime < segmentEnd) {
      return segmentIndex
    }
  }

  return Math.max(0, sequence.length - 1)
}

function findDisplaySegmentIndex(
  sequence: SequenceSegment[],
  countInBars: number,
  currentTime: number,
  subdivision: number,
  sampleRate: number = DEFAULT_SAMPLE_RATE,
): number {
  if (currentTime < SILENCE_AT_START_S) {
    return countInBars > 0 ? -1 : 0
  }

  const segmentIndex = findSequenceSegmentIndex(sequence, currentTime, subdivision, sampleRate)

  if (countInBars > 0) {
    return segmentIndex === 0 ? -1 : segmentIndex - 1
  }

  return segmentIndex
}

function anchorActivationSegmentIndex(anchor: TempoTableAnchor): number {
  // Speed changes complete at segment end — highlight advances once the target tempo is reached.
  return anchor.field === 'bpmStart' ? anchor.segmentIndex : anchor.segmentIndex + 1
}

/** Maps playback time to the highlighted tempo-table column (0-based). */
export function findCurrentTempoColumnIndex(
  config: MetronomeSequenceConfig,
  currentTime: number,
  subdivision: number = 1,
  sampleRate: number = DEFAULT_SAMPLE_RATE,
): number {
  const sequence = buildSequence(config)
  const displaySegmentIndex = findDisplaySegmentIndex(
    sequence,
    config.countInBars,
    currentTime,
    subdivision,
    sampleRate,
  )

  if (displaySegmentIndex < 0) {
    return 0
  }

  let columnIndex = 0

  for (let index = 0; index < TEMPO_TABLE_ANCHORS.length; index++) {
    if (displaySegmentIndex >= anchorActivationSegmentIndex(TEMPO_TABLE_ANCHORS[index])) {
      columnIndex = index
    }
  }

  return columnIndex
}

export type TempoRampDirection = 'up' | 'down'

/** Returns the active crescendo/decrescendo during playback, if any. */
export function findCurrentTempoRampDirection(
  config: MetronomeSequenceConfig,
  currentTime: number,
  subdivision: number = 1,
  sampleRate: number = DEFAULT_SAMPLE_RATE,
): TempoRampDirection | null {
  const sequence = buildSequence(config)
  const displaySegmentIndex = findDisplaySegmentIndex(
    sequence,
    config.countInBars,
    currentTime,
    subdivision,
    sampleRate,
  )

  if (displaySegmentIndex < 0) {
    return null
  }

  const displayBody = sequence.slice(config.countInBars > 0 ? 1 : 0)
  const segment = displayBody[displaySegmentIndex]

  if (!segment || segment.bpmStart === segment.bpmEnd) {
    return null
  }

  return segment.bpmEnd > segment.bpmStart ? 'up' : 'down'
}
