import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function PrivacyPage() {
  return (
    <div>
      <SiteHeader />
      <section className="hero">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1>Privacy Policy</h1>
          <p>How we collect, use, and protect your data.</p>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-4">
          <p className="text-gray-700">We collect limited technical information to operate the service and improve performance.</p>
          <p className="text-gray-700">We do not sell personal data. We use industry-standard security practices.</p>
          <p className="text-gray-700">For privacy requests, contact: unlockflowurls@gmail.com.</p>
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
