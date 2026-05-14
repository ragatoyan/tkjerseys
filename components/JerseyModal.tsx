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

  useEffect(() => {
    setLoading(true)
    setCurrent(0)
    fetch(`/api/album?id=${jersey.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.photos?.length) {
          setPhotos(data.photos)
        } else {
          setPhotos([jersey.imageUrl.replace('https://photo.yupoo.com', '')])
        }
      })
      .catch(() => {
        setPhotos([jersey.imageUrl.replace('https://photo.yupoo.com', '')])
      })
      .finally(() => setLoading(false))
  }, [jersey.id, jersey.imageUrl])

  const prev = useCallback(() => setCurrent((c) => (c - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() => setCurrent((c) => (c + 1) % photos.length), [photos.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    // Prevent body scroll while modal is open
    const prev_overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = prev_overflow
    }
  }, [onClose, prev, next])

  // Touch swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    setTouchStart(null)
  }

  const displayName = jersey.name.replace(` — ${jersey.variant}`, '')

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[100] bg-pitch/95 backdrop-blur-sm"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* ── Sticky header bar (always visible, accounts for notch/status bar) ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface/90 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
          <span className="font-body text-xs text-gold uppercase tracking-widest font-medium truncate">
            Player Version
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-2 bg-elevated border border-border px-4 py-2 text-chalk hover:bg-border transition-colors flex-shrink-0 ml-4"
          aria-label="Sluiten"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="font-body text-sm font-medium">Sluiten</span>
        </button>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex flex-col md:flex-row h-[calc(100%-57px)] overflow-y-auto md:overflow-hidden">

        {/* Photo gallery */}
        <div
          className="relative bg-elevated flex-shrink-0 md:flex-1 flex items-center justify-center"
          style={{ minHeight: '55vw', maxHeight: '60vh' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-16">
              <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
              <span className="font-body text-xs text-muted">Foto&apos;s laden...</span>
            </div>
          ) : (
            <>
              {/* Main photo */}
              <div className="relative w-full h-full" style={{ minHeight: '55vw', maxHeight: '60vh' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={photos[current]}
                  src={proxyUrl(photos[current])}
                  alt={jersey.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>

              {/* Nav arrows — only show if multiple photos */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-pitch/80 border border-border text-chalk active:bg-pitch"
                    aria-label="Vorige foto"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-pitch/80 border border-border text-chalk active:bg-pitch"
                    aria-label="Volgende foto"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Counter */}
                  <div className="absolute bottom-2 right-2 bg-pitch/70 border border-border px-2 py-0.5">
                    <span className="font-body text-xs text-muted">{current + 1}/{photos.length}</span>
                  </div>
                </>
              )}

              {/* Swipe hint on mobile — only show first time */}
              {photos.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 md:hidden">
                  <span className="font-body text-[10px] text-muted/50">← swipe →</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {photos.length > 1 && (
          <div className="flex gap-1.5 px-3 py-2 overflow-x-auto bg-pitch border-t border-b border-border md:hidden flex-shrink-0">
            {photos.map((p, i) => (
              <button
                key={p}
                onClick={() => setCurrent(i)}
                className={`flex-shrink-0 w-14 h-14 border-2 overflow-hidden transition-all ${
                  i === current ? 'border-gold' : 'border-transparent opacity-50'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={proxyUrl(p)} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        {/* Info panel */}
        <div className="w-full md:w-72 flex-shrink-0 flex flex-col p-5 md:p-6 md:border-l border-border overflow-y-auto">
          <p className="font-body text-[10px] text-muted uppercase tracking-widest mb-1">{jersey.club}</p>
          <h2 className="font-display text-2xl md:text-3xl text-chalk leading-tight mb-1">{displayName}</h2>
          {jersey.variant && (
            <p className="font-body text-sm text-muted mb-4">{jersey.variant}</p>
          )}

          <div className="w-full h-px bg-border mb-4" />

          <div className="space-y-2.5 mb-5">
            {[
              { label: 'Type',          value: 'Player Version' },
              { label: 'Prijs',         value: 'Op aanvraag' },
              { label: 'Naam & nummer', value: 'Mogelijk' },
              { label: 'Maten',         value: 'S t/m 3XL' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center">
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
          <p className="font-body text-[10px] text-muted text-center mt-2">Prijs + info via WhatsApp</p>
        </div>
      </div>
    </div>
  )
}
