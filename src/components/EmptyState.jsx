import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { MagnifyingGlassIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { getCurrentWeather } from '../services/weatherAPI'
import CityTime from './CityTime'

const EmptyState = ({ onSuggestionClick, isDarkMode: darkModeProp }) => {
  const { isDarkMode: themeIsDarkMode } = useTheme()
  const isDarkMode = darkModeProp !== undefined ? darkModeProp : themeIsDarkMode
  const [cityWeather, setCityWeather] = useState({})
  
  const suggestions = [
    { city: 'London', emoji: '🇬🇧', description: 'United Kingdom' },
    { city: 'New York', emoji: '🇺🇸', description: 'United States' },
    { city: 'Tokyo', emoji: '🇯🇵', description: 'Japan' },
    { city: 'Paris', emoji: '🇫🇷', description: 'France' },
    { city: 'Bratislava', emoji: '🇸🇰', description: 'Slovakia' },
    { city: 'Dubai', emoji: '🇦🇪', description: 'UAE' },
    { city: 'Sydney', emoji: '🇦🇺', description: 'Australia' },
    { city: 'Moscow', emoji: '🇷🇺', description: 'Russia' },
    { city: 'Toronto', emoji: '🇨🇦', description: 'Canada' },
    { city: 'Rio de Janeiro', emoji: '🇧🇷', description: 'Brazil' },
    { city: 'Mumbai', emoji: '🇮🇳', description: 'India' },
    { city: 'Cairo', emoji: '🇪🇬', description: 'Egypt' }
  ]

  // Load weather for all popular cities
  useEffect(() => {
    const loadCityWeather = async () => {
      const weatherPromises = suggestions.map(async (suggestion) => {
        try {
          const weather = await getCurrentWeather(suggestion.city)
          return { city: suggestion.city, weather }
        } catch (error) {
          console.warn(`Failed to load weather for ${suggestion.city}:`, error)
          return { city: suggestion.city, weather: null }
        }
      })

      const results = await Promise.all(weatherPromises)
      const weatherMap = results.reduce((acc, { city, weather }) => {
        acc[city] = weather
        return acc
      }, {})
      
      setCityWeather(weatherMap)
    }

    loadCityWeather()
  }, [])

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '🌤️', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    }
    return iconMap[iconCode] || '🌤️'
  }

  return (
    <div className={`backdrop-blur-2xl ${isDarkMode ? 'bg-white/5' : 'bg-white/10'} rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] p-12 mb-8 border ${isDarkMode ? 'border-white/10' : 'border-white/20'} font-inter transition-all duration-500 hover:${isDarkMode ? 'bg-white/8' : 'bg-white/15'}`}>
      
      <div className="text-center">
        {/* Weather Animation */}
        <div className="relative mb-8">
          <div className="text-8xl mb-4 animate-float">
            🌤️
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="w-1 h-1 bg-yellow-300/60 rounded-full animate-pulse"
                  style={{ animationDelay: `${index * 0.3}s` }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Welcome Message */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-white/30">
          <h2 className="text-5xl font-poppins font-black text-gray-900 mb-4 drop-shadow-lg tracking-tight">
            Welcome to WeatherNow
          </h2>
          
          <p className="text-xl text-gray-800 mb-4 max-w-lg mx-auto leading-relaxed font-medium">
            Get real-time weather information for any city around the world
          </p>
        </div>
        
        {/* Search Instructions */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-500/20 rounded-full">
              <MagnifyingGlassIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">How to get started</h3>
          <p className="text-base text-gray-800 mb-4 font-medium">
            Type any city name in the search bar above to see current weather and 7-day forecast
          </p>
          
          {/* Feature List */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">•</span>
                <span className="text-gray-900 font-medium">Current conditions</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">•</span>
                <span className="text-gray-900 font-medium">7-day forecast</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">•</span>
                <span className="text-gray-900 font-medium">Detailed metrics</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Popular Cities */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="p-2 bg-blue-500/20 rounded-full mr-3">
              <GlobeAltIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Popular Cities</h3>
          </div>
          
          {/* Description */}
          <div className="text-center mb-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-gray-900 text-lg font-medium max-w-3xl mx-auto leading-relaxed">
              🌍 Explore weather conditions around the world! Click on any city to instantly view current weather, 
              local time, and 7-day forecast from different continents and time zones.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.city}
                onClick={() => onSuggestionClick?.(suggestion.city)}
                className={`group relative p-6 ${isDarkMode ? 'bg-white/5 hover:bg-white/15' : 'bg-white/10 hover:bg-white/25'} rounded-2xl border ${isDarkMode ? 'border-white/10 hover:border-blue-300/30' : 'border-white/20 hover:border-blue-300/50'} transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95 cursor-pointer backdrop-blur-sm`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-blue-300/0 to-purple-400/0 group-hover:from-blue-400/15 group-hover:via-blue-300/10 group-hover:to-purple-400/15 transition-all duration-300"></div>
                
                <div className="relative z-10 text-center">
                  {/* Flag */}
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-all duration-300 filter group-hover:drop-shadow-xl">
                    {suggestion.emoji}
                  </div>
                  
                  {/* City Name */}
                  <div className="text-gray-900 font-bold text-xl mb-1 transition-colors duration-300">
                    {suggestion.city}
                  </div>
                  
                  {/* Country */}
                  <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300 font-medium mb-2">
                    {suggestion.description}
                  </div>

                  {/* Current Weather */}
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    {cityWeather[suggestion.city] ? (
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <span className="text-2xl">
                            {getWeatherIcon(cityWeather[suggestion.city].weather[0].icon)}
                          </span>
                          <span className="text-gray-900 font-black text-xl">
                            {Math.round(cityWeather[suggestion.city].main.temp)}°C
                          </span>
                        </div>
                        <div className="text-sm text-gray-700 capitalize font-semibold mb-3">
                          {cityWeather[suggestion.city].weather[0].description}
                        </div>
                        
                        {/* Real-time Clock */}
                        <CityTime 
                          timezone={cityWeather[suggestion.city].timezone} 
                          city={suggestion.city}
                          className="mt-2"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-gray-600 text-sm font-medium">Loading...</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Click indicator */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-blue-300 text-sm font-bold">→</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Bottom Tip */}
        <p className="text-base text-white/80 italic font-medium">
          Tip: You can also search by country or region
        </p>
      </div>
    </div>
  )
}

export default EmptyState