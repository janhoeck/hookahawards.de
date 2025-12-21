/**
 * Extracts and validates YouTube video ID from a URL
 *
 * Supported formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 *
 * @param link - YouTube URL
 * @returns YouTube video ID (11 characters) or null if invalid
 */
export const extractYoutubeId = (link: string): string | null => {
  try {
    const url = new URL(link)

    // Validate that it's a YouTube URL
    const validHosts = ['youtube.com', 'www.youtube.com', 'youtu.be', 'm.youtube.com']
    if (!validHosts.includes(url.hostname)) {
      console.warn(`Invalid YouTube hostname: ${url.hostname}`)
      return null
    }

    let videoId: string | null = null

    // Extract from query parameter (watch?v=...)
    if (url.searchParams.has('v')) {
      videoId = url.searchParams.get('v')
    }
    // Extract from short URL (youtu.be/...)
    else if (url.hostname === 'youtu.be') {
      videoId = url.pathname.substring(1)
    }
    // Extract from embed or v path (/embed/... or /v/...)
    else if (url.pathname.startsWith('/embed/') || url.pathname.startsWith('/v/')) {
      const parts = url.pathname.split('/')
      videoId = parts[2] || null
    }

    // Validate video ID format (must be exactly 11 characters, alphanumeric + - and _)
    if (videoId && /^[\w-]{11}$/.test(videoId)) {
      return videoId
    }

    console.warn(`Invalid YouTube video ID format: ${videoId}`)
    return null
  } catch (error) {
    console.error('Failed to parse YouTube URL:', error)
    return null
  }
}
