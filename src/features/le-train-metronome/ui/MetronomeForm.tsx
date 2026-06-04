'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'

import { LE_TRAIN_METRONOME_API_PATH } from '../constants'
import { clampBpmToInputLimits, getBpmInputLimits, stepBpm } from '../lib/bpmLimits'
import { DEFAULT_SAMPLE_RATE, findFinaleStartSeconds } from '../lib/audioGenerator'
import { buildMetronomeDownloadFilename, buildSequence } from '../lib/sequenceBuilder'
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

const REQUEST_TIMEOUT_MS = 55_000

const fieldClass = cn(
  'font-metronome-mono w-full rounded-lg border border-[var(--metro-border)] bg-[var(--metro-panel-soft)]',
  'px-3 py-2.5 text-sm text-[var(--metro-text)] outline-none transition-[border-color,box-shadow]',
  'focus:border-[var(--metro-border-strong)] focus:shadow-[0_0_0_3px_var(--metro-brand-dim)]',
)

type FormState = {
  bpm: number
  bpmType: BpmType
  subdivision: number
  accentFirst: boolean
  mechanicalTempos: boolean
  countInBars: number
}

const defaultForm: FormState = {
  bpm: 92,
  bpmType: 'max',
  subdivision: 1,
  accentFirst: false,
  mechanicalTempos: false,
  countInBars: DEFAULT_COUNT_IN_BARS,
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
  'font-metronome-mono flex min-w-11 items-center justify-center px-2 py-3 text-xs font-medium tabular-nums transition-colors',
  'border-[var(--metro-border)] bg-[var(--metro-panel)] text-[var(--metro-text)] hover:bg-[var(--metro-hover)]',
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

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--metro-border)] bg-[var(--metro-panel-soft)]">
      <div className="flex items-stretch">
        <div className="flex border-r border-[var(--metro-border)]">
          <BpmStepButton
            label="Diminuer le tempo de 5 BPM"
            delta={-5}
            bpm={bpm}
            bpmType={bpmType}
            onBpmChange={onBpmChange}
            className="border-r border-[var(--metro-border)]"
          />
          <BpmStepButton
            label="Diminuer le tempo de 1 BPM"
            delta={-1}
            bpm={bpm}
            bpmType={bpmType}
            onBpmChange={onBpmChange}
          />
        </div>
        <div
          id={`${formId}-bpm`}
          role="spinbutton"
          aria-valuenow={bpm}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label="Tempo en BPM"
          className="relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 px-4 py-4"
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
        <div className="flex border-l border-[var(--metro-border)]">
          <BpmStepButton
            label="Augmenter le tempo de 1 BPM"
            delta={1}
            bpm={bpm}
            bpmType={bpmType}
            onBpmChange={onBpmChange}
            className="border-r border-[var(--metro-border)]"
          />
          <BpmStepButton
            label="Augmenter le tempo de 5 BPM"
            delta={5}
            bpm={bpm}
            bpmType={bpmType}
            onBpmChange={onBpmChange}
          />
        </div>
      </div>
      <div
        className="flex border-t border-[var(--metro-border)]"
        role="group"
        aria-label="Interprétation du tempo"
      >
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
              'font-metronome-mono flex-1 px-3 py-2.5 text-[10px] tracking-[0.1em] uppercase transition-colors',
              bpmType === option.id
                ? 'bg-[var(--metro-brand)] font-medium text-[var(--metro-on-brand)]'
                : 'text-[var(--metro-muted)] hover:bg-[var(--metro-brand-dim)] hover:text-[var(--metro-text)]',
              index === 0 && 'border-r border-[var(--metro-border)]',
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
  const blobUrlRef = useRef<string | null>(null)

  const sessionReady = blobUrl !== null && downloadFilename !== null && finaleStartTime !== null
  const showSession = view === 'session' && sessionReady

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setDownloadFilename(null)
    setFinaleStartTime(null)
    setLoading(true)

    const bpm = clampBpmToInputLimits(form.bpm, form.bpmType)
    if (bpm !== form.bpm) {
      setForm((s) => ({ ...s, bpm }))
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch(LE_TRAIN_METRONOME_API_PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bpm,
          bpmType: form.bpmType,
          countInBars: form.countInBars,
          subdivision: form.subdivision,
          accentFirst: form.accentFirst,
          mechanicalTempos: form.mechanicalTempos,
          sampleRate: DEFAULT_SAMPLE_RATE,
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        let message = 'La génération a échoué.'
        try {
          const data = (await response.json()) as { error?: string }
          if (data.error) message = data.error
        } catch {
          /* ignore */
        }
        throw new Error(message)
      }

      const blob = await response.blob()
      if (!blob.size) {
        throw new Error('Réponse audio vide.')
      }

      const sequenceConfig = {
        bpm,
        bpmType: form.bpmType,
        countInBars: form.countInBars,
        mechanicalTempos: form.mechanicalTempos,
      }
      const sequence = buildSequence(sequenceConfig)

      const nextUrl = URL.createObjectURL(blob)
      setBlobUrl((previous) => {
        revokeBlobUrl(previous)
        return nextUrl
      })
      setDownloadFilename(buildMetronomeDownloadFilename(sequence))
      setFinaleStartTime(findFinaleStartSeconds(sequence))
      setView('session')
    } catch (cause) {
      setView('settings')
      if (cause instanceof Error) {
        if (cause.name === 'AbortError') {
          setError('Délai dépassé. Réduisez le tempo ou réessayez.')
        } else {
          setError(cause.message)
        }
      } else {
        setError('Une erreur inattendue est survenue.')
      }
    } finally {
      window.clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="overflow-hidden rounded-2xl border border-[var(--metro-border)] bg-[var(--metro-panel)] shadow-[0_20px_60px_-20px_rgb(24_24_24/0.14)]">
        <header className="relative border-b border-[var(--metro-border)] px-6 py-6 text-center md:px-8 md:py-7">
          <div
            className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,transparent,var(--metro-brand),transparent)]"
            aria-hidden
          />
          <p className="font-metronome-mono text-xs font-medium tracking-[0.18em] text-[var(--metro-text)] uppercase md:text-sm">
            Le Train — Dante Agostini
          </p>
          <p className="font-metronome-mono mt-1.5 text-[11px] tracking-[0.14em] text-[var(--metro-muted)] uppercase md:text-xs">
            Volume V · page 14
          </p>
          <h1 className="font-metronome-display mt-3 text-2xl font-semibold tracking-tight text-[var(--metro-text)] md:text-[1.65rem]">
            Métronome
          </h1>
        </header>

        <div className="space-y-8 p-5 md:p-7">
          <MetronomeTempoPath
            bpm={form.bpm}
            bpmType={form.bpmType}
            countInBars={form.countInBars}
            mechanicalTempos={form.mechanicalTempos}
          />

          {showSession ? (
            <div className="space-y-5">
              <MetronomePlayer
                src={blobUrl}
                downloadFilename={downloadFilename}
                finaleStartTime={finaleStartTime}
              />
              <button
                type="button"
                onClick={() => setView('settings')}
                className={cn(
                  'font-metronome-display flex h-12 w-full items-center justify-center rounded-xl border-2',
                  'border-[var(--metro-border-strong)] bg-[var(--metro-panel)] text-sm font-semibold tracking-[0.1em]',
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
                  <MetronomeOptionToggle
                    id={`${formId}-mechanical`}
                    icon="mechanical"
                    checked={form.mechanicalTempos}
                    onChange={(mechanicalTempos) => setForm((s) => ({ ...s, mechanicalTempos }))}
                    description="Utiliser uniquement des tempos disponibles sur un métronome mécanique."
                  >
                    <span className="sm:hidden">Tempos mécaniques</span>
                    <span className="hidden sm:inline">Tempos métronome mécanique</span>
                  </MetronomeOptionToggle>
                </div>

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
                  Accent sur le 1<sup>er</sup> temps
                </MetronomeOptionToggle>

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'font-metronome-display flex h-13 w-full items-center justify-center gap-2 rounded-xl border-0',
                    'bg-[var(--metro-brand)] text-sm font-semibold tracking-[0.12em] text-[var(--metro-on-brand)] uppercase',
                    'transition-[transform,box-shadow,background-color] hover:bg-[var(--metro-brand-hover)] active:scale-[0.99]',
                    'disabled:cursor-not-allowed disabled:opacity-55',
                    !loading && 'metro-submit-glow',
                  )}
                >
                  {loading ? (
                    <>
                      <span
                        className="inline-block size-4 animate-spin rounded-full border-2 border-[var(--metro-on-brand)]/25 border-t-[var(--metro-on-brand)]"
                        aria-hidden
                      />
                      Génération en cours…
                    </>
                  ) : (
                    'Lancer la génération'
                  )}
                </button>
              </form>

              {error ? (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-center text-sm text-red-700"
                >
                  {error}
                </p>
              ) : null}

              {sessionReady ? (
                <div className="flex justify-center pt-1">
                  <button
                    type="button"
                    onClick={() => setView('session')}
                    className="font-metronome-mono text-[11px] tracking-[0.14em] text-[var(--metro-muted)] uppercase underline-offset-4 transition-colors hover:text-[var(--metro-text)] hover:underline"
                  >
                    Reprendre la lecture
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
