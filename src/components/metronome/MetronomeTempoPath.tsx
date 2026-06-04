'use client'

import { useMemo } from 'react'

import { cn } from '@/lib/cn'
import {
  buildTempoTableMilestones,
  formatTempoBpm,
  REFERENCE_MAX_BPM,
} from '@/lib/metronome/sequenceBuilder'
import type { BpmType, MetronomeSequenceConfig } from '@/lib/metronome/types'

type MetronomeTempoPathProps = {
  bpm: number
  bpmType: BpmType
  countInBars: number
  mechanicalTempos: boolean
}

const REFERENCE_TEMPO_CONFIG: MetronomeSequenceConfig = {
  bpm: REFERENCE_MAX_BPM,
  bpmType: 'max',
  countInBars: 0,
  mechanicalTempos: false,
}

export function MetronomeTempoPath({
  bpm,
  bpmType,
  countInBars,
  mechanicalTempos,
}: MetronomeTempoPathProps) {
  const referenceMilestones = useMemo(() => buildTempoTableMilestones(REFERENCE_TEMPO_CONFIG), [])

  const calculatedMilestones = useMemo(
    () => buildTempoTableMilestones({ bpm, bpmType, countInBars, mechanicalTempos }),
    [bpm, bpmType, countInBars, mechanicalTempos],
  )

  return (
    <div
      className={cn(
        'rounded-sm border border-brand-border/80 bg-surface-muted/40 px-3 py-4 md:px-7 md:py-8',
        'border-brand-border/60 bg-surface-muted/60',
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="mb-2 text-center text-[10px] tracking-[0.2em] text-foreground-muted uppercase md:mb-4">
        Tempos
      </p>
      <table className="w-full border-collapse" aria-label="Tempos">
        <tbody>
          <tr>
            {referenceMilestones.map((tempoBpm, index) => (
              <td
                key={`ref-${index}-${tempoBpm}`}
                className="px-1 py-1 text-center font-serif text-xs font-light tabular-nums text-foreground-muted transition-colors duration-300 md:px-2 md:py-1.5 md:text-base"
              >
                {formatTempoBpm(tempoBpm)}
              </td>
            ))}
          </tr>
          <tr>
            {calculatedMilestones.map((tempoBpm, index) => (
              <td
                key={`calc-${index}-${tempoBpm}`}
                className="px-1 py-1 text-center font-serif text-sm font-light tabular-nums text-foreground transition-colors duration-300 md:px-2 md:py-1.5 md:text-lg"
              >
                {formatTempoBpm(tempoBpm)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
