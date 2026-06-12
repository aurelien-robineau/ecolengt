import { describe, expect, it } from 'vitest'

import {
  beatDurationSeconds,
  bpmAtRampProgress,
  computeRampBeatDurations,
} from '@/features/le-train-metronome/lib/audioGenerator'
import { applyRampCurve, rampCurveSvgPath } from '@/features/le-train-metronome/lib/rampCurve'
import {
  buildSequence,
  defaultSequenceConfig,
} from '@/features/le-train-metronome/lib/sequenceBuilder'

describe('rampCurve', () => {
  it('draws curve icons from the same f(x) equations', () => {
    expect(rampCurveSvgPath('linear')).toBe('M 6 34 L 34 6')
    expect(rampCurveSvgPath('ease-in')).toMatch(/^M 6\.00 34\.00/)
    expect(rampCurveSvgPath('ease-in')).toMatch(/34\.00 6\.00$/)
    expect(rampCurveSvgPath('ease-out')).toMatch(/^M 6\.00 34\.00/)
    expect(rampCurveSvgPath('ease-out')).toMatch(/34\.00 6\.00$/)

    // Ease-in hugs the bottom early: at x=0.5, y=0.125 vs linear y=0.5
    const easeInMid = applyRampCurve(0.5, 'ease-in')
    const easeOutMid = applyRampCurve(0.5, 'ease-out')
    expect(easeInMid).toBeCloseTo(0.125, 6)
    expect(easeOutMid).toBeCloseTo(0.875, 6)
  })

  it('evaluates the easing functions at the endpoints', () => {
    for (const curve of ['linear', 'ease-in', 'ease-out', 'ease-in-out'] as const) {
      expect(applyRampCurve(0, curve)).toBe(0)
      expect(applyRampCurve(1, curve)).toBe(1)
    }
  })

  it('ease-in starts flatter than linear and ease-out ends flatter than linear', () => {
    expect(applyRampCurve(0.5, 'ease-in')).toBeLessThan(0.5)
    expect(applyRampCurve(0.5, 'ease-out')).toBeGreaterThan(0.5)
    expect(applyRampCurve(0.5, 'ease-in-out')).toBeCloseTo(0.5, 6)
  })

  it('draws an S-curve icon through the midpoint', () => {
    expect(rampCurveSvgPath('ease-in-out')).toMatch(/^M 6\.00 34\.00/)
    expect(rampCurveSvgPath('ease-in-out')).toMatch(/34\.00 6\.00$/)
    expect(applyRampCurve(0.25, 'ease-in-out')).toBeLessThan(0.25)
    expect(applyRampCurve(0.75, 'ease-in-out')).toBeGreaterThan(0.75)
  })

  it('uses Option A wall-clock progress for beat durations', () => {
    const durations = computeRampBeatDurations(8, 80, 120, 'linear')
    const total = durations.reduce((sum, duration) => sum + duration, 0)

    expect(durations[0]).toBeCloseTo(60 / 80, 6)

    let elapsed = 0
    for (let beatIdx = 0; beatIdx < durations.length; beatIdx++) {
      const x = elapsed / total
      const expected = 60 / bpmAtRampProgress(x, 80, 120, 'linear')
      expect(durations[beatIdx]).toBeCloseTo(expected, 5)
      elapsed += durations[beatIdx]!
    }
  })

  it('ease-in lingers slow and ease-out rushes early at mid-ramp', () => {
    const linear = beatDurationSeconds(4, 8, 80, 120, 'linear')
    const easeIn = beatDurationSeconds(4, 8, 80, 120, 'ease-in')
    const easeOut = beatDurationSeconds(4, 8, 80, 120, 'ease-out')

    expect(easeIn).toBeGreaterThan(linear)
    expect(easeOut).toBeLessThan(linear)
  })

  it('applies the selected curve to every ramp in the workout sequence', () => {
    const sequence = buildSequence(
      defaultSequenceConfig({
        countInBars: 0,
        rampCurve: 'ease-in',
      }),
    )

    const ramps = sequence.filter((segment) => segment.bpmStart !== segment.bpmEnd)
    expect(ramps.length).toBeGreaterThan(0)
    expect(ramps.every((segment) => segment.rampCurve === 'ease-in')).toBe(true)
    expect(sequence[0]?.rampCurve).toBeUndefined()
  })
})
