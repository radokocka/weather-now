import { useTheme } from '../context/ThemeContext'

const ForecastSection = ({ forecast, temperatureUnit = 'C', onDayClick, selectedDay }) => {
  const { isDarkMode } = useTheme()
  
  if (!forecast || !forecast.list) return null

  const getDayName = (date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('sk-SK', { weekday: 'short' })
    }
  }

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '🌤️', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    }
    return iconMap[iconCode] || '🌤️'
  }

  // Group forecast data by days (take first entry for each day)
  const getDailyForecast = () => {
    const dailyData = []
    const processedDates = new Set()
    
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000)
      const dateKey = date.toDateString()
      
      if (!processedDates.has(dateKey) && dailyData.length < 7) {
        dailyData.push({
          date: date,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          weather: item.weather[0],
          icon: item.weather[0].icon,
          dayName: getDayName(date),
          weatherEmoji: getWeatherIcon(item.weather[0].icon)
        })
        processedDates.add(dateKey)
      }
    })
    
    return dailyData
  }

  const dailyForecast = getDailyForecast()

  const convertTemp = (temp, unit) => {
    if (unit === 'F') {
      return Math.round((temp * 9/5) + 32)
    }
    return Math.round(temp)
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-4 text-gray-900">
        7-Day Forecast
      </h3>
      
      {/* Horizontal Scrollable Container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 pb-2 min-w-max">
          {dailyForecast.map((day, index) => (
            <div 
              key={index}
              onClick={() => onDayClick && onDayClick(day)}
              className={`flex-shrink-0 w-20 p-3 text-center rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-md shadow-sm cursor-pointer ${
                selectedDay && selectedDay.date.toDateString() === day.date.toDateString()
                  ? 'bg-blue-100 border-blue-300 border-2'
                  : 'bg-gray-50 border border-gray-100'
              }`}
            >
              {/* Day Name */}
              <div className="text-sm font-semibold mb-2 text-gray-800">
                {getDayName(day.date)}
              </div>
              
              {/* Weather Icon */}
              <div className="mb-2 flex justify-center">
                <img 
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.weather.description}
                  className="w-8 h-8 drop-shadow-sm"
                />
              </div>
              
              {/* Min/Max Temperature */}
              <div className="text-sm text-gray-800">
                <div className="font-bold mb-1">
                  {convertTemp(day.temp_max, temperatureUnit)}°
                </div>
                <div className="font-medium text-gray-600">
                  {convertTemp(day.temp_min, temperatureUnit)}°
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ForecastSection