import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { cmsRichTextEditor } from '@/lib/cms/cmsRichTextEditor'
import { revalidateSite } from '@/lib/cms/revalidateSite'

export const IntensiveCoursesPage: GlobalConfig = {
  slug: 'intensive-courses-page',
  label: 'Stages intensifs',
  admin: {
    group: adminGroups.pagesStages,
    description:
      'Introduction, galerie et encadrés de la page. L’adresse et la section Accès sont gérées dans Paramètres du site.',
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
      name: 'gallery',
      type: 'array',
      label: 'Galerie photos',
      labels: {
        singular: 'Photo',
        plural: 'Photos',
      },
      admin: {
        description: 'Galerie sous l’introduction (grille responsive, 3 colonnes).',
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
  ],
}
