import { events, dressCode, couple } from '../../data/wedding'
import { SectionReveal } from '../ui/SectionReveal'
import { Divider, Ornament } from '../ui/Divider'

export function EventDetails() {
  return (
    <section id="evento" className="bg-alba-cream px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionReveal className="text-center">
          <p className="font-body text-[11px] uppercase tracking-[0.4em] text-alba-muted">
            {couple.weddingDateDisplay}
          </p>
          <h2 className="mt-4 font-display text-4xl italic text-alba-ink md:text-5xl">
            El gran día
          </h2>
          <div className="mt-6 flex justify-center">
            <Ornament />
          </div>
        </SectionReveal>

        <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-10">
          {events.map((event, i) => (
            <SectionReveal key={event.id} delay={i * 0.15}>
              <div className="group flex flex-col items-center text-center">
                <div className="relative mb-8 h-72 w-full max-w-sm overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.venue}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale-[15%] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-alba-ink/10" />
                </div>

                <p className="font-body text-[11px] uppercase tracking-[0.35em] text-alba-muted">
                  {event.time}
                </p>
                <h3 className="mt-3 font-display text-2xl italic text-alba-ink md:text-3xl">
                  {event.title}
                </h3>
                <Divider className="my-5" />
                <p className="font-body text-base text-alba-ink">{event.venue}</p>
                <p className="mt-1 font-body text-sm text-alba-muted">{event.address}</p>
                <p className="mx-auto mt-5 max-w-xs font-body text-sm font-light leading-relaxed text-alba-ink/70">
                  {event.description}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapsQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 font-body text-[11px] uppercase tracking-[0.3em] text-alba-ink underline decoration-alba-ink/30 underline-offset-4 transition-colors hover:decoration-alba-ink"
                >
                  Ver ubicación
                </a>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3} className="mx-auto mt-24 max-w-md text-center">
          <p className="font-body text-[11px] uppercase tracking-[0.35em] text-alba-muted">
            {dressCode.title}
          </p>
          <p className="mt-3 font-display text-2xl italic text-alba-ink">{dressCode.value}</p>
          <p className="mx-auto mt-4 max-w-xs font-body text-sm font-light text-alba-ink/60">
            {dressCode.note}
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
