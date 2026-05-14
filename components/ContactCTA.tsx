const WA_URL = 'https://wa.me/31686235350?text=Hey%20TKJerseys%2C%20ik%20wil%20graag%20een%20tenue%20bestellen!'

export default function ContactCTA() {
  return (
    <section className="py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Label */}
        <span className="font-body text-xs text-gold tracking-widest3 uppercase font-medium">
          Bestellen
        </span>

        <h2 className="font-display text-[clamp(48px,8vw,112px)] leading-none mt-3 mb-6">
          <span className="text-chalk">ZAG JE IETS</span>
          <br />
          <span className="text-gold">WAT JE WIL?</span>
        </h2>

        <p className="font-body text-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Stuur ons een screenshot of de naam van het tenue via WhatsApp.
          Wij geven je de prijs en regelen de rest — inclusief naam en nummer als je dat wil.
        </p>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-pitch font-body font-bold text-base px-10 py-5 transition-all duration-200 group"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          Open WhatsApp
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>

        {/* Trust */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-40">
          {['Prijs op aanvraag', 'Snelle levering', 'Vertrouwd betalen', 'Custom mogelijk'].map((t) => (
            <span key={t} className="font-body text-xs text-muted uppercase tracking-widest">
              ✓ {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
