import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { pageRichTextEditor } from '@/lib/cms/pageRichTextEditor'
import { revalidateSite } from '@/lib/cms/revalidateSite'

export const LegalNoticePage: GlobalConfig = {
  slug: 'legal-notice-page',
  label: 'Mentions légales',
  admin: {
    group: adminGroups.pagesOther,
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
      editor: pageRichTextEditor,
    },
  ],
}
