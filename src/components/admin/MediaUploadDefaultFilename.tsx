'use client'

import { useField } from '@payloadcms/ui'
import { useCallback, useEffect, useRef, type RefObject } from 'react'

const FILENAME_INPUT_SELECTOR = 'input.file-field__filename'
const LOCKED_CLASS = 'file-field__filename--locked'

function lockDefaultFilenameInput(input: HTMLInputElement, displayName: string): void {
  input.disabled = true
  input.readOnly = true
  input.setAttribute('aria-disabled', 'true')
  input.tabIndex = -1
  input.classList.add(LOCKED_CLASS)
  input.title = 'Nom géré par le champ « Nom du fichier » ci-dessous'

  if (document.activeElement !== input && displayName) {
    input.value = displayName
  }
}

export function MediaUploadDefaultFilename({ rootRef }: { rootRef: RefObject<HTMLDivElement | null> }) {
  const patchedInputsRef = useRef<WeakSet<HTMLInputElement>>(new WeakSet())
  const { value: fileValue } = useField<File>({ path: 'file' })
  const { value: filenameValue } = useField<string>({ path: 'filename' })

  const displayName =
    (typeof filenameValue === 'string' && filenameValue) ||
    (fileValue instanceof File ? fileValue.name : '')

  const scan = useCallback(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    root.querySelectorAll<HTMLInputElement>(FILENAME_INPUT_SELECTOR).forEach((input) => {
      if (!patchedInputsRef.current.has(input)) {
        patchedInputsRef.current.add(input)
      }

      lockDefaultFilenameInput(input, displayName)
    })
  }, [displayName, rootRef])

  useEffect(() => {
    scan()

    const root = rootRef.current
    if (!root) {
      return
    }

    const observer = new MutationObserver(scan)
    observer.observe(root, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [scan, rootRef])

  return null
}
