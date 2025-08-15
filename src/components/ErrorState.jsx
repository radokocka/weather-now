import { useTheme } from '../context/ThemeContext'
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

const ErrorState = ({ error, onRetry }) => {
  const { isDarkMode } = useTheme()

  const getErrorEmoji = (errorMessage) => {
    const message = errorMessage.toLowerCase()
    if (message.includes('not found') || message.includes('404')) return '🏙️'
    if (message.includes('network') || message.includes('connection')) return '📡'
    if (message.includes('api') || message.includes('key')) return '🔑'
    if (message.includes('timeout')) return '⏰'
    return '🌩️'
  }

  const getErrorTitle = (errorMessage) => {
    const message = errorMessage.toLowerCase()
    if (message.includes('not found') || message.includes('404')) return 'City Not Found'
    if (message.includes('network') || message.includes('connection')) return 'Connection Problem'
    if (message.includes('api') || message.includes('key')) return 'API Issue'
    if (message.includes('timeout')) return 'Request Timeout'
    return 'Something Went Wrong'
  }

  const getErrorSuggestion = (errorMessage) => {
    const message = errorMessage.toLowerCase()
    if (message.includes('not found') || message.includes('404')) 
      return 'Try searching for a different city or check the spelling'
    if (message.includes('network') || message.includes('connection')) 
      return 'Check your internet connection and try again'
    if (message.includes('api') || message.includes('key')) 
      return 'There might be an issue with the weather service'
    if (message.includes('timeout')) 
      return 'The request took too long. Please try again'
    return 'Please try again or search for a different location'
  }

  return (
    <div className={`backdrop-blur-2xl ${isDarkMode ? 'bg-red-900/20' : 'bg-red-500/10'} border ${isDarkMode ? 'border-red-500/30' : 'border-red-400/30'} rounded-3xl p-12 mb-8 shadow-2xl font-inter group hover:${isDarkMode ? 'bg-red-900/25' : 'bg-red-500/15'} transition-all duration-500`}>
      
      <div className="text-center">
        {/* Error Emoji */}
        <div className="text-8xl mb-6 animate-bounce">
          {getErrorEmoji(error)}
        </div>
        
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className={`p-4 ${isDarkMode ? 'bg-red-500/20' : 'bg-red-500/20'} rounded-full border ${isDarkMode ? 'border-red-400/30' : 'border-red-400/40'} group-hover:scale-110 transition-transform duration-300`}>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-300" />
          </div>
        </div>
        
        {/* Error Title */}
        <div className="bg-white/25 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-white/40">
          <h3 className="text-4xl font-poppins font-bold text-gray-900 mb-4 drop-shadow-lg">
            {getErrorTitle(error)}
          </h3>
          
          {/* Error Message */}
          <p className="text-xl text-gray-800 mb-3 font-semibold">
            {error}
          </p>
          
          {/* Error Suggestion */}
          <p className="text-lg text-gray-700 mb-4 max-w-md mx-auto leading-relaxed font-medium">
            {getErrorSuggestion(error)}
          </p>
        </div>
        
        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-white/90 hover:bg-white border-2 border-red-500/50 hover:border-red-600 rounded-2xl text-gray-800 hover:text-gray-900 font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm group/button shadow-lg"
          >
            <ArrowPathIcon className="w-5 h-5 group-hover/button:rotate-180 transition-transform duration-500" />
            <span>Try Again</span>
          </button>
        )}
        
        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 ${isDarkMode ? 'bg-red-400/40' : 'bg-red-300/50'} rounded-full animate-pulse`}
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ErrorState