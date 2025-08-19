import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'
import ForecastSection from './ForecastSection'
import CityTime from './CityTime'
import CityMap from './CityMap'

const CurrentWeather = ({ weather, forecast, temperatureUnit = 'C', isDarkMode: darkModeProp }) => {
  const { isDarkMode: themeIsDarkMode } = useTheme()
  const isDarkMode = darkModeProp !== undefined ? darkModeProp : themeIsDarkMode
  const [selectedDay, setSelectedDay] = useState(null)
  
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

  // If a day is selected, show that day's detailed view
  if (selectedDay) {
    return (
      <div className="text-center animate-fade-in-up transition-all duration-700 ease-out">
        {/* Back button */}
        <button
          onClick={() => setSelectedDay(null)}
          className={`mb-6 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
          }`}
        >
          ← Back to Overview
        </button>

        {/* Selected day detailed view */}
        <h2 className={`text-3xl font-bold mb-4 animate-slide-in ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {selectedDay.dayName} - {weather.name}
        </h2>
        
        {/* Weather Icon */}
        <div className="mb-6 animate-bounce">
          <img 
            src={`https://openweathermap.org/img/wn/${selectedDay.icon}@4x.png`}
            alt={selectedDay.weather.description}
            className="w-32 h-32 mx-auto drop-shadow-2xl transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Temperature Display */}
        <div className="mb-6">
          <span className={`text-6xl font-black transition-all duration-700 ${getTemperatureColor(convertTemp(selectedDay.temp_max, temperatureUnit), temperatureUnit)}`}>
            {convertTemp(selectedDay.temp_max, temperatureUnit)}°
          </span>
        </div>
        
        {/* Min/Max Temperature Display */}
        <div className={`mb-6 backdrop-blur-sm rounded-2xl p-4 border ${isDarkMode ? 'bg-gray-800/90 border-gray-600' : 'bg-white/90 border-white/20'}`}>
          <div className="flex items-center justify-center space-x-6">
            <div className="text-center">
              <div className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>High</div>
              <div className={`text-2xl font-bold ${getTemperatureColor(convertTemp(selectedDay.temp_max, temperatureUnit), temperatureUnit)}`}>
                {convertTemp(selectedDay.temp_max, temperatureUnit)}°
              </div>
            </div>
            <div className={`w-px h-12 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
            <div className="text-center">
              <div className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Low</div>
              <div className={`text-2xl font-bold ${getTemperatureColor(convertTemp(selectedDay.temp_min, temperatureUnit), temperatureUnit)}`}>
                {convertTemp(selectedDay.temp_min, temperatureUnit)}°
              </div>
            </div>
          </div>
        </div>
        
        {/* Weather Condition */}
        <p className={`text-2xl font-semibold mb-6 capitalize animate-fade-in ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {selectedDay.weather.description}
        </p>
        
        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8 text-center animate-scale-in">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="text-2xl mb-1">🌡️</div>
            <div className="text-sm font-medium text-gray-600">Average</div>
            <div className="text-lg font-bold text-gray-900">
              {convertTemp((selectedDay.temp_max + selectedDay.temp_min) / 2, temperatureUnit)}°
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="text-2xl mb-1">💧</div>
            <div className="text-sm font-medium text-gray-600">Condition</div>
            <div className="text-lg font-bold text-gray-900 capitalize">{selectedDay.weather.main}</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <div className="text-2xl mb-1">📅</div>
            <div className="text-sm font-medium text-gray-600">Date</div>
            <div className="text-lg font-bold text-gray-900">{selectedDay.date.toLocaleDateString('sk-SK')}</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-sm font-medium text-gray-600">Range</div>
            <div className="text-lg font-bold text-gray-900">
              {convertTemp(selectedDay.temp_min, temperatureUnit)}° - {convertTemp(selectedDay.temp_max, temperatureUnit)}°
            </div>
          </div>
        </div>

        {/* 7-Day Forecast Section */}
        <div className="mt-6">
          <ForecastSection 
            forecast={forecast} 
            temperatureUnit={temperatureUnit} 
            onDayClick={setSelectedDay}
            selectedDay={selectedDay}
          />
        </div>

        {/* City Map Section */}
        <CityMap weather={weather} isDarkMode={isDarkMode} />
      </div>
    )
  }

  return (
    <div className="text-center animate-fade-in-up transition-all duration-700 ease-out">
      
      {/* City Name */}
      <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 animate-slide-in ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {name}
      </h2>
      
      {/* Real-time Clock */}
      <div className="mb-6">
        <CityTime 
          timezone={weather.timezone} 
          city={name}
          className="mb-2"
        />
      </div>
      
      {/* Weather Icon */}
      <div className="mb-4 sm:mb-6 animate-bounce">
        <img 
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={description}
          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto drop-shadow-2xl transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Huge Temperature Display */}
      <div className="mb-4 sm:mb-6">
        <span className={`text-4xl sm:text-5xl lg:text-6xl font-black transition-all duration-700 ${getTemperatureColor(convertTemp(temp, temperatureUnit), temperatureUnit)}`}>
          {convertTemp(temp, temperatureUnit)}°
        </span>
      </div>
      
      {/* Min/Max Temperature Display */}
      <div className={`mb-4 sm:mb-6 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border ${isDarkMode ? 'bg-gray-800/90 border-gray-600' : 'bg-white/90 border-white/20'}`}>
        <div className="flex items-center justify-center space-x-4 sm:space-x-6">
          <div className="text-center">
            <div className={`text-xs sm:text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Daily High</div>
            <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${getTemperatureColor(convertTemp(temp_max, temperatureUnit), temperatureUnit)}`}>
              {convertTemp(temp_max, temperatureUnit)}°
            </div>
          </div>
          <div className={`w-px h-8 sm:h-12 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
          <div className="text-center">
            <div className={`text-xs sm:text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Daily Low</div>
            <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${getTemperatureColor(convertTemp(temp_min, temperatureUnit), temperatureUnit)}`}>
              {convertTemp(temp_min, temperatureUnit)}°
            </div>
          </div>
        </div>
      </div>
      
      {/* Weather Condition */}
      <p className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 capitalize animate-fade-in ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        {description}
      </p>
      
      {/* Day/Night Weather */}
      <div className={`mb-6 sm:mb-8 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border ${isDarkMode ? 'bg-gray-800/90 border-gray-600' : 'bg-white/90 border-white/20'}`}>
        <h4 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Day & Night Weather</h4>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Day Weather */}
          <div className="text-center p-3 sm:p-4 bg-yellow-50 rounded-lg sm:rounded-xl border border-yellow-200">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">☀️</div>
            <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">During Day</div>
            <div className="text-base sm:text-lg font-bold text-gray-900 mb-1">
              {convertTemp(temp_max, temperatureUnit)}°
            </div>
            <div className="text-xs sm:text-sm text-gray-700 capitalize">
              {icon.includes('d') ? description : 'clear'}
            </div>
          </div>
          
          {/* Night Weather */}
          <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-200">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🌙</div>
            <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">At Night</div>
            <div className="text-base sm:text-lg font-bold text-gray-900 mb-1">
              {convertTemp(temp_min, temperatureUnit)}°
            </div>
            <div className="text-xs sm:text-sm text-gray-700 capitalize">
              {icon.includes('n') ? description : 'cooler'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 text-center animate-scale-in">
        <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-100">
          <div className="text-xl sm:text-2xl mb-1">🌡️</div>
          <div className="text-xs sm:text-sm font-medium text-gray-600">Feels like</div>
          <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">{convertTemp(feels_like, temperatureUnit)}°</div>
        </div>
        <div className="bg-green-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-100">
          <div className="text-xl sm:text-2xl mb-1">💧</div>
          <div className="text-xs sm:text-sm font-medium text-gray-600">Humidity</div>
          <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">{humidity}%</div>
        </div>
        <div className="bg-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-purple-100">
          <div className="text-xl sm:text-2xl mb-1">💨</div>
          <div className="text-xs sm:text-sm font-medium text-gray-600">Wind Speed</div>
          <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">{speed ? `${Math.round(speed)} m/s` : 'N/A'}</div>
        </div>
        <div className="bg-orange-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-orange-100">
          <div className="text-xl sm:text-2xl mb-1">📊</div>
          <div className="text-xs sm:text-sm font-medium text-gray-600">Range</div>
          <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
            {convertTemp(temp_min, temperatureUnit)}° - {convertTemp(temp_max, temperatureUnit)}°
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Section */}
      <div className="mt-6">
        <ForecastSection 
          forecast={forecast} 
          temperatureUnit={temperatureUnit}
          onDayClick={setSelectedDay}
          selectedDay={selectedDay}
        />
      </div>

      {/* City Map Section */}
      <CityMap weather={weather} isDarkMode={isDarkMode} />
      
    </div>
  )
}

export default CurrentWeather