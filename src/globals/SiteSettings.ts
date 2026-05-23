import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { siteAddressFields } from '@/lib/cms/siteAddressFields'
import { siteMainAccessFields } from '@/lib/cms/siteAccessFields'
import { revalidateSite } from '@/lib/cms/revalidateSite'
import { validateFoundedYear } from '@/lib/cms/validateFoundedYear'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Paramètres du site',
  admin: {
    group: adminGroups.config,
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
      type: 'tabs',
      tabs: [
        {
          label: 'Identité',
          description: 'Nom affiché dans l’en-tête, le pied de page et les titres de page.',
          fields: [
            {
              name: 'schoolNameShort',
              type: 'text',
              label: 'Nom court',
              required: true,
              admin: {
                description:
                  'Forme abrégée du nom. Utilisée dans l’en-tête, le pied de page et les titres de page.',
              },
            },
            {
              name: 'foundedYear',
              type: 'number',
              label: 'Année de fondation',
              admin: {
                description:
                  'Affichée sur la bannière d’accueil (« Depuis … »). Laisser vide pour ne rien afficher.',
              },
              validate: validateFoundedYear,
            },
          ],
        },
        {
          label: 'Adresse',
          description: 'Adresses et cartes affichées sur le site.',
          fields: [
            {
              type: 'collapsible',
              label: 'Adresse de l’école',
              admin: {
                initCollapsed: false,
                description: 'Pied de page, page Contact et métadonnées du site.',
              },
              fields: [...siteAddressFields('address'), ...siteMainAccessFields],
            },
            {
              type: 'collapsible',
              label: 'Adresse des stages intensifs',
              admin: {
                initCollapsed: true,
                description: 'Section Accès de la page Stages intensifs.',
              },
              fields: siteAddressFields('workshopsAddress'),
            },
          ],
        },
        {
          label: 'Coordonnées',
          description: 'Téléphones et e-mails affichés dans le pied de page.',
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
                  name: 'number',
                  type: 'text',
                  label: 'Numéro à afficher',
                  required: true,
                  admin: {
                    description:
                      'Numéro tel qu’affiché sur le site. Le lien d’appel est généré automatiquement.',
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
          label: 'Réseaux sociaux',
          description: 'Liens affichés dans le pied de page.',
          fields: [
            {
              name: 'instagramUrl',
              type: 'text',
              label: 'Lien Instagram',
              admin: {
                description: 'URL complète de la page ou du profil Instagram.',
              },
            },
            {
              name: 'facebookUrl',
              type: 'text',
              label: 'Lien Facebook',
              admin: {
                description: 'URL complète de la page Facebook.',
              },
            },
          ],
        },
      ],
    },
  ],
}
