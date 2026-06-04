'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

type MetronomePlayerProps = {
  src: string
  downloadFilename: string
  /** Playback time (s) when the slow finale begins — status switches to “Arrivée en gare…”. */
  finaleStartTime: number
  className?: string
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const total = Math.floor(seconds)
  const mins = Math.floor(total / 60)
  const secs = total % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72L19 12 8 5.14z" />
    </svg>
  )
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  )
}

function StopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="5.5" y="5.5" width="13" height="13" rx="2.5" ry="2.5" />
    </svg>
  )
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4v10m0 0l3.5-3.5M12 14l-3.5-3.5M5 18h14"
      />
    </svg>
  )
}

function MeterBars({ active }: { active: boolean }) {
  const heights = ['h-3', 'h-5', 'h-4', 'h-6', 'h-3']
  return (
    <div className="flex h-8 items-end justify-center gap-1" aria-hidden>
      {heights.map((height, index) => (
        <span
          key={index}
          className={cn(
            'w-1 rounded-full bg-brand transition-all duration-300',
            height,
            active && 'origin-bottom animate-metronome-bar',
          )}
          style={active ? { animationDelay: `${index * 0.12}s` } : undefined}
        />
      ))}
    </div>
  )
}

export function MetronomePlayer({
  src,
  downloadFilename,
  finaleStartTime,
  className,
}: MetronomePlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const seekTrackRef = useRef<HTMLButtonElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isScrubbing, setIsScrubbing] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    setIsPlaying(false)
    setIsReady(false)
    setCurrentTime(0)
    setDuration(0)
    audio.load()
  }, [src])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const syncDuration = () => {
      setDuration(audio.duration)
      setIsReady(Number.isFinite(audio.duration) && audio.duration > 0)
    }
    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onSeeked = () => setCurrentTime(audio.currentTime)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener('loadedmetadata', syncDuration)
    audio.addEventListener('durationchange', syncDuration)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('seeked', onSeeked)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', syncDuration)
      audio.removeEventListener('durationchange', syncDuration)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('seeked', onSeeked)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [src])

  const clampTime = useCallback((time: number, audio: HTMLAudioElement) => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return 0
    return Math.min(Math.max(0, time), Math.max(0, audio.duration - 0.001))
  }, [])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !isReady) return

    if (audio.paused) {
      if (audio.ended || audio.currentTime >= audio.duration) {
        audio.currentTime = clampTime(audio.currentTime, audio)
      }
      try {
        await audio.play()
      } catch {
        setIsPlaying(false)
      }
    } else {
      audio.pause()
    }
  }, [clampTime, isReady])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !isReady) return
    audio.pause()
    audio.currentTime = 0
    setCurrentTime(0)
    setIsPlaying(false)
  }, [isReady])

  const seek = useCallback(
    (clientX: number, rect: DOMRect) => {
      const audio = audioRef.current
      if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
      const nextTime = clampTime(ratio * audio.duration, audio)
      audio.currentTime = nextTime
      setCurrentTime(nextTime)
    },
    [clampTime],
  )

  const seekFromClientX = useCallback(
    (clientX: number) => {
      const track = seekTrackRef.current
      if (!track) return
      seek(clientX, track.getBoundingClientRect())
    },
    [seek],
  )

  const endScrub = useCallback((target: HTMLButtonElement, pointerId: number) => {
    if (target.hasPointerCapture(pointerId)) {
      target.releasePointerCapture(pointerId)
    }
    setIsScrubbing(false)
  }, [])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const isFinale = isPlaying && currentTime >= finaleStartTime
  const canStop = isReady && (isPlaying || currentTime > 0)

  return (
    <div
      className={cn(
        'relative rounded-sm border border-brand-border bg-gradient-to-b from-surface-muted/50 to-surface px-5 py-6 md:px-7 md:py-8',
        className,
      )}
    >
      <audio ref={audioRef} src={src} preload="auto" className="sr-only" />

      <button
        type="button"
        onClick={stop}
        disabled={!canStop}
        aria-label="Arrêt — revenir au début"
        className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-brand-border bg-surface text-foreground shadow-sm transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 md:top-5 md:right-5 md:size-10"
      >
        <StopIcon className="size-5 md:size-5" />
      </button>

      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative shrink-0">
          {isReady && !isPlaying ? (
            <span
              className="absolute inset-0 z-0 animate-play-ready rounded-full bg-brand/60"
              aria-hidden
            />
          ) : null}
          <button
            type="button"
            onClick={togglePlay}
            disabled={!isReady}
            aria-label={isPlaying ? 'Pause' : 'Lecture'}
            className={cn(
              'relative z-10 flex size-20 items-center justify-center rounded-full border-2 border-foreground bg-foreground text-surface shadow-md transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 md:size-24',
              isPlaying && 'bg-brand border-brand text-foreground',
            )}
          >
            {isPlaying ? (
              <PauseIcon className="size-8 md:size-9" />
            ) : (
              <PlayIcon className="ml-1 size-9 md:size-10" />
            )}
          </button>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <div className="flex flex-col items-center gap-3">
            <p className="font-serif text-lg text-foreground md:text-xl">
              {isPlaying
                ? isFinale
                  ? 'Arrivée en gare…'
                  : 'En route…'
                : isReady
                  ? 'Prêt à partir'
                  : 'Chargement…'}
            </p>
            <MeterBars active={isPlaying} />
          </div>

          <div className="space-y-2 text-left">
            <button
              ref={seekTrackRef}
              type="button"
              role="slider"
              tabIndex={0}
              disabled={!isReady}
              aria-label="Position dans la piste"
              aria-valuemin={0}
              aria-valuemax={Math.floor(duration)}
              aria-valuenow={Math.floor(currentTime)}
              className={cn(
                'group relative flex h-6 w-full touch-none items-center disabled:cursor-not-allowed',
                isReady && 'cursor-pointer',
              )}
              onPointerDown={(event) => {
                if (!isReady) return
                event.preventDefault()
                event.currentTarget.setPointerCapture(event.pointerId)
                setIsScrubbing(true)
                seekFromClientX(event.clientX)
              }}
              onPointerMove={(event) => {
                if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
                seekFromClientX(event.clientX)
              }}
              onPointerUp={(event) => {
                endScrub(event.currentTarget, event.pointerId)
              }}
              onPointerCancel={(event) => {
                endScrub(event.currentTarget, event.pointerId)
              }}
              onKeyDown={(event) => {
                const audio = audioRef.current
                if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return
                if (event.key === 'ArrowRight') {
                  const nextTime = clampTime(audio.currentTime + 5, audio)
                  audio.currentTime = nextTime
                  setCurrentTime(nextTime)
                }
                if (event.key === 'ArrowLeft') {
                  const nextTime = clampTime(audio.currentTime - 5, audio)
                  audio.currentTime = nextTime
                  setCurrentTime(nextTime)
                }
              }}
            >
              <span className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-brand-border/60" />
              <span
                className={cn(
                  'absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full bg-brand',
                  !isScrubbing && 'transition-[width] duration-150',
                )}
                style={{ width: `${progress}%` }}
              />
              <span
                className={cn(
                  'absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full border-2 border-foreground bg-surface shadow-sm',
                  isScrubbing
                    ? 'opacity-100'
                    : 'opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100',
                )}
                style={{ left: `calc(${progress}% - 7px)` }}
              />
            </button>
            <div className="flex justify-between font-mono text-[11px] tracking-wide text-foreground-muted">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <a
            href={src}
            download={downloadFilename}
            className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.12em] text-foreground-muted uppercase no-underline transition-colors hover:text-foreground"
          >
            <DownloadIcon className="size-4" />
            Télécharger le fichier
          </a>
        </div>
      </div>
    </div>
  )
}
