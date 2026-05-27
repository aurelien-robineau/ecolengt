'use client'

import { useField, usePayloadAPI } from '@payloadcms/ui'
import type { Media } from '@/payload-types'
import React, { useMemo } from 'react'

import './HeroBannerPreviewField.scss'

const OVERLAY_COLOR = '#f4f4f4'
const DEFAULT_OVERLAY_OPACITY = 92

function clampOverlayOpacity(value: unknown): number {
  const opacity = typeof value === 'number' ? value : Number(value)

  if (!Number.isFinite(opacity)) {
    return DEFAULT_OVERLAY_OPACITY
  }

  return Math.min(100, Math.max(0, Math.round(opacity)))
}

function normalizeMediaUrl(url: string): string {
  if (url.startsWith('/')) {
    return url
  }

  try {
    const parsed = new URL(url)
    return `${parsed.pathname}${parsed.search}`
  } catch {
    return url
  }
}

function mediaValueToUrl(value: unknown): string | null {
  if (!value || typeof value === 'string') {
    return null
  }

  if (typeof value === 'object' && 'url' in value) {
    const url = (value as Media).url
    return url ? normalizeMediaUrl(url) : null
  }

  return null
}

export function HeroBannerPreviewField() {
  const { value: tagline } = useField<string>({ path: 'heroTagline' })
  const { value: name } = useField<string>({ path: 'heroName' })
  const { value: subtitle } = useField<string>({ path: 'heroSubtitle' })
  const { value: backgroundImage } = useField<Media | string | null>({
    path: 'heroBackgroundImage',
  })
  const { value: overlayOpacity } = useField<number>({ path: 'heroOverlayOpacity' })

  const inlineImageUrl = useMemo(() => mediaValueToUrl(backgroundImage), [backgroundImage])
  const mediaId = typeof backgroundImage === 'string' ? backgroundImage : null
  const mediaApiUrl = mediaId && !inlineImageUrl ? `/api/media/${mediaId}` : ''
  const [{ data: mediaDoc }] = usePayloadAPI(mediaApiUrl)

  const imageUrl = useMemo(() => {
    if (inlineImageUrl) {
      return inlineImageUrl
    }

    const url = (mediaDoc as Media | undefined)?.url
    return url ? normalizeMediaUrl(url) : null
  }, [inlineImageUrl, mediaDoc])
  const opacity = clampOverlayOpacity(overlayOpacity)

  const taglineText = typeof tagline === 'string' ? tagline : ''
  const nameText = typeof name === 'string' ? name : ''
  const subtitleText = typeof subtitle === 'string' ? subtitle : ''

  const overlayStyle = useMemo(
    () => ({
      backgroundColor: OVERLAY_COLOR,
      opacity: opacity / 100,
    }),
    [opacity],
  )

  return (
    <div className="field-type hero-banner-preview">
      <p className="hero-banner-preview__label">Aperçu de la bannière</p>
      <div className="hero-banner-preview__frame">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- admin-only preview; avoids next/image config in Payload UI
          <img alt="" className="hero-banner-preview__image" src={imageUrl} />
        ) : (
          <div className="hero-banner-preview__empty-image">
            Ajoutez une image de fond pour prévisualiser le voile.
          </div>
        )}
        {imageUrl ? (
          <div aria-hidden className="hero-banner-preview__overlay" style={overlayStyle} />
        ) : null}
        <div className="hero-banner-preview__content">
          {taglineText ? <p className="hero-banner-preview__tagline">{taglineText}</p> : null}
          {nameText || subtitleText ? (
            <h2 className="hero-banner-preview__title">
              {nameText ? <span>{nameText}</span> : null}
              {subtitleText ? (
                <em className="hero-banner-preview__subtitle">{subtitleText}</em>
              ) : null}
            </h2>
          ) : null}
          {imageUrl ? <p className="hero-banner-preview__meta">Voile : {opacity}&nbsp;%</p> : null}
        </div>
      </div>
    </div>
  )
}
