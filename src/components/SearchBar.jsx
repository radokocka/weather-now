import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const SearchBar = ({ onSearch, loading }) => {
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
      {/* White Rounded Search Container */}
      <div className={`
        relative bg-white rounded-full shadow-lg border border-gray-100 transition-all duration-300 ease-out
        ${isFocused ? 'shadow-xl scale-[1.02] ring-2 ring-blue-200' : 'hover:shadow-xl hover:scale-[1.01]'}
        ${loading ? 'animate-pulse' : ''}
      `}>
        
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <MagnifyingGlassIcon className={`
            w-5 h-5 transition-colors duration-300
            ${isFocused ? 'text-blue-500' : 'text-gray-400'}
          `} />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search for a city..."
          disabled={loading}
          className="w-full pl-12 pr-4 py-3 bg-transparent text-gray-700 text-base placeholder-gray-400 focus:outline-none disabled:cursor-not-allowed transition-all duration-300 rounded-full font-medium"
        />

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-500"></div>
          </div>
        )}
      </div>
    </form>
  )
}

export default SearchBar