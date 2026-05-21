'use client'

import { GearIcon, Popup, useTranslation } from '@payloadcms/ui'
import React, { Fragment } from 'react'

type SettingsMenuButtonProps = {
  settingsMenu: React.ReactNode[]
}

export const SettingsMenuButton: React.FC<SettingsMenuButtonProps> = ({ settingsMenu }) => {
  const { t } = useTranslation()

  if (!settingsMenu.length) {
    return null
  }

  return (
    <Popup
      button={<GearIcon ariaLabel={t('general:menu')} />}
      className="settings-menu-button"
      horizontalAlign="left"
      id="settings-menu"
      size="small"
      verticalAlign="bottom"
    >
      {settingsMenu.map((item, index) => (
        <Fragment key={`settings-menu-item-${index}`}>{item}</Fragment>
      ))}
    </Popup>
  )
}
