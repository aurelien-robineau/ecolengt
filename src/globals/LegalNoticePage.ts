import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { cmsRichTextEditor } from '@/lib/cms/cmsRichTextEditor'
import { revalidateSite } from '@/lib/cms/revalidateSite'

export const LegalNoticePage: GlobalConfig = {
  slug: 'legal-notice-page',
  label: 'Mentions Légales & Politique de Confidentialité',
  admin: {
    group: adminGroups.pagesOther,
    description:
      'Texte affiché sur la page Mentions Légales & Politique de Confidentialité du site.',
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
        description:
          'Rédigez le texte des mentions légales et de la politique de confidentialité. Référence : src/lib/cms/defaultLegalNoticeContent.ts',
      },
      editor: cmsRichTextEditor,
    },
  ],
}
