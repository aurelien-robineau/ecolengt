import { CmsRichText } from '@/components/cms/CmsRichText'
import { cn } from '@/lib/cn'
import { StudentPhotos } from '@/components/students/StudentPhotos'
import { FormattedParagraph } from '@/components/ui/FormattedParagraph'
import type { StudentProfileData } from '@/lib/content/types'
import { stackBlockClassName } from '@/lib/ui/typography'

type StudentProfileProps = {
  student: StudentProfileData
}

export function StudentProfile({ student }: StudentProfileProps) {
  return (
    <article>
      <header className={stackBlockClassName}>
        <h1 className="type-section-title text-[clamp(1.75rem,4vw,2.75rem)]">{student.name}</h1>
        {student.jobTitle ? (
          <p className="type-lead mt-4 text-foreground-muted">{student.jobTitle}</p>
        ) : null}
      </header>

      {student.quote ? (
        <blockquote className={cn(stackBlockClassName, 'max-w-2xl border-l-2 border-brand pl-6')}>
          <FormattedParagraph className="type-lead font-serif italic text-foreground-muted">
            {`« ${student.quote} »`}
          </FormattedParagraph>
        </blockquote>
      ) : null}

      <StudentPhotos photos={student.photos} />

      {student.description ? <CmsRichText data={student.description} /> : null}
    </article>
  )
}
