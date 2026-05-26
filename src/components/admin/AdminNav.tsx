import { DefaultNavClient, NavHamburger, NavWrapper } from '@payloadcms/next/client'
import { Logout } from '@payloadcms/ui'
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent'
import { getNavGroups } from '@payloadcms/ui/shared'
import type { NavPreferences, PayloadRequest, ServerProps } from 'payload'
import React from 'react'

import { getNavPrefs } from '@/lib/content'
import { sortAdminNavGroups } from '@/lib/content'

import { SettingsMenuButton } from './SettingsMenuButton'

const baseClass = 'nav'

type AdminNavProps = ServerProps & {
  req?: PayloadRequest
}

export const AdminNav: React.FC<AdminNavProps> = async (props) => {
  const {
    documentSubViewType,
    i18n,
    locale,
    params,
    payload,
    permissions,
    req,
    searchParams,
    user,
    viewType,
    visibleEntities,
  } = props

  if (!payload?.config || !permissions || !visibleEntities) {
    return null
  }

  const {
    admin: {
      components: { afterNav, afterNavLinks, beforeNav, beforeNavLinks, logout, settingsMenu },
    },
  } = payload.config

  const groups = sortAdminNavGroups(
    getNavGroups(permissions, visibleEntities, payload.config, i18n),
  )

  const navPreferences: NavPreferences = (await getNavPrefs(req)) ?? { groups: {}, open: true }

  const LogoutComponent = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType,
    },
    Component: logout?.Button,
    Fallback: Logout,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user,
    },
  })

  const RenderedSettingsMenu =
    settingsMenu && Array.isArray(settingsMenu)
      ? settingsMenu.map((item, index) =>
          RenderServerComponent({
            clientProps: {
              documentSubViewType,
              viewType,
            },
            Component: item,
            importMap: payload.importMap,
            key: `settings-menu-item-${index}`,
            serverProps: {
              i18n,
              locale,
              params,
              payload,
              permissions,
              searchParams,
              user,
            },
          }),
        )
      : []

  const RenderedBeforeNav = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType,
    },
    Component: beforeNav,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user,
    },
  })

  const RenderedBeforeNavLinks = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType,
    },
    Component: beforeNavLinks,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user,
    },
  })

  const RenderedAfterNavLinks = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType,
    },
    Component: afterNavLinks,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user,
    },
  })

  const RenderedAfterNav = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType,
    },
    Component: afterNav,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user,
    },
  })

  return (
    <NavWrapper baseClass={baseClass}>
      {RenderedBeforeNav}
      <nav className={`${baseClass}__wrap`}>
        {RenderedBeforeNavLinks}
        <DefaultNavClient groups={groups} navPreferences={navPreferences} />
        {RenderedAfterNavLinks}
        <div className={`${baseClass}__controls`}>
          <SettingsMenuButton settingsMenu={RenderedSettingsMenu} />
          {LogoutComponent}
        </div>
      </nav>
      {RenderedAfterNav}
      <div className={`${baseClass}__header`}>
        <div className={`${baseClass}__header-content`}>
          <NavHamburger baseClass={baseClass} />
        </div>
      </div>
    </NavWrapper>
  )
}
