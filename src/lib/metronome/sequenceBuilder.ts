import { applyMechanicalTemposToSequence } from './mechanicalTempos'
import type { BpmType, MetronomeConfig, MetronomeSequenceConfig, SequenceSegment } from './types'

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

export function buildSequence(config: MetronomeSequenceConfig): SequenceSegment[] {
  const ratio = scaleRatio(config.bpm, config.bpmType)

  const body = REFERENCE_BODY_SEQUENCE.map((segment) => ({
    bars: segment.bars,
    bpmStart: roundBpm(segment.bpmStart * ratio),
    bpmEnd: roundBpm(segment.bpmEnd * ratio),
  }))

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

export type TempoMilestone = {
  /** Unscaled-scaled BPM before display rounding (used for deduplication). */
  exact: number
  /** Integer BPM shown in the UI and used in audio. */
  display: number
}

function sameExactBpm(a: number, b: number): boolean {
  return Math.abs(a - b) < 1e-9
}

function pushMilestone(milestones: TempoMilestone[], exact: number, display: number): void {
  const last = milestones[milestones.length - 1]
  if (last && sameExactBpm(last.exact, exact)) return
  milestones.push({ exact, display })
}

type ScaledSegment = {
  exact: SequenceSegment
  display: SequenceSegment
}

function buildScaledBodySegments(config: MetronomeSequenceConfig): ScaledSegment[] {
  const ratio = scaleRatio(config.bpm, config.bpmType)
  const displayBody = buildSequence(config).slice(config.countInBars > 0 ? 1 : 0)

  return REFERENCE_BODY_SEQUENCE.map((segment, index) => ({
    exact: {
      bars: segment.bars,
      bpmStart: segment.bpmStart * ratio,
      bpmEnd: segment.bpmEnd * ratio,
    },
    display: displayBody[index],
  }))
}

function extractAscentMilestones(segments: ScaledSegment[]): TempoMilestone[] {
  const milestones: TempoMilestone[] = []

  for (const { exact, display } of segments) {
    if (milestones.length === 0) {
      pushMilestone(milestones, exact.bpmStart, display.bpmStart)
      if (display.bpmEnd !== display.bpmStart) {
        pushMilestone(milestones, exact.bpmEnd, display.bpmEnd)
      }
      continue
    }

    if (display.bpmStart === display.bpmEnd) {
      pushMilestone(milestones, exact.bpmStart, display.bpmStart)
      continue
    }

    if (display.bpmEnd > display.bpmStart) {
      pushMilestone(milestones, exact.bpmEnd, display.bpmEnd)
    }
  }

  return milestones
}

function extractDescentMilestones(segments: ScaledSegment[]): TempoMilestone[] {
  const milestones: TempoMilestone[] = []

  for (const { exact, display } of segments) {
    pushMilestone(milestones, exact.bpmEnd, display.bpmEnd)
  }

  return milestones
}

export type TempoPathDisplay = {
  ascent: TempoMilestone[]
  descent: TempoMilestone[]
  peak: number
}

/** Workout body only (count-in excluded). */
export function buildTempoPathDisplay(config: MetronomeSequenceConfig): TempoPathDisplay {
  const segments = buildScaledBodySegments(config)
  const peak = peakBpmFromSequence(segments.map((segment) => segment.display))
  const descentStartIdx = segments.findIndex(
    (segment) => segment.display.bpmEnd < segment.display.bpmStart,
  )

  if (descentStartIdx === -1) {
    return { ascent: extractAscentMilestones(segments), descent: [], peak }
  }

  return {
    ascent: extractAscentMilestones(segments.slice(0, descentStartIdx)),
    descent: extractDescentMilestones(segments.slice(descentStartIdx)),
    peak,
  }
}
