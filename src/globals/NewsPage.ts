import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { pageRichTextEditor } from '@/lib/cms/pageRichTextEditor'
import { revalidateSite } from '@/lib/cms/revalidateSite'

export const NewsPage: GlobalConfig = {
  slug: 'news-page',
  label: 'Actualité',
  admin: {
    group: adminGroups.pages,
    description:
      'Contenu affiché sur la page Actualité, en plus de la liste des articles.',
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
      name: 'upcomingEventsAlert',
      type: 'richText',
      label: 'Encadré informations importantes',
      editor: pageRichTextEditor,
      admin: {
        description:
          'Encadré jaune optionnel en haut de la page Actualité (prochains événements, dates, etc.). Laisser vide pour ne rien afficher.',
      },
    },
  ],
}
