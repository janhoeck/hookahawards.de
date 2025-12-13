import { HeroSection } from './sections/hero/HeroSection'
import { CategoriesSection } from './sections/categories/CategoriesSection'

export const HomeView = async () => {
  return (
    <>
      <HeroSection className='mb-30' />
      <CategoriesSection />
    </>
  )
}
