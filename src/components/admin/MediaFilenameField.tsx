'use client'

import type { TextFieldClientComponent } from 'payload'
import { useDocumentInfo, useField, useForm } from '@payloadcms/ui'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { BasenameExtensionInput } from '@/components/admin/BasenameExtensionInput'
import { renameUploadFile } from '@/lib/cms/renameUploadFile'

export const MediaFilenameField: TextFieldClientComponent = ({
  field,
  path,
  readOnly: forceReadOnly,
}) => {
  const { id } = useDocumentInfo()
  const isCreate = !id

  const [unlocked, setUnlocked] = useState(false)
  const { setModified } = useForm()
  const lastSyncedFileRef = useRef<File | null>(null)

  const { setValue, showError, value } = useField<string>({ path })
  const { setValue: setFileValue, value: fileValue } = useField<File>({ path: 'file' })

  const fullFilename = typeof value === 'string' ? value : ''
  const hasFile = fileValue instanceof File
  const readOnly = isCreate ? !hasFile : Boolean(forceReadOnly) || !unlocked

  useEffect(() => {
    if (!isCreate) {
      return
    }

    if (!(fileValue instanceof File)) {
      if (lastSyncedFileRef.current !== null) {
        setValue('')
        lastSyncedFileRef.current = null
      }
      return
    }

    if (lastSyncedFileRef.current === fileValue) {
      return
    }

    lastSyncedFileRef.current = fileValue
    setValue(fileValue.name)
  }, [fileValue, isCreate, setValue])

  const handleChange = useCallback(
    (nextFilename: string) => {
      setValue(nextFilename)
      setModified(true)

      if (isCreate && fileValue instanceof File) {
        const nextFile = renameUploadFile(fileValue, nextFilename)
        lastSyncedFileRef.current = nextFile
        setFileValue(nextFile)
      }
    },
    [fileValue, isCreate, setFileValue, setModified, setValue],
  )

  const toggleLabel = unlocked ? 'Verrouiller' : 'Modifier'
  const description = isCreate
    ? 'Nom du fichier sur l’espace de stockage.'
    : typeof field.admin?.description === 'string'
      ? field.admin.description
      : undefined

  return (
    <BasenameExtensionInput
      description={description}
      label={typeof field.label === 'string' ? field.label : 'Nom du fichier'}
      labelAction={
        isCreate ? null : (
          <a
            className="basename-extension-input__toggle"
            href="#"
            onClick={(event) => {
              event.preventDefault()
              setUnlocked((current) => !current)
            }}
          >
            {toggleLabel}
          </a>
        )
      }
      onChange={handleChange}
      path={path}
      placeholder={isCreate && !hasFile ? 'Sélectionnez d’abord un fichier' : 'ex. photo-accueil'}
      readOnly={readOnly}
      required={field.required}
      showError={showError}
      value={fullFilename}
    />
  )
}
