import type { BpmType } from './types'

export const BPM_INPUT_LIMITS = {
  start: { min: 20, max: 188 },
  max: { min: 26, max: 92 },
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
