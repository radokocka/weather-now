import { useState, useEffect } from 'react'

const CityTime = ({ timezone, city, className = "" }) => {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      if (timezone !== undefined) {
        // timezone is in seconds offset from UTC
        const now = new Date()
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
        const cityTime = new Date(utc + (timezone * 1000))
        
        const timeString = cityTime.toLocaleTimeString('sk-SK', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
        
        setCurrentTime(timeString)
      }
    }

    // Update immediately
    updateTime()
    
    // Update every second
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [timezone])

  if (timezone === undefined || currentTime === '') {
    return null
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="text-gray-900 font-bold text-lg">
        🕐 {currentTime}
      </div>
      <div className="text-xs text-gray-600">
        Local time
      </div>
    </div>
  )
}

export default CityTime