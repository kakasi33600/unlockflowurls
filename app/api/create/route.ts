import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Url from '@/lib/models/Url'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { originalUrl } = await req.json()
    
    if (!originalUrl) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }
    try {
      new URL(originalUrl)
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    await connectDB()
    let shortCode = ''
    let isUnique = false
    let attempts = 0
    while (!isUnique && attempts < 10) {
      shortCode = crypto.randomBytes(4).toString('hex')
      const existing = await Url.findOne({ shortCode })
      if (!existing) isUnique = true
      attempts++
    }
    if (!isUnique) {
      return NextResponse.json({ error: 'Could not generate unique short code' }, { status: 500 })
    }

    await Url.create({ shortCode, originalUrl, clicks: 0 })

    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${shortCode}`
    
    return NextResponse.json({ shortUrl, shortCode })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to create short URL' }, { status: 500 })
  }
}
