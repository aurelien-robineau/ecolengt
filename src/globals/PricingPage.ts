import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/fields'
import { cmsRichTextEditor } from '@/fields'
import { revalidateSite } from '@/lib/content/revalidateSite'

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
      editor: cmsRichTextEditor,
      admin: {
        description: 'Contenu de la section Cours sur la page Tarifs.',
      },
    },
    {
      name: 'intensiveCoursesContent',
      type: 'richText',
      label: 'Tarifs — Stages intensifs',
      editor: cmsRichTextEditor,
      admin: {
        description: 'Contenu de la section Stages intensifs sur la page Tarifs.',
      },
    },
  ],
}
