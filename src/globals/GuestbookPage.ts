import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { pageRichTextEditor } from '@/lib/cms/pageRichTextEditor'
import { revalidateSite } from '@/lib/cms/revalidateSite'

export const GuestbookPage: GlobalConfig = {
  slug: 'guestbook-page',
  label: 'Livre d’or',
  admin: {
    group: adminGroups.pagesGeneral,
    description: 'Introduction et témoignages affichés sur la page Livre d’or.',
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
      type: 'tabs',
      tabs: [
        {
          label: 'Introduction',
          description: 'Texte affiché en tête de page, avant les témoignages.',
          fields: [
            {
              name: 'introduction',
              type: 'richText',
              label: 'Introduction',
              editor: pageRichTextEditor,
            },
          ],
        },
        {
          label: 'Témoignages',
          description: 'Liste des messages laissés par les élèves et leurs familles.',
          fields: [
            {
              name: 'testimonials',
              type: 'array',
              label: 'Témoignages',
              labels: {
                singular: 'Témoignage',
                plural: 'Témoignages',
              },
              fields: [
                {
                  name: 'student',
                  type: 'relationship',
                  relationTo: 'eleves',
                  label: 'Fiche élève',
                  admin: {
                    description:
                      'Optionnel. Si la fiche a une page publique, le nom de l’auteur devient un lien.',
                  },
                },
                {
                  name: 'content',
                  type: 'richText',
                  label: 'Texte',
                  required: true,
                  editor: pageRichTextEditor,
                },
                {
                  name: 'author',
                  type: 'text',
                  label: 'Auteur',
                  required: true,
                  admin: {
                    description: 'Nom affiché sous le témoignage.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
