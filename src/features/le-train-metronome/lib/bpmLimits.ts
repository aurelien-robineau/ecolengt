import { REFERENCE_MAX_BPM, REFERENCE_START_BPM } from './sequenceBuilder'
import type { BpmType } from './types'

/** Start mode scales the whole workout from the opening tempo; cap at reference start so peak stays ≤ 92. */
export const BPM_INPUT_LIMITS = {
  start: { min: 20, max: REFERENCE_START_BPM },
  max: { min: 26, max: REFERENCE_MAX_BPM },
} as const

export function getBpmInputLimits(bpmType: BpmType): { min: number; max: number } {
  return BPM_INPUT_LIMITS[bpmType]
}

export function clampBpmToInputLimits(bpm: number, bpmType: BpmType): number {
  const { min, max } = getBpmInputLimits(bpmType)
  if (!Number.isFinite(bpm)) return min
  return Math.min(max, Math.max(min, Math.round(bpm)))
}

export function stepBpm(bpm: number, delta: number, bpmType: BpmType): number {
  return clampBpmToInputLimits(bpm + delta, bpmType)
}
