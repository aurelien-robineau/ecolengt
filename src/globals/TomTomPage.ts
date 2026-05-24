import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { urlFieldDescription } from '@/lib/cms/urlFieldDescription'
import { cmsRichTextEditor } from '@/lib/cms/cmsRichTextEditor'
import { revalidateSite } from '@/lib/cms/revalidateSite'

export const TomTomPage: GlobalConfig = {
  slug: 'tom-tom-page',
  label: 'Tom Tom',
  admin: {
    group: adminGroups.pagesGeneral,
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
      name: 'callout',
      type: 'group',
      label: 'Bouton sous le titre',
      admin: {
        description:
          'Bouton affiché juste sous le titre de la page. Laisser vide pour ne rien afficher.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Texte du bouton',
        },
        {
          name: 'href',
          type: 'text',
          label: 'URL du bouton',
          admin: {
            description: urlFieldDescription,
          },
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu',
      required: true,
      admin: {
        description: 'Texte complet de la page Tom Tom.',
      },
      editor: cmsRichTextEditor,
    },
  ],
}
