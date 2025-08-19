import { useTheme } from '../context/ThemeContext'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-50 p-2 sm:p-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 sm:w-6 sm:h-6">
        <SunIcon 
          className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 transition-all duration-500 ${
            isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <MoonIcon 
          className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 text-blue-300 transition-all duration-500 ${
            isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
    </button>
  )
}

export default ThemeToggle