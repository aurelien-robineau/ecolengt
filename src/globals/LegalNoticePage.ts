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
    beforeChange: [
      ({ data, originalDoc }) => {
        const contentChanged = JSON.stringify(data.content) !== JSON.stringify(originalDoc?.content)

        // For Globals, infer create vs update from whether we have an existing doc.
        if (!originalDoc || contentChanged) {
          data.lastUpdatedAt = new Date().toISOString()
        }

        return data
      },
    ],
    afterChange: [() => revalidateSite()],
  },
  fields: [
    {
      name: 'lastUpdatedAt',
      type: 'date',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu',
      required: true,
      admin: {
        description: 'Rédigez le texte des mentions légales et de la politique de confidentialité.',
      },
      editor: cmsRichTextEditor,
    },
  ],
}
