import { CmsRichText } from '@/components/cms/CmsRichText'
import { cn } from '@/lib/cn'
import type { IntensiveCoursesBlock } from '@/lib/content/types'

type IntensiveCoursesBlocksProps = {
  blocks: IntensiveCoursesBlock[]
}

export function IntensiveCoursesBlocks({ blocks }: IntensiveCoursesBlocksProps) {
  if (!blocks.length) {
    return null
  }

  const lastIndex = blocks.length - 1
  const lastAlone = blocks.length % 2 === 1

  return (
    <div className="grid gap-px bg-border lg:grid-cols-2">
      {blocks.map((block, index) => (
        <article
          key={`${block.title}-${index}`}
          className={cn(
            'bg-surface-card p-8 md:p-10',
            lastAlone && index === lastIndex && 'lg:col-span-2',
          )}
        >
          {block.title ? (
            <h2 className="mb-6 font-serif text-[1.375rem] font-normal text-foreground">
              {block.title}
            </h2>
          ) : null}
          <CmsRichText data={block.content} />
        </article>
      ))}
    </div>
  )
}
