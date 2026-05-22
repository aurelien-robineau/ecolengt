import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/lib/cms/adminGroups'
import { pageRichTextEditor } from '@/lib/cms/pageRichTextEditor'
import { revalidateSite } from '@/lib/cms/revalidateSite'

export const IntensiveCoursesCalendarPage: GlobalConfig = {
  slug: 'intensive-courses-calendar-page',
  label: 'Calendrier des stages intensifs',
  admin: {
    group: adminGroups.pagesStages,
    description: 'Calendrier des stages intensifs (page liée depuis Stages intensifs).',
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
      name: 'content',
      type: 'richText',
      label: 'Contenu',
      editor: pageRichTextEditor,
    },
  ],
}
