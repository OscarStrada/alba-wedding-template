import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import { AnimatedText } from '../ui/AnimatedText'
import { useCountdown } from '../../hooks/useCountdown'
import { couple } from '../../data/wedding'

const WEDDING_DATE = new Date(couple.weddingDateISO)

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo(
        '.hero-bg',
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.2, ease: 'power2.out' },
      )
        .fromTo(
          '.hero-line',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'power3.inOut' },
          '-=1.4',
        )
        .fromTo('.hero-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo('.hero-names', { opacity: 0 }, { opacity: 1, duration: 0.1 }, '-=0.3')
        .fromTo(
          '.hero-date',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '+=0.3',
        )
        .fromTo('.hero-count', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3')
    },
    { scope: containerRef },
  )

  const { days, hours, minutes, seconds, isPast } = useCountdown(WEDDING_DATE)

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-alba-ink"
    >
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center opacity-0"
        style={{ backgroundImage: "url('/gallery/hero-candles.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-alba-ink/55 via-alba-ink/35 to-alba-ink/70" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="hero-eyebrow font-body text-[11px] uppercase tracking-[0.45em] text-alba-cream/80 opacity-0">
          Nos casamos
        </p>

        <div className="hero-line mx-auto my-6 h-px w-16 origin-center scale-x-0 bg-alba-cream/70" />

        <div className="hero-names opacity-0">
          <AnimatedText
            as="h1"
            text={couple.fullNames}
            className="font-display text-6xl italic leading-none text-alba-cream sm:text-7xl md:text-8xl lg:text-9xl"
          />
        </div>

        <p className="hero-date mt-8 font-body text-xs uppercase tracking-[0.4em] text-alba-cream/85 opacity-0 md:text-sm">
          {couple.weddingDateDisplay}
        </p>

        <div className="hero-count mt-14 flex gap-6 opacity-0 sm:gap-10 md:gap-14">
          {(
            [
              ['Días', days],
              ['Horas', hours],
              ['Min', minutes],
              ['Seg', seconds],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-display text-3xl text-alba-cream sm:text-4xl md:text-5xl">
                {isPast ? '00' : String(value).padStart(2, '0')}
              </span>
              <span className="mt-2 font-body text-[9px] uppercase tracking-[0.3em] text-alba-cream/70">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="h-10 w-px bg-alba-cream/60" />
      </motion.div>
    </section>
  )
}
