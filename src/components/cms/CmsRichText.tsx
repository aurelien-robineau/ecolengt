import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  ListJSXConverter,
  RichText,
  UploadJSXConverter,
} from '@payloadcms/richtext-lexical/react'

import type { CmsRichTextContent } from '@/lib/cms/richText'

const proseClassName = [
  'cms-rich-text min-w-0 w-full max-w-full text-sm leading-[1.65] text-foreground-muted',
  '[&_p]:mb-2',
  '[&_p:last-child]:mb-0',
  '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xs [&_h3]:font-medium [&_h3]:tracking-[0.2em] [&_h3]:text-foreground [&_h3]:uppercase',
  '[&_h3:first-child]:mt-0',
  '[&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:marker:text-brand',
  '[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5',
  '[&_li]:leading-[1.65]',
  '[&_li>p]:mb-0',
  '[&_li>ul]:mt-1',
  '[&_a]:text-foreground-muted [&_a]:no-underline [&_a]:transition-colors hover:[&_a]:text-brand',
  '[&_picture]:my-8 [&_picture]:block [&_img]:h-auto [&_img]:max-w-full',
].join(' ')

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...UploadJSXConverter,
  ...LinkJSXConverter({}),
  ...ListJSXConverter,
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag
    const children = nodesToJSX({ nodes: node.children })

    return <Tag>{children}</Tag>
  },
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })

    if (!children?.length) {
      return <p className="min-h-[1.65em]" />
    }

    return <p>{children}</p>
  },
})

type CmsRichTextProps = {
  data: CmsRichTextContent | null
}

export function CmsRichText({ data }: CmsRichTextProps) {
  if (!data) {
    return null
  }

  return <RichText className={proseClassName} converters={converters} data={data} />
}
