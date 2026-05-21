import {
  HeadingFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/** Rich text editor for static pages and student profiles (headings, lists, links). */
export const pageRichTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    HeadingFeature({ enabledHeadingSizes: ['h3'] }),
    UnorderedListFeature(),
    OrderedListFeature(),
    LinkFeature({
      enabledCollections: [],
    }),
  ],
})
