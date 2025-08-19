import { useTheme } from '../context/ThemeContext'
import { useEffect, useState } from 'react'

const CityMap = ({ weather, isDarkMode: darkModeProp }) => {
  const { isDarkMode: themeIsDarkMode } = useTheme()
  const isDarkMode = darkModeProp !== undefined ? darkModeProp : themeIsDarkMode
  const [windParticles, setWindParticles] = useState([])
  
  if (!weather || !weather.coord) return null

  const { coord: { lat, lon }, name, sys: { country }, wind } = weather

  // Generate wind arrows based on wind data
  useEffect(() => {
    if (!wind || !wind.speed) return

    const particles = []
    const particleCount = Math.min(12 + Math.floor(wind.speed * 0.8), 25) // More arrows for stronger wind
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1.5, // Slightly larger for arrows
        speed: (wind.speed / 8) + Math.random() * 0.4, // Speed based on wind speed
        direction: wind.deg || 0,
        opacity: Math.random() * 0.6 + 0.4, // Better visibility for arrows
        delay: Math.random() * 3
      })
    }
    
    setWindParticles(particles)
  }, [wind])

  const getMapUrl = () => {
    const baseUrl = 'https://www.openstreetmap.org/export/embed.html'
    const bbox = `${lon - 0.1},${lat - 0.1},${lon + 0.1},${lat + 0.1}`
    const marker = `${lat},${lon}`
    
    return `${baseUrl}?bbox=${bbox}&layer=mapnik&marker=${marker}`
  }

  const getOpenStreetMapLink = () => {
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=12/${lat}/${lon}`
  }

  const getWindDirection = (deg) => {
    if (!deg && deg !== 0) return 'N/A'
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    const index = Math.round(deg / 22.5) % 16
    return directions[index]
  }

  const getWindArrow = (deg) => {
    if (!deg && deg !== 0) return '🌀'
    // Rotate arrow based on wind direction
    const rotation = deg + 180 // Add 180 to point in direction wind is blowing TO
    return (
      <span 
        style={{ 
          display: 'inline-block', 
          transform: `rotate(${rotation}deg)`,
          fontSize: '16px'
        }}
      >
        ↑
      </span>
    )
  }

  return (
    <div className={`mt-8 backdrop-blur-sm rounded-2xl p-6 border ${isDarkMode ? 'bg-gray-800/90 border-gray-600' : 'bg-white/90 border-white/20'}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          📍 Location Map
        </h4>
        <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {name}, {country}
        </div>
      </div>
      
      <div className="relative">
        <div className="rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
          <iframe
            src={getMapUrl()}
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${name}`}
            className="rounded-xl"
          ></iframe>
          
        </div>
        
        {/* Map overlay info */}
        <div className={`absolute top-3 left-3 px-3 py-2 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-900/90 text-white' : 'bg-white/90 text-gray-900'}`}>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs opacity-75">
            {lat.toFixed(4)}°, {lon.toFixed(4)}°
          </div>
        </div>

        {/* Wind info overlay */}
        {wind && (
          <div className={`absolute top-3 right-3 px-3 py-2 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-900/90 text-white' : 'bg-white/90 text-gray-900'}`}>
            <div className="flex items-center space-x-2">
              <div className="text-lg">
                {getWindArrow(wind.deg)}
              </div>
              <div>
                <div className="text-sm font-semibold">
                  {wind.speed ? `${Math.round(wind.speed)} m/s` : 'N/A'}
                </div>
                <div className="text-xs opacity-75">
                  {getWindDirection(wind.deg)}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* View larger map link */}
        <div className="mt-4 text-center">
          <a
            href={getOpenStreetMapLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } hover:scale-105 shadow-lg hover:shadow-xl`}
          >
            🗺️ View Larger Map
          </a>
        </div>
      </div>
    </div>
  )
}

export default CityMap