import { TableSkeleton } from '@/components/shared/Skeletons/TableSkeleton'
import React from 'react'

export const ConfigSectionSkeleton = () => {
  return (
    <div className='flex w-full animate-pulse flex-col'>
      <div className='mb-6 flex flex-row items-center justify-between'>
        <div className='bg-foreground/10 h-8 w-40 rounded'></div>
        <div className='bg-foreground/10 h-9 w-28 rounded-full'></div>
      </div>
      <TableSkeleton />
    </div>
  )
}
