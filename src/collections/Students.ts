import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { revalidateSite } from '@/lib/cms/revalidateSite'
import { slugifyName } from '@/lib/slugifyName'

export const Students: CollectionConfig = {
  slug: 'eleves',
  labels: {
    singular: 'Fiche élève',
    plural: 'Fiches élèves',
  },
  admin: {
    group: 'Site',
    useAsTitle: 'name',
    description:
      'Fiches élèves optionnelles. L’identifiant URL est généré à partir du nom (/eleves/…).',
    defaultColumns: ['name', 'slug', 'jobTitle', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [() => revalidateSite()],
    afterDelete: [() => revalidateSite()],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom',
      required: true,
    },
    slugField({
      useAsSlug: 'name',
      slugify: ({ valueToSlugify }) => slugifyName(String(valueToSlugify ?? '')),
      required: false,
      overrides: (field) => ({
        ...field,
        fields: field.fields.map((child) => {
          if ('name' in child && child.name === 'slug' && child.type === 'text') {
            return {
              ...child,
              label: 'Identifiant URL (page dédiée)',
              admin: {
                ...child.admin,
                description:
                  'Généré automatiquement à partir du nom (ex. Jean Dupont → jean-dupont). Videz le champ pour ne pas publier de page.',
              },
            }
          }

          return child
        }),
      }),
    }),
    {
      name: 'quote',
      type: 'textarea',
      label: 'Citation',
      admin: {
        description: 'Courte citation affichée sous le titre (optionnel).',
      },
    },
    {
      name: 'photos',
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
    {
      name: 'jobTitle',
      type: 'text',
      label: 'Activité / titre',
      admin: {
        description: 'Ex. : Batteur — groupe XYZ, professeur de batterie…',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Présentation',
      admin: {
        description: 'Un paragraphe par bloc, séparés par une ligne vide.',
      },
    },
  ],
}
