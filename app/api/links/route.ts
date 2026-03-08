import { nanoid } from 'nanoid'
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import ShortLink from '@/lib/models/ShortLink'
import { validateDestinationUrl } from '@/lib/urlSecurity'

export const dynamic = 'force-dynamic'

function getBaseUrl(req: NextRequest): string {
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
  if (!isProd) return req.nextUrl.origin
  return process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

type CreateLinkBody = {
  destinationUrl?: string
  title?: string
}

type DeleteLinkBody = {
  shortCode?: string
}

export async function GET() {
  try {
    await connectDB()
    const links = await ShortLink.find({}).sort({ createdAt: -1 }).limit(100).lean()
    return NextResponse.json({ links }, { status: 200, headers: { 'Cache-Control': 'no-store, max-age=0' } })
  } catch (error) {
    console.error('GET /api/links failed:', error)
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateLinkBody
    const { destinationUrl, title = '' } = body

    if (!destinationUrl) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const validation = validateDestinationUrl(destinationUrl)
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    await connectDB()

    const shortCode = nanoid(7).toLowerCase()
    const link = await ShortLink.create({
      shortCode,
      destinationUrl: validation.url.toString(),
      title,
    })

    const baseUrl = getBaseUrl(req)
    return NextResponse.json(
      {
        success: true,
        shortUrl: `${baseUrl}/${link.shortCode}`,
        shortCode: link.shortCode,
        link,
      },
      { status: 201, headers: { 'Cache-Control': 'no-store, max-age=0' } }
    )
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const maybeCode = (error as { code?: number }).code
      if (maybeCode === 11000) {
        return NextResponse.json({ error: 'Short code collision, try again' }, { status: 409 })
      }
    }
    console.error('POST /api/links failed:', error)
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = (await req.json()) as DeleteLinkBody
    const shortCode = body.shortCode?.trim()

    if (!shortCode) {
      return NextResponse.json({ error: 'shortCode is required' }, { status: 400 })
    }

    await connectDB()
    await ShortLink.deleteOne({ shortCode: { $regex: new RegExp(`^${escapeRegex(shortCode)}$`, 'i') } })

    return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store, max-age=0' } })
  } catch (error) {
    console.error('DELETE /api/links failed:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
