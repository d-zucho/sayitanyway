import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import MyButton from '@/components/ui/myButton'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className='py-20'>
      <MaxWidthWrapper className='border-b-2 border-black/5 pb-32'>
        <div className=''>
          <h1 className='flex flex-col font-archivo font-bold gap-4 text-[clamp(2.5rem,6vw,5rem)] leading-tight tracking-tight text-center md:text-left'>
            <span className=''>
              Question Power. Verify Facts. Protect People.
            </span>
          </h1>
          <p className='mx-auto text-center md:text-left md:mx-0 max-w-xl leading-loose mt-2 md:mt-5'>
            Independent, evidence-based journalism holding the powerful
            accountable in the digital age. We follow the receipts so you don't
            have to.
          </p>

          {/* HERO BUTTONS */}
          <div className='mt-10 flex flex-col md:flex-row gap-5 items-center justify-center md:justify-start'>
            <Link
              href={'/'}
              className={cn(
                buttonVariants({ variant: 'default' }),
                'text-sm uppercase font-semibold h-11 px-10 text-foreground',
              )}
            >
              Read latest investigations
            </Link>

            <MyButton
              href='/'
              className='bg-transparent border-black/20 text-sm uppercase text-black/80'
            >
              Explore the archive
            </MyButton>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default Hero
