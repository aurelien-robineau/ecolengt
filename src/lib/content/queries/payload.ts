import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

export const GLOBAL_DEPTH = 2

export const getPayloadClient = cache(async () => getPayload({ config }))
