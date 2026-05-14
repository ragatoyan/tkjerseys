const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Authentieke pro kwaliteit',
    body: 'Player version tenues zijn exact wat de profs dragen op het veld. Steviger stof, betere naden, strakker snit. Geen fanversie die na 3 wasbeurten inzakt.',
    highlight: 'Zelfde shirt, zelfde veld.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    title: 'Naam & rugnummer',
    body: 'Laat jouw naam of die van je favoriete speler op de rug drukken. Nummer erbij, precies zoals jij het wilt. Vertel het ons via WhatsApp — wij regelen het.',
    highlight: 'Custom printing op aanvraag.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Direct, geen retail marge',
    body: 'Geen Nike Store, geen sportwinkel. Wij gaan direct naar de bron. Jij betaalt voor het shirt — niet voor het winkelpand en het personeel.',
    highlight: 'Eerlijke prijs op aanvraag.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: '800+ tenues beschikbaar',
    body: 'Van Barcelona tot PSG, van Real Madrid tot Arsenal. Nationale teams, clubs uit de Premier League, La Liga, Serie A en meer. Altijd up-to-date assortiment.',
    highlight: 'Elk seizoen bijgewerkt.',
  },
]

export default function WhyPlayerVersion() {
  return (
    <section id="why" className="py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <span className="font-body text-xs text-gold tracking-widest3 uppercase font-medium">
            Waarom player version?
          </span>
          <h2 className="font-display text-[clamp(48px,7vw,96px)] text-chalk leading-none mt-3">
            NIET ELKE JERSEY
            <br />
            <span className="text-gold">IS GELIJK.</span>
          </h2>
          <p className="font-body text-muted text-lg max-w-2xl mt-4 leading-relaxed">
            Er zijn fanversies en er zijn player versions. Het verschil is groter dan je denkt.
          </p>
        </div>

        {/* Comparison table */}
        <div className="grid grid-cols-3 border border-border mb-16 overflow-hidden">
          <div className="p-5 bg-surface border-r border-border">
            <div className="font-body text-xs text-muted uppercase tracking-widest mb-4">Kenmerk</div>
            {['Stofkwaliteit', 'Pasvorm', 'Naden & afwerking', 'Transpiratie', 'Duurzaamheid'].map((row) => (
              <div key={row} className="py-3 border-t border-border font-body text-sm text-chalk">{row}</div>
            ))}
          </div>
          <div className="p-5 bg-surface border-r border-border">
            <div className="font-body text-xs text-muted uppercase tracking-widest mb-4">Fan versie</div>
            {['Polyester basis', 'Los / standaard', 'Eenvoudig', 'Beperkt', 'Matig'].map((val) => (
              <div key={val} className="py-3 border-t border-border font-body text-sm text-muted">{val}</div>
            ))}
          </div>
          <div className="p-5 bg-elevated relative">
            <div className="absolute top-0 right-0 bg-gold text-pitch font-body text-[10px] font-bold uppercase tracking-widest px-3 py-1">
              TKJerseys
            </div>
            <div className="font-body text-xs text-gold uppercase tracking-widest mb-4">Player version</div>
            {['Dri-FIT technologie', 'Body-mapped snit', 'Professioneel', 'Hoog', 'Uitstekend'].map((val) => (
              <div key={val} className="py-3 border-t border-border font-body text-sm text-chalk font-medium">{val}</div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="border border-border bg-surface p-8 hover:border-gold/30 hover:bg-elevated transition-all duration-300 group"
            >
              <div className="text-gold mb-4 group-hover:scale-110 transition-transform duration-200 inline-block">
                {f.icon}
              </div>
              <h3 className="font-display text-2xl text-chalk tracking-widest mb-2">{f.title}</h3>
              <p className="font-body text-muted text-sm leading-relaxed mb-4">{f.body}</p>
              <span className="font-body text-xs text-gold uppercase tracking-widest font-medium">
                → {f.highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
