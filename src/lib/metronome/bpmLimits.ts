import type { BpmType } from './types'

export const BPM_INPUT_LIMITS = {
  start: { min: 20, max: 188 },
  max: { min: 26, max: 240 },
} as const

export function getBpmInputLimits(bpmType: BpmType): { min: number; max: number } {
  return BPM_INPUT_LIMITS[bpmType]
}

export function clampBpmToInputLimits(bpm: number, bpmType: BpmType): number {
  const { min, max } = getBpmInputLimits(bpmType)
  if (!Number.isFinite(bpm)) return min
  return Math.min(max, Math.max(min, Math.round(bpm)))
}

/** Clamps only when above max so multi-digit values below min can still be typed (e.g. 92). */
export function clampBpmWhileEditing(bpm: number, bpmType: BpmType): number {
  const { max } = getBpmInputLimits(bpmType)
  if (!Number.isFinite(bpm)) return bpm
  const rounded = Math.round(bpm)
  return rounded > max ? max : rounded
}
