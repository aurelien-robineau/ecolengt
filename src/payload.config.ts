import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fr } from '@payloadcms/translations/languages/fr'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Articles } from './collections/Articles'
import { Media } from './collections/Media'
import { Students } from './collections/Students'
import { Users } from './collections/Users'
import { AlumniPage } from './globals/AlumniPage'
import { ContactPage } from './globals/ContactPage'
import { GuestbookPage } from './globals/GuestbookPage'
import { HomePage } from './globals/HomePage'
import { LegalNoticePage } from './globals/LegalNoticePage'
import { SiteSettings } from './globals/SiteSettings'
import { TomTomPage } from './globals/TomTomPage'
import { disableAdminAPIView } from './lib/cms/disableAdminAPIView'
import { vercelBlobStoragePlugin } from './lib/cms/storage'
import { siteFaviconMetadata } from './lib/site/favicon'
import { getServerURL } from './lib/site/serverUrl'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: getServerURL(),
  admin: {
    user: Users.slug,
    meta: siteFaviconMetadata,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      Nav: '@/components/admin/AdminNav#AdminNav',
      graphics: {
        Icon: '@/components/admin/AdminIcon#AdminIcon',
        Logo: '@/components/admin/AdminLogo#AdminLogo',
      },
    },
    dashboard: {
      defaultLayout: [{ widgetSlug: 'collections', width: 'full' }],
      widgets: [
        {
          slug: 'collections',
          Component: '@/components/admin/DashboardCollectionCards#DashboardCollectionCards',
          minWidth: 'full',
        },
      ],
    },
  },
  collections: [Media, Articles, Students, Users],
  globals: [
    HomePage,
    GuestbookPage,
    AlumniPage,
    TomTomPage,
    ContactPage,
    LegalNoticePage,
    SiteSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [disableAdminAPIView, ...(vercelBlobStoragePlugin ? [vercelBlobStoragePlugin] : [])],
  i18n: {
    supportedLanguages: { fr },
  },
})
