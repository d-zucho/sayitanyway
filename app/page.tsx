import Hero from '@/sections/home/Hero'
import Manifesto from '@/sections/home/Manifesto'
import SaidVsReality from '@/sections/home/SaidVsReality'
import FeaturedWork from '@/sections/home/FeaturedWork'
import HowWeVerify from '@/sections/home/HowWeVerify'

export default function Home() {
  return (
    <div className=''>
      <Hero />
      <Manifesto />
      <SaidVsReality />
      <FeaturedWork />
      <HowWeVerify />
    </div>
  )
}
