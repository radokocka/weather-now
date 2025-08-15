import { config } from 'dotenv';
config();

// Test verzia weather service pre Node.js
import axios from 'axios';

const API_KEY = process.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherService = {
  async getCurrentWeather(city) {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: API_KEY, units: 'metric' }
    });
    return response.data;
  },
  
  async getFiveDayForecast(city) {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, appid: API_KEY, units: 'metric' }
    });
    return response.data;
  },
  
  async getCurrentWeatherByCoords(lat, lon) {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { lat, lon, appid: API_KEY, units: 'metric' }
    });
    return response.data;
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

async function testWeatherService() {
  console.log('🌤️  Testovanie Weather Service...\n');
  
  if (!API_KEY) {
    console.error('❌ API kľúč nie je nastavený!');
    return;
  }

  try {
    // Test súčasné počasie podľa mesta
    console.log('📍 Testovanie súčasného počasia pre Bratislavu...');
    const currentWeather = await weatherService.getCurrentWeather('Bratislava');
    console.log(`✅ Súčasné počasie v ${currentWeather.name}:`);
    console.log(`   Teplota: ${currentWeather.main.temp}°C`);
    console.log(`   Pocitová teplota: ${currentWeather.main.feels_like}°C`);
    console.log(`   Popis: ${currentWeather.weather[0].description}`);
    console.log(`   Vlhkosť: ${currentWeather.main.humidity}%`);
    console.log(`   Vietor: ${currentWeather.wind.speed} m/s\n`);

    // Test 5-dňová predpoveď
    console.log('📅 Testovanie 5-dňovej predpovede pre Bratislavu...');
    const forecast = await weatherService.getFiveDayForecast('Bratislava');
    console.log(`✅ 5-dňová predpoveď pre ${forecast.city.name}:`);
    
    const formattedForecast = weatherService.formatForecastData(forecast);
    formattedForecast.forEach((day, index) => {
      console.log(`   Deň ${index + 1} (${day.date}):`);
      console.log(`     Min: ${Math.round(day.temp_min)}°C, Max: ${Math.round(day.temp_max)}°C`);
      console.log(`     Počasie: ${day.weather.description}`);
    });

    console.log('\n🎯 Testovanie počasia podľa súradníc (Praha)...');
    const pragueWeather = await weatherService.getCurrentWeatherByCoords(50.0755, 14.4378);
    console.log(`✅ Počasie v ${pragueWeather.name}: ${pragueWeather.main.temp}°C`);

    // Test URL ikony počasia
    console.log('\n🖼️  Testovanie URL ikony počasia...');
    const iconUrl = weatherService.getWeatherIconUrl(currentWeather.weather[0].icon);
    console.log(`✅ URL ikony: ${iconUrl}`);

    console.log('\n🎉 Všetky testy úspešne prešli!');

  } catch (error) {
    console.error('❌ Chyba pri testovaní weather service:', error.message);
  }
}

testWeatherService();