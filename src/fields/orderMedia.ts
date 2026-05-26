import type { Field } from 'payload'

/** Upload merge pushes `filename` after `alt` — keep filename first in the admin form. */
export function orderMediaFields(fields: Field[]): Field[] {
  const next = [...fields]
  const filenameIndex = next.findIndex((field) => 'name' in field && field.name === 'filename')

  if (filenameIndex === -1) {
    return next
  }

  const [filenameField] = next.splice(filenameIndex, 1)
  const altIndex = next.findIndex((field) => 'name' in field && field.name === 'alt')

  if (altIndex === -1) {
    next.unshift(filenameField)
    return next
  }

  next.splice(altIndex, 0, filenameField)
  return next
}
