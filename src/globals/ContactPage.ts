import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/fields'
import { cmsRichTextEditor } from '@/fields'
import { revalidateSite } from '@/lib/content/revalidateSite'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact',
  admin: {
    group: adminGroups.pagesGeneral,
    description:
      'Texte d’introduction de la page Contact. L’adresse, la carte, les instructions et les photos d’accès sont gérées dans Paramètres du site.',
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
      name: 'introContent',
      type: 'richText',
      label: 'Texte d’introduction',
      editor: cmsRichTextEditor,
      admin: {
        description: 'Texte affiché sous le titre de la page Contact.',
      },
    },
  ],
}
