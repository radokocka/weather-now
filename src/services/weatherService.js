import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherService = {
  async getCurrentWeather(city) {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch current weather: ${error.response?.data?.message || error.message}`);
    }
  },

  async getCurrentWeatherByCoords(lat, lon) {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch current weather: ${error.response?.data?.message || error.message}`);
    }
  },

  async getFiveDayForecast(city) {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch forecast: ${error.response?.data?.message || error.message}`);
    }
  },

  async getFiveDayForecastByCoords(lat, lon) {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch forecast: ${error.response?.data?.message || error.message}`);
    }
  },

  getWeatherIconUrl(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  },

  formatForecastData(forecastData) {
    const dailyForecasts = {};
    
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          date: date,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          weather: item.weather[0],
          humidity: item.main.humidity,
          wind_speed: item.wind.speed,
          forecasts: []
        };
      } else {
        dailyForecasts[date].temp_min = Math.min(dailyForecasts[date].temp_min, item.main.temp_min);
        dailyForecasts[date].temp_max = Math.max(dailyForecasts[date].temp_max, item.main.temp_max);
      }
      
      dailyForecasts[date].forecasts.push(item);
    });
    
    return Object.values(dailyForecasts).slice(0, 5);
  }
};

export default weatherService;