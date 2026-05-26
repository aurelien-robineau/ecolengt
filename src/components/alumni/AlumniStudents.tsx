import { PersonName } from '@/components/ui/PersonName'
import type { AlumniStudent } from '@/lib/content'

type AlumniStudentsProps = {
  students: AlumniStudent[]
}

export function AlumniStudents({ students }: AlumniStudentsProps) {
  if (!students.length) {
    return null
  }

  return (
    <section>
      <ul className="grid list-none gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-11">
        {students.map((student, index) => (
          <li key={`${student.name}-${index}`}>
            <h2 className="mb-2.5 text-[1.0625rem] leading-snug">
              <PersonName
                name={student.name}
                href={student.pageHref}
                className="text-[1.0625rem] leading-snug"
              />
            </h2>
            {student.projects ? (
              <p className="whitespace-pre-line text-[0.8125rem] leading-[1.75] text-foreground-muted">
                {student.projects}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
