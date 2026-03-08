import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { incrementLinkClicks, resolveLinkByCode } from '@/lib/linkResolver'

type RouteContext = {
  params: { shortCode: string }
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    await connectDB()
    const link = await resolveLinkByCode(params.shortCode)

    if (!link) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    await incrementLinkClicks(link)
    return NextResponse.redirect(link.destinationUrl, 302)
  } catch (error) {
    console.error('GET /api/redirect failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
