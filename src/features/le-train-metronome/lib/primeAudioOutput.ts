const PRIME_VOLUME = 0.001
const PRIME_SETTLE_MS = 150

/**
 * Opens the browser audio output path before the first audible beat.
 * Bluetooth and external DACs often drop the opening samples until the route is warm.
 */
export async function primeAudioOutput(audio: HTMLAudioElement, src: string): Promise<void> {
  if (audio.dataset.primedSrc === src) return

  const savedVolume = audio.volume
  const savedTime = audio.currentTime

  try {
    audio.volume = PRIME_VOLUME
    audio.currentTime = 0
    await audio.play()
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, PRIME_SETTLE_MS)
    })
    audio.pause()
    audio.currentTime = savedTime
    audio.dataset.primedSrc = src
  } catch {
    audio.currentTime = savedTime
  } finally {
    audio.volume = savedVolume
  }
}

export function clearAudioOutputPrime(audio: HTMLAudioElement): void {
  delete audio.dataset.primedSrc
}
