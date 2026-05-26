import { JsonLd } from '@/components/seo/JsonLd'
import { getSiteSettings } from '@/lib/content'
import { buildSiteJsonLd } from '@/lib/seo/jsonLd'

/** Global structured data for search engines and LLM crawlers. */
export async function SiteStructuredData() {
  const site = await getSiteSettings()

  return <JsonLd data={buildSiteJsonLd(site)} />
}
