'use client'

import { Button, useDocumentInfo } from '@payloadcms/ui'
import type { RefObject } from 'react'

/** Payload’s built-in remove control on media edit (icon X in the file preview header). */
const DEFAULT_REMOVE_BUTTON_SELECTOR = 'button.file-details__remove'

type MediaRemoveFileActionProps = {
  rootRef: RefObject<HTMLDivElement | null>
}

function clickDefaultRemoveFile(root: HTMLElement) {
  root.querySelector<HTMLButtonElement>(DEFAULT_REMOVE_BUTTON_SELECTOR)?.click()
}

/** Visible remove control below « Modifier l’image »; delegates to Payload’s default X button. */
export function MediaRemoveFileAction({ rootRef }: MediaRemoveFileActionProps) {
  const { data, docPermissions, id } = useDocumentInfo()

  if (!id || !data?.filename || !docPermissions?.update) {
    return null
  }

  return (
    <Button
      buttonStyle="pill"
      className="media-upload-root__remove-file"
      margin={false}
      onClick={() => {
        if (rootRef.current) {
          clickDefaultRemoveFile(rootRef.current)
        }
      }}
      size="small"
      type="button"
    >
      Supprimer l&apos;image
    </Button>
  )
}
