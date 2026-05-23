import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { pageRichTextEditor } from '@/lib/cms/pageRichTextEditor'
import { revalidateSite } from '@/lib/cms/revalidateSite'

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
      editor: pageRichTextEditor,
      admin: {
        description: 'Texte affiché sous le titre de la page Contact.',
      },
    },
  ],
}
