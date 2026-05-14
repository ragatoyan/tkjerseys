import { NextRequest, NextResponse } from 'next/server'

const YUPOO_BASE = 'https://yolo55.x.yupoo.com'
const PHOTO_BASE = 'https://photo.yupoo.com'

/**
 * Server-side album photo fetcher.
 * Fetches the Yupoo album page with correct headers,
 * extracts all full-resolution photo paths,
 * and returns them as clean relative paths.
 *
 * The client NEVER sees a Yupoo URL — only /api/img?url=... proxied paths.
 *
 * Usage: GET /api/album?id=232707820
 * Returns: { photos: ["/yolo55/abc/def.jpg", ...] }
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  if (!id || !/^\d+$/.test(id)) {
    return NextResponse.json({ error: 'Invalid album id' }, { status: 400 })
  }

  try {
    const url = `${YUPOO_BASE}/albums/${id}?uid=1`

    const res = await fetch(url, {
      headers: {
        Referer: `${YUPOO_BASE}/`,
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'nl,en;q=0.9',
      },
      next: { revalidate: 86400 }, // cache 24h per album
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 })
    }

    const html = await res.text()

    // Extract full-res photo paths: photo.yupoo.com/yolo55/ALBUMHASH/FILEHASH.jpg
    // These are the actual high-res photos (8-char hex IDs), not thumbnails (medium/small/large)
    const pattern = /https:\/\/photo\.yupoo\.com\/(yolo55\/[a-f0-9]{8}\/[a-f0-9]{8}\.jpg)/gi
    const matches = html.matchAll(pattern)
    const seen = new Set<string>()
    const photos: string[] = []

    for (const match of matches) {
      const path = '/' + match[1]
      if (!seen.has(path)) {
        seen.add(path)
        photos.push(path)
      }
    }

    // Fallback: if no full-res found, try medium thumbnails
    if (photos.length === 0) {
      const thumbPattern = /https:\/\/photo\.yupoo\.com\/(yolo55\/[a-f0-9]{8}\/medium\.jpg)/gi
      const thumbMatches = html.matchAll(thumbPattern)
      for (const match of thumbMatches) {
        const path = '/' + match[1]
        if (!seen.has(path)) {
          seen.add(path)
          photos.push(path)
        }
      }
    }

    return NextResponse.json(
      { photos },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
        },
      }
    )
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
  }
}
