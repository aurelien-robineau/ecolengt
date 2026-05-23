import { CmsRichText } from '@/components/cms/CmsRichText'
import { hasLexicalContent } from '@/lib/cms/hasLexicalContent'
import type { IntensiveCoursesCalendarSchoolYear } from '@/lib/cms/types'
import { pageSectionTitleClassName, sectionLabelClassName } from '@/lib/ui/typography'

type IntensiveCoursesCalendarSchoolYearsProps = {
  schoolYears: IntensiveCoursesCalendarSchoolYear[]
}

export function IntensiveCoursesCalendarSchoolYears({
  schoolYears,
}: IntensiveCoursesCalendarSchoolYearsProps) {
  const entries = schoolYears.filter(
    (year) => year.title || (year.content && hasLexicalContent(year.content)),
  )

  if (!entries.length) {
    return null
  }

  return (
    <div className="max-w-2xl divide-y divide-border border-y border-border">
      {entries.map((year, index) => (
        <section key={`${year.title}-${index}`} className="py-12 md:py-16">
          {year.title ?
            <header className="mb-8 md:mb-10">
              <p className={`mb-3 ${sectionLabelClassName}`}>Année scolaire</p>
              <h2 className={pageSectionTitleClassName}>{year.title}</h2>
            </header>
          : null}
          {year.content && hasLexicalContent(year.content) ?
            <CmsRichText data={year.content} />
          : null}
        </section>
      ))}
    </div>
  )
}
