import {
  HeadingFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { revalidateSite } from '@/lib/cms/revalidateSite'

export const TomTomPage: GlobalConfig = {
  slug: 'tom-tom-page',
  label: 'Tom Tom',
  admin: {
    group: adminGroups.pages,
    description: 'Contenu de la page Tom Tom (association).',
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
        description: 'Texte complet de la page Tom Tom.',
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
