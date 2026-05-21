import {
  HeadingFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { GlobalConfig } from 'payload'

import { revalidateSite } from '@/lib/cms/revalidateSite'

export const LegalNoticePage: GlobalConfig = {
  slug: 'legal-notice-page',
  label: 'Mentions légales',
  admin: {
    group: 'Site',
    description: 'Texte affiché sur la page Mentions légales du site.',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [() => revalidateSite()],
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu',
      required: true,
      admin: {
        description: 'Rédigez le texte des mentions légales.',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h3'] }),
          UnorderedListFeature(),
          OrderedListFeature(),
          LinkFeature({
            enabledCollections: [],
          }),
        ],
      }),
    },
  ],
}
