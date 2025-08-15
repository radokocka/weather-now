import { useTheme } from '../context/ThemeContext'
import ForecastSection from './ForecastSection'

const CurrentWeather = ({ weather, forecast, temperatureUnit = 'C' }) => {
  const { isDarkMode } = useTheme()
  if (!weather) return null

  const {
    name,
    main: { temp, temp_min, temp_max },
    weather: [{ description, main }]
  } = weather

  const convertTemp = (temperature, unit) => {
    if (unit === 'F') {
      return Math.round((temperature * 9/5) + 32)
    }
    return Math.round(temperature)
  }

  return (
    <div className="text-center">
      
      {/* City Name */}
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        {name}
      </h2>
      
      {/* Huge Temperature Display */}
      <div className="mb-4">
        <span className="text-gray-800 transition-all duration-500 font-light"
              style={{ fontSize: '4rem', lineHeight: '1' }}>
          {convertTemp(temp, temperatureUnit)}°
        </span>
      </div>
      
      {/* Weather Condition */}
      <p className="text-lg font-medium mb-4 capitalize text-gray-600">
        {description}
      </p>
      
      {/* Min/Max Temps in One Line */}
      <div className="text-sm text-gray-500">
        <span className="font-medium">H:{convertTemp(temp_max, temperatureUnit)}°</span>
        <span className="mx-3">•</span>
        <span className="font-medium">L:{convertTemp(temp_min, temperatureUnit)}°</span>
      </div>

      {/* 5-Day Forecast Section */}
      <div className="mt-6">
        <ForecastSection forecast={forecast} temperatureUnit={temperatureUnit} />
      </div>
      
    </div>
  )
}

export default CurrentWeather