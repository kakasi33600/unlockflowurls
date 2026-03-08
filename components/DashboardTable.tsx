'use client'

import { useMemo, useState } from 'react'

export type DashboardLink = {
  shortCode: string
  destinationUrl: string
  clicks: number
  createdAt: string
}

type Props = {
  links: DashboardLink[]
}

export default function DashboardTable({ links }: Props) {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState(links)
  const [page, setPage] = useState(1)
  const pageSize = 20

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (item) => item.shortCode.toLowerCase().includes(q) || item.destinationUrl.toLowerCase().includes(q)
    )
  }, [items, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page])

  async function deleteLink(shortCode: string) {
    const ok = window.confirm(`Delete ${shortCode}?`)
    if (!ok) return

    const res = await fetch(`/api/links/${shortCode}`, { method: 'DELETE' })
    if (!res.ok) {
      alert('Delete failed')
      return
    }

    setItems((current) => current.filter((item) => item.shortCode !== shortCode))
  }

  function onSearch(value: string) {
    setQuery(value)
    setPage(1)
  }

  if (!items.length) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
          No links yet
        </p>
        <p className="mt-2 text-sm text-[--text-muted]">Create your first unlock link from the homepage.</p>
        <a href="/" className="primary-cta mt-5 inline-flex">
          Create First Link
        </a>
      </div>
    )
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-white/10 p-4">
        <input
          value={query}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search by shortcode or destination"
          className="h-11 w-full rounded-lg border border-white/15 bg-black/35 px-4"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="border-b border-white/10 text-left text-[--text-muted]">
            <tr>
              <th className="px-4 py-3">Shortcode</th>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Clicks</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((link) => (
              <tr key={link.shortCode} className="border-b border-white/5">
                <td className="px-4 py-3 mono">{link.shortCode}</td>
                <td className="max-w-[320px] truncate px-4 py-3 text-[--text-muted]">{link.destinationUrl}</td>
                <td className="px-4 py-3">{link.clicks}</td>
                <td className="px-4 py-3 text-[--text-muted]">{new Date(link.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${link.shortCode}`)}
                      className="rounded-md border border-white/15 px-2 py-1"
                    >
                      Copy
                    </button>
                    <button onClick={() => deleteLink(link.shortCode)} className="rounded-md border border-red-400/35 px-2 py-1 text-red-300">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs text-[--text-muted]">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-md border border-white/15 px-3 py-1 disabled:opacity-40"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="rounded-md border border-white/15 px-3 py-1 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
