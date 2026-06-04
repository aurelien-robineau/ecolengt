import { buildLexicalContent } from '@/lib/content/richtext/buildLexicalContent'

/** Minimal Lexical document with one paragraph (has content). */
export function paragraphContent(text: string) {
  return buildLexicalContent([{ type: 'paragraph', text }])
}

/** Empty Lexical root (no blocks). */
export function emptyLexicalContent() {
  return {
    root: {
      type: 'root' as const,
      children: [],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}
