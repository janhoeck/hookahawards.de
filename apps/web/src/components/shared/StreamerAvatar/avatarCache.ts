const cache = new Map<string, { url: string; timestamp: number }>()
const pendingRequests = new Map<string, Promise<string>>()
const CACHE_DURATION = 24 * 60 * 60 * 1000

export async function getCachedAvatar(username: string): Promise<string> {
  const cached = cache.get(username)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.url
  }

  if (pendingRequests.has(username)) {
    return pendingRequests.get(username)!
  }

  const promise = fetch(`https://decapi.me/twitch/avatar/${username}`, {
    next: { revalidate: 86400 },
  })
    .then((res) => res.text())
    .then((url) => {
      cache.set(username, { url, timestamp: Date.now() })
      pendingRequests.delete(username)
      return url
    })
    .catch((error) => {
      pendingRequests.delete(username)
      throw error
    })

  pendingRequests.set(username, promise)
  return promise
}
