import { CategoryType, Vote } from '@/lib/types'

export const fetchUserVotes = async (): Promise<Vote[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/votes`)
  if (response.ok) {
    return await response.json()
  }
  return []
}

export const addVote = async (categoryId: string, referenceId: string, referenceType: CategoryType): Promise<Vote> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${categoryId}/vote`, {
    method: 'POST',
    body: JSON.stringify({
      referenceId,
      referenceType,
    }),
  })
  return await response.json()
}
