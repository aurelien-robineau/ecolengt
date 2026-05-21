import type { GlobalConfig } from 'payload'

import { revalidateSite } from '@/lib/cms/revalidateSite'

export const GuestbookPage: GlobalConfig = {
  slug: 'guestbook-page',
  label: 'Livre d’or',
  admin: {
    group: 'Site',
    description: 'Message des professeurs et témoignages affichés sur la page Livre d’or.',
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
          label: 'Message des professeurs',
          description: 'Texte d’introduction en tête de page.',
          fields: [
            {
              name: 'letterTitle',
              type: 'text',
              label: 'Titre',
              required: true,
              admin: {
                description: 'Ex. : À Dante Agostini',
              },
            },
            {
              name: 'letterContent',
              type: 'textarea',
              label: 'Message',
              required: true,
              admin: {
                description:
                  'Saisissez un paragraphe par bloc, séparés par une ligne vide.',
              },
            },
            {
              name: 'letterSignature',
              type: 'text',
              label: 'Signature',
              required: true,
              admin: {
                description: 'Affichée sous le message (ex. Nadia & Gilles Touché).',
              },
            },
          ],
        },
        {
          label: 'Témoignages',
          description: 'Liste des messages laissés par les élèves et leurs familles.',
          fields: [
            {
              name: 'testimonials',
              type: 'array',
              label: 'Témoignages',
              labels: {
                singular: 'Témoignage',
                plural: 'Témoignages',
              },
              fields: [
                {
                  name: 'student',
                  type: 'relationship',
                  relationTo: 'eleves',
                  label: 'Fiche élève',
                  admin: {
                    description:
                      'Optionnel. Si la fiche a une page (/eleves/…), le nom de l’auteur devient un lien.',
                  },
                },
                {
                  name: 'content',
                  type: 'textarea',
                  label: 'Texte',
                  required: true,
                  admin: {
                    description:
                      'Un témoignage long peut tenir sur plusieurs paragraphes : séparez-les par une ligne vide.',
                  },
                },
                {
                  name: 'author',
                  type: 'text',
                  label: 'Auteur',
                  required: true,
                  admin: {
                    description:
                      'Nom affiché sous le témoignage (ex. Marie D., parent d’élève).',
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
