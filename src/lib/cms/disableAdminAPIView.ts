import type { Plugin } from 'payload'

/** Hides the admin "API" tab and JSON editor on every collection and global. */
export const disableAdminAPIView: Plugin = (incomingConfig) => ({
  ...incomingConfig,
  collections: (incomingConfig.collections ?? []).map((collection) => ({
    ...collection,
    admin: {
      ...collection.admin,
      hideAPIURL: true,
    },
  })),
  globals: (incomingConfig.globals ?? []).map((global) => ({
    ...global,
    admin: {
      ...global.admin,
      hideAPIURL: true,
    },
  })),
})
