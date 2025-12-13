import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { Pool } from 'pg'

export const runtime = 'nodejs'

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL as string,
    max: 10,
    idleTimeoutMillis: 30000,
  }),
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL as string,
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    twitch: {
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
    },
  },
  secret: process.env.BETTER_AUTH_SECRET as string,
  plugins: [nextCookies()],
})
