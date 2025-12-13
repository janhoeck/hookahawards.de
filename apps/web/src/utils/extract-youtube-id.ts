export const extractYoutubeId = (link: string) => {
  const url = new URL(link)
  if (url.searchParams.has('v')) {
    return url.searchParams.get('v')!
  }
  return url.pathname.substring(1, url.pathname.length)
}
