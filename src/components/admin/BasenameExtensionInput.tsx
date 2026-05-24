'use client'

import { FieldDescription, FieldError, FieldLabel } from '@payloadcms/ui'
import React, { useId } from 'react'

import { joinFilename, splitFilename } from '@/lib/cms/filename'

import './BasenameExtensionInput.scss'

type BasenameExtensionInputProps = {
  description?: string
  id?: string
  label?: string
  labelAction?: React.ReactNode
  onChange: (fullFilename: string) => void
  path?: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  showError?: boolean
  value: string
}

export function BasenameExtensionInput({
  description,
  id: idFromProps,
  label,
  labelAction,
  onChange,
  path,
  placeholder = 'ex. photo-accueil',
  readOnly = false,
  required,
  showError,
  value,
}: BasenameExtensionInputProps) {
  const generatedId = useId()
  const inputId = idFromProps ?? generatedId
  const { basename, extension } = splitFilename(value)

  return (
    <div className="field-type basename-extension-input">
      {(label || labelAction) && (
        <div className="basename-extension-input__label-row">
          {label ? <FieldLabel label={label} path={path} required={required} /> : <span />}
          {labelAction}
        </div>
      )}

      <div
        className={[
          'basename-extension-input__control',
          readOnly && 'basename-extension-input__control--readonly',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <input
          aria-disabled={readOnly}
          className="basename-extension-input__basename"
          disabled={readOnly}
          id={inputId}
          onChange={(event) => {
            onChange(joinFilename(event.target.value, extension))
          }}
          placeholder={placeholder}
          readOnly={readOnly}
          type="text"
          value={basename}
        />
        {extension ? (
          <span
            className="basename-extension-input__extension"
            title={`Extension : ${extension}`}
          >
            {extension}
          </span>
        ) : null}
      </div>

      {showError && path ? <FieldError path={path} showError={showError} /> : null}
      {description && path ? (
        <FieldDescription description={description} path={path} />
      ) : null}
    </div>
  )
}
