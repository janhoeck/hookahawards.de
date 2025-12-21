import { Avatar, AvatarFallback } from '@janhoeck/ui'

type StreamerAvatarListSkeletonProps = {
  amount?: number
}

export function StreamerAvatarListSkeleton({ amount = 3 }: StreamerAvatarListSkeletonProps) {
  return (
    <div className='flex animate-pulse items-center gap-2'>
      <div className='flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-transparent'>
        {Array.from({ length: amount }).map((_, index) => (
          <Avatar key={index}>
            <AvatarFallback className='bg-muted' />
          </Avatar>
        ))}
      </div>
      <div className='bg-muted h-6 grow rounded-md' />
    </div>
  )
}
