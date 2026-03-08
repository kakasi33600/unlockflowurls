import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

const faqs = [
  {
    q: 'How do I create a short link?',
    a: 'Paste your long URL on the homepage and click Shorten URL.',
  },
  {
    q: 'Is UnlockFlowURLS free?',
    a: 'Yes. You can create short links without paid plans.',
  },
  {
    q: 'Do links expire?',
    a: 'No, links stay active unless removed manually.',
  },
  {
    q: 'How does 4-step redirect work?',
    a: 'Users pass through 4 short waiting pages before final destination.',
  },
]

export default function FaqPage() {
  return (
    <div>
      <SiteHeader />
      <section className="hero">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about UnlockFlowURLS.</p>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((item) => (
            <div key={item.q} className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">{item.q}</h3>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
