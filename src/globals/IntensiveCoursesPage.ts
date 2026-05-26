import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/fields'
import { cmsRichTextEditor } from '@/fields'
import { revalidateSite } from '@/lib/content/revalidateSite'

export const IntensiveCoursesPage: GlobalConfig = {
  slug: 'intensive-courses-page',
  label: 'Stages intensifs',
  admin: {
    group: adminGroups.pagesStages,
    description:
      'Introduction, encadrés et galerie de la page. L’adresse et la section Accès sont gérées dans Paramètres du site.',
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
        description: 'Texte affiché sous le titre de la page.',
      },
    },
    {
      name: 'blocks',
      type: 'array',
      label: 'Encadrés',
      labels: {
        singular: 'Encadré',
        plural: 'Encadrés',
      },
      admin: {
        description:
          'Blocs titre + texte affichés deux par ligne ; un bloc seul sur la dernière ligne prend toute la largeur.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Texte',
          editor: cmsRichTextEditor,
        },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galerie photos',
      labels: {
        singular: 'Photo',
        plural: 'Photos',
      },
      admin: {
        description: 'Galerie sous les encadrés (grille responsive, 3 colonnes).',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
      ],
    },
  ],
}
