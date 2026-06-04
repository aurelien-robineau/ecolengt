'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'

import { MetronomeOptionToggle } from '@/components/metronome/MetronomeOptionToggle'
import { MetronomePlayer } from '@/components/metronome/MetronomePlayer'
import { MetronomeTempoPath } from '@/components/metronome/MetronomeTempoPath'
import { cn } from '@/lib/cn'
import { clampBpmToInputLimits, getBpmInputLimits, stepBpm } from '@/lib/metronome/bpmLimits'
import { DEFAULT_SAMPLE_RATE, findFinaleStartSeconds } from '@/lib/metronome/audioGenerator'
import { buildMetronomeDownloadFilename, buildSequence } from '@/lib/metronome/sequenceBuilder'
import {
  COUNT_IN_BAR_OPTIONS,
  DEFAULT_COUNT_IN_BARS,
  SUBDIVISION_OPTIONS,
  type BpmType,
} from '@/lib/metronome/types'

const REQUEST_TIMEOUT_MS = 55_000

const fieldClass =
  'w-full rounded-sm border border-brand-border bg-surface-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-foreground'

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
        'text-center text-[10px] tracking-[0.2em] text-foreground-muted uppercase',
        className,
      )}
    >
      {children}
    </p>
  )
}

const bpmStepButtonClass = cn(
  'flex min-w-11 items-center justify-center border-brand-border px-2 py-3 text-xs font-medium tabular-nums transition-colors',
  'bg-surface-muted/50 text-foreground hover:bg-surface-muted',
  'disabled:cursor-not-allowed disabled:opacity-40',
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
    <div className="overflow-hidden rounded-sm border border-brand-border bg-surface-card">
      <div className="flex items-stretch">
        <div className="flex border-r border-brand-border">
          <BpmStepButton
            label="Diminuer le tempo de 5 BPM"
            delta={-5}
            bpm={bpm}
            bpmType={bpmType}
            onBpmChange={onBpmChange}
            className="border-r"
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
          className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-3 py-3"
        >
          <span className="font-serif text-2xl tabular-nums text-foreground">{bpm}</span>
          <span className="text-[10px] tracking-[0.15em] text-foreground-muted uppercase">BPM</span>
        </div>
        <div className="flex border-l border-brand-border">
          <BpmStepButton
            label="Augmenter le tempo de 1 BPM"
            delta={1}
            bpm={bpm}
            bpmType={bpmType}
            onBpmChange={onBpmChange}
            className="border-r"
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
        className="flex border-t border-brand-border"
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
              'flex-1 px-3 py-2.5 text-[10px] tracking-[0.08em] uppercase transition-colors',
              bpmType === option.id
                ? 'bg-foreground text-surface'
                : 'bg-surface-muted/50 text-foreground-muted hover:bg-surface-muted hover:text-foreground',
              index === 0 && 'border-r border-brand-border',
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
  const blobUrlRef = useRef<string | null>(null)

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
      const response = await fetch('/api/metronome', {
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
    } catch (cause) {
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
    <div className="mx-auto w-full max-w-lg">
      <div className="overflow-hidden rounded-md border border-brand-border bg-surface-card shadow-[0_12px_48px_-16px_rgb(24_24_24_/_0.12)]">
        <header className="border-b border-brand-border bg-foreground px-5 py-4 text-center md:px-6 md:py-5">
          <p className="text-[10px] tracking-[0.16em] text-brand uppercase">
            Le Train - Dante Agostini
          </p>
          <p className="mt-1.5 text-[10px] tracking-[0.12em] text-surface/65 uppercase">
            Volume V, page 14
          </p>
          <p className="mt-2 font-serif text-xl text-surface md:mt-2.5 md:text-2xl">Métronome</p>
        </header>

        <div className="space-y-8 p-5 md:p-6">
          <MetronomeTempoPath
            bpm={form.bpm}
            bpmType={form.bpmType}
            countInBars={form.countInBars}
            mechanicalTempos={form.mechanicalTempos}
          />

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
                description="Ajuste chaque tempo aux marques d’un métronome mécanique."
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
                  onChange={(e) => setForm((s) => ({ ...s, subdivision: Number(e.target.value) }))}
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
                  onChange={(e) => setForm((s) => ({ ...s, countInBars: Number(e.target.value) }))}
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
              description="Renforce le premier temps de chaque mesure."
            >
              Accent sur le 1<sup>er</sup> temps
            </MetronomeOptionToggle>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                'flex h-12 w-full items-center justify-center gap-2 rounded-sm border-0 bg-brand text-xs font-medium tracking-[0.18em] text-foreground uppercase transition-[transform,background-color] hover:bg-brand-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60',
              )}
            >
              {loading ? (
                <>
                  <span
                    className="inline-block size-4 animate-spin rounded-full border-2 border-foreground/30 border-t-foreground"
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
              className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-700"
            >
              {error}
            </p>
          ) : null}

          {blobUrl && downloadFilename && finaleStartTime !== null ? (
            <div className="space-y-3 border-t border-brand-border pt-6">
              <SectionLabel>Session prête</SectionLabel>
              <MetronomePlayer
                src={blobUrl}
                downloadFilename={downloadFilename}
                finaleStartTime={finaleStartTime}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
