import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import ShortLink from '@/lib/models/ShortLink'

type RouteContext = {
  params: { shortCode: string }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    await connectDB()
    const deleted = await ShortLink.findOneAndDelete({ shortCode: params.shortCode }).lean()

    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ ok: true }, { status: 200, headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('DELETE /api/links/[shortCode] failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
