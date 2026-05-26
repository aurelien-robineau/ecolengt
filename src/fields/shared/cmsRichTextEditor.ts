import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  ChecklistFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/** Lexical features shared by every CMS rich text field. */
export const cmsRichTextFeatures = [
  ParagraphFeature(),
  BoldFeature(),
  ItalicFeature(),
  UnderlineFeature(),
  StrikethroughFeature(),
  HeadingFeature({ enabledHeadingSizes: ['h3'] }),
  BlockquoteFeature(),
  AlignFeature(),
  IndentFeature(),
  UnorderedListFeature(),
  OrderedListFeature(),
  ChecklistFeature(),
  LinkFeature({
    enabledCollections: [],
  }),
  HorizontalRuleFeature(),
  EXPERIMENTAL_TableFeature(),
  UploadFeature({
    collections: {
      media: {
        fields: [],
      },
    },
  }),
  InlineToolbarFeature(),
  FixedToolbarFeature(),
]

/** Rich text editor for all CMS rich text fields. */
export const cmsRichTextEditor = lexicalEditor({
  features: () => cmsRichTextFeatures,
})
