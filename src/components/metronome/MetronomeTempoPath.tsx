'use client'

import { useMemo } from 'react'

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
      className="relative overflow-hidden rounded-xl border border-[var(--metro-border)] bg-[var(--metro-panel)] px-3 py-5 md:px-5 md:py-6"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="font-metronome-mono mb-4 text-center text-[10px] tracking-[0.22em] text-[var(--metro-muted)] uppercase">
        Tempos
      </p>

      <table className="w-full border-collapse" aria-label="Tempos">
        <caption className="sr-only">
          Ligne de référence et ligne calculée pour la séquence Le Train
        </caption>
        <tbody>
          <tr>
            <th
              scope="row"
              className="font-metronome-mono w-16 pr-2 text-left text-[9px] tracking-[0.12em] text-[var(--metro-subtle)] uppercase md:w-20 md:text-[10px]"
            >
              Réf.
            </th>
            {referenceMilestones.map((tempoBpm, index) => (
              <td
                key={`ref-${index}-${tempoBpm}`}
                className="px-0.5 py-2 text-center font-metronome-mono text-xs tabular-nums text-[var(--metro-subtle)] md:px-1 md:text-sm"
              >
                {formatTempoBpm(tempoBpm)}
              </td>
            ))}
          </tr>
          <tr>
            <th
              scope="row"
              className="font-metronome-mono pr-2 text-left text-[9px] tracking-[0.12em] text-[var(--metro-text)] uppercase md:text-[10px]"
            >
              Vous
            </th>
            {calculatedMilestones.map((tempoBpm, index) => (
              <td
                key={`calc-${index}-${tempoBpm}`}
                className="px-0.5 py-2 text-center font-metronome-mono text-sm tabular-nums text-[var(--metro-text)] md:px-1 md:text-base"
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
