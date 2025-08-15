// Mock weather API for development/testing
const mockWeatherData = {
  bratislava: {
    coord: { lon: 17.1067, lat: 48.1482 },
    weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
    base: "stations",
    main: { temp: 22, feels_like: 21.5, temp_min: 18, temp_max: 25, pressure: 1013, humidity: 65 },
    visibility: 10000,
    wind: { speed: 3.5, deg: 220 },
    clouds: { all: 0 },
    dt: Date.now() / 1000,
    sys: { type: 1, id: 6736, country: "SK", sunrise: 1692594000, sunset: 1692644400 },
    timezone: 7200,
    id: 3060972,
    name: "Bratislava",
    cod: 200
  },
  prague: {
    coord: { lon: 14.4208, lat: 50.088 },
    weather: [{ id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }],
    base: "stations",
    main: { temp: 19, feels_like: 18.2, temp_min: 16, temp_max: 22, pressure: 1015, humidity: 72 },
    visibility: 10000,
    wind: { speed: 2.1, deg: 180 },
    clouds: { all: 75 },
    dt: Date.now() / 1000,
    sys: { type: 1, id: 6735, country: "CZ", sunrise: 1692594000, sunset: 1692644400 },
    timezone: 7200,
    id: 3067696,
    name: "Prague",
    cod: 200
  },
  vienna: {
    coord: { lon: 16.3721, lat: 48.2083 },
    weather: [{ id: 500, main: "Rain", description: "light rain", icon: "10d" }],
    base: "stations",
    main: { temp: 17, feels_like: 16.8, temp_min: 14, temp_max: 20, pressure: 1010, humidity: 85 },
    visibility: 8000,
    wind: { speed: 4.2, deg: 250 },
    clouds: { all: 90 },
    dt: Date.now() / 1000,
    sys: { type: 1, id: 6734, country: "AT", sunrise: 1692594000, sunset: 1692644400 },
    timezone: 7200,
    id: 2761369,
    name: "Vienna",
    cod: 200
  }
};

const mockForecastData = {
  cod: "200",
  message: 0,
  cnt: 40,
  list: [
    {
      dt: Date.now() / 1000 + 10800,
      main: { temp: 24, feels_like: 23.5, temp_min: 22, temp_max: 26, pressure: 1012, humidity: 60 },
      weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
      clouds: { all: 0 },
      wind: { speed: 2.8, deg: 200 },
      visibility: 10000,
      dt_txt: new Date(Date.now() + 10800000).toISOString().replace('T', ' ').slice(0, -5)
    },
    {
      dt: Date.now() / 1000 + 21600,
      main: { temp: 26, feels_like: 25.2, temp_min: 24, temp_max: 28, pressure: 1011, humidity: 55 },
      weather: [{ id: 801, main: "Clouds", description: "few clouds", icon: "02d" }],
      clouds: { all: 20 },
      wind: { speed: 3.2, deg: 210 },
      visibility: 10000,
      dt_txt: new Date(Date.now() + 21600000).toISOString().replace('T', ' ').slice(0, -5)
    },
    {
      dt: Date.now() / 1000 + 32400,
      main: { temp: 23, feels_like: 22.8, temp_min: 21, temp_max: 25, pressure: 1013, humidity: 68 },
      weather: [{ id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" }],
      clouds: { all: 40 },
      wind: { speed: 2.5, deg: 180 },
      visibility: 10000,
      dt_txt: new Date(Date.now() + 32400000).toISOString().replace('T', ' ').slice(0, -5)
    }
  ],
  city: {
    id: 3060972,
    name: "Bratislava",
    coord: { lat: 48.1482, lon: 17.1067 },
    country: "SK",
    population: 423737,
    timezone: 7200,
    sunrise: 1692594000,
    sunset: 1692644400
  }
};

export const getMockCurrentWeather = async (city) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const cityKey = city.toLowerCase().replace(/\s+/g, '');
  const weatherData = mockWeatherData[cityKey];
  
  if (!weatherData) {
    throw new Error(`City "${city}" not found. Try Bratislava, Prague, or Vienna.`);
  }
  
  return weatherData;
};

export const getMockForecast = async (city) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const cityKey = city.toLowerCase().replace(/\s+/g, '');
  const weatherExists = mockWeatherData[cityKey];
  
  if (!weatherExists) {
    throw new Error(`Forecast for "${city}" not found. Try Bratislava, Prague, or Vienna.`);
  }
  
  return {
    ...mockForecastData,
    city: {
      ...mockForecastData.city,
      name: weatherExists.name
    }
  };
};