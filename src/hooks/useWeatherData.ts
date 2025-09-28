// src/hooks/useWeatherData.ts
import { useQuery } from "@tanstack/react-query"

interface WeatherApiResponse {
  current: {
    time: string
    temperature_2m: number
    weather_code: number
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_probability_max: number[]
  }
}

interface ProcessedWeatherData {
  current: {
    temperature: number
    weatherCode: number
    weatherDescription: string
    weatherIcon: string
  }
  daily: Array<{
    date: string
    dayName: string
    weatherCode: number
    weatherDescription: string
    weatherIcon: string
    temperatureMax: number
    temperatureMin: number
    precipitationProbability: number
  }>
}

// Weather codes mapping
const WEATHER_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: 'Tiszta idő', icon: '☀️' },
  1: { description: 'Többnyire tiszta', icon: '🌤️' },
  2: { description: 'Részben felhős', icon: '⛅' },
  3: { description: 'Borult', icon: '☁️' },
  45: { description: 'Köd', icon: '🌫️' },
  48: { description: 'Zúzmara', icon: '🌨️' },
  51: { description: 'Gyenge szitálás', icon: '🌦️' },
  53: { description: 'Szitálás', icon: '🌦️' },
  55: { description: 'Erős szitálás', icon: '🌧️' },
  61: { description: 'Gyenge eső', icon: '🌧️' },
  63: { description: 'Eső', icon: '🌧️' },
  65: { description: 'Erős eső', icon: '⛈️' },
  71: { description: 'Gyenge hó', icon: '🌨️' },
  73: { description: 'Hó', icon: '❄️' },
  75: { description: 'Erős hó', icon: '❄️' },
  80: { description: 'Gyenge zápor', icon: '🌦️' },
  81: { description: 'Zápor', icon: '🌧️' },
  82: { description: 'Erős zápor', icon: '⛈️' },
  95: { description: 'Zivatar', icon: '⛈️' }
}

const getWeatherInfo = (code: number) => {
  return WEATHER_CODES[code] || { description: 'Ismeretlen', icon: '❓' }
}

const fetchWeatherData = async (latitude: number, longitude: number): Promise<WeatherApiResponse> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7`
  
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Weather data fetch failed')
  }
  
  return response.json()
}

const processWeatherData = (data: WeatherApiResponse): ProcessedWeatherData => {
  const currentWeather = getWeatherInfo(data.current.weather_code)
  
  const dailyWeather = data.daily.time.map((date, index) => {
    const weatherInfo = getWeatherInfo(data.daily.weather_code[index])
    const dayName = new Date(date).toLocaleDateString('hu-HU', { weekday: 'long' })
    
    return {
      date,
      dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      weatherCode: data.daily.weather_code[index],
      weatherDescription: weatherInfo.description,
      weatherIcon: weatherInfo.icon,
      temperatureMax: Math.round(data.daily.temperature_2m_max[index]),
      temperatureMin: Math.round(data.daily.temperature_2m_min[index]),
      precipitationProbability: data.daily.precipitation_probability_max[index] || 0
    }
  })

  return {
    current: {
      temperature: Math.round(data.current.temperature_2m),
      weatherCode: data.current.weather_code,
      weatherDescription: currentWeather.description,
      weatherIcon: currentWeather.icon
    },
    daily: dailyWeather
  }
}

export const useWeatherData = (latitude?: number, longitude?: number) => {
  return useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => fetchWeatherData(latitude!, longitude!),
    enabled: !!latitude && !!longitude,
    select: processWeatherData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}