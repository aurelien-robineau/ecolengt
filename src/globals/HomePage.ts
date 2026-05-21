import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { revalidateSite } from '@/lib/cms/revalidateSite'

const paragraphField = {
  name: 'text',
  type: 'textarea' as const,
  label: 'Paragraphe',
  required: true,
}

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Page d’accueil',
  admin: {
    group: adminGroups.pages,
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
                description:
                  'Courte phrase en italique au-dessus du titre (ex. Écoute… et tu parviendras).',
              },
            },
            {
              name: 'heroName',
              type: 'text',
              label: 'Titre (1re ligne)',
              required: true,
              admin: {
                description: 'Première ligne du titre (ex. École de Batterie).',
              },
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              label: 'Titre (2e ligne)',
              required: true,
              admin: {
                description: 'Deuxième ligne du titre, en italique (ex. Nadia & Gilles Touché).',
              },
            },
            {
              name: 'heroLocation',
              type: 'text',
              label: 'Ville',
              required: true,
              admin: {
                description: 'Affichée sous le titre (ex. Aix-en-Provence).',
              },
            },
            {
              name: 'heroFounded',
              type: 'text',
              label: 'Mention « depuis »',
              admin: {
                description:
                  'Texte optionnel à côté de la ville (ex. Depuis 2003). Laisser vide pour ne rien afficher.',
              },
            },
            {
              name: 'heroCta',
              type: 'text',
              label: 'Texte du CTA',
              required: true,
              admin: {
                description:
                  'Libellé du bouton sous le titre (ex. Découvrir l’école). Le lien mène à la section « Pour qui ».',
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
                description: 'Nom affiché sous la citation (ex. Nadia et Gilles Touché).',
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
          label: 'Pour qui',
          description: 'Section qui explique à qui s’adressent les cours.',
          fields: [
            {
              name: 'audienceLabel',
              type: 'text',
              label: 'Petit titre de section',
              required: true,
              admin: {
                description: 'Court texte en majuscules au-dessus du titre (ex. Pour qui).',
              },
            },
            {
              name: 'audienceTitle',
              type: 'text',
              label: 'Titre de section',
              required: true,
              admin: {
                description: 'Grand titre visible sur la page d’accueil.',
              },
            },
            {
              name: 'audienceParagraphs',
              type: 'array',
              label: 'Texte de la section',
              labels: {
                singular: 'Paragraphe',
                plural: 'Paragraphes',
              },
              fields: [paragraphField],
            },
          ],
        },
        {
          label: 'Pédagogie',
          description: 'Présentation de la méthode, des cours, du travail et des stages.',
          fields: [
            {
              name: 'pedagogyLabel',
              type: 'text',
              label: 'Petit titre de section',
              required: true,
              admin: {
                description: 'Ex. La pédagogie',
              },
            },
            {
              name: 'pedagogyTitle',
              type: 'text',
              label: 'Titre de section',
              required: true,
            },
            {
              name: 'pedagogyLead',
              type: 'textarea',
              label: 'Premier paragraphe',
              required: true,
              admin: {
                description:
                  'Texte d’introduction en tête de section, avant les autres paragraphes.',
              },
            },
            {
              name: 'pedagogyBody',
              type: 'array',
              label: 'Paragraphes suivants',
              labels: {
                singular: 'Paragraphe',
                plural: 'Paragraphes',
              },
              admin: {
                description: 'Suite du texte de présentation, affichée sous le premier paragraphe.',
              },
              fields: [paragraphField],
            },
            {
              type: 'collapsible',
              label: 'Encadré « Organisation des cours »',
              admin: {
                description: 'Bloc à deux colonnes dans la section pédagogie.',
              },
              fields: [
                {
                  name: 'courseOrganizationTitle',
                  type: 'text',
                  label: 'Titre de l’encadré',
                  required: true,
                },
                {
                  name: 'courseOrganizationItems',
                  type: 'array',
                  label: 'Points à puces',
                  labels: {
                    singular: 'Point',
                    plural: 'Points',
                  },
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      label: 'Texte du point',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'courseOrganizationFooter',
                  type: 'textarea',
                  label: 'Paragraphe de conclusion',
                  required: true,
                  admin: {
                    description: 'Texte affiché sous la liste à puces.',
                  },
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Encadré « Le travail »',
              fields: [
                {
                  name: 'practiceTitle',
                  type: 'text',
                  label: 'Titre de l’encadré',
                  required: true,
                },
                {
                  name: 'practiceBody',
                  type: 'textarea',
                  label: 'Texte',
                  required: true,
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Encadré « Stages intensifs »',
              admin: {
                description: 'Bloc sur fond jaune clair en bas de la section pédagogie.',
              },
              fields: [
                {
                  name: 'intensiveCoursesTitle',
                  type: 'text',
                  label: 'Titre',
                  required: true,
                },
                {
                  name: 'intensiveCoursesParagraphs',
                  type: 'array',
                  label: 'Paragraphes',
                  labels: {
                    singular: 'Paragraphe',
                    plural: 'Paragraphes',
                  },
                  fields: [paragraphField],
                },
                {
                  name: 'intensiveCoursesButtonLabel',
                  type: 'text',
                  label: 'Texte du bouton',
                  required: true,
                  admin: {
                    description:
                      'Bouton en bas de l’encadré (ex. En savoir plus). Mène à la page Contact.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Locaux',
          description: 'Description des salles et galerie photos des locaux.',
          fields: [
            {
              name: 'facilitiesLabel',
              type: 'text',
              label: 'Petit titre de section',
              required: true,
              admin: {
                description: 'Ex. Les locaux',
              },
            },
            {
              name: 'facilitiesTitle',
              type: 'text',
              label: 'Titre de section',
              required: true,
            },
            {
              name: 'facilitiesDescription',
              type: 'array',
              label: 'Texte de présentation',
              labels: {
                singular: 'Paragraphe',
                plural: 'Paragraphes',
              },
              admin: {
                description: 'Un ou plusieurs paragraphes au-dessus de la galerie photos.',
              },
              fields: [paragraphField],
            },
            {
              name: 'facilitiesGallery',
              type: 'array',
              label: 'Photos des locaux',
              labels: {
                singular: 'Photo',
                plural: 'Photos',
              },
              admin: {
                description:
                  'Grille de photos en bas de section. La première peut être affichée en grand format.',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Image',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                  label: 'Légende',
                  admin: {
                    description: 'Texte affiché au survol de la photo (optionnel).',
                  },
                },
                {
                  name: 'wide',
                  type: 'checkbox',
                  label: 'Photo en grand format',
                  defaultValue: false,
                  admin: {
                    description:
                      'Cochez pour une image large sur deux colonnes (idéal pour la salle principale).',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
