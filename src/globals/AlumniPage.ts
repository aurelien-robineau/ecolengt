import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { pageRichTextEditor } from '@/lib/cms/pageRichTextEditor'
import { revalidateSite } from '@/lib/cms/revalidateSite'

export const AlumniPage: GlobalConfig = {
  slug: 'alumni-page',
  label: 'Anciens élèves',
  admin: {
    group: adminGroups.pagesGeneral,
    description: 'Texte d’introduction et liste des anciens élèves affichés sur la page dédiée.',
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
          fields: [
            {
              name: 'introContent',
              type: 'richText',
              label: 'Texte d’introduction',
              editor: pageRichTextEditor,
            },
          ],
        },
        {
          label: 'Anciens élèves',
          fields: [
            {
              name: 'alumniList',
              type: 'array',
              label: 'Élèves',
              labels: {
                singular: 'Élève',
                plural: 'Élèves',
              },
              fields: [
                {
                  name: 'student',
                  type: 'relationship',
                  relationTo: 'eleves',
                  label: 'Fiche élève',
                  admin: {
                    description:
                      'Liez une fiche Élève pour activer le lien vers la page dédiée (/eleves/…).',
                  },
                },
                {
                  name: 'name',
                  type: 'text',
                  label: 'Nom affiché',
                  admin: {
                    description:
                      'Utilisé si aucune fiche n’est liée, ou si le nom doit différer de la fiche.',
                    condition: (_, siblingData) => !siblingData?.student,
                  },
                },
                {
                  name: 'projects',
                  type: 'array',
                  label: 'Projets, groupes, concerts…',
                  labels: {
                    singular: 'Élément',
                    plural: 'Éléments',
                  },
                  admin: {
                    description:
                      'Liste des projets, groupes ou activités affichés pour cet ancien élève.',
                  },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Libellé',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
