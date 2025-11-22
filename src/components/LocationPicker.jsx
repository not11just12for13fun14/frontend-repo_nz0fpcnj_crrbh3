import { useState, useEffect } from 'react'

export default function LocationPicker({ onSelect }) {
  const [coords, setCoords] = useState({ lat: null, lon: null })
  const [status, setStatus] = useState('')

  const locate = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser')
      return
    }
    setStatus('Locating…')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setCoords({ lat: latitude, lon: longitude })
        setStatus('')
        onSelect?.({ lat: latitude, lon: longitude })
      },
      (err) => {
        setStatus('Unable to retrieve your location')
        console.error(err)
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  useEffect(() => {
    // try auto locate once
    locate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <button onClick={locate} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
          Use my location
        </button>
        {coords.lat && (
          <span className="text-sm text-blue-200">{coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}</span>
        )}
      </div>
      {status && <p className="text-sm text-red-300">{status}</p>}
    </div>
  )
}
