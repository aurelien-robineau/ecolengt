import type { Field } from 'payload'

import { pageRichTextEditor } from '@/lib/cms/pageRichTextEditor'
import { buttonUrlFieldDescription } from '@/lib/cms/urlFieldDescription'

export const landingSectionGalleryFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Image',
    required: true,
  },
]

export const landingSectionFields: Field[] = [
  {
    name: 'surtitle',
    type: 'text',
    label: 'Sur-titre',
    required: true,
    admin: {
      description: 'Court texte en majuscules affiché au-dessus du titre de section.',
    },
  },
  {
    name: 'title',
    type: 'text',
    label: 'Titre de section',
    required: true,
  },
  {
    name: 'description',
    type: 'richText',
    label: 'Description',
    editor: pageRichTextEditor,
    admin: {
      description: 'Texte d’introduction optionnel affiché sous le titre.',
    },
  },
  {
    name: 'items',
    type: 'array',
    label: 'Encadrés',
    labels: {
      singular: 'Encadré',
      plural: 'Encadrés',
    },
    admin: {
      description: 'Blocs titre + texte affichés en grille (deux colonnes sur grand écran).',
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Titre',
        required: true,
      },
      {
        name: 'description',
        type: 'richText',
        label: 'Texte',
        editor: pageRichTextEditor,
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Encadré mis en avant',
    admin: {
      description:
        'Bloc optionnel sur fond jaune clair. Laisser le titre vide pour ne pas l’afficher.',
    },
    fields: [
      {
        name: 'highlight',
        type: 'group',
        label: 'Encadré mis en avant',
        fields: [
          {
            name: 'title',
            type: 'text',
            label: 'Titre',
          },
          {
            name: 'description',
            type: 'richText',
            label: 'Texte',
            editor: pageRichTextEditor,
          },
          {
            name: 'buttonLabel',
            type: 'text',
            label: 'Texte du bouton',
            admin: {
              description: 'Libellé du bouton optionnel en bas de l’encadré.',
            },
          },
          {
            name: 'buttonHref',
            type: 'text',
            label: 'URL du bouton',
            admin: {
              description: buttonUrlFieldDescription,
            },
          },
        ],
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
      description: 'Galerie optionnelle en bas de section (grille responsive, 3 colonnes).',
    },
    fields: landingSectionGalleryFields,
  },
]
