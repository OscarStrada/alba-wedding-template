import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { couple } from '../../data/wedding'
import { cn } from '../../lib/utils'

const LINKS = [
  { href: '#evento', label: 'Evento' },
  { href: '#historia', label: 'Historia' },
  { href: '#galeria', label: 'Galería' },
  { href: '#regalos', label: 'Regalos' },
  { href: '#rsvp', label: 'Confirmar' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'bg-alba-cream/90 backdrop-blur-sm py-4 shadow-[0_1px_0_0_rgba(27,26,23,0.08)]' : 'py-7',
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10">
        <a href="#top" className="font-display italic text-lg tracking-wide text-alba-ink">
          {couple.bride[0]}
          <span className="mx-1 text-alba-muted">&</span>
          {couple.groom[0]}
        </a>

        <ul className="hidden gap-10 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-[11px] uppercase tracking-[0.25em] text-alba-ink/80 transition-colors hover:text-alba-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span className={cn('h-px w-6 bg-alba-ink transition-transform', open && 'translate-y-[3.5px] rotate-45')} />
          <span className={cn('h-px w-6 bg-alba-ink transition-transform', open && '-translate-y-[3.5px] -rotate-45')} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden"
          >
            <ul className="flex flex-col items-center gap-6 py-8">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-body text-xs uppercase tracking-[0.25em] text-alba-ink/80"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
