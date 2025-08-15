import { useTheme } from '../context/ThemeContext'

const LoadingSkeleton = () => {
  const { isDarkMode } = useTheme()

  return (
    <div className="text-center animate-fade-in transition-all duration-500">
      
      {/* City Name Skeleton */}
      <div className="h-8 bg-gray-300 rounded-2xl mx-auto mb-8 w-48 animate-pulse"></div>
      
      {/* Weather Icon Skeleton */}
      <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6 animate-pulse animate-bounce"></div>
      
      {/* Temperature Skeleton */}
      <div className="h-20 bg-gradient-to-r from-blue-300 to-red-300 rounded-2xl mx-auto mb-6 w-48 animate-pulse"></div>
      
      {/* Description Skeleton */}
      <div className="h-6 bg-gray-300 rounded-xl mx-auto mb-8 w-32 animate-pulse"></div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index}
            className="bg-gray-100 rounded-xl p-4 border border-gray-200 animate-pulse"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Icon Skeleton */}
            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2 animate-pulse"></div>
            
            {/* Label Skeleton */}
            <div className="h-3 bg-gray-300 rounded mx-auto mb-2 w-16 animate-pulse"></div>
            
            {/* Value Skeleton */}
            <div className="h-6 bg-gray-300 rounded-lg mx-auto w-12 animate-pulse"></div>
          </div>
        ))}
      </div>
      
      {/* Loading Text */}
      <div className="text-gray-600 text-lg font-medium animate-pulse">
        🌦️ Fetching weather data...
      </div>
    </div>
  )
}

export default LoadingSkeleton