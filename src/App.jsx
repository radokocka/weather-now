import { useState } from 'react'
import { getCurrentWeather, getForecast } from './services/weatherAPI'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import ThemeToggle from './components/ThemeToggle'
import TemperatureToggle from './components/TemperatureToggle'
import LoadingSkeleton from './components/LoadingSkeleton'
import ErrorState from './components/ErrorState'
import EmptyState from './components/EmptyState'
import './App.css'

function WeatherApp() {
  const { isDarkMode } = useTheme()
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [temperatureUnit, setTemperatureUnit] = useState('C')

  // Get weather background class based on current weather
  const getWeatherBackground = () => {
    if (!weatherData) return 'animated-gradient-bg'
    
    const condition = weatherData.weather?.[0]?.main?.toLowerCase()
    const description = weatherData.weather?.[0]?.description?.toLowerCase()
    const isNight = weatherData.weather?.[0]?.icon?.includes('n')
    
    // Get current time to determine if it's sunset/sunrise
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const isSunsetSunrise = (currentHour >= 17 && currentHour <= 19) || (currentHour >= 5 && currentHour <= 7)

    if (condition === 'clear') {
      if (isNight) {
        return 'clear-night-bg'
      } else if (isSunsetSunrise) {
        return 'sunset-bg'
      } else {
        return 'sunny-bg'
      }
    } else if (condition === 'clouds') {
      return isNight ? 'cloudy-night-bg' : 'cloudy-bg'
    } else if (condition === 'rain' || condition === 'drizzle' || condition === 'thunderstorm') {
      return isNight ? 'rainy-night-bg' : 'rainy-bg'
    } else if (condition === 'snow') {
      return isNight ? 'snow-night-bg' : 'snow-bg'
    } else if (condition === 'mist' || condition === 'fog' || condition === 'haze') {
      return isNight ? 'cloudy-night-bg' : 'cloudy-bg'
    }
    
    return 'animated-gradient-bg'
  }

  // Get weather effects based on current weather
  const getWeatherEffects = () => {
    if (!weatherData) return null
    
    const condition = weatherData.weather?.[0]?.main?.toLowerCase()
    const isNight = weatherData.weather?.[0]?.icon?.includes('n')

    if (condition === 'clear' && !isNight) {
      return (
        <div className="sun-rays">
          <div className="sun-ray"></div>
          <div className="sun-ray"></div>
          <div className="sun-ray"></div>
          <div className="sun-ray"></div>
          <div className="sun-ray"></div>
          <div className="sun-ray"></div>
          <div className="sun-ray"></div>
          <div className="sun-ray"></div>
          <div className="sun-ray"></div>
          <div className="sun-ray"></div>
          <div className="sun-ray"></div>
          <div className="sun-ray"></div>
        </div>
      )
    } else if (condition === 'clear' && isNight) {
      return (
        <div className="stars-container">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="star">✦</div>
          ))}
        </div>
      )
    } else if (condition === 'rain' || condition === 'drizzle' || condition === 'thunderstorm') {
      return (
        <div className="rain-container">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="rain-drop"></div>
          ))}
        </div>
      )
    } else if (condition === 'snow') {
      return (
        <div className="snow-container">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="snowflake">❄</div>
          ))}
        </div>
      )
    }
    
    return null
  }

  const handleSearch = async (searchCity) => {
    if (!searchCity.trim()) return

    setLoading(true)
    setError('')
    setCity(searchCity)

    try {
      const [weather, forecast] = await Promise.all([
        getCurrentWeather(searchCity),
        getForecast(searchCity)
      ])
      
      setWeatherData(weather)
      setForecastData(forecast)
    } catch (err) {
      setError(err.message)
      setWeatherData(null)
      setForecastData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen weather-bg ${getWeatherBackground()} flex items-center justify-center p-4 md:p-6 ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Weather Effects */}
      {getWeatherEffects()}
      
      {/* Animated Clouds - only show for cloudy/default weather or when no weather data */}
      {(!weatherData || 
        weatherData.weather?.[0]?.main?.toLowerCase() === 'clouds' || 
        weatherData.weather?.[0]?.main?.toLowerCase() === 'mist' ||
        weatherData.weather?.[0]?.main?.toLowerCase() === 'fog' ||
        !weatherData.weather) && (
        <>
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
          <div className="cloud cloud-4"></div>
          <div className="cloud cloud-5"></div>
          <div className="cloud cloud-6"></div>
        </>
      )}
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Temperature Toggle */}
      <TemperatureToggle onUnitChange={setTemperatureUnit} />
      
      {/* Main Welcome Card */}
      <div className="w-full max-w-2xl mx-auto px-2 sm:px-4">
        <div className={`${isDarkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-gray-900 border-white/20'} backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] p-4 sm:p-6 md:p-8 lg:p-12 border`}>
          
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 cursor-pointer transition-all duration-300 hover:scale-105 ${isDarkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'}`}
              onClick={() => {
                setWeatherData(null)
                setForecastData(null)
                setCity('')
                setError('')
              }}
              title="Click to return home"
            >
              WeatherNow
            </h1>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Beautiful weather insights
            </p>
          </div>
          
          {/* Search Section */}
          <div className="mb-4 sm:mb-6">
            <SearchBar onSearch={handleSearch} loading={loading} isDarkMode={isDarkMode} />
          </div>
          
          {/* Content Area */}
          <div className="space-y-4 sm:space-y-6 min-h-[300px] sm:min-h-[400px] flex flex-col justify-center">
            {error && (
              <ErrorState 
                error={error} 
                onRetry={() => {
                  setError('')
                  if (city) handleSearch(city)
                }} 
              />
            )}
            
            {loading && (
              <div className="animate-fade-in transition-opacity duration-500">
                <LoadingSkeleton />
              </div>
            )}
            
            {!weatherData && !loading && !error && (
              <div className="animate-fade-in-up transition-all duration-700 ease-out">
                <EmptyState onSuggestionClick={handleSearch} isDarkMode={isDarkMode} />
              </div>
            )}
            
            {weatherData && !loading && (
              <div className="animate-fade-in-up transition-all duration-1000 ease-out transform">
                <CurrentWeather 
                  weather={weatherData} 
                  forecast={forecastData}
                  temperatureUnit={temperatureUnit}
                  isDarkMode={isDarkMode}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <WeatherApp />
    </ThemeProvider>
  )
}

export default App
