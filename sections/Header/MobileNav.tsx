'use client'

import { buttonVariants } from '@/components/ui/button'
import MyButton from '@/components/ui/myButton'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { NAV_LINKS } from '@/constants/data'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MobileNav = () => {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger
        aria-label='Open menu'
        className='inline-flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-600 focus-visible:outline-none'
      >
        <Menu />
      </SheetTrigger>
      <SheetContent className='border-l-white/10 bg-background text-foreground'>
        <SheetHeader className='relative mt-10 h-16'>
          <SheetTitle className='sr-only'>SayItAnyway</SheetTitle>
          <SheetDescription className='sr-only'>
            Question Power. Verify Facts. Protect People.
          </SheetDescription>
          <Image
            src='/sayitanyway-logo-1.svg'
            alt=''
            fill
            className='object-contain object-center'
          />
        </SheetHeader>

        <p className='px-5 font-mono text-[10.5px] tracking-[0.2em] dark:text-white/40 uppercase text-center'>
          Question Power · Verify Facts · Protect People
        </p>

        <nav className='mt-8 flex flex-col items-start gap-8 pl-5'>
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className='group relative inline-flex w-fit overflow-hidden items-center rounded-sm px-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-secondary-600 focus-visible:outline-none'
              >
                <span
                  aria-hidden
                  className={cn(
                    'siaw-redact pointer-events-none absolute inset-x-0 top-1/2 z-0 h-[1.1em] -translate-y-1/2 origin-left scale-x-0 bg-primary',
                    'group-hover:scale-x-100 group-focus-visible:scale-x-100',
                    active && 'scale-x-100',
                  )}
                />
                <span
                  className={cn(
                    'relative z-10 px-1 font-heading text-3xl font-bold tracking-tighter uppercase transition-colors duration-300',
                    'dark:text-white/70 text-text group-hover:text-secondary-600 group-focus-visible:text-secondary-600',
                    active && 'text-secondary-600',
                  )}
                >
                  {link.label}
                </span>
              </Link>
            )
          })}
        </nav>

        <SheetFooter className='gap-3'>
          <MyButton
            href='/contact'
            // className={cn(
            //   buttonVariants({ variant: 'outline' }),
            //   'inline-flex h-11 w-full items-center justify-center rounded-lg border border-black/20 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-600 focus-visible:outline-none',
            // )}
            className='bg-transparent border border-black/20 text-sm'
          >
            Sign In
          </MyButton>
          <Link
            href='/'
            className={cn(
              buttonVariants({ variant: 'default', className: 'h-10' }),
            )}
          >
            Contribute
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
