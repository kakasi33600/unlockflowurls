import ShortLink from '@/lib/models/ShortLink'
import LegacyUrl from '@/lib/models/LegacyUrl'
import { escapeRegex } from '@/lib/shortCode'

export type ResolvedLink = {
  shortCode: string
  destinationUrl: string
  source: 'shortlink' | 'legacy'
  id: string
}

export async function resolveLinkByCode(rawCode: string): Promise<ResolvedLink | null> {
  const code = rawCode.trim()
  const regex = new RegExp(`^${escapeRegex(code)}$`, 'i')

  const modern = await ShortLink.findOne({ shortCode: { $regex: regex } })
    .select({ _id: 1, shortCode: 1, destinationUrl: 1 })
    .lean<{ _id: string; shortCode: string; destinationUrl: string } | null>()

  if (modern) {
    return {
      shortCode: modern.shortCode,
      destinationUrl: modern.destinationUrl,
      source: 'shortlink',
      id: modern._id,
    }
  }

  const legacy = await LegacyUrl.findOne({
    $or: [{ shortCode: { $regex: regex } }, { slug: { $regex: regex } }],
  })
    .select({ _id: 1, shortCode: 1, slug: 1, originalUrl: 1 })
    .lean<{ _id: string; shortCode?: string; slug?: string; originalUrl?: string } | null>()

  if (!legacy || !legacy.originalUrl) return null

  return {
    shortCode: (legacy.shortCode || legacy.slug || code).toLowerCase(),
    destinationUrl: legacy.originalUrl,
    source: 'legacy',
    id: legacy._id,
  }
}

export async function incrementLinkClicks(link: ResolvedLink): Promise<void> {
  if (link.source === 'shortlink') {
    await ShortLink.findByIdAndUpdate(link.id, { $inc: { clicks: 1 } }).exec()
    return
  }

  await LegacyUrl.findByIdAndUpdate(link.id, {
    $inc: { clicks: 1, clickCount: 1 },
  }).exec()
}
