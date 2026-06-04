import type { Metadata } from 'next'

import { MetronomeFeature } from '@/components/metronome/MetronomeFeature'
import { MetronomeForm } from '@/components/metronome/MetronomeForm'
import { routes } from '@/config/routes'
import { getSiteSettings } from '@/lib/content'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { seoCopy } from '@/lib/seo/copy'

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings()
  const { documentTitle, title, description } = seoCopy.leTrainMetronome(site)

  return buildPageMetadata({
    site,
    pathname: routes.leTrainMetronome,
    pageTitle: documentTitle,
    seoTitle: title,
    description,
  })
}

export default function LeTrainMetronomePage() {
  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <MetronomeFeature className="mx-auto flex max-w-(--width-content) flex-col items-center px-4 md:px-6">
        <MetronomeForm />
      </MetronomeFeature>
    </section>
  )
}
