export default function Home() {
  return (
    <div className="bg-background-light text-[#111318] font-display overflow-x-hidden">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-[#f0f2f4] shadow-sm">
        <div className="px-4 md:px-10 py-3 flex items-center justify-between max-w-[1280px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="size-8 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">medical_services</span>
            </div>
            <h2 className="text-[#111318] text-xl font-bold tracking-tight">RakshaPath</h2>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-[#111318] text-sm font-medium hover:text-primary transition-colors" href="#how-it-works">How it Works</a>
            <a className="text-[#111318] text-sm font-medium hover:text-primary transition-colors" href="#features">Features</a>
            <a className="text-[#111318] text-sm font-medium hover:text-primary transition-colors" href="#demo">Live Demo</a>
          </div>
          <button className="flex items-center justify-center gap-2 cursor-pointer rounded-lg h-10 px-6 bg-emergency text-white text-sm font-bold shadow-md hover:bg-red-700 transition-colors animate-pulse hover:animate-none">
            <span className="material-symbols-outlined text-[20px]">e911_emergency</span>
            <span>Emergency Help</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-white pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="layout-container max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Text Content */}
            <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-primary w-fit mx-auto lg:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wide">Live Coordination Active</span>
              </div>
              <h1 className="text-[#111318] text-4xl lg:text-6xl font-black leading-[1.1] tracking-[-0.033em]">
                Guiding You to the Right Care, When Every Second Matters.
              </h1>
              <p className="text-[#616f89] text-lg lg:text-xl font-normal leading-relaxed max-w-[600px] mx-auto lg:mx-0">
                Intelligent emergency coordination connecting patients to nearby ambulances and hospital beds instantly. No delays, no uncertainty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button className="flex items-center justify-center gap-2 rounded-lg h-12 px-8 bg-emergency text-white text-base font-bold shadow-lg hover:bg-red-700 transition-all transform hover:-translate-y-0.5">
                  <span className="material-symbols-outlined">warning</span>
                  <span>Get Emergency Help</span>
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg h-12 px-8 bg-white border-2 border-[#e5e7eb] text-[#111318] text-base font-bold hover:border-primary hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">local_hospital</span>
                  <span>View Nearby Hospitals</span>
                </button>
              </div>
            </div>
            {/* Hero Illustration / Image */}
            <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-50 border border-slate-100">
                <img
                  alt="Abstract representation of digital medical map with connections"
                  className="w-full h-full object-cover opacity-90"
                  data-alt="Digital map background showing city streets with medical icons overlay"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJXBKkoPefSmdf0D41xQvOQikUjuzG8X_XR_6ZBOu4FSuj2cJWUiMptyH7im18IJOf-W8NR9zq1YKKEFBCWva_UEq7iGivM30_ymW8CG52-kW7sGE-sfPikLQJbwD6wxqffZVXOKfXs_bNo785s8egMZQnBnNwUiGL938rC8ZfaNOvAHg5kzY-s3726J38iKN3T80nyOrCUyuOPYN9TzGRUargqfvTxJfmI_VFBOfEC1RqjnM2XVRWkdLKvqGfwCy8AVT15-jXJck"
                />
                {/* Floating UI Elements for Effect */}
                <div className="absolute top-8 left-8 bg-white p-4 rounded-xl shadow-lg border-l-4 border-success flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="bg-green-100 p-2 rounded-full text-success">
                    <span className="material-symbols-outlined">check_circle</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Bed Status</p>
                    <p className="text-sm font-bold text-[#111318]">City General: Available</p>
                  </div>
                </div>
                <div className="absolute bottom-12 right-8 bg-white p-4 rounded-xl shadow-lg border-l-4 border-primary flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-primary">
                    <span className="material-symbols-outlined">ambulance</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">ETA</p>
                    <p className="text-sm font-bold text-[#111318]">Ambulance: 4 mins</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#f6f6f8]" id="how-it-works">
        <div className="layout-container max-w-[1000px] mx-auto px-4 md:px-10">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-[#111318] text-3xl lg:text-4xl font-black tracking-tight">How RakshaPath Works</h2>
              <p className="text-[#616f89] text-base lg:text-lg max-w-[720px] mx-auto">Three simple steps to critical care. Designed for speed when clarity is needed most.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-[#dbdfe6] to-transparent z-0"></div>
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center text-center gap-4 p-6 bg-white rounded-xl border border-[#dbdfe6] shadow-sm hover:shadow-md transition-shadow">
                <div className="size-16 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined text-3xl">my_location</span>
                </div>
                <div>
                  <h3 className="text-[#111318] text-xl font-bold mb-2">1. Share Details</h3>
                  <p className="text-[#616f89] text-sm leading-relaxed">Share location & incident type instantly with a single tap. No complex forms.</p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center text-center gap-4 p-6 bg-white rounded-xl border border-[#dbdfe6] shadow-sm hover:shadow-md transition-shadow">
                <div className="size-16 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined text-3xl">alt_route</span>
                </div>
                <div>
                  <h3 className="text-[#111318] text-xl font-bold mb-2">2. Smart Routing</h3>
                  <p className="text-[#616f89] text-sm leading-relaxed">AI-driven matching finds the nearest ambulance and hospital with open capacity.</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center text-center gap-4 p-6 bg-white rounded-xl border border-[#dbdfe6] shadow-sm hover:shadow-md transition-shadow">
                <div className="size-16 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined text-3xl">medical_services</span>
                </div>
                <div>
                  <h3 className="text-[#111318] text-xl font-bold mb-2">3. Reach Care</h3>
                  <p className="text-[#616f89] text-sm leading-relaxed">Seamless handover to medical teams prepared for your arrival.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 bg-white" id="features">
        <div className="layout-container max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-[#111318] text-3xl lg:text-4xl font-black tracking-tight">Core Features</h2>
              <p className="text-[#616f89] text-base lg:text-lg">Built for speed, accuracy, and reliability in critical moments.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="group flex flex-col gap-4 p-6 rounded-xl border border-[#e5e7eb] bg-white hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="size-12 rounded-lg bg-red-50 text-emergency flex items-center justify-center group-hover:bg-emergency group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">monitor_heart</span>
                </div>
                <div>
                  <h3 className="text-[#111318] text-lg font-bold mb-2">Live Availability</h3>
                  <p className="text-[#616f89] text-sm leading-relaxed">Real-time dashboard of hospital bed status across the city network.</p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="group flex flex-col gap-4 p-6 rounded-xl border border-[#e5e7eb] bg-white hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="size-12 rounded-lg bg-blue-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">ambulance</span>
                </div>
                <div>
                  <h3 className="text-[#111318] text-lg font-bold mb-2">Ambulance Tracking</h3>
                  <p className="text-[#616f89] text-sm leading-relaxed">GPS assignment and live map tracking for patient and hospital assurance.</p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="group flex flex-col gap-4 p-6 rounded-xl border border-[#e5e7eb] bg-white hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="size-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">local_hospital</span>
                </div>
                <div>
                  <h3 className="text-[#111318] text-lg font-bold mb-2">Specialty Matching</h3>
                  <p className="text-[#616f89] text-sm leading-relaxed">Automatically match patient needs (Trauma, Cardiac, Burn) to departments.</p>
                </div>
              </div>
              {/* Feature 4 */}
              <div className="group flex flex-col gap-4 p-6 rounded-xl border border-[#e5e7eb] bg-white hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="size-12 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">verified_user</span>
                </div>
                <div>
                  <h3 className="text-[#111318] text-lg font-bold mb-2">Verified Requests</h3>
                  <p className="text-[#616f89] text-sm leading-relaxed">Human-in-the-loop verification layer to ensure trust and prioritize true emergencies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Demo Section (Why Different) */}
      <section className="py-20 bg-background-light" id="demo">
        <div className="layout-container max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left: Content / Differentiators */}
            <div className="flex-1 flex flex-col justify-center gap-8">
              <div>
                <h2 className="text-[#111318] text-3xl font-black tracking-tight mb-4">Why RakshaPath Is Different</h2>
                <p className="text-[#616f89] text-lg">Most systems are for appointments. We are built purely for the chaos of emergencies.</p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="mt-1 size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111318]">No User Login Required</h4>
                    <p className="text-sm text-[#616f89]">We don't ask for passwords when you're in pain. Guest checkout flow for emergencies.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111318]">Real-time Network Capacity</h4>
                    <p className="text-sm text-[#616f89]">Hospitals update beds instantly via our admin app, so you never get turned away.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111318]">Human Verification</h4>
                    <p className="text-sm text-[#616f89]">Every critical request is eye-balled by a central dispatcher to filter spam.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right: Mock UI */}
            <div className="flex-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-[#dbdfe6]">
                {/* Fake Browser Header */}
                <div className="h-10 bg-gray-50 border-b flex items-center px-4 gap-2">
                  <div className="size-3 rounded-full bg-red-400"></div>
                  <div className="size-3 rounded-full bg-yellow-400"></div>
                  <div className="size-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 h-5 w-48 bg-gray-200 rounded-sm"></div>
                </div>
                {/* Map Canvas Area */}
                <div className="relative aspect-square sm:aspect-video bg-slate-200">
                  <img
                    alt="Map view of city streets for tracking demonstration"
                    className="w-full h-full object-cover opacity-60 grayscale"
                    data-location="City Map Overlay"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-O0vWJU4Nkt5z4u6YNPT4aPN4LmM8FH6PIeRn9RaG2fV9choK2nW3yOr421iObCe2zI9koV1RM_Sfxc0HLIZItsvkOfC7VV30qzGRSfRqhzqsivaXbTpGJEuYIFR1UV4rdn3156UsHLZ-hqZ9DuyQ0zxX_vZKckS542LMZLJu37etbEajY_TX8WHN4OAkNsW_9TC__yZy1iVL49-MJZPMDh_g29-nVwN34F__qU5P75KqdEVzBWUvcq7ECyWPGMt4SCvHj4nKkTc"
                  />
                  {/* Overlay: Route */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    <path className="animate-pulse" d="M 200 300 Q 300 250 450 150" fill="none" stroke="#1152d4" strokeDasharray="8 4" strokeWidth="4"></path>
                  </svg>
                  {/* Overlay: Pins */}
                  {/* User Location */}
                  <div className="absolute top-[280px] left-[180px] z-10 flex flex-col items-center">
                    <div className="bg-red-600 text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                      <span className="material-symbols-outlined text-sm">person_pin</span>
                    </div>
                    <span className="bg-white text-xs font-bold px-2 py-0.5 rounded shadow mt-1">Patient</span>
                  </div>
                  {/* Hospital Location */}
                  <div className="absolute top-[130px] left-[430px] z-10 flex flex-col items-center">
                    <div className="bg-success text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                      <span className="material-symbols-outlined text-sm">local_hospital</span>
                    </div>
                    <span className="bg-white text-xs font-bold px-2 py-0.5 rounded shadow mt-1 text-success">Verified Bed</span>
                  </div>
                  {/* Floating Dashboard Card */}
                  <div className="absolute top-4 right-4 z-20 w-64 bg-white rounded-lg shadow-xl p-3 border border-gray-100">
                    <div className="flex justify-between items-center mb-2 border-b pb-2">
                      <span className="text-xs font-bold text-gray-500">CASE #3920</span>
                      <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">CRITICAL</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="size-10 rounded bg-gray-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">ambulance</span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#111318]">Ambulance En Route</div>
                        <div className="text-xs text-green-600 font-medium">Arriving in 4 mins</div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 bg-primary text-white text-xs font-bold py-1.5 rounded">Track</button>
                      <button className="flex-1 bg-gray-100 text-gray-700 text-xs font-bold py-1.5 rounded">Call Driver</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white border-t border-[#f0f2f4]">
        <div className="layout-container max-w-[800px] mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-[#111318] mb-4">Trusted by Emergency Response Networks</h3>
          <p className="text-[#616f89] mb-8">Currently piloting in 3 major metropolitan areas, reducing response times by an average of 12 minutes.</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale">
            {/* Abstract Logo Placeholders */}
            <div className="flex items-center gap-2 font-bold text-xl"><span className="material-symbols-outlined">health_and_safety</span> CityHealth</div>
            <div className="flex items-center gap-2 font-bold text-xl"><span className="material-symbols-outlined">local_pharmacy</span> MetroCare</div>
            <div className="flex items-center gap-2 font-bold text-xl"><span className="material-symbols-outlined">emergency</span> RapidResponse</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#101622] text-white">
        <div className="layout-container max-w-[960px] mx-auto px-4 text-center">
          <div className="mb-8 flex justify-center">
            <div className="size-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="material-symbols-outlined text-4xl text-white">e911_emergency</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">In an emergency, clarity saves lives.</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">Don't waste time calling busy lines. Connect directly to the nearest available care facility instantly.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center gap-2 rounded-lg h-14 px-8 bg-emergency text-white text-lg font-bold shadow-lg shadow-red-900/50 hover:bg-red-600 transition-colors w-full sm:w-auto">
              <span>Start Emergency Request</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg h-14 px-8 bg-transparent border border-gray-600 text-white text-lg font-bold hover:bg-white/5 transition-colors w-full sm:w-auto">
              <span>Partner with Us (Hospitals)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#f0f2f4] py-12">
        <div className="layout-container max-w-[1280px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">medical_services</span>
            <span className="font-bold text-[#111318]">RakshaPath</span>
          </div>
          <div className="flex gap-8 text-sm text-[#616f89]">
            <a className="hover:text-primary" href="#">Privacy Policy</a>
            <a className="hover:text-primary" href="#">Terms of Service</a>
            <a className="hover:text-primary" href="#">Support</a>
          </div>
          <div className="text-sm text-[#9aa2b1]">
            © 2024 RakshaPath. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
