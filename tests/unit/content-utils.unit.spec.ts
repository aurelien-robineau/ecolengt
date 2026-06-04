import { describe, expect, it } from 'vitest'

import { articlePageHref } from '@/lib/content/utils/articlePageHref'
import { formatFoundedSince, formatPostalCityLine } from '@/lib/content/utils/formatAddress'
import { formatPhoneHref } from '@/lib/content/utils/formatPhoneHref'
import { parseMapCoordinate } from '@/lib/content/utils/parseMapCoordinate'
import { resolveListedPerson, studentPageHref } from '@/lib/content/utils/studentPageHref'
import { routes } from '@/config/routes'

describe('formatPostalCityLine', () => {
  it('joins postal code and city', () => {
    expect(formatPostalCityLine('06000', 'Nice')).toBe('06000 Nice')
  })

  it('trims parts and omits empty segments', () => {
    expect(formatPostalCityLine(' 06000 ', '')).toBe('06000')
    expect(formatPostalCityLine('', 'Nice')).toBe('Nice')
  })
})

describe('formatFoundedSince', () => {
  it('returns empty string when year is null', () => {
    expect(formatFoundedSince(null)).toBe('')
  })

  it('formats a founded year label', () => {
    expect(formatFoundedSince(1998)).toBe('Depuis 1998')
  })
})

describe('formatPhoneHref', () => {
  it('normalizes French numbers starting with 0', () => {
    expect(formatPhoneHref('04 93 00 00 00')).toBe('tel:+33493000000')
  })

  it('keeps international numbers with plus prefix', () => {
    expect(formatPhoneHref('+33 6 12 34 56 78')).toBe('tel:+33612345678')
  })
})

describe('parseMapCoordinate', () => {
  it('returns null for invalid values', () => {
    expect(parseMapCoordinate(undefined)).toBeNull()
    expect(parseMapCoordinate(Number.NaN)).toBeNull()
  })

  it('returns finite numbers', () => {
    expect(parseMapCoordinate(43.7102)).toBe(43.7102)
  })
})

describe('studentPageHref', () => {
  it('builds student profile URLs from slug', () => {
    expect(studentPageHref('jean-dupont')).toBe(`${routes.students}/jean-dupont`)
  })

  it('returns null for empty slug', () => {
    expect(studentPageHref('')).toBeNull()
    expect(studentPageHref('  ')).toBeNull()
  })
})

describe('articlePageHref', () => {
  it('builds article URLs from slug', () => {
    expect(articlePageHref('concert-2024')).toBe(`${routes.news}/concert-2024`)
  })
})

describe('resolveListedPerson', () => {
  it('uses fallback name when student is missing or unresolved', () => {
    expect(resolveListedPerson(null, 'Nom affiché')).toEqual({
      name: 'Nom affiché',
      pageHref: null,
    })
    expect(resolveListedPerson('student-id', 'Nom affiché')).toEqual({
      name: 'Nom affiché',
      pageHref: null,
    })
  })

  it('prefers student name and href when populated', () => {
    expect(
      resolveListedPerson(
        { id: '1', name: 'Marie', slug: 'marie', updatedAt: '', createdAt: '' },
        'Fallback',
      ),
    ).toEqual({
      name: 'Marie',
      pageHref: `${routes.students}/marie`,
    })
  })
})
