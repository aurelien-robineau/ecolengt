import { CmsRichText } from '@/components/cms/CmsRichText'
import { hasLexicalContent } from '@/lib/cms/hasLexicalContent'
import type { NewsPageData } from '@/lib/cms/types'

type NewsUpcomingAlertProps = {
  alert: NewsPageData['upcomingEventsAlert']
}

export function NewsUpcomingAlert({ alert }: NewsUpcomingAlertProps) {
  if (!alert || !hasLexicalContent(alert)) {
    return null
  }

  return (
    <aside
      className="mb-12 border border-brand-border bg-brand-dim p-8 md:p-10"
      aria-label="Événements à venir"
    >
      <CmsRichText data={alert} className="w-full max-w-none" />
    </aside>
  )
}
