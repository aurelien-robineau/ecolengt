import type { CollectionConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { deleteMediaBlob } from '@/lib/cms/deleteMediaBlob'
import { renameMediaBlob } from '@/lib/cms/renameMediaBlob'

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
  hooks: {
    beforeChange: [renameMediaBlob],
    afterDelete: [deleteMediaBlob],
  },
  fields: [
    {
      name: 'filename',
      type: 'text',
      label: 'Nom du fichier',
      admin: {
        readOnly: false,
        hidden: false,
        disableBulkEdit: true,
        description:
          'Renomme le fichier sur Vercel Blob à l’enregistrement. Si vous omettez l’extension, celle d’origine est conservée.',
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
  upload: true,
}
