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

    if (condition === 'clear') {
      return isNight ? 'clear-night-bg' : 'sunny-bg'
    } else if (condition === 'clouds') {
      return 'cloudy-bg'
    } else if (condition === 'rain' || condition === 'drizzle' || condition === 'thunderstorm') {
      return 'rainy-bg'
    } else if (condition === 'snow') {
      return 'snow-bg'
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
          {[...Array(10)].map((_, i) => (
            <div key={i} className="rain-drop"></div>
          ))}
        </div>
      )
    } else if (condition === 'snow') {
      return (
        <div className="snow-container">
          {[...Array(10)].map((_, i) => (
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
    <div className={`min-h-screen weather-bg ${getWeatherBackground()} flex items-center justify-center p-6`}>
      
      {/* Weather Effects */}
      {getWeatherEffects()}
      
      {/* Animated Clouds - only show for cloudy/default weather */}
      {(!weatherData || weatherData.weather?.[0]?.main?.toLowerCase() === 'clouds' || !weatherData.weather) && (
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
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-white backdrop-blur-xl rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] p-16 border border-white/20">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              WeatherNow
            </h1>
            <p className="text-gray-700 text-base">
              Beautiful weather insights
            </p>
          </div>
          
          {/* Search Section */}
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
          
          {/* Content Area */}
          <div className="space-y-6 min-h-[400px] flex flex-col justify-center">
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
                <EmptyState onSuggestionClick={handleSearch} />
              </div>
            )}
            
            {weatherData && !loading && (
              <div className="animate-fade-in-up transition-all duration-1000 ease-out transform">
                <CurrentWeather 
                  weather={weatherData} 
                  forecast={forecastData}
                  temperatureUnit={temperatureUnit}
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
