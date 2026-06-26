import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'

/*
  The one Subscribe CTA, used identically in nav, hero, and overlay.
  Nested icon-chip (button-in-button) with press physics. Sharp corners keep
  it editorial rather than soft-pill. Single accent, one label everywhere.
*/
export function CtaButton({
  href,
  onClick,
  size = 'md',
  className = '',
}: {
  href: string
  onClick?: () => void
  size?: 'md' | 'lg'
  className?: string
}) {
  const pad =
    size === 'lg' ? 'py-2.5 pr-2.5 pl-6 text-base' : 'py-2 pr-2 pl-4 text-sm'
  const chip = size === 'lg' ? 'h-9 w-9' : 'h-7 w-7'
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group bg-primary text-accent-ink inline-flex items-center gap-3 font-semibold transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0 ${pad} ${className}`}
    >
      Subscribe
      <span
        className={`bg-accent-ink/10 flex items-center justify-center transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${chip}`}
      >
        <ArrowRightIcon size={size === 'lg' ? 18 : 15} weight='bold' />
      </span>
    </a>
  )
}
