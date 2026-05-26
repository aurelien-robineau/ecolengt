export function splitFilename(filename: string): { basename: string; extension: string } {
  const lastDot = filename.lastIndexOf('.')

  if (lastDot <= 0) {
    return { basename: filename, extension: '' }
  }

  return {
    basename: filename.slice(0, lastDot),
    extension: filename.slice(lastDot),
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
  const { extension: existingExt } = splitFilename(filename)
  if (!filename || existingExt) {
    return filename
  }

  const { extension } = splitFilename(referenceFilename)
  return joinFilename(filename, extension)
}
