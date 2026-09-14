import { useLenis } from './hooks/useLenis'
import { Navigation } from './components/layout/Navigation'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { EventDetails } from './components/sections/EventDetails'
import { OurStory } from './components/sections/OurStory'
import { Gallery } from './components/sections/Gallery'
import { GiftRegistry } from './components/sections/GiftRegistry'
import { RSVP } from './components/sections/RSVP'
import { SignatureReveal } from './components/ui/SignatureReveal'

export default function App() {
  useLenis()

  return (
    <div className="bg-alba-cream">
      <Navigation />
      <main>
        <Hero />
        <SignatureReveal />
        <EventDetails />
        <OurStory />
        <Gallery />
        <GiftRegistry />
        <RSVP />
      </main>
      <Footer />
    </div>
  )
}
