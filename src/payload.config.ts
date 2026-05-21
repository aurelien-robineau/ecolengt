import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fr } from '@payloadcms/translations/languages/fr'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Students } from './collections/Students'
import { Users } from './collections/Users'
import { AlumniPage } from './globals/AlumniPage'
import { ContactPage } from './globals/ContactPage'
import { GuestbookPage } from './globals/GuestbookPage'
import { HomePage } from './globals/HomePage'
import { LegalNoticePage } from './globals/LegalNoticePage'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Students],
  globals: [SiteSettings, HomePage, ContactPage, GuestbookPage, AlumniPage, LegalNoticePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
  i18n: {
    supportedLanguages: { fr },
  },
})
