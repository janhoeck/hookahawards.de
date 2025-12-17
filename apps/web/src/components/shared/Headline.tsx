import { H1 } from '@janhoeck/ui'
import { PropsWithChildren } from 'react'

export const Headline = ({ children }: PropsWithChildren) => (
  <div className='mb-10 space-y-2 text-center'>
    <H1 className='text-primary tracking-wider uppercase'>{children}</H1>
    <div className='via-primary mx-auto h-1 w-32 rounded-full bg-gradient-to-r from-transparent to-transparent' />
  </div>
)
