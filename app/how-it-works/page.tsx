import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

const steps = [
  'Paste your long URL on the homepage.',
  'Get a unique short code instantly.',
  'Share the short link with your audience.',
  'Users pass through 4 redirect steps and reach destination.',
]

export default function HowItWorksPage() {
  return (
    <div>
      <SiteHeader />
      <section className="hero">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1>How It Works</h1>
          <p>Step-by-step flow for URL shortening and monetization.</p>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {steps.map((step, index) => (
            <div key={step} className="bg-white rounded-xl shadow-md p-6">
              <p className="text-lg font-semibold" style={{ color: 'var(--primary-color)' }}>
                Step {index + 1}
              </p>
              <p className="text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
