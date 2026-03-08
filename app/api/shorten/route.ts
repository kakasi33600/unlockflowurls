import { nanoid } from 'nanoid'
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import ShortLink from '@/lib/models/ShortLink'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'
import { validateDestinationUrl } from '@/lib/urlSecurity'

export const dynamic = 'force-dynamic'

type LegacyBody = { url?: string }

function getBaseUrl(req: NextRequest): string {
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
  if (!isProd) return req.nextUrl.origin
  return process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin
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
            'Cache-Control': 'no-store, max-age=0',
          },
        }
      )
    }

    const body = (await req.json()) as LegacyBody

    const validation = validateDestinationUrl(body.url)
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    await connectDB()

    const shortCode = nanoid(7).toLowerCase()
    const created = await ShortLink.create({
      shortCode,
      destinationUrl: validation.url.toString(),
      title: validation.url.hostname.replace(/^www\./, ''),
    })

    const baseUrl = getBaseUrl(req)

    return NextResponse.json(
      {
        shortUrl: `${baseUrl}/${created.shortCode}`,
        shortCode: created.shortCode,
      },
      { status: 201, headers: { 'Cache-Control': 'no-store, max-age=0' } }
    )
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      if ((error as { code?: number }).code === 11000) {
        return NextResponse.json({ error: 'Short code collision, try again' }, { status: 409 })
      }
    }
    console.error('POST /api/shorten failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
