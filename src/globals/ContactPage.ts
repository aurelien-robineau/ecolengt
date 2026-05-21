import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { pageRichTextEditor } from '@/lib/cms/pageRichTextEditor'
import { revalidateSite } from '@/lib/cms/revalidateSite'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Page Contact',
  admin: {
    group: adminGroups.pages,
    description: 'Contenu affiché sur la page Contact : texte d’introduction, photos d’accès et carte Google Maps.',
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
          description: 'Texte affiché sous le titre de la page Contact.',
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
          label: 'Photos d’accès',
          description: 'Galerie sous la carte, sur la page Contact (2 photos par ligne).',
          fields: [
            {
              name: 'accessGallery',
              type: 'array',
              label: 'Photos',
              labels: {
                singular: 'Photo',
                plural: 'Photos',
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
        {
          label: 'Carte Google Maps',
          description: 'Carte affichée à côté de l’adresse sur la page Contact.',
          fields: [
            {
              name: 'mapsEmbed',
              type: 'textarea',
              label: 'Code d’intégration',
              admin: {
                description:
                  'Collez le code iframe fourni par Google Maps (« Partager » → « Intégrer une carte »), ou uniquement l’URL src du iframe.',
              },
            },
          ],
        },
      ],
    },
  ],
}
