import { CmsRichText } from '@/components/cms/CmsRichText'
import { StudentPhotos } from '@/components/students/StudentPhotos'
import { FormattedParagraph } from '@/components/ui/FormattedParagraph'
import type { StudentProfileData } from '@/lib/content/types'

type StudentProfileProps = {
  student: StudentProfileData
}

export function StudentProfile({ student }: StudentProfileProps) {
  return (
    <article>
      <header className="mb-10">
        <h1 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] font-light text-foreground">
          {student.name}
        </h1>
        {student.jobTitle ? (
          <p className="mt-3 text-base leading-snug tracking-[0.04em] text-foreground md:text-lg">
            {student.jobTitle}
          </p>
        ) : null}
      </header>

      {student.quote ? (
        <blockquote className="mb-10 max-w-2xl border-l-2 border-brand pl-6">
          <FormattedParagraph className="font-serif text-lg leading-[1.75] font-light text-foreground-muted italic">
            {`« ${student.quote} »`}
          </FormattedParagraph>
        </blockquote>
      ) : null}

      <StudentPhotos photos={student.photos} />

      {student.description ? <CmsRichText data={student.description} /> : null}
    </article>
  )
}
