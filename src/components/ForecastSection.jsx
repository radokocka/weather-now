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
      <h3 className={`text-sm sm:text-base lg:text-lg font-bold mb-2 sm:mb-3 lg:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        7-Day Forecast
      </h3>
      
      {/* Horizontal Scrollable Container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-1.5 sm:space-x-2 lg:space-x-3 pb-2 min-w-max">
          {dailyForecast.map((day, index) => (
            <div 
              key={index}
              onClick={() => onDayClick && onDayClick(day)}
              className={`flex-shrink-0 w-14 sm:w-16 lg:w-18 xl:w-20 p-1.5 sm:p-2 lg:p-3 text-center rounded-md sm:rounded-lg lg:rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-md shadow-sm cursor-pointer ${
                selectedDay && selectedDay.date.toDateString() === day.date.toDateString()
                  ? isDarkMode 
                    ? 'bg-blue-900 border-blue-500 border-2 text-white'
                    : 'bg-blue-100 border-blue-300 border-2'
                  : isDarkMode 
                    ? 'bg-gray-700 border border-gray-600 text-gray-200'
                    : 'bg-gray-50 border border-gray-100'
              }`}
            >
              {/* Day Name */}
              <div className={`text-xs font-semibold mb-1 leading-tight ${
                selectedDay && selectedDay.date.toDateString() === day.date.toDateString()
                  ? isDarkMode ? 'text-white' : 'text-gray-800'
                  : isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {getDayName(day.date)}
              </div>
              
              {/* Weather Icon */}
              <div className="mb-1 flex justify-center">
                <img 
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.weather.description}
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 drop-shadow-sm"
                />
              </div>
              
              {/* Min/Max Temperature */}
              <div className={`text-xs ${
                selectedDay && selectedDay.date.toDateString() === day.date.toDateString()
                  ? isDarkMode ? 'text-white' : 'text-gray-800'
                  : isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                <div className="font-bold mb-0.5 leading-none">
                  {convertTemp(day.temp_max, temperatureUnit)}°
                </div>
                <div className={`font-medium leading-none ${
                  selectedDay && selectedDay.date.toDateString() === day.date.toDateString()
                    ? isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
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