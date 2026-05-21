import {
  HeadingFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/** Rich text editor for article body (headings, lists, links, inline images). */
export const articleRichTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
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
