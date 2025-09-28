// src/hooks/useWeatherData.ts
import { useQuery } from "@tanstack/react-query";
import { getWeatherInfo } from "@/constants";
import { API_ENDPOINTS, API_CONFIG } from "@/config";
import type { WeatherApiResponse } from "@/types";


interface ProcessedWeatherData {
  current: {
    temperature: number;
    weatherCode: number;
    weatherDescription: string;
    weatherIcon: string;
  };
  daily: Array<{
    date: string;
    dayName: string;
    weatherCode: number;
    weatherDescription: string;
    weatherIcon: string;
    temperatureMax: number;
    temperatureMin: number;
    precipitationProbability: number;
  }>;
}


const fetchWeatherData = async (
  latitude: number,
  longitude: number
): Promise<WeatherApiResponse> => {
  const url = `${API_ENDPOINTS.WEATHER}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7`;

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};


const processWeatherData = (data: WeatherApiResponse): ProcessedWeatherData => {

  const currentWeather = getWeatherInfo(data.current.weather_code);

  const dailyWeather = data.daily.time.map((date, index) => {
    const weatherInfo = getWeatherInfo(data.daily.weather_code[index]);
    const dayName = new Date(date).toLocaleDateString("hu-HU", {
      weekday: "long",
    });

    return {
      date,
      dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      weatherCode: data.daily.weather_code[index],
      weatherDescription: weatherInfo.description,
      weatherIcon: weatherInfo.icon,
      temperatureMax: Math.round(data.daily.temperature_2m_max[index]),
      temperatureMin: Math.round(data.daily.temperature_2m_min[index]),
      precipitationProbability: data.daily.precipitation_probability_max[index] || 0,
    };
  });

  return {
    current: {
      temperature: Math.round(data.current.temperature_2m),
      weatherCode: data.current.weather_code,
      weatherDescription: currentWeather.description,
      weatherIcon: currentWeather.icon,
    },
    daily: dailyWeather,
  };
};


export const useWeatherData = (latitude?: number, longitude?: number) => {
  return useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => fetchWeatherData(latitude!, longitude!),
    enabled: Boolean(latitude && longitude),
    select: processWeatherData,
    staleTime: API_CONFIG.CACHE_TIME.WEATHER,
    gcTime: API_CONFIG.CACHE_TIME.WEATHER * 2,
    retry: API_CONFIG.RETRY_ATTEMPTS,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};