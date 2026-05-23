import { JsonLd } from '@/components/seo/JsonLd'
import { getSiteContent } from '@/lib/cms/getSiteContent'
import { buildSiteJsonLd } from '@/lib/seo/jsonLd'

/** Global structured data for search engines and LLM crawlers. */
export async function SiteStructuredData() {
  const { site } = await getSiteContent()

  return <JsonLd data={buildSiteJsonLd(site)} />
}
