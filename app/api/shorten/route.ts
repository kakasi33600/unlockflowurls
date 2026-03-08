import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import ShortLink from '@/lib/models/ShortLink'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'
import { validateDestinationUrl } from '@/lib/urlSecurity'

type ShortenBody = { url?: string }

function buildShortUrl(req: NextRequest, shortCode: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin
  return `${base}/${shortCode}`
}

function extractTitle(parsedUrl: URL): string {
  return parsedUrl.hostname.replace(/^www\./, '')
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers)
    const rate = checkRateLimit(ip, 20, 60_000)
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please retry shortly.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rate.retryAfterSec),
            'Cache-Control': 'no-store',
          },
        }
      )
    }

    const body = (await req.json()) as ShortenBody
    const validation = validateDestinationUrl(body.url)
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    await connectDB()

    let shortCode = ''
    for (let attempt = 0; attempt < 8; attempt += 1) {
      shortCode = crypto.randomBytes(4).toString('base64url')
      const existing = await ShortLink.findOne({ shortCode }).lean()
      if (!existing) break
      shortCode = ''
    }

    if (!shortCode) {
      return NextResponse.json({ error: 'Could not allocate short code' }, { status: 500 })
    }

    await ShortLink.create({
      shortCode,
      destinationUrl: validation.url.toString(),
      title: extractTitle(validation.url),
      clicks: 0,
    })

    return NextResponse.json(
      { shortUrl: buildShortUrl(req, shortCode) },
      {
        status: 201,
        headers: { 'Cache-Control': 'no-store' },
      }
    )
  } catch (error) {
    console.error('POST /api/shorten failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
