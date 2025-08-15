import { useTheme } from '../context/ThemeContext'
import { MagnifyingGlassIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const EmptyState = ({ onSuggestionClick }) => {
  const { isDarkMode } = useTheme()
  
  const suggestions = [
    { city: 'London', emoji: '🇬🇧', description: 'United Kingdom' },
    { city: 'New York', emoji: '🇺🇸', description: 'United States' },
    { city: 'Tokyo', emoji: '🇯🇵', description: 'Japan' },
    { city: 'Paris', emoji: '🇫🇷', description: 'France' },
    { city: 'Bratislava', emoji: '🇸🇰', description: 'Slovakia' },
    { city: 'Dubai', emoji: '🇦🇪', description: 'UAE' }
  ]

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
        <div className={`${isDarkMode ? 'bg-white/5' : 'bg-white/10'} rounded-2xl p-6 mb-8 border ${isDarkMode ? 'border-white/10' : 'border-white/20'}`}>
          <div className="flex items-center justify-center mb-4">
            <div className={`p-3 ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-500/30'} rounded-full`}>
              <MagnifyingGlassIcon className="w-6 h-6 text-blue-300" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">How to get started</h3>
          <p className="text-base text-white/90 mb-4 font-medium">
            Type any city name in the search bar above to see current weather and 5-day forecast
          </p>
          
          {/* Feature List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-blue-300">🌡️</span>
              <span className="text-white/90 font-medium">Current conditions</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-300">📅</span>
              <span className="text-white/90 font-medium">5-day forecast</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-300">📊</span>
              <span className="text-white/90 font-medium">Detailed metrics</span>
            </div>
          </div>
        </div>
        
        {/* Popular Cities */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-8">
            <div className={`p-2 ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-500/30'} rounded-full mr-3`}>
              <GlobeAltIcon className="w-5 h-5 text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold text-white">Popular Cities</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.city}
                onClick={() => onSuggestionClick?.(suggestion.city)}
                className={`group relative p-6 ${isDarkMode ? 'bg-white/5 hover:bg-white/15' : 'bg-white/10 hover:bg-white/25'} rounded-3xl border ${isDarkMode ? 'border-white/10 hover:border-blue-300/30' : 'border-white/20 hover:border-blue-300/50'} transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 active:scale-95 cursor-pointer backdrop-blur-sm`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/0 via-blue-300/0 to-purple-400/0 group-hover:from-blue-400/10 group-hover:via-blue-300/5 group-hover:to-purple-400/10 transition-all duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-4xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 filter group-hover:drop-shadow-lg">
                    {suggestion.emoji}
                  </div>
                  <div className="text-white font-bold mb-2 text-lg group-hover:text-blue-200 transition-colors duration-300">
                    {suggestion.city}
                  </div>
                  <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300 font-medium">
                    {suggestion.description}
                  </div>
                </div>

                {/* Click indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-blue-300 text-xs">→</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Bottom Tip */}
        <p className="text-base text-white/80 italic font-medium">
          💡 Tip: You can also search by country or region
        </p>
      </div>
    </div>
  )
}

export default EmptyState