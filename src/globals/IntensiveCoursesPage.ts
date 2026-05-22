import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { pageRichTextEditor } from '@/lib/cms/pageRichTextEditor'
import { revalidateSite } from '@/lib/cms/revalidateSite'

export const IntensiveCoursesPage: GlobalConfig = {
  slug: 'intensive-courses-page',
  label: 'Stages intensifs',
  admin: {
    group: adminGroups.pages,
    description: 'Contenu de la page Stages intensifs : introduction, galerie, encadrés et accès.',
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
        description: 'Galerie sous l’introduction (disposition mosaïque, 3 colonnes).',
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
          editor: pageRichTextEditor,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Accès',
      admin: {
        description:
          'Adresse propre à cette page, instructions d’accès, carte Google Maps et galerie photos.',
      },
      fields: [
        {
          name: 'accessAddressStreet',
          type: 'text',
          label: 'Rue et numéro',
        },
        {
          name: 'accessAddressCity',
          type: 'text',
          label: 'Code postal et ville',
        },
        {
          name: 'accessMapsUrl',
          type: 'text',
          label: 'Lien Google Maps',
          admin: {
            description:
              'URL de la fiche Google Maps (bouton « Partager » → « Lien »). Utilisée lorsque l’on clique sur l’adresse.',
          },
        },
        {
          name: 'accessMapsEmbed',
          type: 'textarea',
          label: 'Code d’intégration Google Maps',
          admin: {
            description:
              'Collez le code iframe fourni par Google Maps (« Partager » → « Intégrer une carte »), ou uniquement l’URL src du iframe.',
          },
        },
        {
          name: 'accessDirectionsContent',
          type: 'richText',
          label: 'Instructions pour se rendre sur place',
          editor: pageRichTextEditor,
          admin: {
            description:
              'Indications optionnelles (accès, parking, etc.) affichées dans l’encadré adresse, sous l’adresse postale.',
          },
        },
        {
          name: 'accessGallery',
          type: 'array',
          label: 'Photos d’accès',
          labels: {
            singular: 'Photo',
            plural: 'Photos',
          },
          admin: {
            description: 'Galerie sous la carte (2 photos par ligne).',
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
    },
  ],
}
