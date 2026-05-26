import { CmsRichText } from '@/components/cms/CmsRichText'
import { hasLexicalContent } from '@/lib/content'
import type { IntensiveCoursesCalendarSchoolYear } from '@/lib/content'
import { pageSectionTitleClassName } from '@/lib/ui/typography'

function formatSchoolYearTitle(title: string): string {
  return `Année scolaire ${title}`
}

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
          {year.title ? (
            <header className="mb-8 md:mb-10">
              <h2 className={pageSectionTitleClassName}>{formatSchoolYearTitle(year.title)}</h2>
            </header>
          ) : null}
          {year.content && hasLexicalContent(year.content) ? (
            <CmsRichText data={year.content} />
          ) : null}
        </section>
      ))}
    </div>
  )
}
