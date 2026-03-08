function isPrivateIpv4(host: string): boolean {
  const match = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)
  if (!match) return false

  const octets = match.slice(1).map(Number)
  if (octets.some((part) => Number.isNaN(part) || part < 0 || part > 255)) {
    return false
  }

  const [a, b] = octets
  if (a === 10 || a === 127) return true
  if (a === 172 && b >= 16 && b <= 31) return true
  if (a === 192 && b === 168) return true
  if (a === 169 && b === 254) return true
  return false
}

function isBlockedHost(hostname: string): boolean {
  const host = hostname.toLowerCase()
  if (!host || host === 'localhost') return true
  if (host.endsWith('.local') || host.endsWith('.internal')) return true
  if (host === '::1' || host.startsWith('fe80:') || host.startsWith('fc') || host.startsWith('fd')) {
    return true
  }
  return isPrivateIpv4(host)
}

export function validateDestinationUrl(raw: unknown): { ok: true; url: URL } | { ok: false; error: string } {
  if (typeof raw !== 'string' || !raw.trim()) {
    return { ok: false, error: 'url is required' }
  }

  let parsed: URL
  try {
    parsed = new URL(raw.trim())
  } catch {
    return { ok: false, error: 'Invalid URL format' }
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return { ok: false, error: 'Only http/https URLs are allowed' }
  }

  if (parsed.username || parsed.password) {
    return { ok: false, error: 'URLs with credentials are not allowed' }
  }

  if (isBlockedHost(parsed.hostname)) {
    return { ok: false, error: 'Destination host is not allowed' }
  }

  return { ok: true, url: parsed }
}
