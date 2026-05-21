import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText,
} from '@payloadcms/richtext-lexical/react'
import type { LegalNoticePage } from '@/payload-types'

type RichTextData = NonNullable<LegalNoticePage['content']>

const proseClassName = [
  'cms-rich-text max-w-2xl text-sm leading-[1.9] text-foreground-muted',
  '[&>p]:mb-6',
  '[&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:text-xs [&>h3]:font-medium [&>h3]:tracking-[0.2em] [&>h3]:text-foreground [&>h3]:uppercase',
  '[&>h3:first-child]:mt-0',
  '[&>ul]:my-4 [&>ul]:list-none [&>ul]:space-y-2 [&>ul]:pl-0',
  '[&>ol]:my-4 [&>ol]:list-decimal [&>ol]:space-y-2 [&>ol]:pl-5',
  '[&_a]:text-foreground-muted [&_a]:no-underline [&_a]:transition-colors hover:[&_a]:text-brand',
].join(' ')

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({}),
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag
    const children = nodesToJSX({ nodes: node.children })

    return <Tag>{children}</Tag>
  },
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })

    if (!children?.length) {
      return <p className="min-h-[1.9em]" />
    }

    return <p>{children}</p>
  },
  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    const Tag = node.tag

    return <Tag className={`list-${node.listType}`}>{children}</Tag>
  },
})

type CmsRichTextProps = {
  data: RichTextData
}

export function CmsRichText({ data }: CmsRichTextProps) {
  return <RichText className={proseClassName} converters={converters} data={data} />
}
