import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import ShortLink from '@/lib/models/ShortLink'

type RouteContext = {
  params: { shortCode: string }
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    await connectDB()
    const link = await ShortLink.findOneAndUpdate(
      { shortCode: { $regex: new RegExp(`^${escapeRegex(params.shortCode)}$`, 'i') } },
      { $inc: { clicks: 1 } },
      { new: true }
    )
      .select({ destinationUrl: 1 })
      .lean<{ destinationUrl: string } | null>()

    if (!link) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.redirect(link.destinationUrl, 302)
  } catch (error) {
    console.error('GET /api/redirect failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
