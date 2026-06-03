'use client'

import { useMemo } from 'react'

import { cn } from '@/lib/cn'
import {
  buildTempoPathDisplay,
  formatTempoBpm,
  type TempoMilestone,
} from '@/lib/metronome/sequenceBuilder'
import type { BpmType } from '@/lib/metronome/types'

type MetronomeTempoPathProps = {
  bpm: number
  bpmType: BpmType
  countInBars: number
  mechanicalTempos: boolean
  className?: string
}

function TempoValue({ milestone, compact }: { milestone: TempoMilestone; compact?: boolean }) {
  return (
    <span
      className={cn(
        'font-serif font-light tabular-nums text-foreground transition-colors duration-300',
        compact ? 'text-sm md:text-base' : 'text-lg md:text-xl',
      )}
    >
      {formatTempoBpm(milestone.display)}
    </span>
  )
}

function HorizontalArrow({ compact }: { compact?: boolean }) {
  return (
    <svg
      className={cn(
        compact ? 'size-3.5 md:size-4' : 'size-4 md:size-[1.125rem]',
        'shrink-0 text-foreground',
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-4-4m4 4l-4 4" />
    </svg>
  )
}

function CrescendoArrow({ compact }: { compact?: boolean }) {
  return (
    <svg
      className={cn(
        compact ? 'size-3.5 md:size-4' : 'size-4 md:size-[1.125rem]',
        'shrink-0 text-foreground',
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6m0 0H12m6 0v6" />
    </svg>
  )
}

function DecrescendoArrow({ compact }: { compact?: boolean }) {
  return (
    <svg
      className={cn(
        compact ? 'size-3.5 md:size-4' : 'size-4 md:size-[1.125rem]',
        'shrink-0 text-foreground',
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12m0 0H12m6 0v-6" />
    </svg>
  )
}

function separatorForMilestones(previous: TempoMilestone, current: TempoMilestone) {
  if (current.display === previous.display) return 'horizontal' as const
  if (current.display > previous.display) return 'crescendo' as const
  return 'decrescendo' as const
}

function TempoSeparator({
  previous,
  current,
  compact,
}: {
  previous: TempoMilestone
  current: TempoMilestone
  compact?: boolean
}) {
  const kind = separatorForMilestones(previous, current)
  const Arrow =
    kind === 'horizontal'
      ? HorizontalArrow
      : kind === 'crescendo'
        ? CrescendoArrow
        : DecrescendoArrow

  return (
    <span
      className={cn(
        'inline-flex items-center self-center',
        compact ? 'mx-0.5 md:mx-1' : 'mx-1 md:mx-1.5',
      )}
      aria-hidden
    >
      <Arrow compact={compact} />
    </span>
  )
}

export function MetronomeTempoPath({
  bpm,
  bpmType,
  countInBars,
  mechanicalTempos,
  className,
}: MetronomeTempoPathProps) {
  const { ascent, descent } = useMemo(
    () => buildTempoPathDisplay({ bpm, bpmType, countInBars, mechanicalTempos }),
    [bpm, bpmType, countInBars, mechanicalTempos],
  )

  const milestones = useMemo(() => [...ascent, ...descent], [ascent, descent])

  const compact = useMemo(
    () => milestones.some((milestone) => formatTempoBpm(milestone.display).length >= 3),
    [milestones],
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
        Parcours tempo calculé
      </p>
      <p className="flex flex-nowrap items-center justify-center gap-x-0 text-center leading-relaxed">
        {ascent.map((milestone, index) => (
          <span
            key={`up-${index}-${milestone.exact}`}
            className="inline-flex shrink-0 items-center"
          >
            {index > 0 ? (
              <TempoSeparator previous={ascent[index - 1]} current={milestone} compact={compact} />
            ) : null}
            <TempoValue milestone={milestone} compact={compact} />
          </span>
        ))}
        {descent.map((milestone, index) => (
          <span
            key={`down-${index}-${milestone.exact}`}
            className="inline-flex shrink-0 items-center"
          >
            <TempoSeparator
              previous={index === 0 ? ascent[ascent.length - 1] : descent[index - 1]}
              current={milestone}
              compact={compact}
            />
            <TempoValue milestone={milestone} compact={compact} />
          </span>
        ))}
      </p>
    </div>
  )
}
