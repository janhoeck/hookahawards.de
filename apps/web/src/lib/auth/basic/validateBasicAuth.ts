'use server'

import crypto from 'crypto'
import { headers } from 'next/headers'

/**
 * Constant-time string comparison to prevent timing attacks
 */
function safeCompare(a: string, b: string): boolean {
  const bufferA = Buffer.from(a, 'utf8')
  const bufferB = Buffer.from(b, 'utf8')

  if (bufferA.length !== bufferB.length) {
    // Use a dummy comparison to keep timing consistent
    crypto.timingSafeEqual(
      Buffer.alloc(Math.max(bufferA.length, bufferB.length)),
      Buffer.alloc(Math.max(bufferA.length, bufferB.length))
    )
    return false
  }

  return crypto.timingSafeEqual(bufferA, bufferB)
}

/**
 * Validates Basic Auth credentials
 *
 * Can be used in two ways:
 *
 * 1. Server Actions (async with headers):
 * ```typescript
 * await validateBasicAuth()
 * ```
 *
 * 2. Middleware (sync with authHeader):
 * ```typescript
 * validateBasicAuth(request.headers.get('authorization'))
 * ```
 *
 * @param authHeader - Optional. If provided, validates this header. If not, reads from Next.js headers()
 * @throws Error if authentication fails
 */
export async function validateBasicAuth(authHeader?: string | null): Promise<void> {
  // Only enforce in production
  const nodeEnv = process.env.NODE_ENV || 'development'
  if (nodeEnv !== 'production') {
    //return
  }

  // Get credentials from environment
  const validUsername = process.env.BASIC_AUTH_USERNAME
  const validPassword = process.env.BASIC_AUTH_PASSWORD

  if (!validUsername || !validPassword) {
    console.error('BASIC_AUTH_USERNAME or BASIC_AUTH_PASSWORD not set')
    throw new Error('Server configuration error')
  }

  // Get authorization header (from parameter or Next.js headers)
  let auth = authHeader
  if (auth === undefined) {
    const headersList = await headers()
    auth = headersList.get('authorization')
  }

  if (!auth || !auth.startsWith('Basic ')) {
    throw new Error('Authentication required')
  }

  const authValue = auth.split(' ')[1]
  if (!authValue) {
    throw new Error('Invalid authorization header')
  }

  try {
    const credentials = atob(authValue)
    const colonIndex = credentials.indexOf(':')

    if (colonIndex === -1) {
      throw new Error('Invalid credentials format')
    }

    const username = credentials.substring(0, colonIndex)
    const password = credentials.substring(colonIndex + 1)

    // Use constant-time comparison to prevent timing attacks
    const usernameMatch = safeCompare(username, validUsername)
    const passwordMatch = safeCompare(password, validPassword)

    if (!usernameMatch || !passwordMatch) {
      throw new Error('Invalid credentials')
    }

    // Authentication successful
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Authentication failed')
  }
}
