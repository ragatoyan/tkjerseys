const WA_URL = 'https://wa.me/31686235350?text=Hey%20TKJerseys%2C%20ik%20wil%20een%20naam%20en%2For%20nummer%20laten%20drukken!'

export default function CustomBanner() {
  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden border border-gold/20 bg-surface">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #C8A44A 0, #C8A44A 1px, transparent 0, transparent 50%)`,
              backgroundSize: '20px 20px',
            }}
          />
          {/* Gold side accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-14">
            <div>
              <span className="font-body text-xs text-gold uppercase tracking-widest3 font-medium">
                Custom printing
              </span>
              <h2 className="font-display text-[clamp(36px,5vw,72px)] text-chalk leading-none mt-2 mb-4">
                JOUW NAAM.
                <br />
                JOUW NUMMER.
              </h2>
              <p className="font-body text-muted text-base max-w-lg leading-relaxed">
                Laat elke jersey personaliseren met je eigen naam of die van je favoriete speler,
                inclusief rugnummer. Precies zoals het op het veld zit — professioneel gedrukt,
                strak afgewerkt. Geef het gewoon aan in je berichtje.
              </p>

              {/* Steps */}
              <div className="mt-8 flex flex-col sm:flex-row gap-6">
                {[
                  { n: '01', text: 'Kies een tenue uit het assortiment' },
                  { n: '02', text: 'Stuur ons een berichtje via WhatsApp' },
                  { n: '03', text: 'Geef naam + nummer door (optioneel)' },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-3">
                    <span className="font-display text-3xl text-gold/40 leading-none">{step.n}</span>
                    <p className="font-body text-sm text-muted leading-snug pt-1">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-pitch font-body font-bold text-sm px-8 py-5 transition-all duration-200 whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Bestellen via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
