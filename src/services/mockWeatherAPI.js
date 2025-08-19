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
    timezone: 3600, // GMT+1
    id: 3060972,
    name: "Bratislava",
    cod: 200
  },
  london: {
    coord: { lon: -0.1257, lat: 51.5085 },
    weather: [{ id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" }],
    base: "stations",
    main: { temp: 15, feels_like: 14.2, temp_min: 12, temp_max: 18, pressure: 1018, humidity: 78 },
    visibility: 10000,
    wind: { speed: 4.1, deg: 230 },
    clouds: { all: 40 },
    dt: Date.now() / 1000,
    sys: { type: 1, id: 1414, country: "GB", sunrise: 1692594000, sunset: 1692644400 },
    timezone: 3600, // GMT+1 (BST)
    id: 2643743,
    name: "London",
    cod: 200
  },
  newyork: {
    coord: { lon: -74.006, lat: 40.7143 },
    weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
    base: "stations",
    main: { temp: 28, feels_like: 29.5, temp_min: 25, temp_max: 31, pressure: 1015, humidity: 62 },
    visibility: 10000,
    wind: { speed: 2.8, deg: 190 },
    clouds: { all: 5 },
    dt: Date.now() / 1000,
    sys: { type: 1, id: 4610, country: "US", sunrise: 1692594000, sunset: 1692644400 },
    timezone: -14400, // GMT-4 (EDT)
    id: 5128581,
    name: "New York",
    cod: 200
  },
  tokyo: {
    coord: { lon: 139.6917, lat: 35.6895 },
    weather: [{ id: 801, main: "Clouds", description: "few clouds", icon: "02d" }],
    base: "stations",
    main: { temp: 32, feels_like: 35.8, temp_min: 29, temp_max: 35, pressure: 1008, humidity: 68 },
    visibility: 10000,
    wind: { speed: 3.2, deg: 150 },
    clouds: { all: 20 },
    dt: Date.now() / 1000,
    sys: { type: 1, id: 8074, country: "JP", sunrise: 1692594000, sunset: 1692644400 },
    timezone: 32400, // GMT+9
    id: 1850147,
    name: "Tokyo",
    cod: 200
  },
  paris: {
    coord: { lon: 2.3488, lat: 48.8534 },
    weather: [{ id: 500, main: "Rain", description: "light rain", icon: "10d" }],
    base: "stations",
    main: { temp: 18, feels_like: 17.5, temp_min: 15, temp_max: 21, pressure: 1012, humidity: 82 },
    visibility: 8000,
    wind: { speed: 3.7, deg: 210 },
    clouds: { all: 85 },
    dt: Date.now() / 1000,
    sys: { type: 1, id: 6550, country: "FR", sunrise: 1692594000, sunset: 1692644400 },
    timezone: 7200, // GMT+2
    id: 2988507,
    name: "Paris",
    cod: 200
  },
  dubai: {
    coord: { lon: 55.3047, lat: 25.2582 },
    weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
    base: "stations",
    main: { temp: 42, feels_like: 47.2, temp_min: 38, temp_max: 45, pressure: 1010, humidity: 45 },
    visibility: 10000,
    wind: { speed: 4.5, deg: 320 },
    clouds: { all: 0 },
    dt: Date.now() / 1000,
    sys: { type: 1, id: 7672, country: "AE", sunrise: 1692594000, sunset: 1692644400 },
    timezone: 14400, // GMT+4
    id: 292223,
    name: "Dubai",
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
    timezone: 7200, // GMT+2
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
    timezone: 7200, // GMT+2
    id: 2761369,
    name: "Vienna",
    cod: 200
  },
  sydney: {
    coord: { lon: 151.2073, lat: -33.8679 },
    weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
    base: "stations",
    main: { temp: 24, feels_like: 23.2, temp_min: 21, temp_max: 27, pressure: 1020, humidity: 55 },
    visibility: 10000,
    wind: { speed: 3.8, deg: 140 },
    clouds: { all: 0 },
    dt: Date.now() / 1000,
    sys: { type: 1, id: 9767, country: "AU", sunrise: 1692594000, sunset: 1692644400 },
    timezone: 36000, // GMT+10
    id: 2147714,
    name: "Sydney",
    cod: 200
  },
  moscow: {
    coord: { lon: 37.6156, lat: 55.7522 },
    weather: [{ id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }],
    base: "stations",
    main: { temp: 8, feels_like: 6.2, temp_min: 5, temp_max: 11, pressure: 1018, humidity: 75 },
    visibility: 10000,
    wind: { speed: 4.5, deg: 280 },
    clouds: { all: 70 },
    dt: Date.now() / 1000,
    sys: { type: 1, id: 9029, country: "RU", sunrise: 1692594000, sunset: 1692644400 },
    timezone: 10800, // GMT+3
    id: 524901,
    name: "Moscow",
    cod: 200
  },
  toronto: {
    coord: { lon: -79.3832, lat: 43.6532 },
    weather: [{ id: 801, main: "Clouds", description: "few clouds", icon: "02d" }],
    base: "stations",
    main: { temp: 21, feels_like: 20.8, temp_min: 18, temp_max: 24, pressure: 1016, humidity: 68 },
    visibility: 10000,
    wind: { speed: 3.2, deg: 200 },
    clouds: { all: 25 },
    dt: Date.now() / 1000,
    sys: { type: 1, id: 718, country: "CA", sunrise: 1692594000, sunset: 1692644400 },
    timezone: -14400, // GMT-4 (EDT)
    id: 6167865,
    name: "Toronto",
    cod: 200
  },
  riodejaneiro: {
    coord: { lon: -43.1729, lat: -22.9068 },
    weather: [{ id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" }],
    base: "stations",
    main: { temp: 26, feels_like: 27.5, temp_min: 23, temp_max: 29, pressure: 1012, humidity: 72 },
    visibility: 10000,
    wind: { speed: 2.8, deg: 110 },
    clouds: { all: 35 },
    dt: Date.now() / 1000,
    sys: { type: 1, id: 8429, country: "BR", sunrise: 1692594000, sunset: 1692644400 },
    timezone: -10800, // GMT-3
    id: 3451190,
    name: "Rio de Janeiro",
    cod: 200
  },
  mumbai: {
    coord: { lon: 72.8479, lat: 19.0144 },
    weather: [{ id: 721, main: "Haze", description: "haze", icon: "50d" }],
    base: "stations",
    main: { temp: 33, feels_like: 37.2, temp_min: 30, temp_max: 36, pressure: 1008, humidity: 78 },
    visibility: 6000,
    wind: { speed: 2.5, deg: 250 },
    clouds: { all: 20 },
    dt: Date.now() / 1000,
    sys: { type: 1, id: 9052, country: "IN", sunrise: 1692594000, sunset: 1692644400 },
    timezone: 19800, // GMT+5:30
    id: 1275339,
    name: "Mumbai",
    cod: 200
  },
  cairo: {
    coord: { lon: 31.2357, lat: 30.0444 },
    weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
    base: "stations",
    main: { temp: 35, feels_like: 38.5, temp_min: 32, temp_max: 38, pressure: 1010, humidity: 42 },
    visibility: 10000,
    wind: { speed: 3.5, deg: 340 },
    clouds: { all: 0 },
    dt: Date.now() / 1000,
    sys: { type: 1, id: 2422, country: "EG", sunrise: 1692594000, sunset: 1692644400 },
    timezone: 7200, // GMT+2
    id: 360630,
    name: "Cairo",
    cod: 200
  }
};

const mockForecastData = {
  cod: "200",
  message: 0,
  cnt: 56,
  list: [
    // Day 1
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
    },
    // Day 2
    {
      dt: Date.now() / 1000 + 86400 + 10800,
      main: { temp: 25, feels_like: 24.8, temp_min: 23, temp_max: 27, pressure: 1010, humidity: 62 },
      weather: [{ id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }],
      clouds: { all: 60 },
      wind: { speed: 3.5, deg: 220 },
      visibility: 10000,
      dt_txt: new Date(Date.now() + 86400000 + 10800000).toISOString().replace('T', ' ').slice(0, -5)
    },
    {
      dt: Date.now() / 1000 + 86400 + 21600,
      main: { temp: 28, feels_like: 27.5, temp_min: 26, temp_max: 30, pressure: 1009, humidity: 58 },
      weather: [{ id: 500, main: "Rain", description: "light rain", icon: "10d" }],
      clouds: { all: 80 },
      wind: { speed: 4.2, deg: 240 },
      visibility: 8000,
      dt_txt: new Date(Date.now() + 86400000 + 21600000).toISOString().replace('T', ' ').slice(0, -5)
    },
    {
      dt: Date.now() / 1000 + 86400 + 32400,
      main: { temp: 24, feels_like: 23.5, temp_min: 22, temp_max: 26, pressure: 1011, humidity: 70 },
      weather: [{ id: 801, main: "Clouds", description: "few clouds", icon: "02n" }],
      clouds: { all: 25 },
      wind: { speed: 2.8, deg: 180 },
      visibility: 10000,
      dt_txt: new Date(Date.now() + 86400000 + 32400000).toISOString().replace('T', ' ').slice(0, -5)
    },
    // Day 3
    {
      dt: Date.now() / 1000 + 172800 + 10800,
      main: { temp: 22, feels_like: 21.8, temp_min: 20, temp_max: 24, pressure: 1015, humidity: 65 },
      weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
      clouds: { all: 0 },
      wind: { speed: 2.5, deg: 160 },
      visibility: 10000,
      dt_txt: new Date(Date.now() + 172800000 + 10800000).toISOString().replace('T', ' ').slice(0, -5)
    },
    {
      dt: Date.now() / 1000 + 172800 + 21600,
      main: { temp: 27, feels_like: 26.5, temp_min: 25, temp_max: 29, pressure: 1013, humidity: 52 },
      weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
      clouds: { all: 5 },
      wind: { speed: 3.0, deg: 190 },
      visibility: 10000,
      dt_txt: new Date(Date.now() + 172800000 + 21600000).toISOString().replace('T', ' ').slice(0, -5)
    },
    // Day 4
    {
      dt: Date.now() / 1000 + 259200 + 10800,
      main: { temp: 29, feels_like: 28.8, temp_min: 27, temp_max: 31, pressure: 1008, humidity: 55 },
      weather: [{ id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" }],
      clouds: { all: 35 },
      wind: { speed: 4.1, deg: 200 },
      visibility: 10000,
      dt_txt: new Date(Date.now() + 259200000 + 10800000).toISOString().replace('T', ' ').slice(0, -5)
    },
    {
      dt: Date.now() / 1000 + 259200 + 21600,
      main: { temp: 31, feels_like: 30.5, temp_min: 29, temp_max: 33, pressure: 1006, humidity: 48 },
      weather: [{ id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }],
      clouds: { all: 70 },
      wind: { speed: 3.8, deg: 220 },
      visibility: 10000,
      dt_txt: new Date(Date.now() + 259200000 + 21600000).toISOString().replace('T', ' ').slice(0, -5)
    },
    // Day 5
    {
      dt: Date.now() / 1000 + 345600 + 10800,
      main: { temp: 26, feels_like: 25.2, temp_min: 24, temp_max: 28, pressure: 1012, humidity: 60 },
      weather: [{ id: 500, main: "Rain", description: "light rain", icon: "10d" }],
      clouds: { all: 85 },
      wind: { speed: 3.5, deg: 250 },
      visibility: 7000,
      dt_txt: new Date(Date.now() + 345600000 + 10800000).toISOString().replace('T', ' ').slice(0, -5)
    },
    {
      dt: Date.now() / 1000 + 345600 + 21600,
      main: { temp: 23, feels_like: 22.5, temp_min: 21, temp_max: 25, pressure: 1014, humidity: 72 },
      weather: [{ id: 501, main: "Rain", description: "moderate rain", icon: "10d" }],
      clouds: { all: 90 },
      wind: { speed: 4.5, deg: 260 },
      visibility: 5000,
      dt_txt: new Date(Date.now() + 345600000 + 21600000).toISOString().replace('T', ' ').slice(0, -5)
    },
    // Day 6
    {
      dt: Date.now() / 1000 + 432000 + 10800,
      main: { temp: 20, feels_like: 19.8, temp_min: 18, temp_max: 22, pressure: 1018, humidity: 68 },
      weather: [{ id: 801, main: "Clouds", description: "few clouds", icon: "02d" }],
      clouds: { all: 30 },
      wind: { speed: 2.8, deg: 180 },
      visibility: 10000,
      dt_txt: new Date(Date.now() + 432000000 + 10800000).toISOString().replace('T', ' ').slice(0, -5)
    },
    {
      dt: Date.now() / 1000 + 432000 + 21600,
      main: { temp: 25, feels_like: 24.2, temp_min: 23, temp_max: 27, pressure: 1016, humidity: 58 },
      weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
      clouds: { all: 10 },
      wind: { speed: 3.2, deg: 200 },
      visibility: 10000,
      dt_txt: new Date(Date.now() + 432000000 + 21600000).toISOString().replace('T', ' ').slice(0, -5)
    },
    // Day 7
    {
      dt: Date.now() / 1000 + 518400 + 10800,
      main: { temp: 28, feels_like: 27.5, temp_min: 26, temp_max: 30, pressure: 1013, humidity: 55 },
      weather: [{ id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" }],
      clouds: { all: 40 },
      wind: { speed: 3.5, deg: 210 },
      visibility: 10000,
      dt_txt: new Date(Date.now() + 518400000 + 10800000).toISOString().replace('T', ' ').slice(0, -5)
    },
    {
      dt: Date.now() / 1000 + 518400 + 21600,
      main: { temp: 30, feels_like: 29.2, temp_min: 28, temp_max: 32, pressure: 1011, humidity: 52 },
      weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
      clouds: { all: 15 },
      wind: { speed: 2.8, deg: 190 },
      visibility: 10000,
      dt_txt: new Date(Date.now() + 518400000 + 21600000).toISOString().replace('T', ' ').slice(0, -5)
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