import { PersonName } from '@/components/ui/PersonName'
import type { AlumniStudent } from '@/lib/content/types'
import { bodyTextClassName, cardTitleClassName } from '@/lib/ui/typography'
import { cn } from '@/lib/cn'

type AlumniStudentsProps = {
  students: AlumniStudent[]
}

export function AlumniStudents({ students }: AlumniStudentsProps) {
  if (!students.length) {
    return null
  }

  return (
    <section>
      <ul className="grid list-none gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {students.map((student, index) => (
          <li key={`${student.name}-${index}`}>
            <h2 className={cn(cardTitleClassName, 'mb-3 text-lg')}>
              <PersonName
                name={student.name}
                href={student.pageHref}
                className="text-lg leading-snug"
              />
            </h2>
            {student.projects ? (
              <p className={cn(bodyTextClassName, 'whitespace-pre-line')}>{student.projects}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
