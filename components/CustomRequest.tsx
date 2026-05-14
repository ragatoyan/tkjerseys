const WA_URL =
  'https://wa.me/31686235350?text=' +
  encodeURIComponent(
    'Hey TKJerseys! Ik zoek een specifiek tenue dat ik niet in het assortiment zie staan:\n\n[Club / tenue / seizoen]\n\nKunnen jullie dit voor mij regelen?'
  )

export default function CustomRequest() {
  return (
    <div className="relative border border-gold/20 bg-elevated overflow-hidden mb-10">
      {/* Left gold accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5">
        {/* Text */}
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-9 h-9 border border-gold/30 flex items-center justify-center mt-0.5">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div>
            <div className="font-body text-[10px] text-gold uppercase tracking-widest font-medium mb-1">
              Custom Request
            </div>
            <p className="font-body text-sm text-chalk font-medium leading-snug">
              Staat jouw tenue er niet bij?
            </p>
            <p className="font-body text-xs text-muted mt-0.5 leading-relaxed max-w-md">
              Wij sourcen vrijwel elk player version tenue op aanvraag — special editions,
              uitverkochte clubs, nieuwste seizoenen. Stuur ons een berichtje en wij regelen het voor je.
            </p>
          </div>
        </div>

        {/* CTA */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-2 border border-gold/40 hover:border-gold hover:bg-gold/10 text-gold font-body font-semibold text-xs px-5 py-3 transition-all duration-200 whitespace-nowrap"
        >
          Doe een request
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}
