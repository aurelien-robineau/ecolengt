import { hasLexicalContent } from '@/lib/cms/hasLexicalContent'
import type { CmsRichTextContent } from '@/lib/cms/richText'

export function mapRichText(
  content: CmsRichTextContent | null | undefined,
): CmsRichTextContent | null {
  return hasLexicalContent(content) ? content! : null
}
