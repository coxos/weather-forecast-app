export const API_ENDPOINTS = {
  WEATHER: 'https://api.open-meteo.com/v1/forecast',
  GEOCODING: 'https://geocoding-api.open-meteo.com/v1/search'
} as const;


export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  CACHE_TIME: {
    WEATHER: 5 * 60 * 1000,    // 5 minutes for weather data
    GEOCODING: 60 * 60 * 1000  // 1 hour for city search results
  }
} as const;