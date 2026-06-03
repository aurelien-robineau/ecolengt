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
  return Math.min(max, Math.max(min, Math.round(bpm)))
}
