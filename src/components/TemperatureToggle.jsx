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
        fixed top-4 right-20 z-50 px-4 py-2 rounded-full
        ${isDarkMode ? 'bg-white/10 text-white' : 'bg-white/80 text-gray-700'}
        backdrop-blur-lg border ${isDarkMode ? 'border-white/20' : 'border-white/30'}
        hover:scale-105 transition-all duration-200 shadow-lg
        text-sm font-medium
      `}
    >
      °{unit}
    </button>
  )
}

export default TemperatureToggle