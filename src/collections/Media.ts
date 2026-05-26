import type { CollectionConfig } from 'payload'

import { adminGroups } from '@/fields'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Média',
    plural: 'Médias',
  },
  admin: {
    group: adminGroups.content,
    description: 'Photos et images utilisées sur le site.',
    components: {
      edit: {
        Upload: '@/components/admin/MediaUpload#MediaUpload',
      },
    },
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'filename',
      type: 'text',
      label: 'Nom du fichier',
      admin: {
        hidden: false,
        description:
          'Nom du fichier sur l’espace de stockage. Cliquez sur « Modifier » pour déverrouiller.',
        components: {
          Field: '@/components/admin/MediaFilenameField#MediaFilenameField',
        },
      },
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Description de l’image',
      admin: {
        description:
          'Courte description du contenu de l’image, pour l’accessibilité (optionnel). Si laissée vide, une description générique sera utilisée sur le site.',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    hideRemoveFile: false,
  },
}
