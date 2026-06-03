import { describe, expect, it } from 'vitest'

import {
  BPM_INPUT_LIMITS,
  clampBpmToInputLimits,
  getBpmInputLimits,
} from '@/lib/metronome/bpmLimits'

describe('bpmLimits', () => {
  it('uses start-specific bounds', () => {
    expect(getBpmInputLimits('start')).toEqual(BPM_INPUT_LIMITS.start)
    expect(BPM_INPUT_LIMITS.start).toEqual({ min: 20, max: 188 })
  })

  it('uses max-specific bounds', () => {
    expect(getBpmInputLimits('max')).toEqual(BPM_INPUT_LIMITS.max)
    expect(BPM_INPUT_LIMITS.max).toEqual({ min: 26, max: 240 })
  })

  it('clamps BPM when switching interpretation', () => {
    expect(clampBpmToInputLimits(200, 'start')).toBe(188)
    expect(clampBpmToInputLimits(22, 'max')).toBe(26)
  })
})
