'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

import { clearAudioOutputPrime, primeAudioOutput } from '../lib/primeAudioOutput'

import { FeatureIcon } from './FeatureIcon'

type PlaybackState = {
  isPlaying: boolean
  currentTime: number
}

type MetronomePlayerProps = {
  src: string
  downloadFilename: string
  /** Playback time (s) when the slow finale begins — status switches to “Arrivée en gare…”. */
  finaleStartTime: number
  onPlaybackChange?: (state: PlaybackState) => void
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const total = Math.floor(seconds)
  const mins = Math.floor(total / 60)
  const secs = total % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function MeterBars({ active }: { active: boolean }) {
  const heights = ['h-3', 'h-5', 'h-4', 'h-6', 'h-3']
  return (
    <div className="flex h-8 items-end justify-center gap-1.5" aria-hidden>
      {heights.map((height, index) => (
        <span
          key={index}
          className={cn(
            'w-1 rounded-full bg-[var(--metro-brand)] transition-all duration-300',
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
  onPlaybackChange,
}: MetronomePlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const seekTrackRef = useRef<HTMLButtonElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isScrubbing, setIsScrubbing] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const emitPlaybackChange = useCallback(
    (next: PlaybackState) => {
      onPlaybackChange?.(next)
    },
    [onPlaybackChange],
  )

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    setIsPlaying(false)
    setIsReady(false)
    setCurrentTime(0)
    setDuration(0)
    emitPlaybackChange({ isPlaying: false, currentTime: 0 })
    clearAudioOutputPrime(audio)
    audio.load()
  }, [emitPlaybackChange, src])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const syncDuration = () => {
      setDuration(audio.duration)
      setIsReady(Number.isFinite(audio.duration) && audio.duration > 0)
    }
    const syncCurrentTime = () => {
      setCurrentTime(audio.currentTime)
      emitPlaybackChange({ isPlaying: !audio.paused, currentTime: audio.currentTime })
    }
    const onPlay = () => {
      setIsPlaying(true)
      emitPlaybackChange({ isPlaying: true, currentTime: audio.currentTime })
    }
    const onPause = () => {
      setIsPlaying(false)
      emitPlaybackChange({ isPlaying: false, currentTime: audio.currentTime })
    }
    const onEnded = () => {
      setIsPlaying(false)
      emitPlaybackChange({ isPlaying: false, currentTime: audio.currentTime })
    }

    audio.addEventListener('loadedmetadata', syncDuration)
    audio.addEventListener('durationchange', syncDuration)
    audio.addEventListener('timeupdate', syncCurrentTime)
    audio.addEventListener('seeked', syncCurrentTime)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', syncDuration)
      audio.removeEventListener('durationchange', syncDuration)
      audio.removeEventListener('timeupdate', syncCurrentTime)
      audio.removeEventListener('seeked', syncCurrentTime)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [emitPlaybackChange, src])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isPlaying) return

    let frameId = 0
    const tick = () => {
      const time = audio.currentTime
      setCurrentTime(time)
      emitPlaybackChange({ isPlaying: true, currentTime: time })
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [emitPlaybackChange, isPlaying, src])

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
        if (audio.currentTime < 0.05) {
          await primeAudioOutput(audio, src)
        }
        await audio.play()
      } catch {
        setIsPlaying(false)
      }
    } else {
      audio.pause()
    }
  }, [clampTime, isReady, src])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !isReady) return
    audio.pause()
    audio.currentTime = 0
    clearAudioOutputPrime(audio)
    setCurrentTime(0)
    setIsPlaying(false)
    emitPlaybackChange({ isPlaying: false, currentTime: 0 })
  }, [emitPlaybackChange, isReady])

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
    <div className="relative rounded-md border border-[var(--metro-border)] bg-[var(--metro-panel)] px-5 py-7 md:px-8 md:py-9">
      <audio ref={audioRef} src={src} preload="auto" className="sr-only" />

      <button
        type="button"
        onClick={stop}
        disabled={!canStop}
        aria-label="Arrêt — revenir au début"
        className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full border border-[var(--metro-border)] bg-[var(--metro-panel)] text-[var(--metro-text)] transition-[transform,background-color] hover:bg-[var(--metro-brand-dim)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 md:top-5 md:right-5 md:size-12"
      >
        <FeatureIcon name="stop" className="size-5 md:size-5.5" />
      </button>

      <div className="relative flex flex-col items-center gap-7 text-center">
        <div className="relative shrink-0">
          {isReady && !isPlaying ? (
            <span
              className="absolute inset-0 z-0 animate-play-ready rounded-full bg-[var(--metro-brand)]/45"
              aria-hidden
            />
          ) : null}
          <button
            type="button"
            onClick={togglePlay}
            disabled={!isReady}
            aria-label={isPlaying ? 'Pause' : 'Lecture'}
            className={cn(
              'relative z-10 flex size-22 items-center justify-center rounded-full border transition-transform hover:scale-[1.03] active:scale-95',
              'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 md:size-26',
              isPlaying
                ? 'border-[var(--metro-brand)] bg-[var(--metro-brand)] text-[var(--metro-on-brand)]'
                : 'border-[var(--metro-text)] bg-[var(--metro-text)] text-[var(--metro-panel)]',
            )}
          >
            {isPlaying ? (
              <FeatureIcon name="pause" className="size-9 md:size-10" />
            ) : (
              <FeatureIcon name="play" className="size-10 md:size-11" />
            )}
          </button>
        </div>

        <div className="w-full max-w-sm space-y-5">
          <div className="flex flex-col items-center gap-3">
            <p className="font-metronome-display text-xl font-medium tracking-tight text-[var(--metro-text)] md:text-2xl">
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
                'group relative flex h-7 w-full touch-none items-center disabled:cursor-not-allowed',
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
              <span className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#ebebeb]" />
              <span
                className={cn(
                  'absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full bg-[var(--metro-brand)]',
                  !isScrubbing && 'transition-[width] duration-150',
                )}
                style={{ width: `${progress}%` }}
              />
              <span
                className={cn(
                  'absolute top-1/2 size-4 -translate-y-1/2 rounded-full border border-[var(--metro-on-brand)] bg-[var(--metro-brand)]',
                  isScrubbing
                    ? 'opacity-100'
                    : 'opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100',
                )}
                style={{ left: `calc(${progress}% - 8px)` }}
              />
            </button>
            <div className="flex justify-between font-metronome-mono text-[11px] tracking-wide text-[var(--metro-muted)]">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <a
            href={src}
            download={downloadFilename}
            className="inline-flex items-center justify-center gap-2 font-metronome-mono text-[11px] tracking-[0.14em] text-[var(--metro-muted)] uppercase no-underline transition-colors hover:text-[var(--metro-brand)]"
          >
            <FeatureIcon name="download" className="size-4" />
            Télécharger le fichier
          </a>
        </div>
      </div>
    </div>
  )
}
