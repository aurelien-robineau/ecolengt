'use client'

import { useState } from 'react'

import { cn } from '@/lib/cn'

type MapEmbedProps = {
  src: string
  title: string
}

export function MapEmbed({ src, title }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded ? (
        <div className="absolute inset-0 animate-pulse bg-surface-muted" aria-hidden />
      ) : null}
      <iframe
        src={src}
        title={title}
        className={cn(
          'absolute inset-0 h-full w-full border-0 transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
      />
    </>
  )
}
