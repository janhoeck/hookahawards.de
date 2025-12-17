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
      <div className='text-center mb-8 space-y-3'>
        <div className='space-y-2'>
          <H2 className='tracking-wider text-primary uppercase'>{category.title}</H2>
          <div className='h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent rounded-full' />
        </div>
        <Muted className='max-w-2xl mx-auto'>{category.description}</Muted>
      </div>
      {children}
    </div>
  )
}
