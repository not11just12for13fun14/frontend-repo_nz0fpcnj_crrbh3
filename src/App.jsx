import { useState } from 'react'
import LocationPicker from './components/LocationPicker'
import ProfileForm from './components/ProfileForm'
import Suggestions from './components/Suggestions'

function App() {
  const [origin, setOrigin] = useState(null)
  const [profile, setProfile] = useState(null)
  const [distance, setDistance] = useState(5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="relative max-w-5xl mx-auto px-6 py-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight">RunMate India</h1>
          <p className="text-blue-200 mt-2">Find the best running routes nearby with weather and air quality in mind.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 relative z-10">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Profile</h2>
            <ProfileForm onSave={(p) => setProfile(p)} />
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4">Location & Preferences</h2>
            <LocationPicker onSelect={(c) => setOrigin(c)} />
            <div className="mt-4">
              <label className="block text-sm text-blue-200 mb-2">Desired distance</label>
              <input type="range" min="3" max="15" step="1" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full"/>
              <div className="text-blue-200 mt-1">{distance} km</div>
            </div>
            <Suggestions origin={origin} distance={distance} social={profile?.social_preference || 'social'} />
          </div>
        </div>

        <footer className="text-center text-blue-300/60 mt-10">Built for runners across India</footer>
      </div>
    </div>
  )
}

export default App
