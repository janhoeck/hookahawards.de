import { Category } from '@janhoeck/domain'
import { H2, Muted } from '@janhoeck/ui'
import { PropsWithChildren } from 'react'

type CategoryContainerProps = PropsWithChildren<{
  category: Category
}>

export const CategoryContainer = (props: CategoryContainerProps) => {
  const { category, children } = props

  return (
    <div className='flex flex-col items-center'>
      {/* Category Header */}
      <div className='mb-8 space-y-3 text-center'>
        <div className='space-y-2'>
          <H2 className='text-primary tracking-wider uppercase'>{category.title}</H2>
          <div className='via-primary mx-auto h-1 w-32 rounded-full bg-gradient-to-r from-transparent to-transparent' />
        </div>
        <Muted className='mx-auto max-w-2xl'>{category.description}</Muted>
      </div>
      {children}
    </div>
  )
}
