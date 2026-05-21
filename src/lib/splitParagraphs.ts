/** Split textarea content into paragraphs (blank line separated). Single line breaks are preserved at render time via FormattedParagraph. */
export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}
