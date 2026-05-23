import type { Field } from 'payload'

import { landingSectionGalleryFields } from '@/lib/cms/landingSectionFields'
import { pageRichTextEditor } from '@/lib/cms/pageRichTextEditor'

export const siteMainAccessFields: Field[] = [
  {
    name: 'addressAccessDirectionsContent',
    type: 'richText',
    label: 'Instructions pour se rendre sur place',
    editor: pageRichTextEditor,
    admin: {
      description:
        'Indications optionnelles affichées sur la page Contact, sous le titre « Accès », avant les photos.',
    },
  },
  {
    name: 'addressAccessGallery',
    type: 'array',
    label: 'Photos d’accès',
    labels: {
      singular: 'Photo',
      plural: 'Photos',
    },
    admin: {
      description: 'Galerie affichée sur la page Contact, sous les instructions d’accès.',
    },
    fields: landingSectionGalleryFields,
  },
]
