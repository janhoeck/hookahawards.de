import { H1 } from '@janhoeck/ui'
import { PropsWithChildren } from 'react'

export const Headline = ({ children }: PropsWithChildren) => (
  <div className='space-y-2 mb-10 text-center'>
    <H1 className='tracking-wider text-primary uppercase'>{children}</H1>
    <div className='h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent rounded-full' />
  </div>
)
