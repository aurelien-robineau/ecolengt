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
    description: 'Photos et images utilisées sur le site (portrait, locaux, etc.).',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Description de l’image',
      required: true,
      admin: {
        description:
          'Courte description du contenu de l’image (accessibilité). Ex. : Nadia et Gilles Touché devant une batterie.',
      },
    },
  ],
  upload: true,
}
