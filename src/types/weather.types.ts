
export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
  weatherDescription: string;
  weatherIcon: string;
}

export interface DailyWeather {
  date: string;
  dayName: string;
  weatherCode: number;
  weatherDescription: string;
  weatherIcon: string;
  temperatureMax: number;
  temperatureMin: number;
  precipitationProbability: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyWeather[];
}

export interface WeatherApiResponse {
  current: {
    time: string;
    temperature_2m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}