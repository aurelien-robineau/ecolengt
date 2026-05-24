import {
  EXPERIMENTAL_TableFeature,
  HeadingFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/** Rich text editor for article body (headings, lists, links, tables, inline images). */
export const articleRichTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    EXPERIMENTAL_TableFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h3'] }),
    UnorderedListFeature(),
    OrderedListFeature(),
    LinkFeature({
      enabledCollections: [],
    }),
    UploadFeature({
      collections: {
        media: {
          fields: [],
        },
      },
    }),
  ],
})
