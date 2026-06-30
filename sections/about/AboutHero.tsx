import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'

const AboutHero = () => {
  return (
    <section className='py-12'>
      <MaxWidthWrapper>
        {/* Content Wrapper */}
        <div className='flex flex-col md:flex-row gap-10 max-md:text-center'>
          <div>
            <h1 className='uppercase font-inter font-bold text-accent-600'>
              Our Mission
            </h1>
            <h2 className='text-7xl font-mono max-w-lg font-bold uppercase max-md:mx-auto tracking-tighter leading-[1.1em] max-md:text-center'>
              Democracy <span className='text-accent-500/20'>through</span>{' '}
              Data.
            </h2>
          </div>
          <div className='flex items-end'>
            <div className=' max-w-xs md:max-w-[300px] text-lg text-center md:text-left mx-auto md:mx-0 max-md:pt-5 max-md:border-t-4 md:border-l-4 border-accent-600 pl-5 italic'>
              "The truth doesn't need a lobyist. It needs an architect."
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default AboutHero
