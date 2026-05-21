import type { GlobalConfig } from 'payload'

import { revalidateSite } from '@/lib/cms/revalidateSite'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Paramètres du site',
  admin: {
    group: 'Site',
    description: 'Coordonnées, réseaux sociaux et textes affichés dans l’en-tête et le pied de page.',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [() => revalidateSite()],
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Identité de l’école',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'schoolNameShort',
          type: 'text',
          label: 'Nom court',
          required: true,
          admin: {
            description:
              'Forme abrégée du nom (ex. École de Batterie NGT). Utilisé dans l’en-tête, le pied de page et les titres de page.',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Adresse postale',
      fields: [
        {
          name: 'addressStreet',
          type: 'text',
          label: 'Rue et numéro',
          required: true,
          admin: {
            description: 'Affiché dans le pied de page, colonne Adresse.',
          },
        },
        {
          name: 'addressCity',
          type: 'text',
          label: 'Code postal et ville',
          required: true,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Coordonnées',
      fields: [
        {
          name: 'phones',
          type: 'array',
          label: 'Numéros de téléphone',
          labels: {
            singular: 'Numéro',
            plural: 'Numéros',
          },
          admin: {
            description: 'Liste des téléphones affichés dans le pied de page.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Type de ligne',
              admin: {
                description: 'Optionnel. Ex. : Fixe, Mobile, Gilles…',
              },
            },
            {
              name: 'number',
              type: 'text',
              label: 'Numéro à afficher',
              required: true,
              admin: {
                description: 'Tel qu’affiché sur le site (ex. 04 42 63 03 74). Le lien d’appel est généré automatiquement.',
              },
            },
          ],
        },
        {
          name: 'emails',
          type: 'array',
          label: 'Adresses e-mail',
          labels: {
            singular: 'E-mail',
            plural: 'E-mails',
          },
          admin: {
            description: 'Toutes les adresses affichées dans le pied de page.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Destinataire',
              admin: {
                description: 'Optionnel. Ex. : Contact général, Nadia, Gilles…',
              },
            },
            {
              name: 'address',
              type: 'email',
              label: 'Adresse e-mail',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Réseaux sociaux',
      fields: [
        {
          name: 'instagramUrl',
          type: 'text',
          label: 'Lien Instagram',
          admin: {
            description: 'URL complète de la page ou du profil (ex. https://instagram.com/…).',
          },
        },
        {
          name: 'facebookUrl',
          type: 'text',
          label: 'Lien Facebook',
          admin: {
            description: 'URL complète de la page (ex. https://facebook.com/…).',
          },
        },
      ],
    },
  ],
}
