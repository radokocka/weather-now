import { useTheme } from '../context/ThemeContext'
import ForecastSection from './ForecastSection'

const CurrentWeather = ({ weather, forecast, temperatureUnit = 'C' }) => {
  const { isDarkMode } = useTheme()
  if (!weather) return null

  const {
    name,
    main: { temp, temp_min, temp_max, feels_like, humidity },
    weather: [{ description, main, icon }],
    wind: { speed } = {}
  } = weather

  const convertTemp = (temperature, unit) => {
    if (unit === 'F') {
      return Math.round((temperature * 9/5) + 32)
    }
    return Math.round(temperature)
  }

  const getTemperatureColor = (temp, unit) => {
    const celsius = unit === 'F' ? (temp - 32) * 5/9 : temp
    if (celsius <= 0) return 'text-blue-600'    // Freezing - blue
    if (celsius <= 10) return 'text-blue-500'   // Cold - light blue  
    if (celsius <= 20) return 'text-green-600'  // Cool - green
    if (celsius <= 30) return 'text-orange-500' // Warm - orange
    return 'text-red-600'                       // Hot - red
  }

  return (
    <div className="text-center animate-fade-in-up transition-all duration-700 ease-out">
      
      {/* City Name */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 animate-slide-in">
        {name}
      </h2>
      
      {/* Weather Icon */}
      <div className="mb-6 animate-bounce">
        <img 
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={description}
          className="w-32 h-32 mx-auto drop-shadow-2xl transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Huge Temperature Display */}
      <div className="mb-6">
        <span className={`text-6xl font-black transition-all duration-700 ${getTemperatureColor(convertTemp(temp, temperatureUnit), temperatureUnit)}`}>
          {convertTemp(temp, temperatureUnit)}°
        </span>
      </div>
      
      {/* Weather Condition */}
      <p className="text-2xl font-semibold mb-8 capitalize text-gray-800 animate-fade-in">
        {description}
      </p>
      
      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8 text-center animate-scale-in">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="text-2xl mb-1">🌡️</div>
          <div className="text-sm font-medium text-gray-600">Feels like</div>
          <div className="text-lg font-bold text-gray-900">{convertTemp(feels_like, temperatureUnit)}°</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <div className="text-2xl mb-1">💧</div>
          <div className="text-sm font-medium text-gray-600">Humidity</div>
          <div className="text-lg font-bold text-gray-900">{humidity}%</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <div className="text-2xl mb-1">💨</div>
          <div className="text-sm font-medium text-gray-600">Wind Speed</div>
          <div className="text-lg font-bold text-gray-900">{speed ? `${Math.round(speed)} m/s` : 'N/A'}</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
          <div className="text-2xl mb-1">📊</div>
          <div className="text-sm font-medium text-gray-600">Range</div>
          <div className="text-lg font-bold text-gray-900">
            {convertTemp(temp_min, temperatureUnit)}° - {convertTemp(temp_max, temperatureUnit)}°
          </div>
        </div>
      </div>

      {/* 5-Day Forecast Section */}
      <div className="mt-6">
        <ForecastSection forecast={forecast} temperatureUnit={temperatureUnit} />
      </div>
      
    </div>
  )
}

export default CurrentWeather