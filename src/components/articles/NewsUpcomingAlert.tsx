import { CmsRichText } from '@/components/cms/CmsRichText'
import { hasLexicalContent } from '@/lib/content'
import type { NewsPageData } from '@/lib/content/types'

type NewsUpcomingAlertProps = {
  alert: NewsPageData['upcomingEventsAlert']
}

export function NewsUpcomingAlert({ alert }: NewsUpcomingAlertProps) {
  if (!alert || !hasLexicalContent(alert)) {
    return null
  }

  return (
    <aside
      className="callout-surface bleed-x-sm mb-12 bg-brand-dim card-pad-lg"
      aria-label="Événements à venir"
    >
      <CmsRichText data={alert} className="w-full max-w-none" />
    </aside>
  )
}
