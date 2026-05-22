import type { NavGroupType } from '@payloadcms/ui/shared'

import {
  adminGroups,
  adminNavContentOrder,
  adminNavGroupOrder,
  adminNavPagesGeneralOrder,
  adminNavPagesOtherOrder,
  adminNavPagesStagesOrder,
} from '@/lib/cms/adminGroups'

function sortBySlugOrder<T extends { slug: string }>(
  entities: T[],
  order: readonly string[],
): T[] {
  return [...entities].sort((a, b) => {
    const aIndex = order.indexOf(a.slug)
    const bIndex = order.indexOf(b.slug)
    const aRank = aIndex === -1 ? order.length : aIndex
    const bRank = bIndex === -1 ? order.length : bIndex
    return aRank - bRank
  })
}

const pagesGroupOrders: Record<string, readonly string[]> = {
  [adminGroups.pagesGeneral]: adminNavPagesGeneralOrder,
  [adminGroups.pagesStages]: adminNavPagesStagesOrder,
  [adminGroups.pagesOther]: adminNavPagesOtherOrder,
}

function sortEntitiesInGroup(group: NavGroupType): NavGroupType {
  if (group.label === adminGroups.content) {
    return { ...group, entities: sortBySlugOrder(group.entities, adminNavContentOrder) }
  }

  const pagesOrder = pagesGroupOrders[group.label]
  if (pagesOrder) {
    return { ...group, entities: sortBySlugOrder(group.entities, pagesOrder) }
  }

  return group
}

const groupRank = Object.fromEntries(
  adminNavGroupOrder.map((label, index) => [label, index]),
) as Record<string, number>

/** Applies configured group and entity order for the admin sidebar. */
export function sortAdminNavGroups(groups: NavGroupType[]): NavGroupType[] {
  const withSortedEntities = groups.map(sortEntitiesInGroup)

  return [...withSortedEntities].sort((a, b) => {
    const aRank = groupRank[a.label] ?? adminNavGroupOrder.length
    const bRank = groupRank[b.label] ?? adminNavGroupOrder.length
    return aRank - bRank
  })
}
