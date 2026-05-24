import {
  EXPERIMENTAL_TableFeature,
  HeadingFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/** Rich text editor for static pages and student profiles (headings, lists, links, tables). */
export const pageRichTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    EXPERIMENTAL_TableFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h3'] }),
    UnorderedListFeature(),
    OrderedListFeature(),
    LinkFeature({
      enabledCollections: [],
    }),
  ],
})
