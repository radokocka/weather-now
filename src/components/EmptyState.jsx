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
        <h2 className="text-4xl font-poppins font-black text-white mb-4 drop-shadow-lg tracking-tight">
          Welcome to WeatherNow
        </h2>
        
        <p className={`text-xl ${isDarkMode ? 'text-white/70' : 'text-white/80'} mb-8 max-w-lg mx-auto leading-relaxed`}>
          Get real-time weather information for any city around the world
        </p>
        
        {/* Search Instructions */}
        <div className={`${isDarkMode ? 'bg-white/5' : 'bg-white/10'} rounded-2xl p-6 mb-8 border ${isDarkMode ? 'border-white/10' : 'border-white/20'}`}>
          <div className="flex items-center justify-center mb-4">
            <div className={`p-3 ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-500/30'} rounded-full`}>
              <MagnifyingGlassIcon className="w-6 h-6 text-blue-300" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">How to get started</h3>
          <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-white/70'} mb-4`}>
            Type any city name in the search bar above to see current weather and 5-day forecast
          </p>
          
          {/* Feature List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-green-300">✓</span>
              <span className={`${isDarkMode ? 'text-white/60' : 'text-white/70'}`}>Current conditions</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-300">✓</span>
              <span className={`${isDarkMode ? 'text-white/60' : 'text-white/70'}`}>5-day forecast</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-300">✓</span>
              <span className={`${isDarkMode ? 'text-white/60' : 'text-white/70'}`}>Detailed metrics</span>
            </div>
          </div>
        </div>
        
        {/* Popular Cities */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-6">
            <GlobeAltIcon className="w-5 h-5 text-white/60 mr-2" />
            <h3 className="text-lg font-semibold text-white">Popular cities</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.city}
                onClick={() => onSuggestionClick?.(suggestion.city)}
                className={`group p-4 ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-white/10 hover:bg-white/20'} rounded-2xl border ${isDarkMode ? 'border-white/10 hover:border-white/20' : 'border-white/20 hover:border-white/30'} transition-all duration-300 hover:scale-105 active:scale-95`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {suggestion.emoji}
                </div>
                <div className="text-white font-medium mb-1">{suggestion.city}</div>
                <div className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-white/60'}`}>
                  {suggestion.description}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Bottom Tip */}
        <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-white/60'} italic`}>
          💡 Tip: You can also search by country or region
        </p>
      </div>
    </div>
  )
}

export default EmptyState