import { slugField } from 'payload'

/** Slug auto-generated from `useAsSlug`; hidden in the admin (no manual editing). */
export function hiddenSlugField(
  args: NonNullable<Parameters<typeof slugField>[0]>,
) {
  const { overrides, ...rest } = args

  return slugField({
    ...rest,
    overrides: (field) => {
      const base = typeof overrides === 'function' ? overrides(field) : field

      return {
        ...base,
        admin: {
          ...base.admin,
          hidden: true,
        },
        fields: base.fields.map((child) => {
          if ('admin' in child && child.admin) {
            return {
              ...child,
              admin: {
                ...child.admin,
                hidden: true,
              },
            }
          }

          return {
            ...child,
            admin: {
              hidden: true,
            },
          }
        }),
      } as typeof field
    },
  })
}
