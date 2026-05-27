import type { GlobalConfig } from 'payload'

import {
  adminGroups,
  buttonUrlFieldDescription,
  landingSectionFields,
  validateHeroOverlayOpacity,
} from '@/fields'
import { revalidateSite } from '@/lib/content/revalidateSite'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Accueil',
  admin: {
    group: adminGroups.pagesGeneral,
    description:
      'Textes et photos des différentes sections affichées sur la page d’accueil du site.',
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
          label: 'Bannière d’accueil',
          description:
            'Grande zone en haut de page avec le titre de l’école et le bouton principal.',
          fields: [
            {
              name: 'heroTagline',
              type: 'text',
              label: 'Phrase d’accroche',
              required: true,
              admin: {
                description: 'Courte phrase en italique affichée au-dessus du titre.',
              },
            },
            {
              name: 'heroName',
              type: 'text',
              label: 'Titre (1re ligne)',
              required: true,
              admin: {
                description: 'Première ligne du titre principal.',
              },
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              label: 'Titre (2e ligne)',
              required: true,
              admin: {
                description: 'Deuxième ligne du titre, affichée en italique.',
              },
            },
            {
              name: 'heroCta',
              type: 'text',
              label: 'Texte du CTA',
              required: true,
              admin: {
                description: 'Libellé du bouton sous le titre de la bannière.',
              },
            },
            {
              name: 'heroCtaHref',
              type: 'text',
              label: 'URL du CTA',
              admin: {
                description: buttonUrlFieldDescription,
              },
            },
            {
              name: 'heroBackgroundImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Image de fond',
              admin: {
                description:
                  'Image optionnelle affichée en arrière-plan de la bannière, sur toute la hauteur de la section.',
              },
            },
            {
              name: 'heroOverlayOpacity',
              type: 'number',
              label: 'Opacité du voile',
              required: true,
              defaultValue: 92,
              min: 0,
              max: 100,
              validate: validateHeroOverlayOpacity,
              admin: {
                description:
                  'Opacité du voile clair appliqué sur l’image de fond (0 = transparent, 100 = opaque). Valeur entière entre 0 et 100.',
                step: 1,
              },
            },
            {
              name: 'heroBannerPreview',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/admin/HeroBannerPreviewField#HeroBannerPreviewField',
                },
              },
            },
          ],
        },
        {
          label: 'Bandeau citation',
          description: 'Section jaune avec la citation, la signature et la photo des professeurs.',
          fields: [
            {
              name: 'quoteText',
              type: 'textarea',
              label: 'Texte de la citation',
              required: true,
              admin: {
                description:
                  'Citation entre guillemets, sans les « » (ajoutés automatiquement sur le site).',
              },
            },
            {
              name: 'quoteCite',
              type: 'text',
              label: 'Signature',
              required: true,
              admin: {
                description: 'Nom affiché sous la citation.',
              },
            },
            {
              name: 'quotePortrait',
              type: 'upload',
              relationTo: 'media',
              label: 'Photo des professeurs',
              admin: {
                description:
                  'Portrait affiché à gauche de la citation. Créez d’abord le fichier dans Médias si besoin.',
              },
            },
          ],
        },
        {
          label: 'Sections',
          description: 'Sections de contenu affichées sous le bandeau citation.',
          fields: [
            {
              name: 'sections',
              type: 'array',
              label: 'Sections',
              labels: {
                singular: 'Section',
                plural: 'Sections',
              },
              admin: {
                description:
                  'Ajoutez autant de sections que nécessaire. Seuls le sur-titre et le titre sont obligatoires.',
                initCollapsed: true,
              },
              fields: landingSectionFields,
            },
          ],
        },
      ],
    },
  ],
}
