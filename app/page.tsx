import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhyPlayerVersion from '@/components/WhyPlayerVersion'
import CustomBanner from '@/components/CustomBanner'
import JerseyGrid from '@/components/JerseyGrid'
import ContactCTA from '@/components/ContactCTA'
import inventoryData from '@/data/inventory.json'
import type { Jersey } from '@/components/JerseyCard'

export default function Home() {
  const jerseys = inventoryData as Jersey[]

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <WhyPlayerVersion />
        <CustomBanner />

        {/* Catalog section */}
        <section id="catalog" className="py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-12">
              <span className="font-body text-xs text-gold tracking-widest3 uppercase font-medium">
                Assortiment
              </span>
              <h2 className="font-display text-[clamp(48px,7vw,96px)] text-chalk leading-none mt-3">
                HET ASSORTIMENT.
              </h2>
              <p className="font-body text-muted text-base max-w-xl mt-3 leading-relaxed">
                Scroll door het volledige aanbod. Zie iets? Stuur ons een berichtje via WhatsApp
                met de naam of een screenshot — geen bestelformulier, geen gedoe.
              </p>
            </div>

            {jerseys.length === 0 ? (
              <div className="py-24 text-center border border-border">
                <div className="font-display text-4xl text-muted mb-3">ASSORTIMENT</div>
                <p className="font-body text-muted text-sm">
                  Scraper nog niet gedraaid. Voer{' '}
                  <code className="bg-surface px-2 py-1 text-gold text-xs">npm run scrape</code> uit.
                </p>
              </div>
            ) : (
              <JerseyGrid jerseys={jerseys} />
            )}
          </div>
        </section>

        <ContactCTA />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl text-chalk tracking-widest2">TK</span>
            <span className="font-display text-xl text-gold tracking-widest2">JERSEYS</span>
          </div>
          <p className="font-body text-xs text-muted">
            Player Version Voetbaltenues · Amsterdam
          </p>
          <p className="font-body text-xs text-muted">
            © {new Date().getFullYear()} TKJerseys
          </p>
        </div>
      </footer>
    </>
  )
}
