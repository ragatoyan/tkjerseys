'use client'

import { useEffect, useState, useCallback } from 'react'
import type { Jersey } from './JerseyCard'

const WA_URL = (name: string) =>
  `https://wa.me/31686235350?text=${encodeURIComponent(`Hey TKJerseys! Ik heb interesse in: ${name}`)}`

function proxyUrl(path: string) {
  return `/api/img?url=${encodeURIComponent(`https://photo.yupoo.com${path}`)}`
}

interface Props {
  jersey: Jersey
  onClose: () => void
}

export default function JerseyModal({ jersey, onClose }: Props) {
  const [photos, setPhotos]   = useState<string[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  // Fetch photos on mount
  useEffect(() => {
    setLoading(true)
    fetch(`/api/album?id=${jersey.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.photos?.length) {
          setPhotos(data.photos)
        } else {
          // Fallback to cover image
          const coverPath = jersey.imageUrl.replace('https://photo.yupoo.com', '')
          setPhotos([coverPath])
        }
      })
      .catch(() => {
        const coverPath = jersey.imageUrl.replace('https://photo.yupoo.com', '')
        setPhotos([coverPath])
      })
      .finally(() => setLoading(false))
  }, [jersey.id, jersey.imageUrl])

  // Keyboard navigation
  const prev = useCallback(() => setCurrent((c) => (c - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() => setCurrent((c) => (c + 1) % photos.length), [photos.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-pitch/95 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-5xl max-h-[95vh] flex flex-col md:flex-row bg-surface border border-border overflow-hidden">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-pitch/80 hover:bg-pitch border border-border text-muted hover:text-chalk transition-colors"
          aria-label="Sluiten"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ── Photo gallery ── */}
        <div className="relative flex-1 bg-elevated flex items-center justify-center min-h-[50vh] md:min-h-0">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
              <span className="font-body text-xs text-muted">Foto&apos;s laden...</span>
            </div>
          ) : (
            <>
              {/* Main photo */}
              <div className="relative w-full h-[320px] md:h-full min-h-[320px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={photos[current]}
                  src={proxyUrl(photos[current])}
                  alt={jersey.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>

              {/* Navigation arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-pitch/70 hover:bg-pitch border border-border text-chalk transition-colors"
                    aria-label="Vorige"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-pitch/70 hover:bg-pitch border border-border text-chalk transition-colors"
                    aria-label="Volgende"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Photo counter */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-pitch/70 border border-border px-3 py-1">
                    <span className="font-body text-xs text-muted">
                      {current + 1} / {photos.length}
                    </span>
                  </div>
                </>
              )}

              {/* Thumbnail strip */}
              {photos.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-2 bg-gradient-to-t from-pitch/80 overflow-x-auto">
                  {photos.map((p, i) => (
                    <button
                      key={p}
                      onClick={() => setCurrent(i)}
                      className={`flex-shrink-0 w-12 h-12 border-2 overflow-hidden transition-all ${
                        i === current ? 'border-gold' : 'border-transparent hover:border-border'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={proxyUrl(p)}
                        alt={`Foto ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Info panel ── */}
        <div className="w-full md:w-72 flex-shrink-0 flex flex-col p-6 border-t md:border-t-0 md:border-l border-border">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 border border-gold/30 bg-gold/10 px-3 py-1 mb-4 w-fit">
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span className="font-body text-[10px] text-gold tracking-widest uppercase font-medium">
              Player Version
            </span>
          </div>

          {/* Club */}
          <p className="font-body text-xs text-muted uppercase tracking-widest mb-1">{jersey.club}</p>

          {/* Name */}
          <h2 className="font-display text-2xl text-chalk leading-tight mb-2">
            {jersey.name.replace(` — ${jersey.variant}`, '')}
          </h2>

          {jersey.variant && (
            <p className="font-body text-sm text-muted mb-4">{jersey.variant}</p>
          )}

          {/* Divider */}
          <div className="w-full h-px bg-border mb-4" />

          {/* Details */}
          <div className="space-y-2 mb-6">
            {[
              { label: 'Type', value: 'Player Version' },
              { label: 'Prijs', value: 'Op aanvraag' },
              { label: 'Naam & nummer', value: 'Mogelijk' },
              { label: 'Maten', value: 'S t/m 3XL' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="font-body text-xs text-muted">{label}</span>
                <span className="font-body text-xs text-chalk font-medium">{value}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={WA_URL(jersey.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-pitch font-body font-bold text-sm px-4 py-4 transition-colors duration-200 mt-auto"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Ik wil dit tenue
          </a>
          <p className="font-body text-[10px] text-muted text-center mt-2">
            Prijs + info via WhatsApp
          </p>
        </div>
      </div>
    </div>
  )
}
