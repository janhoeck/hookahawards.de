import { getCurrentUser } from '@/lib/auth/auth-server'
import { voteRepository } from '@/lib/db'

export const GET = async () => {
  const user = await getCurrentUser()
  if (!user) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const result = await voteRepository.getVotesByUserId(user.id)
    if (!result) {
      return new Response(null, { status: 204 })
    }

    return Response.json(result)
  } catch (error) {
    console.error(error)
  }
  return Response.error()
}
