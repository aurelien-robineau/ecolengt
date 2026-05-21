import { defaultTomTomContent } from '@/lib/cms/defaultTomTomContent'
import type { TomTomPageData } from '@/lib/cms/types'
import type { TomTomPage as TomTomPageDoc } from '@/payload-types'

function hasRichTextContent(content: TomTomPageDoc['content'] | null | undefined): boolean {
  const children = content?.root?.children
  if (!Array.isArray(children) || children.length === 0) {
    return false
  }

  return children.some((node) => {
    if (!node || typeof node !== 'object' || !('type' in node)) {
      return false
    }

    if (node.type === 'paragraph' && Array.isArray(node.children)) {
      return node.children.some(
        (child) =>
          child &&
          typeof child === 'object' &&
          'type' in child &&
          child.type === 'text' &&
          'text' in child &&
          typeof child.text === 'string' &&
          child.text.trim(),
      )
    }

    return node.type !== 'paragraph'
  })
}

export function mapTomTomPage(data: TomTomPageDoc | null | undefined): TomTomPageData {
  const content = data?.content

  return {
    content: hasRichTextContent(content) ? content! : defaultTomTomContent,
  }
}
