'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import MyButton from '@/components/ui/myButton'
import { NAV_LINKS } from '@/constants/data'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import MobileNav from './MobileNav'
import { Button, buttonVariants } from '@/components/ui/button'

const Header = () => {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className='sticky top-0 z-50'>
      {/* Utility strip — quiet mono "dispatch desk" texture. */}
      <div className='hidden border-b border-black/5 bg-background md:block'>
        <MaxWidthWrapper>
          <div className='flex h-8 items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.2em] text-foreground/50'>
            <span>Question Power · Verify Facts · Protect People</span>
            <Link
              href='/contact'
              className='group inline-flex items-center gap-2 rounded-sm transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none'
            >
              <span
                aria-hidden
                className='h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse'
              />
              Secure tip line
            </Link>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* Masthead bar. */}
      <div
        className={cn(
          'bg-background dark:bg-secondary-600 transition-[box-shadow,border-color,background-color] duration-300',
          scrolled
            ? 'siaw-plate border-b border-white/10 supports-backdrop-filter:bg-white/20 supports-backdrop-filter:backdrop-blur-md'
            : 'border-b border-transparent',
        )}
      >
        <MaxWidthWrapper>
          <div className='flex h-16 items-center justify-between gap-6'>
            {/* Logo — rendered monochrome white on the ink bar. */}
            <Link
              href='/'
              aria-label='SayItAnyway home'
              className='shrink-0 rounded-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-secondary-600 focus-visible:outline-none'
            >
              <Image
                src='/sayitanyway-logo-1.svg'
                alt='SayItAnyway'
                width={150}
                height={51}
                priority
                className='h-7 w-auto sm:h-8'
              />
            </Link>

            {/* Primary nav with the redaction-marker signature. */}
            <nav className='hidden items-center gap-1 lg:flex'>
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className='group relative inline-flex items-center rounded-sm px-2.5 py-1.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-600 focus-visible:outline-none transition-all'
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'siaw-redact pointer-events-none absolute inset-x-1.5 top-1/2 z-0 h-1 -translate-y-1/2 origin-left scale-x-0 bg-primary',
                        'group-hover:scale-x-100 group-focus-visible:scale-x-100',
                        active && 'scale-x-100',
                      )}
                    />
                    <span
                      className={cn(
                        'relative z-10 font-heading text-[13px] font-semibold tracking-[0.12em] uppercase transition-colors duration-300',
                        'text-black/65 group-hover:text-secondary-600 group-focus-visible:text-secondary-600 transition-all',
                        active && 'text-secondary-600',
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                )
              })}
            </nav>

            {/* CTAs. */}
            <div className='hidden items-center gap-3 lg:flex'>
              {/* <Link
                href='/'
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'inline-flex h-10 items-center rounded-lg border-2 border-black/20 px-5 text-sm font-medium text-text/85 transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-600 focus-visible:outline-none',
                )}
              >
                Sign In
              </Link> */}
              <MyButton
                href='/'
                className='bg-transparent border border-black/20 text-sm'
              >
                Sign In
              </MyButton>
              <Link href='/' className={cn(buttonVariants(), 'h-11 px-7')}>
                Support
              </Link>
            </div>

            <div className='lg:hidden'>
              <MobileNav />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </header>
  )
}

export default Header
