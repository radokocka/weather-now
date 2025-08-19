import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const SearchBar = ({ onSearch, loading, isDarkMode = false }) => {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSearch(inputValue.trim())
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Search Container */}
      <div className={`
        relative rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl border-2 transition-all duration-300 ease-out
        ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}
        ${isFocused ? 'shadow-[0_15px_35px_-8px_rgba(59,130,246,0.4)] sm:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.5)] scale-[1.01] sm:scale-[1.02] border-blue-500' : isDarkMode ? 'hover:shadow-lg hover:border-gray-500' : 'hover:shadow-lg hover:border-gray-400'}
        ${loading ? 'animate-pulse' : ''}
      `}>
        
        {/* Search Icon */}
        <div className="absolute left-3 sm:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <MagnifyingGlassIcon className={`
            w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-colors duration-300
            ${isFocused ? 'text-blue-600' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}
          `} />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="🔍 Enter city name..."
          disabled={loading}
          className={`w-full pl-9 sm:pl-11 lg:pl-16 pr-3 sm:pr-4 lg:pr-6 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg focus:outline-none disabled:cursor-not-allowed transition-all duration-300 rounded-xl sm:rounded-2xl font-medium shadow-inner ${
            isDarkMode 
              ? 'bg-gray-800 text-gray-100 placeholder-gray-400' 
              : 'bg-white text-gray-800 placeholder-gray-600'
          }`}
        />

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-3 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-2 sm:border-3 border-gray-300 border-t-blue-500"></div>
          </div>
        )}
      </div>
    </form>
  )
}

export default SearchBar