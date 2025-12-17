import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import 'server-only'

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return null
  }

  return session.user
}
