import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { pageRichTextEditor } from '@/lib/cms/pageRichTextEditor'
import { revalidateSite } from '@/lib/cms/revalidateSite'

export const PricingPage: GlobalConfig = {
  slug: 'pricing-page',
  label: 'Tarifs',
  admin: {
    group: adminGroups.pagesGeneral,
    description: 'Tarifs des cours et des stages intensifs.',
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
      name: 'classesContent',
      type: 'richText',
      label: 'Tarifs — Cours',
      editor: pageRichTextEditor,
      admin: {
        description: 'Contenu de la section Cours sur la page Tarifs.',
      },
    },
    {
      name: 'workshopsContent',
      type: 'richText',
      label: 'Tarifs — Stages intensifs',
      editor: pageRichTextEditor,
      admin: {
        description: 'Contenu de la section Stages intensifs sur la page Tarifs.',
      },
    },
  ],
}
