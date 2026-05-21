import type { CollectionConfig } from 'payload'

import { articleRichTextEditor } from '@/lib/cms/articleRichTextEditor'
import { adminGroups } from '@/lib/cms/adminGroups'
import { hiddenSlugField } from '@/lib/cms/hiddenSlugField'
import { revalidateSite } from '@/lib/cms/revalidateSite'
import { slugifyName } from '@/lib/slugifyName'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  admin: {
    group: adminGroups.content,
    useAsTitle: 'title',
    description:
      'Actualités du site. Chaque article a une page dédiée sous /actualite/… et apparaît sur la page Actualité.',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [() => revalidateSite()],
    afterDelete: [() => revalidateSite()],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Liste',
          description: 'Titre, résumé et image affichés sur la page Actualité.',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titre',
              required: true,
            },
            hiddenSlugField({
              useAsSlug: 'title',
              slugify: ({ valueToSlugify }) => slugifyName(String(valueToSlugify ?? '')),
            }),
            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Description courte',
              required: true,
              admin: {
                description: 'Résumé affiché sur la page Actualité (liste des articles).',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
              required: true,
            },
          ],
        },
        {
          label: 'Page article',
          description: 'Contenu complet affiché sur la page de l’article.',
          fields: [
            {
              name: 'content',
              type: 'richText',
              label: 'Contenu',
              required: true,
              admin: {
                description:
                  'Texte de l’article. Vous pouvez y insérer des images depuis la médiathèque.',
              },
              editor: articleRichTextEditor,
            },
          ],
        },
      ],
    },
  ],
}
