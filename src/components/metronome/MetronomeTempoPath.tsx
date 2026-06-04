'use client'

import { useMemo } from 'react'

import { cn } from '@/lib/cn'
import {
  buildTempoPathDisplay,
  formatTempoBpm,
  REFERENCE_MAX_BPM,
  type TempoMilestone,
} from '@/lib/metronome/sequenceBuilder'
import type { BpmType, MetronomeSequenceConfig } from '@/lib/metronome/types'

type MetronomeTempoPathProps = {
  bpm: number
  bpmType: BpmType
  countInBars: number
  mechanicalTempos: boolean
  className?: string
}

const REFERENCE_TEMPO_CONFIG: MetronomeSequenceConfig = {
  bpm: REFERENCE_MAX_BPM,
  bpmType: 'max',
  countInBars: 0,
  mechanicalTempos: false,
}

function buildMilestones(config: MetronomeSequenceConfig): TempoMilestone[] {
  const { ascent, descent } = buildTempoPathDisplay(config)
  return [...ascent, ...descent]
}

export function MetronomeTempoPath({
  bpm,
  bpmType,
  countInBars,
  mechanicalTempos,
  className,
}: MetronomeTempoPathProps) {
  const referenceMilestones = useMemo(() => buildMilestones(REFERENCE_TEMPO_CONFIG), [])

  const calculatedMilestones = useMemo(
    () => buildMilestones({ bpm, bpmType, countInBars, mechanicalTempos }),
    [bpm, bpmType, countInBars, mechanicalTempos],
  )

  return (
    <div
      className={cn(
        'rounded-sm border border-brand-border/80 bg-surface-muted/40 px-5 py-6 md:px-7 md:py-8',
        className,
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="mb-4 text-center text-[10px] tracking-[0.2em] text-foreground-muted uppercase">
        Tempos
      </p>
      <div className="-mx-5 overflow-x-auto overscroll-x-contain px-5 md:-mx-7 md:px-7">
        <table className="mx-auto w-max min-w-full border-collapse" aria-label="Tempos">
          <tbody>
            <tr>
              {referenceMilestones.map((milestone, index) => (
                <td
                  key={`ref-${index}-${milestone.exact}`}
                  className="px-2 py-1.5 text-center font-serif text-sm font-light tabular-nums text-foreground-muted transition-colors duration-300 md:text-base"
                >
                  {formatTempoBpm(milestone.display)}
                </td>
              ))}
            </tr>
            <tr>
              {calculatedMilestones.map((milestone, index) => (
                <td
                  key={`calc-${index}-${milestone.exact}`}
                  className="px-2 py-1.5 text-center font-serif text-base font-light tabular-nums text-foreground transition-colors duration-300 md:text-lg"
                >
                  {formatTempoBpm(milestone.display)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
