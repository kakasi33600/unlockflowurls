import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

const features = [
  {
    title: 'Multi-Step Redirects',
    desc: 'Create engaging 4-step redirect flows with countdown timers and better monetization opportunities.',
  },
  {
    title: 'Monetization Ready',
    desc: 'Ad placement friendly flow helps you increase revenue per click.',
  },
  {
    title: 'Advanced Analytics',
    desc: 'Track clicks and link performance in real time.',
  },
  {
    title: 'Mobile Optimized',
    desc: 'Responsive experience across all devices.',
  },
]

export default function FeaturesPage() {
  return (
    <div>
      <SiteHeader />

      <section className="hero">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1>Powerful Features</h1>
          <p>Everything you need to create, manage, and monetize short URLs.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
