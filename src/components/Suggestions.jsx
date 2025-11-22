import { useEffect, useState } from 'react'

export default function Suggestions({ origin, distance, social }) {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      if (!origin?.lat || !origin?.lon) return
      setLoading(true)
      setError('')
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const params = new URLSearchParams()
        params.set('lat', origin.lat)
        params.set('lon', origin.lon)
        if (distance) params.set('distance_km', distance)
        if (social) params.set('social_preference', social)
        const res = await fetch(`${base}/routes/suggest?${params.toString()}`)
        const data = await res.json()
        setResults(data.results || [])
      } catch (e) {
        setError('Failed to fetch suggestions')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [origin, distance, social])

  if (!origin?.lat) return null

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-white mb-3">Suggested routes near you</h3>
      {loading && <p className="text-blue-200">Loading…</p>}
      {error && <p className="text-red-300">{error}</p>}
      <div className="grid md:grid-cols-2 gap-4">
        {results.map((r, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">{r.name}</h4>
              <span className="text-xs px-2 py-1 rounded bg-slate-700 text-blue-200">{r.surface}</span>
            </div>
            <p className="text-sm text-blue-200 mt-1">{r.description}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-blue-200">
              <div>Distance: <span className="text-white">{r.route_distance_km} km</span></div>
              <div>Crowd: <span className="capitalize text-white">{r.crowd_level}</span></div>
              <div>Temp: <span className="text-white">{r.weather?.temp_c ?? '-'}°C</span></div>
              <div>AQI: <span className={`text-white ${r.air_quality?.aqi > 100 ? 'text-amber-300' : 'text-emerald-300'}`}>{r.air_quality?.aqi}</span></div>
              <div>Wind: <span className="text-white">{r.weather?.wind_kph} kph</span></div>
              <div>Suitability: <span className="text-white">{r.suitability_score}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
