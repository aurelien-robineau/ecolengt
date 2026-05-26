import type { CollectionConfig } from 'payload'

import { adminGroups } from '@/fields'
import { cmsRichTextEditor } from '@/fields'
import { hiddenSlugField } from '@/fields/hiddenSlug'
import { revalidateSite } from '@/lib/content/revalidateSite'
import { slugifyName } from '@/lib/slugifyName'

export const Students: CollectionConfig = {
  slug: 'eleves',
  labels: {
    singular: 'Fiche élève',
    plural: 'Fiches élèves',
  },
  admin: {
    group: adminGroups.content,
    useAsTitle: 'name',
    description: 'Fiches élèves. Une page publique est créée automatiquement à partir du nom.',
    defaultColumns: ['name', 'jobTitle', 'updatedAt'],
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
      type: 'tabs',
      tabs: [
        {
          label: 'Identité',
          description: 'Nom et activité affichés en tête de la fiche.',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nom',
              required: true,
            },
            hiddenSlugField({
              useAsSlug: 'name',
              slugify: ({ valueToSlugify }) => slugifyName(String(valueToSlugify ?? '')),
              required: false,
            }),
            {
              name: 'jobTitle',
              type: 'text',
              label: 'Activité / titre',
              admin: {
                description: 'Activité ou titre affiché sous le nom sur la page publique.',
              },
            },
          ],
        },
        {
          label: 'Contenu de la page',
          description: 'Citation, galerie et texte affichés sur la page publique de l’élève.',
          fields: [
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
              name: 'description',
              type: 'richText',
              label: 'Présentation',
              admin: {
                description: 'Texte de présentation affiché sur la page publique de l’élève.',
              },
              editor: cmsRichTextEditor,
            },
          ],
        },
      ],
    },
  ],
}
