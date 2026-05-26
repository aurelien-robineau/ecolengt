import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/fields'
import { cmsRichTextEditor } from '@/fields'
import { revalidateSite } from '@/lib/content/revalidateSite'

export const NewsPage: GlobalConfig = {
  slug: 'news-page',
  label: 'Actualité',
  admin: {
    group: adminGroups.pagesGeneral,
    description:
      'Encadré optionnel en haut de la page Actualité. Les articles se gèrent dans Contenu → Articles.',
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
      editor: cmsRichTextEditor,
      admin: {
        description:
          'Encadré jaune optionnel en haut de la page Actualité (prochains événements, dates, etc.). Laisser vide pour ne rien afficher.',
      },
    },
    {
      name: 'articlesManager',
      type: 'ui',
      label: 'Articles',
      admin: {
        components: {
          Field: '@/components/admin/NewsArticlesField#NewsArticlesField',
        },
      },
    },
  ],
}
