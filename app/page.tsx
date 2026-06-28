import Hero from '@/sections/home/Hero'
import Manifesto from '@/sections/home/Manifesto'
import SaidVsReality from '@/sections/home/SaidVsReality'
import FeaturedWork from '@/sections/home/FeaturedWork'

export default function Home() {
  return (
    <div className=''>
      <Hero />
      <Manifesto />
      <SaidVsReality />
      <FeaturedWork />
    </div>
  )
}
