import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function PricingPage() {
  return (
    <div>
      <SiteHeader />
      <section className="hero">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1>Plans & Pricing</h1>
          <p>Simple plans for creators, marketers, and teams.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Free', price: '$0', details: 'Best for starting out' },
            { name: 'Pro', price: '$19', details: 'Best for marketers' },
            { name: 'Enterprise', price: '$99', details: 'Best for large teams' },
          ].map((plan) => (
            <div key={plan.name} className="bg-white rounded-xl shadow-md p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-5xl font-bold mb-2" style={{ color: 'var(--primary-color)' }}>
                {plan.price}
              </p>
              <p className="text-gray-600">{plan.details}</p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
