'use client'

import Link from 'next/link'
import { useState } from 'react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleShorten = async () => {
    if (!url || loading) return

    setLoading(true)
    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: url }),
      })

      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Failed to shorten URL')
        return
      }

      setShortUrl(data.shortUrl)
    } catch {
      alert('Network error while creating short URL')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!shortUrl) return
    await navigator.clipboard.writeText(shortUrl)
    alert('Copied to clipboard!')
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="hero">
        <div className="max-w-4xl mx-auto px-4">
          <h1>
            Shorten URLs & <span className="gradient-text">Earn Money</span>
          </h1>
          <p>
            Transform your long URLs into powerful short links that generate revenue through
            our innovative multi-step redirect system.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4 mb-6">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleShorten()}
                placeholder="Enter your long URL here..."
                className="flex-1 px-4 py-3 rounded-xl border-none shadow-md text-gray-800 outline-none"
              />
              <button
                onClick={handleShorten}
                disabled={loading}
                className="px-8 py-3 bg-white text-[var(--primary-color)] rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Shorten URL'}
              </button>
            </div>
            {shortUrl && (
              <div className="flex gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl">
                <input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="flex-1 px-4 py-2 rounded-lg bg-white text-gray-800"
                />
                <button
                  onClick={handleCopy}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Copy
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white p-8 rounded-xl shadow-md">
            <div className="text-5xl font-bold mb-2" style={{ color: 'var(--primary-color)' }}>
              10K+
            </div>
            <div className="text-gray-600 font-medium">URLs Shortened</div>
          </div>
          <div className="text-center bg-white p-8 rounded-xl shadow-md">
            <div className="text-5xl font-bold mb-2" style={{ color: 'var(--primary-color)' }}>
              50K+
            </div>
            <div className="text-gray-600 font-medium">Total Clicks</div>
          </div>
          <div className="text-center bg-white p-8 rounded-xl shadow-md">
            <div className="text-5xl font-bold mb-2" style={{ color: 'var(--primary-color)' }}>
              1K+
            </div>
            <div className="text-gray-600 font-medium">Happy Users</div>
          </div>
        </div>
      </section>

      <section className="hero py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Earning Money Today?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful marketers generating revenue with short links.
          </p>
          <Link
            href="/features"
            className="inline-block px-8 py-4 bg-white text-[var(--primary-color)] rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Explore Features
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
