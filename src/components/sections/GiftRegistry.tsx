import { giftRegistry } from '../../data/wedding'
import { SectionReveal } from '../ui/SectionReveal'
import { Ornament } from '../ui/Divider'

export function GiftRegistry() {
  return (
    <section id="regalos" className="bg-alba-paper px-6 py-28 md:py-36">
      <div className="mx-auto max-w-xl text-center">
        <SectionReveal>
          <p className="font-body text-[11px] uppercase tracking-[0.4em] text-alba-muted">
            {giftRegistry.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl italic text-alba-ink md:text-5xl">
            {giftRegistry.title}
          </h2>
          <div className="mt-6 flex justify-center">
            <Ornament />
          </div>

          <p className="mx-auto mt-8 max-w-md font-body text-base font-light leading-loose text-alba-ink/75">
            {giftRegistry.paragraph}
          </p>

          <a
            href="#rsvp"
            className="mt-10 inline-block border border-alba-ink/40 px-10 py-4 font-body text-[11px] uppercase tracking-[0.35em] text-alba-ink transition-colors hover:border-alba-ink hover:bg-alba-ink hover:text-alba-cream"
          >
            {giftRegistry.cta}
          </a>

          <p className="mx-auto mt-8 max-w-sm font-body text-xs font-light text-alba-muted">
            {giftRegistry.note}
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
