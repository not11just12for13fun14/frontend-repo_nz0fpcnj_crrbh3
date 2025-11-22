import { useState } from 'react'

export default function ProfileForm({ onSave }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    level: 'beginner',
    preferred_distances_km: [5],
    training_goal: '5k',
    social_preference: 'social',
  })

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const toggleDistance = (d) => {
    setForm((f) => {
      const has = f.preferred_distances_km.includes(d)
      return { ...f, preferred_distances_km: has ? f.preferred_distances_km.filter(x => x !== d) : [...f.preferred_distances_km, d] }
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${base}/profiles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    onSave?.(data.profile)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Name</label>
          <input className="w-full px-3 py-2 rounded bg-slate-800/60 border border-slate-700 text-white" value={form.name} onChange={(e) => update('name', e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Email</label>
          <input type="email" className="w-full px-3 py-2 rounded bg-slate-800/60 border border-slate-700 text-white" value={form.email} onChange={(e) => update('email', e.target.value)} required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Level</label>
          <select className="w-full px-3 py-2 rounded bg-slate-800/60 border border-slate-700 text-white" value={form.level} onChange={(e) => update('level', e.target.value)}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Training Goal</label>
          <select className="w-full px-3 py-2 rounded bg-slate-800/60 border border-slate-700 text-white" value={form.training_goal} onChange={(e) => update('training_goal', e.target.value)}>
            <option value="5k">5K</option>
            <option value="10k">10K</option>
            <option value="21k">21K</option>
            <option value="42k">42K</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Social Preference</label>
          <select className="w-full px-3 py-2 rounded bg-slate-800/60 border border-slate-700 text-white" value={form.social_preference} onChange={(e) => update('social_preference', e.target.value)}>
            <option value="social">Social</option>
            <option value="solo">Solo</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-blue-200 mb-2">Preferred Distances</label>
        <div className="flex flex-wrap gap-2">
          {[3,5,7,10,12,15].map((d) => (
            <button type="button" key={d} onClick={() => toggleDistance(d)} className={`px-3 py-1 rounded border ${form.preferred_distances_km.includes(d) ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800/60 border-slate-700 text-blue-200'}`}>
              {d}K
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button type="submit" className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white">Save Profile</button>
      </div>
    </form>
  )
}
