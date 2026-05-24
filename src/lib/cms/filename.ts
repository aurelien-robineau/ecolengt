import path from 'path'

export function splitFilename(filename: string): { basename: string; extension: string } {
  const ext = path.extname(filename)
  if (!ext) {
    return { basename: filename, extension: '' }
  }

  return {
    basename: filename.slice(0, -ext.length),
    extension: ext,
  }
}

export function joinFilename(basename: string, extension: string): string {
  const trimmed = basename.trim()
  if (!extension) {
    return trimmed
  }

  return `${trimmed}${extension.startsWith('.') ? extension : `.${extension}`}`
}

/** If `filename` has no extension, reuse the one from `referenceFilename` (e.g. original doc or upload). */
export function ensureFilenameExtension(filename: string, referenceFilename: string): string {
  if (!filename || path.extname(filename)) {
    return filename
  }

  const { extension } = splitFilename(referenceFilename)
  return joinFilename(filename, extension)
}
