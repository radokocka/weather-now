import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const TemperatureToggle = ({ onUnitChange }) => {
  const { isDarkMode } = useTheme()
  const [unit, setUnit] = useState('C')

  const toggleUnit = () => {
    const newUnit = unit === 'C' ? 'F' : 'C'
    setUnit(newUnit)
    onUnitChange(newUnit)
  }

  return (
    <button
      onClick={toggleUnit}
      className={`
        fixed top-3 right-12 sm:top-4 sm:right-16 lg:right-20 z-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full
        ${isDarkMode ? 'bg-white/10 text-white' : 'bg-white/80 text-gray-700'}
        backdrop-blur-lg border ${isDarkMode ? 'border-white/20' : 'border-white/30'}
        hover:scale-105 transition-all duration-200 shadow-lg
        text-xs sm:text-sm font-medium
      `}
    >
      °{unit}
    </button>
  )
}

export default TemperatureToggle