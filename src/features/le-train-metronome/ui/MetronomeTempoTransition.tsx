'use client'

import { cn } from '@/lib/cn'

import { RAMP_CURVE_OPTIONS, rampCurveSvgPath, type RampCurve } from '../lib/rampCurve'

type MetronomeTempoTransitionProps = {
  curve: RampCurve
  onChange: (curve: RampCurve) => void
}

function CurveIcon({ curve, active }: { curve: RampCurve; active: boolean }) {
  const stroke = active ? 'var(--metro-on-brand)' : 'var(--metro-muted)'

  return (
    <svg viewBox="0 0 40 40" className="size-9" aria-hidden>
      <path
        d={rampCurveSvgPath(curve)}
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MetronomeTempoTransition({ curve, onChange }: MetronomeTempoTransitionProps) {
  return (
    <div className="space-y-2">
      <p className="font-metronome-mono text-center text-[10px] tracking-[0.22em] text-[var(--metro-muted)] uppercase">
        Courbe de changement de tempo
      </p>
      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        role="radiogroup"
        aria-label="Courbe de changement de tempo"
      >
        {RAMP_CURVE_OPTIONS.map((option) => {
          const active = curve === option.id
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={option.label}
              onClick={() => onChange(option.id)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-md border px-2 py-3 transition-[border-color,background-color]',
                active
                  ? 'border-[var(--metro-border-strong)] bg-[var(--metro-brand)]'
                  : 'border-[var(--metro-border)] bg-[var(--metro-panel-soft)] hover:border-[var(--metro-border-strong)] hover:bg-[var(--metro-hover)]',
              )}
            >
              <CurveIcon curve={option.id} active={active} />
              <span
                className={cn(
                  'font-metronome-mono text-[9px] tracking-[0.12em] uppercase',
                  active ? 'text-[var(--metro-on-brand)]' : 'text-[var(--metro-muted)]',
                )}
              >
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
