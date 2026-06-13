'use client'

import { type KeyboardEvent, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'

import { clampBpmToInputLimits, getBpmInputLimits, stepBpm } from '../lib/bpmLimits'
import { generateMetronomeAudio } from '../lib/generateMetronomeAudio'
import type { RampCurve } from '../lib/rampCurve'
import {
  COUNT_IN_BAR_OPTIONS,
  DEFAULT_COUNT_IN_BARS,
  SUBDIVISION_OPTIONS,
  type BpmType,
} from '../lib/types'
import { cn } from '@/lib/cn'
import { MetronomeOptionToggle } from './MetronomeOptionToggle'
import { MetronomePlayer } from './MetronomePlayer'
import { MetronomeTempoPath } from './MetronomeTempoPath'
import { MetronomeTempoTransition } from './MetronomeTempoTransition'

const fieldClass = cn(
  'font-metronome-mono w-full rounded-sm border border-[var(--metro-border)] bg-[var(--metro-panel-soft)]',
  'px-3 py-2.5 text-sm text-[var(--metro-text)] outline-none transition-[border-color]',
  'focus:border-[var(--metro-border-strong)]',
)

type FormState = {
  bpm: number
  bpmType: BpmType
  subdivision: number
  accentFirst: boolean
  mechanicalTempos: boolean
  countInBars: number
  rampCurve: RampCurve
}

const defaultForm: FormState = {
  bpm: 92,
  bpmType: 'max',
  subdivision: 1,
  accentFirst: false,
  mechanicalTempos: false,
  countInBars: DEFAULT_COUNT_IN_BARS,
  rampCurve: 'linear',
}

type GeneratedAudioConfig = {
  bpm: number
  bpmType: BpmType
  countInBars: number
  subdivision: number
  accentFirst: boolean
  mechanicalTempos: boolean
  rampCurve: RampCurve
}

function buildGenerationConfig(form: FormState): GeneratedAudioConfig {
  const bpm = clampBpmToInputLimits(form.bpm, form.bpmType)
  return {
    bpm,
    bpmType: form.bpmType,
    countInBars: form.countInBars,
    subdivision: form.subdivision,
    accentFirst: form.accentFirst,
    mechanicalTempos: form.mechanicalTempos,
    rampCurve: form.rampCurve,
  }
}

function generationConfigsMatch(a: GeneratedAudioConfig, b: GeneratedAudioConfig): boolean {
  return (
    a.bpm === b.bpm &&
    a.bpmType === b.bpmType &&
    a.countInBars === b.countInBars &&
    a.subdivision === b.subdivision &&
    a.accentFirst === b.accentFirst &&
    a.mechanicalTempos === b.mechanicalTempos &&
    a.rampCurve === b.rampCurve
  )
}

function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'font-metronome-mono text-center text-[10px] tracking-[0.22em] text-[var(--metro-muted)] uppercase',
        className,
      )}
    >
      {children}
    </p>
  )
}

const bpmStepButtonClass = cn(
  'bpm-segment-btn font-metronome-mono flex min-w-11 items-center justify-center px-2 py-3',
  'text-xs font-medium tabular-nums transition-colors',
  'bg-[var(--metro-panel)] text-[var(--metro-text)] hover:bg-[var(--metro-hover)]',
  'disabled:cursor-not-allowed disabled:opacity-35',
)

function BpmStepButton({
  label,
  delta,
  bpm,
  bpmType,
  onBpmChange,
  className,
}: {
  label: string
  delta: number
  bpm: number
  bpmType: BpmType
  onBpmChange: (bpm: number) => void
  className?: string
}) {
  const { min, max } = getBpmInputLimits(bpmType)
  const next = stepBpm(bpm, delta, bpmType)
  const disabled = delta < 0 ? bpm <= min : bpm >= max

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      onClick={() => onBpmChange(next)}
      className={cn(bpmStepButtonClass, className)}
    >
      {delta > 0 ? `+${delta}` : String(delta)}
    </button>
  )
}

function BpmInputWithType({
  formId,
  bpm,
  bpmType,
  onBpmChange,
  onBpmTypeChange,
}: {
  formId: string
  bpm: number
  bpmType: BpmType
  onBpmChange: (bpm: number) => void
  onBpmTypeChange: (bpmType: BpmType) => void
}) {
  const { min, max } = getBpmInputLimits(bpmType)

  const handleBpmSpinKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keyDelta: Record<string, number> = {
      ArrowUp: 1,
      ArrowRight: 1,
      ArrowDown: -1,
      ArrowLeft: -1,
      PageUp: 5,
      PageDown: -5,
    }
    const delta = keyDelta[event.key]
    if (delta === undefined) return
    event.preventDefault()
    onBpmChange(stepBpm(bpm, delta, bpmType))
  }

  return (
    <div className="rounded-md bg-[var(--metro-panel-soft)]">
      <div className="bpm-segment-row flex items-stretch">
        <BpmStepButton
          label="Diminuer le tempo de 5 BPM"
          delta={-5}
          bpm={bpm}
          bpmType={bpmType}
          onBpmChange={onBpmChange}
          className="rounded-tl-md"
        />
        <BpmStepButton
          label="Diminuer le tempo de 1 BPM"
          delta={-1}
          bpm={bpm}
          bpmType={bpmType}
          onBpmChange={onBpmChange}
        />
        <div
          id={`${formId}-bpm`}
          role="spinbutton"
          tabIndex={0}
          aria-valuenow={bpm}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label="Tempo en BPM"
          onKeyDown={handleBpmSpinKeyDown}
          className="bpm-segment-cell relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 border border-[var(--metro-border)] px-4 py-4"
        >
          <span
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--metro-brand-dim),transparent_70%)]"
            aria-hidden
          />
          <span className="font-metronome-mono relative text-4xl font-medium tabular-nums tracking-tight text-[var(--metro-brand)] md:text-5xl">
            {bpm}
          </span>
          <span className="font-metronome-mono relative text-[10px] tracking-[0.2em] text-[var(--metro-muted)] uppercase">
            BPM
          </span>
        </div>
        <BpmStepButton
          label="Augmenter le tempo de 1 BPM"
          delta={1}
          bpm={bpm}
          bpmType={bpmType}
          onBpmChange={onBpmChange}
        />
        <BpmStepButton
          label="Augmenter le tempo de 5 BPM"
          delta={5}
          bpm={bpm}
          bpmType={bpmType}
          onBpmChange={onBpmChange}
          className="rounded-tr-md"
        />
      </div>
      <div className="bpm-type-row flex" role="group" aria-label="Interprétation du tempo">
        {(
          [
            { id: 'max' as const, label: 'Max.' },
            { id: 'start' as const, label: 'Départ' },
          ] as const
        ).map((option, index) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onBpmTypeChange(option.id)}
            aria-pressed={bpmType === option.id}
            className={cn(
              'bpm-segment-btn font-metronome-mono flex-1 px-3 py-2.5 text-[10px] tracking-[0.1em] uppercase transition-colors',
              bpmType === option.id
                ? 'bg-[var(--metro-brand)] font-medium text-[var(--metro-on-brand)]'
                : 'text-[var(--metro-muted)] hover:bg-[var(--metro-brand-dim)] hover:text-[var(--metro-text)]',
              index === 0 ? 'rounded-bl-md' : 'rounded-br-md',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function MetronomeForm() {
  const formId = useId()
  const [form, setForm] = useState<FormState>(defaultForm)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [downloadFilename, setDownloadFilename] = useState<string | null>(null)
  const [finaleStartTime, setFinaleStartTime] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<'settings' | 'session'>('settings')
  const [playback, setPlayback] = useState({ isPlaying: false, currentTime: 0 })
  const [generatedConfig, setGeneratedConfig] = useState<GeneratedAudioConfig | null>(null)
  const blobUrlRef = useRef<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const sessionReady = blobUrl !== null && downloadFilename !== null && finaleStartTime !== null
  const showSession = view === 'session' && sessionReady
  const currentConfig = useMemo(() => buildGenerationConfig(form), [form])
  const canReuseAudio =
    sessionReady &&
    generatedConfig !== null &&
    generationConfigsMatch(generatedConfig, currentConfig)

  const revokeBlobUrl = useCallback((url: string | null) => {
    if (url) {
      URL.revokeObjectURL(url)
    }
  }, [])

  useEffect(() => {
    blobUrlRef.current = blobUrl
  }, [blobUrl])

  useEffect(() => {
    return () => revokeBlobUrl(blobUrlRef.current)
  }, [revokeBlobUrl])

  useEffect(() => {
    if (view !== 'session') return

    const card = cardRef.current
    if (!card) return

    requestAnimationFrame(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [view])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const config = buildGenerationConfig(form)
    if (config.bpm !== form.bpm) {
      setForm((s) => ({ ...s, bpm: config.bpm }))
    }

    if (canReuseAudio) {
      setView('session')
      return
    }

    setDownloadFilename(null)
    setFinaleStartTime(null)
    setLoading(true)

    try {
      await Promise.resolve()

      const { blob, downloadFilename, finaleStartTime } = generateMetronomeAudio(config)
      if (!blob.size) {
        throw new Error('Fichier audio vide.')
      }

      const nextUrl = URL.createObjectURL(blob)
      setBlobUrl((previous) => {
        revokeBlobUrl(previous)
        return nextUrl
      })
      setDownloadFilename(downloadFilename)
      setFinaleStartTime(finaleStartTime)
      setGeneratedConfig(config)
      setView('session')
    } catch (cause) {
      setView('settings')
      if (cause instanceof Error) {
        setError(cause.message)
      } else {
        setError('Une erreur inattendue est survenue.')
      }
    } finally {
      setLoading(false)
    }
  }

  const tempoPathConfig = showSession && generatedConfig ? generatedConfig : currentConfig

  return (
    <div className="mx-auto w-full max-w-xl">
      <div
        ref={cardRef}
        className="scroll-mt-[calc(70px+1rem)] overflow-hidden rounded-md border border-[var(--metro-border)] bg-[var(--metro-panel)]"
      >
        <header className="border-b border-[var(--metro-border)] px-6 py-6 text-center md:px-8 md:py-7">
          <p className="font-metronome-mono text-xs font-medium tracking-[0.18em] text-[var(--metro-text)] uppercase md:text-sm">
            Le Train — Dante Agostini
          </p>
          <p className="font-metronome-mono mt-1.5 text-[11px] tracking-[0.14em] text-[var(--metro-muted)] uppercase md:text-xs">
            Volume V · page 14
          </p>
          <h1 className="font-metronome-display mt-3 text-2xl font-medium tracking-tight text-[var(--metro-text)] md:text-[1.65rem]">
            Métronome
          </h1>
        </header>

        <div className="space-y-5 p-5 md:space-y-7 md:p-7">
          <MetronomeTempoPath
            bpm={tempoPathConfig.bpm}
            bpmType={tempoPathConfig.bpmType}
            countInBars={tempoPathConfig.countInBars}
            mechanicalTempos={tempoPathConfig.mechanicalTempos}
            rampCurve={tempoPathConfig.rampCurve}
            subdivision={tempoPathConfig.subdivision}
            isPlaying={playback.isPlaying}
            currentTime={playback.currentTime}
          />

          {showSession ? (
            <div className="space-y-5">
              <MetronomePlayer
                src={blobUrl}
                downloadFilename={downloadFilename}
                finaleStartTime={finaleStartTime}
                onPlaybackChange={setPlayback}
              />
              <button
                type="button"
                onClick={() => setView('settings')}
                className={cn(
                  'font-metronome-display flex h-12 w-full items-center justify-center rounded-md border',
                  'border-[var(--metro-border)] bg-[var(--metro-panel)] text-sm font-medium tracking-[0.1em]',
                  'text-[var(--metro-text)] uppercase transition-[transform,background-color,border-color]',
                  'hover:border-[var(--metro-brand)] hover:bg-[var(--metro-brand-dim)] active:scale-[0.99]',
                )}
              >
                Modifier les réglages
              </button>
            </div>
          ) : (
            <>
              <form id={formId} onSubmit={handleSubmit} className="space-y-7">
                <div className="space-y-3">
                  <SectionLabel>Tempo cible</SectionLabel>
                  <BpmInputWithType
                    formId={formId}
                    bpm={form.bpm}
                    bpmType={form.bpmType}
                    onBpmChange={(bpm) => setForm((s) => ({ ...s, bpm }))}
                    onBpmTypeChange={(bpmType) =>
                      setForm((s) => ({
                        ...s,
                        bpmType,
                        bpm: clampBpmToInputLimits(s.bpm, bpmType),
                      }))
                    }
                  />
                </div>

                <div className="space-y-3">
                  <MetronomeOptionToggle
                    id={`${formId}-mechanical`}
                    icon="mechanical"
                    checked={form.mechanicalTempos}
                    onChange={(mechanicalTempos) => setForm((s) => ({ ...s, mechanicalTempos }))}
                    description="Utiliser uniquement des tempos disponibles sur un métronome mécanique."
                  >
                    <span className="sm:inline">Tempos mécaniques uniquement</span>
                  </MetronomeOptionToggle>
                </div>

                <MetronomeTempoTransition
                  curve={form.rampCurve}
                  onChange={(rampCurve) => setForm((s) => ({ ...s, rampCurve }))}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor={`${formId}-subdivision`} className="block">
                      <SectionLabel>Subdivision</SectionLabel>
                    </label>
                    <select
                      id={`${formId}-subdivision`}
                      value={form.subdivision}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, subdivision: Number(e.target.value) }))
                      }
                      className={cn(fieldClass, 'text-center')}
                    >
                      {SUBDIVISION_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor={`${formId}-count-in`} className="block">
                      <SectionLabel>Intro (mesures)</SectionLabel>
                    </label>
                    <select
                      id={`${formId}-count-in`}
                      value={form.countInBars}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, countInBars: Number(e.target.value) }))
                      }
                      className={cn(fieldClass, 'text-center')}
                    >
                      {COUNT_IN_BAR_OPTIONS.map((value) => (
                        <option key={value} value={value}>
                          {value === 0 ? 'Aucune' : value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <MetronomeOptionToggle
                  id={`${formId}-accent-first`}
                  icon="accentFirst"
                  checked={form.accentFirst}
                  onChange={(accentFirst) => setForm((s) => ({ ...s, accentFirst }))}
                  description="Accentuer le premier temps de chaque mesure."
                >
                  Accentuer le 1<sup>er</sup> temps
                </MetronomeOptionToggle>

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'font-metronome-display flex h-13 w-full items-center justify-center gap-2 rounded-md border-0',
                    'bg-[var(--metro-brand)] text-sm font-medium tracking-[0.12em] text-[var(--metro-on-brand)] uppercase',
                    'transition-[transform,background-color] hover:bg-[var(--metro-brand-hover)] active:scale-[0.99]',
                    'disabled:cursor-not-allowed disabled:opacity-55',
                  )}
                >
                  {loading ? (
                    <>
                      <span
                        className="inline-block size-4 animate-spin rounded-full border-2 border-[var(--metro-on-brand)]/25 border-t-[var(--metro-on-brand)]"
                        aria-hidden
                      />
                      {"Génération de l'audio en cours…"}
                    </>
                  ) : (
                    "C'est parti !"
                  )}
                </button>
              </form>

              {error ? (
                <p
                  role="alert"
                  className="rounded-sm border border-red-200 bg-red-50 px-3 py-2.5 text-center text-sm text-red-700"
                >
                  {error}
                </p>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
