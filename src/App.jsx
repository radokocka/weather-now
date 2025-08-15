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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-6">
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Temperature Toggle */}
      <TemperatureToggle onUnitChange={setTemperatureUnit} />
      
      {/* Main Welcome Card */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              WeatherNow
            </h1>
            <p className="text-gray-600 text-sm">
              Beautiful weather insights
            </p>
          </div>
          
          {/* Search Section */}
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
          
          {/* Content Area */}
          <div className="space-y-6">
            {error && (
              <ErrorState 
                error={error} 
                onRetry={() => {
                  setError('')
                  if (city) handleSearch(city)
                }} 
              />
            )}
            
            {loading && <LoadingSkeleton />}
            
            {!weatherData && !loading && !error && (
              <EmptyState onSuggestionClick={handleSearch} />
            )}
            
            {weatherData && !loading && (
              <div className="animate-fade-in-up">
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
