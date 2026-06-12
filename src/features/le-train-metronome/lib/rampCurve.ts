/** Easing curve applied to normalized ramp progress (0 → 1). */
export type RampCurve = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'

/** Labels from Cakewalk SONAR (linéaire, courbe lente, courbe rapide) and Ableton Live (courbe en S). */
export const RAMP_CURVE_OPTIONS: readonly { id: RampCurve; label: string }[] = [
  { id: 'linear', label: 'Linéaire' },
  { id: 'ease-in', label: 'Courbe lente' },
  { id: 'ease-out', label: 'Courbe rapide' },
  { id: 'ease-in-out', label: 'Courbe en S' },
] as const

/**
 * Applies the chosen easing function to normalized time x ∈ [0, 1].
 * - linear: f(x) = x
 * - ease-in (regular cubic): f(x) = x³
 * - ease-out (inverse cubic): f(x) = 1 − (1 − x)³
 * - ease-in-out (regular cubic): f(x) = 4x³ when x < ½, else 1 − (−2x + 2)³ / 2
 */
export function applyRampCurve(progress: number, curve: RampCurve): number {
  const x = Math.max(0, Math.min(1, progress))
  switch (curve) {
    case 'ease-in':
      return x * x * x
    case 'ease-out':
      return 1 - (1 - x) ** 3
    case 'ease-in-out':
      return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2
    default:
      return x
  }
}

const CURVE_ICON_SIZE = 40
const CURVE_ICON_PADDING = 6

/** SVG path for a curve icon, sampled from the same f(x) used by the audio engine. */
export function rampCurveSvgPath(curve: RampCurve, samples = 40): string {
  if (curve === 'linear') {
    const end = CURVE_ICON_SIZE - CURVE_ICON_PADDING
    return `M ${CURVE_ICON_PADDING} ${end} L ${end} ${CURVE_ICON_PADDING}`
  }

  const inner = CURVE_ICON_SIZE - CURVE_ICON_PADDING * 2
  const parts: string[] = []

  for (let i = 0; i <= samples; i++) {
    const x = i / samples
    const y = applyRampCurve(x, curve)
    const px = CURVE_ICON_PADDING + x * inner
    const py = CURVE_ICON_SIZE - CURVE_ICON_PADDING - y * inner
    parts.push(`${i === 0 ? 'M' : 'L'} ${px.toFixed(2)} ${py.toFixed(2)}`)
  }

  return parts.join(' ')
}
