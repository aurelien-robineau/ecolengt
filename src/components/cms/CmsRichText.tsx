import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  ListJSXConverter,
  RichText,
  TableJSXConverter,
  UploadJSXConverter,
} from '@payloadcms/richtext-lexical/react'

import type { CmsRichTextContent } from '@/lib/content/types'
import { cn } from '@/lib/cn'
import { bodyTextClassName } from '@/lib/ui/typography'

const proseClassName = [
  `cms-rich-text max-w-2xl text-start ${bodyTextClassName}`,
  '[&_p]:mb-4',
  '[&_p:last-child]:mb-0',
  '[&_strong]:font-semibold [&_strong]:text-foreground',
  '[&_em]:italic',
  '[&_blockquote]:my-4 [&_blockquote]:border-l [&_blockquote]:border-brand [&_blockquote]:pl-4 [&_blockquote]:text-foreground [&_blockquote]:italic',
  '[&_hr]:my-8 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-border',
  '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:tracking-[var(--tracking-widest)] [&_h3]:text-foreground [&_h3]:uppercase',
  '[&_h3:first-child]:mt-0',
  '[&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:marker:text-brand',
  '[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5',
  '[&_li]:leading-normal',
  '[&_li>p]:mb-0',
  '[&_li>ul]:mt-1',
  '[&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-brand [&_a]:decoration-2 [&_a]:transition-colors [&_a:hover]:decoration-foreground',
  '[&_picture]:my-8 [&_picture]:block [&_img]:h-auto [&_img]:max-w-full',
  '[&_table]:w-full [&_table]:min-w-[20rem] [&_table]:border-collapse [&_table]:text-base',
  '[&_th]:border [&_th]:border-border [&_th]:bg-surface-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-medium',
  '[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top',
  '[&_td>p]:mb-0 [&_th>p]:mb-0',
].join(' ')

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...UploadJSXConverter,
  ...LinkJSXConverter({}),
  ...ListJSXConverter,
  ...TableJSXConverter,
  table: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })

    return (
      <div className="w-full overflow-x-auto">
        <table className="lexical-table">
          <tbody>{children}</tbody>
        </table>
      </div>
    )
  },
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
  className?: string
}

export function CmsRichText({ data, className }: CmsRichTextProps) {
  if (!data) {
    return null
  }

  return <RichText className={cn(proseClassName, className)} converters={converters} data={data} />
}
