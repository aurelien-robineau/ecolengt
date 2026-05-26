import type { Field } from 'payload'

import { landingSectionGalleryFields } from '@/fields/landingSection'
import { cmsRichTextEditor } from './shared/cmsRichTextEditor'

export type SiteAccessFieldPrefix = 'addressAccess' | 'intensiveCoursesAccess'

const accessFieldConfig: Record<
  SiteAccessFieldPrefix,
  { directionsDescription: string; galleryDescription: string }
> = {
  addressAccess: {
    directionsDescription:
      'Indications optionnelles affichées sur la page Contact, sous le titre « Accès », avant les photos.',
    galleryDescription: 'Galerie affichée sur la page Contact, sous les instructions d’accès.',
  },
  intensiveCoursesAccess: {
    directionsDescription:
      'Indications optionnelles affichées dans la section Accès de la page Stages intensifs, sous l’adresse.',
    galleryDescription:
      'Galerie affichée sur la page Stages intensifs, sous la carte (2 photos par ligne).',
  },
}

export function siteAccessFields(prefix: SiteAccessFieldPrefix): Field[] {
  const directionsField = `${prefix}DirectionsContent`
  const galleryField = `${prefix}Gallery`
  const { directionsDescription, galleryDescription } = accessFieldConfig[prefix]

  return [
    {
      name: directionsField,
      type: 'richText',
      label: 'Instructions pour se rendre sur place',
      editor: cmsRichTextEditor,
      admin: {
        description: directionsDescription,
      },
    },
    {
      name: galleryField,
      type: 'array',
      label: 'Photos d’accès',
      labels: {
        singular: 'Photo',
        plural: 'Photos',
      },
      admin: {
        description: galleryDescription,
      },
      fields: landingSectionGalleryFields,
    },
  ]
}
