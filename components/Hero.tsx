const WA_URL = 'https://wa.me/31686235350?text=Hey%20TKJerseys%2C%20ik%20wil%20graag%20een%20tenue%20bestellen!'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden noise">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#C8A44A 1px, transparent 1px), linear-gradient(90deg, #C8A44A 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/10 px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="font-body text-xs text-gold tracking-widest uppercase font-medium">
            Player Version · Authentieke Pro Kwaliteit
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-display leading-none mb-6">
          <span className="block text-[clamp(72px,12vw,160px)] text-chalk tracking-widest2">
            WEAR WHAT
          </span>
          <span className="block text-[clamp(72px,12vw,160px)] gold-shimmer tracking-widest2">
            THE PROS
          </span>
          <span className="block text-[clamp(72px,12vw,160px)] text-chalk tracking-widest2">
            WEAR.
          </span>
        </h1>

        {/* Subtext */}
        <p className="font-body text-muted text-lg md:text-xl max-w-xl mb-4 leading-relaxed">
          Geen fanversie. Geen replica. Exact hetzelfde tenue dat de spelers dragen —
          inclusief jouw naam en rugnummer als jij dat wil.
        </p>

        <p className="font-body text-muted/60 text-sm mb-10 max-w-lg">
          Scroll door het assortiment. Zie iets? Stuur ons een appje met de foto.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4">
          <a
            href="#catalog"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-pitch font-body font-bold text-sm px-8 py-4 transition-all duration-200 group"
          >
            Bekijk assortiment
            <svg
              className="w-4 h-4 group-hover:translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-border hover:border-gold/50 text-chalk font-body font-medium text-sm px-8 py-4 transition-all duration-200"
          >
            Direct bestellen
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-20 flex flex-wrap gap-12">
          {[
            { value: '800+', label: 'Tenues beschikbaar' },
            { value: '100%', label: 'Player version kwaliteit' },
            { value: 'Custom', label: 'Naam & nummer mogelijk' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-4xl text-gold">{stat.value}</div>
              <div className="font-body text-xs text-muted uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-gold/40" />
      </div>
    </section>
  )
}
