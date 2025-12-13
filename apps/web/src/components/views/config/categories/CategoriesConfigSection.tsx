import { CategoryTableContainer } from './CategoryTableContainer'
import { CreateCategoryButton } from './creation/CreateCategoryButton'
import { H3 } from '@janhoeck/ui'

export const CategoriesConfigSection = () => {
  return (
    <section>
      <div className='flex justify-between'>
        <H3 className='mb-6'>Kategorien</H3>
        <CreateCategoryButton />
      </div>
      <CategoryTableContainer />
    </section>
  )
}
