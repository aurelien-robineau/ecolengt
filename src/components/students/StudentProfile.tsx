import { StudentPhotos } from '@/components/students/StudentPhotos'
import { FormattedParagraph } from '@/components/ui/FormattedParagraph'
import type { StudentProfileData } from '@/lib/cms/types'

type StudentProfileProps = {
  student: StudentProfileData
}

export function StudentProfile({ student }: StudentProfileProps) {
  return (
    <article>
      <h1 className="mb-10 font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] font-light text-foreground">
        {student.name}
      </h1>

      {student.quote ?
        <blockquote className="mb-10 max-w-2xl border-l-2 border-brand pl-6">
          <FormattedParagraph className="font-serif text-lg leading-[1.75] font-light text-foreground-muted italic">
            {`« ${student.quote} »`}
          </FormattedParagraph>
        </blockquote>
      : null}

      <StudentPhotos photos={student.photos} />

      {student.jobTitle ?
        <p className="mb-3 text-base leading-snug tracking-[0.04em] text-foreground md:text-lg">
          {student.jobTitle}
        </p>
      : null}

      {student.description.length > 0 ?
        <div className="max-w-2xl space-y-2 text-sm leading-[1.9] text-foreground-muted">
          {student.description.map((paragraph, index) => (
            <FormattedParagraph key={`${paragraph.slice(0, 24)}-${index}`}>
              {paragraph}
            </FormattedParagraph>
          ))}
        </div>
      : null}
    </article>
  )
}
