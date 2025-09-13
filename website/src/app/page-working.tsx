export default function WorkingHomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-b from-udaya-gold/10 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-udaya-charcoal mb-6">
            Beyond Treatment.<br />
            Toward Transformation.
          </h1>
          <p className="text-2xl text-udaya-charcoal/80 mb-4">
            Udaya. A New Dawn for Your Health.
          </p>
          <p className="text-lg text-udaya-charcoal/60 mb-8">
            Cannabis-assisted, clinician-guided retreats
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/waitlist" className="px-6 py-3 bg-udaya-sage text-white rounded-md hover:bg-udaya-sage/90">
              Join the Cancer Retreat Waitlist
            </a>
            <a href="/method" className="px-6 py-3 border border-udaya-sage text-udaya-sage rounded-md hover:bg-udaya-sage hover:text-white">
              Learn About Our Approach
            </a>
          </div>
        </div>
      </section>

      {/* Method Overview */}
      <section className="py-20 bg-udaya-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center text-udaya-charcoal mb-12">
            The Udaya Method™
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-udaya-sage mb-3">Prescription Cannabinoid Care</h3>
              <p className="text-udaya-charcoal/80">Personalized protocols under Thai-licensed physician guidance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-udaya-sage mb-3">Mindfulness & Meaning</h3>
              <p className="text-udaya-charcoal/80">Daily practices to meet uncertainty with grace.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-udaya-sage mb-3">Metabolic Nourishment</h3>
              <p className="text-udaya-charcoal/80">Anti-inflammatory cuisine and gentle cleansing.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-udaya-sage mb-3">Community & Sanctuary</h3>
              <p className="text-udaya-charcoal/80">Heal together in small, supportive cohorts.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}