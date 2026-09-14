import { ourStory } from '../../data/wedding'
import { SectionReveal } from '../ui/SectionReveal'
import { Ornament } from '../ui/Divider'

export function OurStory() {
  return (
    <section id="historia" className="bg-alba-paper px-6 py-28 md:py-36">
      <div className="mx-auto max-w-2xl text-center">
        <SectionReveal>
          <p className="font-body text-[11px] uppercase tracking-[0.4em] text-alba-muted">
            {ourStory.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl italic text-alba-ink md:text-5xl">
            {ourStory.title}
          </h2>
          <div className="mt-6 flex justify-center">
            <Ornament />
          </div>
        </SectionReveal>

        <div className="mt-14 space-y-7">
          {ourStory.paragraphs.map((paragraph, i) => (
            <SectionReveal key={i} delay={i * 0.12}>
              <p className="font-body text-base font-light leading-loose text-alba-ink/80 md:text-lg">
                {paragraph}
              </p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
