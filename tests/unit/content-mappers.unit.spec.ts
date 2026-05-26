import { describe, expect, it } from 'vitest'

import { defaultContactPage, defaultLegalNoticePage, defaultNewsPage } from '@/lib/content/defaults'
import { mapArticleListItem } from '@/lib/content/mappers/collections/mapArticle'
import { mapContactPage } from '@/lib/content/mappers/pages/mapContactPage'
import { mapGuestbookPage } from '@/lib/content/mappers/pages/mapGuestbookPage'
import { mapLegalNoticePage } from '@/lib/content/mappers/pages/mapLegalNoticePage'
import { mapNewsPage } from '@/lib/content/mappers/pages/mapNewsPage'
import { mapSiteAddress } from '@/lib/content/mappers/shared/mapSiteAddress'
import { mapMedia } from '@/lib/content/mappers/shared/mapMedia'
import type { Article } from '@/payload-types'
import { routes } from '@/config/routes'

import { paragraphContent } from './helpers/lexical'

describe('mapLegalNoticePage', () => {
  it('returns defaults when CMS data is missing', () => {
    expect(mapLegalNoticePage(null)).toEqual(defaultLegalNoticePage)
    expect(mapLegalNoticePage(undefined)).toEqual(defaultLegalNoticePage)
  })

  it('maps content and lastUpdatedAt', () => {
    const content = paragraphContent('Mentions légales')
    const lastUpdatedAt = '2024-06-01T12:00:00.000Z'

    expect(
      mapLegalNoticePage({
        content,
        lastUpdatedAt,
      } as Parameters<typeof mapLegalNoticePage>[0]),
    ).toEqual({
      content,
      lastUpdatedAt,
    })
  })
})

describe('mapContactPage', () => {
  it('returns defaults when CMS data is missing', () => {
    expect(mapContactPage(null)).toEqual(defaultContactPage)
  })

  it('maps intro rich text', () => {
    const intro = paragraphContent('Contactez-nous')
    expect(
      mapContactPage({
        introContent: intro,
      } as Parameters<typeof mapContactPage>[0]),
    ).toEqual({ intro })
  })
})

describe('mapNewsPage', () => {
  it('returns defaults when CMS data is missing', () => {
    expect(mapNewsPage(null)).toEqual(defaultNewsPage)
  })

  it('maps upcoming events alert', () => {
    const upcomingEventsAlert = paragraphContent('Prochain concert')
    expect(
      mapNewsPage({
        upcomingEventsAlert,
      } as Parameters<typeof mapNewsPage>[0]),
    ).toEqual({ upcomingEventsAlert })
  })
})

describe('mapSiteAddress', () => {
  it('trims fields and parses coordinates', () => {
    expect(
      mapSiteAddress({
        street: ' 1 rue Test ',
        streetLine2: null,
        postalCode: '06000',
        city: ' Nice ',
        mapsUrl: ' https://maps.example ',
        mapLatitude: 43.7,
        mapLongitude: 7.25,
      }),
    ).toEqual({
      street: '1 rue Test',
      streetLine2: '',
      postalCode: '06000',
      city: 'Nice',
      mapsUrl: 'https://maps.example',
      mapLatitude: 43.7,
      mapLongitude: 7.25,
    })
  })
})

describe('mapGuestbookPage', () => {
  it('filters testimonials without author or content', () => {
    const content = paragraphContent('Merci')
    const result = mapGuestbookPage({
      introduction: null,
      testimonials: [
        {
          author: 'Alice',
          content,
          student: { id: 1, slug: 'alice', name: 'Alice', updatedAt: '', createdAt: '' },
        },
        { author: '', content, student: null },
        { author: 'Bob', content: null, student: null },
      ],
    } as Parameters<typeof mapGuestbookPage>[0])

    expect(result.testimonials).toHaveLength(1)
    expect(result.testimonials[0]).toMatchObject({
      author: 'Alice',
      pageHref: `${routes.students}/alice`,
    })
  })
})

describe('mapMedia', () => {
  it('returns null for missing or unresolved media', () => {
    expect(mapMedia(null, 'Alt')).toBeNull()
    expect(mapMedia('media-id', 'Alt')).toBeNull()
    expect(mapMedia({ url: null } as Parameters<typeof mapMedia>[0], 'Alt')).toBeNull()
  })

  it('maps relative media URLs and alt text', () => {
    expect(
      mapMedia(
        {
          url: '/api/media/file/photo.jpg',
          alt: '  Photo batterie ',
          width: 800,
          height: 600,
        } as Parameters<typeof mapMedia>[0],
        'Fallback',
      ),
    ).toEqual({
      src: '/api/media/file/photo.jpg',
      alt: 'Photo batterie',
      width: 800,
      height: 600,
    })
  })
})

describe('mapArticleListItem', () => {
  it('maps list fields and article href', () => {
    const doc = {
      slug: 'concert',
      title: 'Concert',
      shortDescription: 'Résumé',
      image: {
        url: '/api/media/file/cover.jpg',
        alt: 'Couverture',
      },
    } as Article

    expect(mapArticleListItem(doc)).toEqual({
      slug: 'concert',
      title: 'Concert',
      shortDescription: 'Résumé',
      image: {
        src: '/api/media/file/cover.jpg',
        alt: 'Couverture',
        width: undefined,
        height: undefined,
      },
      pageHref: `${routes.news}/concert`,
    })
  })
})
