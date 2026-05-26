import type { LegalNoticePage } from '@/payload-types'

type LegalNoticeContent = NonNullable<LegalNoticePage['content']>

const paragraphDefaults = {
  direction: 'ltr' as const,
  format: '',
  indent: 0,
  textFormat: 0,
  textStyle: '',
  version: 1,
}

function lexicalText(text: string) {
  return {
    type: 'text' as const,
    detail: 0,
    format: 0,
    mode: 'normal' as const,
    style: '',
    text,
    version: 1,
  }
}

function lexicalParagraph(text: string) {
  return {
    type: 'paragraph' as const,
    children: [lexicalText(text)],
    ...paragraphDefaults,
  }
}

function lexicalHeading(text: string, tag: 'h3' = 'h3') {
  return {
    type: 'heading' as const,
    tag,
    children: [lexicalText(text)],
    direction: 'ltr' as const,
    format: '',
    indent: 0,
    version: 1,
  }
}

function lexicalListItem(text: string) {
  return {
    type: 'listitem' as const,
    value: 1,
    children: [lexicalParagraph(text)],
    direction: 'ltr' as const,
    format: '',
    indent: 0,
    version: 1,
  }
}

function lexicalBulletList(items: string[]) {
  return {
    type: 'list' as const,
    listType: 'bullet' as const,
    tag: 'ul' as const,
    start: 1,
    children: items.map(lexicalListItem),
    direction: 'ltr' as const,
    format: '',
    indent: 0,
    version: 1,
  }
}

export function buildLexicalContent(
  blocks: Array<
    | { type: 'paragraph'; text: string }
    | { type: 'heading'; text: string; tag?: 'h3' }
    | { type: 'list'; items: string[] }
  >,
): LegalNoticeContent {
  return {
    root: {
      type: 'root',
      children: blocks.map((block) => {
        if (block.type === 'heading') {
          return lexicalHeading(block.text, block.tag ?? 'h3')
        }

        if (block.type === 'list') {
          return lexicalBulletList(block.items)
        }

        return lexicalParagraph(block.text)
      }),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}
