import type { CollectionConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Média',
    plural: 'Médias',
  },
  admin: {
    group: adminGroups.content,
    description: 'Photos et images utilisées sur le site.',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Description de l’image',
      required: true,
      admin: {
        description:
          'Courte description du contenu de l’image, pour l’accessibilité.',
      },
    },
  ],
  upload: true,
}
