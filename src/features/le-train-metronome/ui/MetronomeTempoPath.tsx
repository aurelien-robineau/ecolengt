'use client'

import { useMemo } from 'react'

import { cn } from '@/lib/cn'

import {
  buildTempoTableMilestones,
  findCurrentTempoColumnIndex,
  findCurrentTempoRampDirection,
  formatTempoBpm,
  REFERENCE_MAX_BPM,
} from '../lib/sequenceBuilder'
import type { BpmType, MetronomeSequenceConfig } from '../lib/types'
import { FeatureIcon } from './FeatureIcon'

type MetronomeTempoPathProps = {
  bpm: number
  bpmType: BpmType
  countInBars: number
  mechanicalTempos: boolean
  subdivision?: number
  isPlaying?: boolean
  currentTime?: number
}

const REFERENCE_TEMPO_CONFIG: MetronomeSequenceConfig = {
  bpm: REFERENCE_MAX_BPM,
  bpmType: 'max',
  countInBars: 0,
  mechanicalTempos: false,
}

function tempoCellClass({
  isActiveColumn,
  isPlaying,
  row,
}: {
  isActiveColumn: boolean
  isPlaying: boolean
  row: 'reference' | 'calculated'
}) {
  return cn(
    'px-0.5 py-1.5 text-center font-metronome-mono tabular-nums transition-[font-weight,color]',
    row === 'reference'
      ? 'text-xs text-[var(--metro-subtle)] md:px-1 md:text-sm'
      : 'text-sm font-medium text-[var(--metro-text)] md:px-1 md:text-base',
    isPlaying && isActiveColumn && row === 'calculated' && 'font-medium text-[var(--metro-brand)]',
    isPlaying && isActiveColumn && row === 'reference' && 'font-medium text-[var(--metro-text)]',
  )
}

export function MetronomeTempoPath({
  bpm,
  bpmType,
  countInBars,
  mechanicalTempos,
  subdivision = 1,
  isPlaying = false,
  currentTime = 0,
}: MetronomeTempoPathProps) {
  const sequenceConfig = useMemo(
    () => ({ bpm, bpmType, countInBars, mechanicalTempos }),
    [bpm, bpmType, countInBars, mechanicalTempos],
  )

  const referenceMilestones = useMemo(() => buildTempoTableMilestones(REFERENCE_TEMPO_CONFIG), [])

  const calculatedMilestones = useMemo(
    () => buildTempoTableMilestones(sequenceConfig),
    [sequenceConfig],
  )

  const activeColumnIndex = useMemo(() => {
    if (!isPlaying) return null
    return findCurrentTempoColumnIndex(sequenceConfig, currentTime, subdivision)
  }, [currentTime, isPlaying, sequenceConfig, subdivision])

  const rampDirection = useMemo(() => {
    if (!isPlaying) return null
    return findCurrentTempoRampDirection(sequenceConfig, currentTime, subdivision)
  }, [currentTime, isPlaying, sequenceConfig, subdivision])

  const columnCount = referenceMilestones.length
  const columnWidth = 100 / columnCount

  return (
    <div
      className="relative overflow-visible rounded-md border border-[var(--metro-border)] bg-[var(--metro-panel)] px-2.5 pt-3.5 pb-2 md:px-4 md:pt-4 md:pb-2.5"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="font-metronome-mono mb-3 text-center text-[10px] tracking-[0.22em] text-[var(--metro-muted)] uppercase">
        Tempos
      </p>

      <div className="relative w-full pt-2">
        <div className="relative w-full" role="table" aria-label="Tempos">
          <p className="sr-only">
            Tempos de référence et tempos calculés pour la séquence Le Train
          </p>

          {isPlaying && activeColumnIndex !== null ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0"
              style={{
                left: `${activeColumnIndex * columnWidth}%`,
                width: `${columnWidth}%`,
              }}
            >
              {rampDirection ? (
                <div className="absolute bottom-full left-0 flex w-full justify-center pb-1 text-[var(--metro-brand)]">
                  <FeatureIcon
                    name={rampDirection === 'up' ? 'arrowUpRight' : 'arrowDownRight'}
                    className="size-4"
                  />
                </div>
              ) : null}
              <div className="absolute inset-0 rounded-sm border border-[var(--metro-brand)]" />
            </div>
          ) : null}

          <div
            role="row"
            className="grid w-full"
            style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
          >
            {referenceMilestones.map((tempoBpm, index) => (
              <div
                key={`ref-${index}-${tempoBpm}`}
                role="cell"
                className={tempoCellClass({
                  isActiveColumn: activeColumnIndex === index,
                  isPlaying,
                  row: 'reference',
                })}
              >
                {formatTempoBpm(tempoBpm)}
              </div>
            ))}
          </div>
          <div
            role="row"
            className="grid w-full"
            style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
          >
            {calculatedMilestones.map((tempoBpm, index) => (
              <div
                key={`calc-${index}-${tempoBpm}`}
                role="cell"
                className={tempoCellClass({
                  isActiveColumn: activeColumnIndex === index,
                  isPlaying,
                  row: 'calculated',
                })}
              >
                {formatTempoBpm(tempoBpm)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
