import { CmsRichText } from '@/components/cms/CmsRichText'
import { cn } from '@/lib/cn'
import { cardTitleClassName, stackTitleClassName } from '@/lib/ui/typography'
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
    <div className="bleed-x-sm grid gap-px bg-border lg:grid-cols-2">
      {blocks.map((block, index) => (
        <article
          key={`${block.title}-${index}`}
          className={cn(
            'bg-surface-card card-pad-lg',
            lastAlone && index === lastIndex && 'lg:col-span-2',
          )}
        >
          {block.title ? (
            <h2 className={cn(cardTitleClassName, stackTitleClassName)}>{block.title}</h2>
          ) : null}
          <CmsRichText data={block.content} />
        </article>
      ))}
    </div>
  )
}
