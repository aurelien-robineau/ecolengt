import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { pageRichTextEditor } from '@/lib/cms/pageRichTextEditor'
import { revalidateSite } from '@/lib/cms/revalidateSite'

export const IntensiveCoursesCalendarPage: GlobalConfig = {
  slug: 'intensive-courses-calendar-page',
  label: 'Calendrier des stages intensifs',
  admin: {
    group: adminGroups.pagesStages,
    description:
      'Une entrée par année scolaire : titre (ex. 2025-2026) et dates pour cette période.',
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
      name: 'schoolYears',
      type: 'array',
      label: 'Années scolaires',
      labels: {
        singular: 'Année scolaire',
        plural: 'Années scolaires',
      },
      admin: {
        description:
          'Ajoutez une entrée par année scolaire, avec les dates des stages pour cette période.',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Année scolaire',
          required: true,
          admin: {
            description: 'Ex. 2025-2026',
          },
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Dates et détails',
          editor: pageRichTextEditor,
        },
      ],
    },
  ],
}
