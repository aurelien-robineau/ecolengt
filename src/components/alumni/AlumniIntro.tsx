import { FormattedParagraph } from '@/components/ui/FormattedParagraph'

type AlumniIntroProps = {
  paragraphs: string[]
}

export function AlumniIntro({ paragraphs }: AlumniIntroProps) {
  return (
    <div className="mb-12 max-w-2xl space-y-2 text-sm leading-[1.9] text-foreground-muted">
      {paragraphs.map((paragraph, index) => (
        <FormattedParagraph key={`${paragraph.slice(0, 24)}-${index}`}>{paragraph}</FormattedParagraph>
      ))}
    </div>
  )
}
