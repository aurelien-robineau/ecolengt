import { IBM_Plex_Mono, Outfit } from 'next/font/google'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

import './metronome.css'

const metronomeDisplay = Outfit({
  subsets: ['latin'],
  variable: '--font-metronome-display',
  weight: ['500', '600', '700'],
})

const metronomeMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-metronome-mono',
  weight: ['400', '500'],
})

const metronomeBody = Outfit({
  subsets: ['latin'],
  variable: '--font-metronome-body',
  weight: ['300', '400', '500'],
})

type MetronomeFeatureProps = {
  children: ReactNode
  className?: string
}

export function MetronomeFeature({ children, className }: MetronomeFeatureProps) {
  return (
    <div
      className={cn(
        metronomeDisplay.variable,
        metronomeMono.variable,
        metronomeBody.variable,
        'metronome-feature',
        className,
      )}
    >
      {children}
    </div>
  )
}
