# Content layer (`@/lib/content`)

Maps Payload globals and collections into frontend-ready types. Pages and components should fetch only the slices they need.

## Imports

| Need                                                | Import from                    |
| --------------------------------------------------- | ------------------------------ |
| Queries (`getSiteSettings`, `getArticles`, …)       | `@/lib/content`                |
| Types (`SiteSettingsData`, `CmsRichTextContent`, …) | `@/lib/content/types`          |
| Revalidation after CMS saves                        | `@/lib/content/revalidateSite` |

Use **`import type`** from `@/lib/content/types` in UI and SEO modules so the barrel is not pulled in for types alone.

## Payload schema files (critical)

Files under `src/globals/` and `src/collections/` must **not** import from `@/lib/content` or `@/fields` barrels. Those barrels load query modules that depend on `payload.config`, which creates a circular initialization error at build time.

```ts
// Correct
import { revalidateSite } from '@/lib/content/revalidateSite'
import { adminGroups } from '@/fields/shared/adminGroups'
```

```ts
// Wrong — can break `next build`
import { revalidateSite } from '@/lib/content'
import { adminGroups } from '@/fields'
```

Files under `src/fields/*` should import shared field helpers via **relative** paths (e.g. `./shared/...`), not `@/fields`.

## Query depth

Per-global `depth` is defined in `queries/payload.ts` (`globalQueryDepth`). Increase depth only when a mapper reads populated upload or relationship objects (see `mapMedia`, `mapGallery`, `resolveListedPerson`).
