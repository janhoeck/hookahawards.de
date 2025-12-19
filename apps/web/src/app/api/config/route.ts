import { db } from '@/lib/db'
import { configSchema } from '@/lib/db/schema'
import { Config } from '@/lib/types'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const response = await db.select({ key: configSchema.key, value: configSchema.value }).from(configSchema)
  const configObject = Object.fromEntries(response.map(({ key, value }) => [key, value]))
  const config = configObject as Config

  return NextResponse.json(config)
}
