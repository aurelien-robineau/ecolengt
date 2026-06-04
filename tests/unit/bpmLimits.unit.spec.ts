import { describe, expect, it } from 'vitest'

import { REFERENCE_START_BPM } from '@/lib/metronome/sequenceBuilder'
import {
  BPM_INPUT_LIMITS,
  clampBpmToInputLimits,
  getBpmInputLimits,
  stepBpm,
} from '@/lib/metronome/bpmLimits'

describe('bpmLimits', () => {
  it('uses start-specific bounds capped so peak BPM never exceeds 92', () => {
    expect(getBpmInputLimits('start')).toEqual(BPM_INPUT_LIMITS.start)
    expect(BPM_INPUT_LIMITS.start).toEqual({ min: 20, max: REFERENCE_START_BPM })
  })

  it('uses max-specific bounds', () => {
    expect(getBpmInputLimits('max')).toEqual(BPM_INPUT_LIMITS.max)
    expect(BPM_INPUT_LIMITS.max).toEqual({ min: 26, max: 92 })
  })

  it('clamps BPM when switching interpretation', () => {
    expect(clampBpmToInputLimits(200, 'start')).toBe(REFERENCE_START_BPM)
    expect(clampBpmToInputLimits(22, 'max')).toBe(26)
  })

  it('clamps out-of-range values', () => {
    expect(clampBpmToInputLimits(2340, 'max')).toBe(92)
    expect(clampBpmToInputLimits(9, 'max')).toBe(26)
  })

  it('steps BPM within limits', () => {
    expect(stepBpm(87, 5, 'max')).toBe(92)
    expect(stepBpm(26, -1, 'max')).toBe(26)
    expect(stepBpm(92, 5, 'max')).toBe(92)
  })
})
