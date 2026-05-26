import { describe, expect, it } from 'vitest'

import { mapRichText } from '@/lib/content/mappers/shared/mapRichText'
import { hasLexicalContent } from '@/lib/content/richtext/hasLexicalContent'
import { buildLexicalContent } from '@/lib/content/richtext/buildLexicalContent'

import { emptyLexicalContent, paragraphContent } from './helpers/lexical'

describe('hasLexicalContent', () => {
  it('returns false for null, undefined, and strings', () => {
    expect(hasLexicalContent(null)).toBe(false)
    expect(hasLexicalContent(undefined)).toBe(false)
    expect(hasLexicalContent('legacy')).toBe(false)
  })

  it('returns false for empty or whitespace-only paragraphs', () => {
    expect(hasLexicalContent(emptyLexicalContent())).toBe(false)
    expect(hasLexicalContent(paragraphContent('   '))).toBe(false)
  })

  it('returns true for non-empty paragraph text', () => {
    expect(hasLexicalContent(paragraphContent('Bonjour'))).toBe(true)
  })

  it('returns true for heading blocks without paragraph text', () => {
    const content = buildLexicalContent([{ type: 'heading', text: 'Titre' }])
    expect(hasLexicalContent(content)).toBe(true)
  })
})

describe('mapRichText', () => {
  it('returns null when content is empty', () => {
    expect(mapRichText(null)).toBeNull()
    expect(mapRichText(emptyLexicalContent())).toBeNull()
  })

  it('returns the same object when content is present', () => {
    const content = paragraphContent('Texte')
    expect(mapRichText(content)).toBe(content)
  })
})
