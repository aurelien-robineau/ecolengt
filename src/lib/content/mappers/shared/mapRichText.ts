import { hasLexicalContent } from '@/lib/content/richtext/hasLexicalContent'
import type { CmsRichTextContent } from '../../richtext/types'

export function mapRichText(
  content: CmsRichTextContent | null | undefined,
): CmsRichTextContent | null {
  return hasLexicalContent(content) ? content! : null
}
