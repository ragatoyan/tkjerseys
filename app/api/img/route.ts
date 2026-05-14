import { NextRequest, NextResponse } from 'next/server'

/**
 * Image proxy — routes Yupoo image requests with the correct Referer header.
 * Usage: /api/img?url=https://photo.yupoo.com/yolo55/abc123/medium.jpg
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url || !url.startsWith('https://photo.yupoo.com/')) {
    return new NextResponse('Invalid URL', { status: 400 })
  }

  try {
    const res = await fetch(url, {
      headers: {
        Referer: 'https://yolo55.x.yupoo.com/',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
      },
      next: { revalidate: 86400 }, // cache 24h
    })

    if (!res.ok) {
      return new NextResponse('Image not found', { status: 404 })
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg'
    const buffer = await res.arrayBuffer()

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch {
    return new NextResponse('Proxy error', { status: 500 })
  }
}
