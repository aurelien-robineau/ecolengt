'use client'

import { Upload, useConfig, useDocumentInfo } from '@payloadcms/ui'
import { useRef } from 'react'

import { MediaUploadDefaultFilename } from '@/components/admin/MediaUploadDefaultFilename'

import './MediaUpload.scss'

export function MediaUpload() {
  const rootRef = useRef<HTMLDivElement>(null)
  const { collectionSlug, initialState } = useDocumentInfo()
  const { getEntityConfig } = useConfig()

  const collectionConfig = collectionSlug ? getEntityConfig({ collectionSlug }) : undefined
  const upload = collectionConfig?.upload

  if (!collectionSlug || !upload || typeof upload === 'boolean') {
    return null
  }

  return (
    <div className="media-upload-root" ref={rootRef}>
      <MediaUploadDefaultFilename rootRef={rootRef} />
      <Upload
        collectionSlug={collectionSlug}
        initialState={initialState}
        uploadConfig={upload}
      />
    </div>
  )
}
