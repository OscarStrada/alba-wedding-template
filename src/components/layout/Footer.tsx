import { footer } from '../../data/wedding'
import { Ornament } from '../ui/Divider'

export function Footer() {
  return (
    <footer className="border-t border-alba-ink/10 bg-alba-cream px-6 py-16 text-center">
      <p className="font-display italic text-3xl text-alba-ink md:text-4xl">{footer.namesLine}</p>
      <p className="mt-3 font-body text-xs uppercase tracking-[0.35em] text-alba-muted">{footer.dateLine}</p>

      <div className="my-8 flex justify-center">
        <Ornament />
      </div>

      <p className="mx-auto max-w-md font-body text-sm font-light text-alba-ink/70">{footer.message}</p>
      <p className="mt-2 font-display italic text-sm text-alba-ink/60">{footer.signature}</p>

      <p className="mt-12 font-body text-[10px] uppercase tracking-[0.3em] text-alba-muted/70">
        Diseño — Khutz Studio
      </p>
    </footer>
  )
}
