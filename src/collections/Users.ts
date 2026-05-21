import type { CollectionConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Utilisateur',
    plural: 'Utilisateurs',
  },
  admin: {
    group: adminGroups.administration,
    description: 'Comptes autorisés à modifier le contenu du site via cet espace d’administration.',
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
