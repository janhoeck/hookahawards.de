import { extractYoutubeId } from '@/utils/extract-youtube-id'
import { Clip } from '@janhoeck/domain'

type ResponsiveYouTubeVideoProps = {
  clip: Clip
}

export const ResponsiveYouTubeVideo = (props: ResponsiveYouTubeVideoProps) => {
  const { clip } = props
  const youTubeId = extractYoutubeId(clip.link)

  return (
    <div className='relative w-full overflow-hidden rounded-2xl'>
      {/* 16:9 Padding Trick */}
      <div className='relative w-full pb-[56.25%]'>
        <iframe
          className='absolute top-0 left-0 h-full w-full'
          src={`https://www.youtube.com/embed/${youTubeId}?controls=1`}
          title={clip.title}
          allowFullScreen
        />
      </div>
    </div>
  )
}
