import { defaultTomTomContent } from '@/lib/cms/defaultTomTomContent'
import { hasLexicalContent } from '@/lib/cms/hasLexicalContent'
import type { TomTomPageData } from '@/lib/cms/types'
import type { TomTomPage as TomTomPageDoc } from '@/payload-types'

export function mapTomTomPage(data: TomTomPageDoc | null | undefined): TomTomPageData {
  const content = data?.content

  return {
    content: hasLexicalContent(content) ? content! : defaultTomTomContent,
  }
}
