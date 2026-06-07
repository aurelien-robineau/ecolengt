import Link from 'next/link'

import { cn } from '@/lib/cn'
import type { AlumniStudent } from '@/lib/content/types'
import { bodyTextClassName, cardTitleClassName } from '@/lib/ui/typography'

type AlumniStudentsProps = {
  students: AlumniStudent[]
}

const staticCardClassName =
  'h-full rounded-xl border border-border bg-surface-card p-6 shadow-subtle md:p-8'

const linkedCardClassName = cn(staticCardClassName, 'group block no-underline')

const linkedNameClassName =
  'decoration-brand decoration-2 underline-offset-[0.2em] no-underline group-hover:underline'

function StudentCardContent({
  student,
  linked = false,
}: {
  student: AlumniStudent
  linked?: boolean
}) {
  return (
    <>
      <h2
        className={cn(
          cardTitleClassName,
          'mb-3 text-lg text-foreground',
          linked && linkedNameClassName,
        )}
      >
        {student.name}
      </h2>
      {student.projects ? (
        <p className={cn(bodyTextClassName, 'whitespace-pre-line')}>{student.projects}</p>
      ) : null}
    </>
  )
}

export function AlumniStudents({ students }: AlumniStudentsProps) {
  if (!students.length) {
    return null
  }

  return (
    <section>
      <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {students.map((student, index) => (
          <li key={`${student.name}-${index}`}>
            {student.pageHref ? (
              <Link
                href={student.pageHref}
                className={linkedCardClassName}
                aria-label={`Profil de ${student.name}`}
              >
                <StudentCardContent student={student} linked />
              </Link>
            ) : (
              <article className={staticCardClassName}>
                <StudentCardContent student={student} />
              </article>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
