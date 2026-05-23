'use client'

import { Button, useConfig } from '@payloadcms/ui'
import { formatAdminURL } from 'payload/shared'
import React from 'react'

export function NewsArticlesField() {
  const { config } = useConfig()

  const articlesHref = formatAdminURL({
    adminRoute: config.routes.admin,
    path: '/collections/articles',
  })

  return (
    <div className="field-type">
      <Button buttonStyle="secondary" el="link" to={articlesHref}>
        Gérer les articles
      </Button>
    </div>
  )
}
