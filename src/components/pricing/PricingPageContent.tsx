import { CmsRichText } from '@/components/cms/CmsRichText'
import { ScrollToHash } from '@/components/pricing/ScrollToHash'
import { pricingWorkshopsSectionId } from '@/config/pricingSections'
import { hasLexicalContent } from '@/lib/cms/hasLexicalContent'
import type { PricingPageData } from '@/lib/cms/types'
import { pageSectionTitleClassName } from '@/lib/ui/typography'

type PricingPageContentProps = {
  pricing: PricingPageData
}

export function PricingPageContent({ pricing }: PricingPageContentProps) {
  const hasClasses = pricing.classes && hasLexicalContent(pricing.classes)
  const hasWorkshops = pricing.workshops && hasLexicalContent(pricing.workshops)

  return (
    <>
      <ScrollToHash />

      {hasClasses ?
        <section className="mb-16 scroll-mt-28">
          <h2 className={`mb-8 ${pageSectionTitleClassName}`}>Cours</h2>
          <div className="max-w-2xl">
            <CmsRichText data={pricing.classes} />
          </div>
        </section>
      : null}

      {hasWorkshops ?
        <section id={pricingWorkshopsSectionId} className="scroll-mt-28">
          <h2 className={`mb-8 ${pageSectionTitleClassName}`}>Stages intensifs</h2>
          <div className="max-w-2xl">
            <CmsRichText data={pricing.workshops} />
          </div>
        </section>
      : null}
    </>
  )
}
