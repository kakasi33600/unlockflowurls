import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function TermsPage() {
  return (
    <div>
      <SiteHeader />
      <section className="hero">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1>Terms of Service</h1>
          <p>Usage guidelines for UnlockFlowURLS.</p>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-4">
          <p className="text-gray-700">By using UnlockFlowURLS, you agree not to use the platform for abuse, spam, or illegal content.</p>
          <p className="text-gray-700">We may suspend links or access that violate our policies.</p>
          <p className="text-gray-700">For terms-related questions, contact: unlockflowurls@gmail.com.</p>
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
