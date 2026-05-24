import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { cmsRichTextEditor } from '@/lib/cms/cmsRichTextEditor'
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
      name: 'introContent',
      type: 'richText',
      label: 'Texte d’introduction',
      editor: cmsRichTextEditor,
      admin: {
        description: 'Texte optionnel affiché sous le titre de la page.',
      },
    },
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
          label: 'Période',
          required: true,
          admin: {
            description: 'Ex. 2025-2026 (affiché sur le site comme « Année scolaire 2025-2026 »).',
          },
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Dates et détails',
          editor: cmsRichTextEditor,
        },
      ],
    },
  ],
}
