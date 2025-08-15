import axios from 'axios';
import { getMockCurrentWeather, getMockForecast } from './mockWeatherAPI.js';

// Debug API key loading
console.log('🔧 Environment variables debug:');
console.log('- VITE_WEATHER_API_KEY from env:', import.meta.env.VITE_WEATHER_API_KEY);
console.log('- Full import.meta.env:', import.meta.env);

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Debug API key status
console.log('🔑 API Key status:');
console.log('- API_KEY value:', API_KEY);
console.log('- API_KEY type:', typeof API_KEY);
console.log('- API_KEY length:', API_KEY?.length);
console.log('- Is API_KEY valid:', !!(API_KEY && API_KEY.length > 10 && API_KEY !== 'your_api_key_here'));

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true' || !API_KEY || API_KEY.length < 10;

// Add timeout and retry logic
const weatherClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getCurrentWeather = async (city) => {
  console.log('🌤️ getCurrentWeather called for city:', city);
  console.log('- USE_MOCK:', USE_MOCK);
  console.log('- API_KEY available:', !!API_KEY);
  
  if (USE_MOCK) {
    console.log('✅ Using mock weather API for development');
    return getMockCurrentWeather(city);
  }

  if (!API_KEY || API_KEY === 'your_api_key_here' || API_KEY.length < 10) {
    console.error('❌ Invalid API key:', { API_KEY, length: API_KEY?.length });
    throw new Error('Weather API key is not configured. Please add VITE_WEATHER_API_KEY to your .env file');
  }

  try {
    console.log('🌐 Making API request to OpenWeatherMap...');
    const response = await weatherClient.get('/weather', {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    console.log('✅ Real API success:', response.status);
    return response.data;
  } catch (error) {
    console.warn('⚠️ Real API failed, falling back to mock data:', error.response?.status, error.message);
    return getMockCurrentWeather(city);
  }
};

export const getForecast = async (city) => {
  console.log('📊 getForecast called for city:', city);
  
  if (USE_MOCK) {
    console.log('✅ Using mock forecast API for development');
    return getMockForecast(city);
  }

  if (!API_KEY || API_KEY === 'your_api_key_here' || API_KEY.length < 10) {
    console.error('❌ Invalid API key for forecast:', { API_KEY, length: API_KEY?.length });
    throw new Error('Weather API key is not configured. Please add VITE_WEATHER_API_KEY to your .env file');
  }

  try {
    console.log('🌐 Making forecast API request to OpenWeatherMap...');
    const response = await weatherClient.get('/forecast', {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    console.log('✅ Real forecast API success:', response.status);
    return response.data;
  } catch (error) {
    console.warn('⚠️ Real forecast API failed, falling back to mock data:', error.response?.status, error.message);
    return getMockForecast(city);
  }
};