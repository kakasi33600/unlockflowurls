import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function AboutPage() {
  return (
    <div>
      <SiteHeader />
      <section className="hero">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1>About UnlockFlowURLS</h1>
          <p>The story behind our URL shortening and monetization platform.</p>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-4">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-gray-700">
            We help creators and marketers turn every click into measurable value. UnlockFlowURLS
            combines simple URL shortening with monetization-ready redirect flows.
          </p>
          <p className="text-gray-700">
            Our focus is reliability, fast redirects, and an experience that works across desktop
            and mobile.
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
