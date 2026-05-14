export interface Jersey {
  id: string
  name: string
  variant: string
  club: string
  imageUrl: string
  albumUrl: string
  available: boolean
  rawTitle?: string
}

interface Props {
  jersey: Jersey
  onClick: (jersey: Jersey) => void
}

export default function JerseyCard({ jersey, onClick }: Props) {
  return (
    <button
      onClick={() => onClick(jersey)}
      className="jersey-card group relative block w-full text-left bg-surface border border-border hover:border-gold/30 overflow-hidden transition-all duration-300 cursor-pointer"
    >
      {/* Jersey image */}
      <div className="relative aspect-square bg-elevated overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/api/img?url=${encodeURIComponent(jersey.imageUrl)}`}
          alt={jersey.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Player version badge */}
        <div className="absolute top-3 left-3 bg-pitch/80 backdrop-blur-sm border border-gold/30 px-2 py-1">
          <span className="font-body text-[10px] text-gold uppercase tracking-widest font-medium">
            Player Version
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-pitch/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="font-body text-sm text-chalk font-medium border border-chalk/30 px-4 py-2 backdrop-blur-sm">
            Bekijk foto&apos;s →
          </span>
        </div>
      </div>

      {/* Card info */}
      <div className="p-4 border-t border-border">
        <p className="font-body text-[10px] text-muted uppercase tracking-widest mb-1">{jersey.club}</p>
        <h3 className="font-display text-lg text-chalk leading-tight group-hover:text-gold transition-colors duration-200">
          {jersey.name.replace(` — ${jersey.variant}`, '')}
        </h3>
        {jersey.variant && (
          <p className="font-body text-xs text-muted mt-1">{jersey.variant}</p>
        )}
      </div>
    </button>
  )
}
