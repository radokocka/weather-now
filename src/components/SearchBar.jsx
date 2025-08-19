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
        relative rounded-2xl shadow-2xl border-2 transition-all duration-300 ease-out
        ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}
        ${isFocused ? 'shadow-[0_25px_50px_-12px_rgba(59,130,246,0.5)] scale-[1.02] border-blue-500' : isDarkMode ? 'hover:shadow-xl hover:scale-[1.01] hover:border-gray-500' : 'hover:shadow-xl hover:scale-[1.01] hover:border-gray-400'}
        ${loading ? 'animate-pulse' : ''}
      `}>
        
        {/* Search Icon */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <MagnifyingGlassIcon className={`
            w-6 h-6 transition-colors duration-300
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
          className={`w-full pl-16 pr-6 py-5 text-lg focus:outline-none disabled:cursor-not-allowed transition-all duration-300 rounded-2xl font-medium shadow-inner ${
            isDarkMode 
              ? 'bg-gray-800 text-gray-100 placeholder-gray-400' 
              : 'bg-white text-gray-800 placeholder-gray-600'
          }`}
        />

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-6 w-6 border-3 border-gray-300 border-t-blue-500"></div>
          </div>
        )}
      </div>
    </form>
  )
}

export default SearchBar