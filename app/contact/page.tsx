'use client'

import { FormEvent, useState } from 'react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function ContactPage() {
  const [status, setStatus] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStatus('Message sent successfully! We will reply within 24 hours.')
  }

  return (
    <div>
      <SiteHeader />

      <section className="hero">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1>Get in Touch</h1>
          <p>Have questions? Contact our support team.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6">Contact Form</h2>
          {status && <p className="mb-4 text-green-600 font-medium">{status}</p>}
          <form onSubmit={onSubmit} className="space-y-4">
            <input className="w-full border rounded-lg px-4 py-3" placeholder="Your Name" required />
            <input
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Your Email"
              type="email"
              required
            />
            <textarea
              className="w-full border rounded-lg px-4 py-3"
              rows={5}
              placeholder="Your Message"
              required
            />
            <button className="px-6 py-3 rounded-lg text-white font-semibold bg-[var(--primary-color)]">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
