import { getTranslation } from '@payloadcms/translations'
import { Button } from '@payloadcms/ui'
import { Card } from '@payloadcms/ui'
import { Locked } from '@payloadcms/ui'
import { getGlobalData, getNavGroups, getVisibleEntities } from '@payloadcms/ui/shared'
import type { ClientUser, WidgetServerProps } from 'payload'
import { EntityType, getAccessResults } from 'payload'
import { formatAdminURL } from 'payload/shared'
import React from 'react'

import { sortAdminNavGroups } from '@/lib/cms/sortAdminNavGroups'

import './DashboardCollectionCards.scss'

const baseClass = 'collections'

/** Dashboard collection/global cards with the same group order as the sidebar. */
export async function DashboardCollectionCards(props: WidgetServerProps) {
  const { i18n, payload, user } = props.req
  const { admin: adminRoute } = payload.config.routes
  const { t } = i18n

  const permissions = await getAccessResults({
    req: props.req,
  })
  const visibleEntities = getVisibleEntities({
    req: props.req,
  })
  const globalData = await getGlobalData(props.req)
  const navGroups = sortAdminNavGroups(
    getNavGroups(permissions, visibleEntities, payload.config, i18n),
  )

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__wrap`}>
        {!navGroups || navGroups.length === 0 ? (
          <p>no nav groups....</p>
        ) : (
          navGroups.map(({ entities, label }, groupIndex) => (
            <div className={`${baseClass}__group`} key={groupIndex}>
              <h2 className={`${baseClass}__label`}>{label}</h2>
              <ul className={`${baseClass}__card-list`}>
                {entities.map(({ slug, type, label: entityLabel }, entityIndex) => {
                  let buttonAriaLabel: string
                  let createHREF: string | undefined
                  let href: string
                  let hasCreatePermission: boolean | undefined
                  let isLocked: boolean | null = null
                  let userEditing: ClientUser | null = null

                  const title = getTranslation(entityLabel, i18n)

                  if (type === EntityType.collection) {
                    buttonAriaLabel = t('general:showAllLabel', {
                      label: title,
                    })
                    href = formatAdminURL({
                      adminRoute,
                      path: `/collections/${slug}`,
                    })
                    createHREF = formatAdminURL({
                      adminRoute,
                      path: `/collections/${slug}/create`,
                    })
                    hasCreatePermission = permissions?.collections?.[slug]?.create
                  } else {
                    buttonAriaLabel = t('general:editLabel', {
                      label: title,
                    })
                    href = formatAdminURL({
                      adminRoute,
                      path: `/globals/${slug}`,
                    })

                    const globalLockData = globalData.find(
                      (global: { slug: string }) => global.slug === slug,
                    )

                    if (globalLockData) {
                      isLocked = globalLockData.data._isLocked
                      userEditing = globalLockData.data._userEditing as ClientUser | null

                      const lockDuration = globalLockData.lockDuration ?? 0
                      const lastEditedAt = new Date(globalLockData.data?._lastEditedAt).getTime()
                      const lockExpirationTime = lastEditedAt + lockDuration * 1000

                      if (Date.now() > lockExpirationTime) {
                        isLocked = false
                        userEditing = null
                      }
                    }
                  }

                  return (
                    <li key={entityIndex}>
                      <Card
                        actions={
                          isLocked && userEditing && user?.id !== userEditing.id ? (
                            <Locked className={`${baseClass}__locked`} user={userEditing} />
                          ) : hasCreatePermission && type === EntityType.collection ? (
                            <Button
                              aria-label={t('general:createNewLabel', {
                                label: entityLabel,
                              })}
                              buttonStyle="icon-label"
                              el="link"
                              icon="plus"
                              iconStyle="with-border"
                              round
                              to={createHREF}
                            />
                          ) : undefined
                        }
                        buttonAriaLabel={buttonAriaLabel}
                        href={href}
                        id={`card-${slug}`}
                        title={title}
                        titleAs="h3"
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
