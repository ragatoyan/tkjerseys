'use client'

import { useState, useMemo } from 'react'
import JerseyCard, { Jersey } from './JerseyCard'
import JerseyModal from './JerseyModal'
import CustomRequest from './CustomRequest'

const PAGE_SIZE = 48

export default function JerseyGrid({ jerseys }: { jerseys: Jersey[] }) {
  const [search, setSearch]           = useState('')
  const [page, setPage]               = useState(1)
  const [selected, setSelected]       = useState<Jersey | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return jerseys.filter((j) => {
      if (!j.available) return false
      if (!q) return true
      return (
        j.name.toLowerCase().includes(q) ||
        j.club.toLowerCase().includes(q) ||
        j.variant.toLowerCase().includes(q) ||
        ((j as Jersey & { rawTitle?: string }).rawTitle ?? '').toLowerCase().includes(q)
      )
    })
  }, [jerseys, search])

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

  return (
    <>
      {/* Modal */}
      {selected && (
        <JerseyModal jersey={selected} onClose={() => setSelected(null)} />
      )}

      {/* Custom request banner */}
      <CustomRequest />

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1 max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Zoek op club of land..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full bg-surface border border-border pl-10 pr-4 py-3 font-body text-sm text-chalk placeholder-muted focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>
        <div className="flex items-center">
          <span className="font-body text-xs text-muted">
            {filtered.length} tenues beschikbaar
          </span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center border border-border">
          <p className="font-display text-3xl text-muted mb-2">NIET GEVONDEN</p>
          <p className="font-body text-sm text-muted/60 mb-6">
            &ldquo;{search}&rdquo; staat niet in ons huidige assortiment.
          </p>
          <a
            href={`https://wa.me/31686235350?text=${encodeURIComponent(`Hey TKJerseys! Ik zoek: ${search} — kunnen jullie dit voor mij regelen?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-pitch font-body font-bold text-sm px-6 py-3"
          >
            Vraag het direct aan
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <p className="font-body text-xs text-muted/50 mt-3">Wij sourcen vrijwel elk tenue op aanvraag</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {visible.map((jersey) => (
              <JerseyCard
                key={jersey.id}
                jersey={jersey}
                onClick={setSelected}
              />
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="inline-flex items-center gap-2 border border-border hover:border-gold/40 text-chalk font-body text-sm px-8 py-4 transition-all duration-200 hover:bg-surface"
              >
                Laad meer tenues
                <span className="text-muted text-xs">({filtered.length - visible.length} resterend)</span>
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}
