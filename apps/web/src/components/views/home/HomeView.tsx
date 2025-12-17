import { CategoriesSection } from './sections/categories/CategoriesSection'
import { HeroSection } from './sections/hero/HeroSection'

export const HomeView = () => {
  return (
    <>
      <HeroSection className='mb-30' />
      <CategoriesSection />
    </>
  )
}
