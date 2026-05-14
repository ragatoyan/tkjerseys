'use client'

import { useState, useMemo } from 'react'
import JerseyCard, { Jersey } from './JerseyCard'

const LEAGUES = [
  'Alles',
  'Premier League',
  'La Liga',
  'Serie A',
  'Bundesliga',
  'Ligue 1',
  'Eredivisie',
  'Nationaal team',
  'Overig',
]

const PAGE_SIZE = 48

export default function JerseyGrid({ jerseys }: { jerseys: Jersey[] }) {
  const [search, setSearch] = useState('')
  const [activeLeague, setActiveLeague] = useState('Alles')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return jerseys.filter((j) => {
      const q = search.toLowerCase()
      const matchSearch = !q || j.name.toLowerCase().includes(q) || j.club.toLowerCase().includes(q)
      const matchLeague = activeLeague === 'Alles' || j.club === activeLeague
      return matchSearch && matchLeague && j.available
    })
  }, [jerseys, search, activeLeague])

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        {/* Search */}
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

        {/* Count */}
        <div className="flex items-center">
          <span className="font-body text-xs text-muted">
            {filtered.length} tenues beschikbaar
          </span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-3xl text-muted">GEEN RESULTATEN</p>
          <p className="font-body text-sm text-muted/60 mt-2">Probeer een andere zoekterm</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {visible.map((jersey) => (
              <JerseyCard key={jersey.id} jersey={jersey} />
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
    </div>
  )
}
