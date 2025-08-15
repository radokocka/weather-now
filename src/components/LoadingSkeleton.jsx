import { useTheme } from '../context/ThemeContext'

const LoadingSkeleton = () => {
  const { isDarkMode } = useTheme()

  return (
    <div className={`backdrop-blur-2xl ${isDarkMode ? 'bg-white/5' : 'bg-white/15'} rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-12 mb-8 border ${isDarkMode ? 'border-white/20' : 'border-white/30'} font-inter animate-pulse`}>
      
      {/* Header Skeleton */}
      <div className="text-center mb-10">
        <div className={`h-12 ${isDarkMode ? 'bg-white/10' : 'bg-white/20'} rounded-2xl mx-auto mb-8 w-64 animate-shimmer`}></div>
        
        <div className="flex items-center justify-center mb-6 relative">
          {/* Icon Skeleton */}
          <div className={`w-28 h-28 ${isDarkMode ? 'bg-white/10' : 'bg-white/20'} rounded-full mr-8 animate-shimmer`}></div>
          
          {/* Temperature Skeleton */}
          <div className="relative">
            <div className={`h-20 w-48 ${isDarkMode ? 'bg-white/10' : 'bg-white/20'} rounded-2xl animate-shimmer`}></div>
          </div>
        </div>
        
        <div className={`h-6 ${isDarkMode ? 'bg-white/10' : 'bg-white/20'} rounded-xl mx-auto w-40 animate-shimmer`}></div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index}
            className={`backdrop-blur-xl ${isDarkMode ? 'bg-white/10' : 'bg-white/20'} rounded-3xl p-8 text-center border ${isDarkMode ? 'border-white/15' : 'border-white/30'} animate-pulse`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Icon Skeleton */}
            <div className={`w-12 h-12 ${isDarkMode ? 'bg-white/15' : 'bg-white/25'} rounded-full mx-auto mb-4 animate-shimmer`}></div>
            
            {/* Label Skeleton */}
            <div className={`h-3 ${isDarkMode ? 'bg-white/15' : 'bg-white/25'} rounded-lg mx-auto mb-3 w-16 animate-shimmer`}></div>
            
            {/* Value Skeleton */}
            <div className={`h-8 ${isDarkMode ? 'bg-white/15' : 'bg-white/25'} rounded-xl mx-auto w-20 animate-shimmer`}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoadingSkeleton