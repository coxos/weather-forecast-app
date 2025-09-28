export interface WeatherCodeInfo {
  description: string;
  icon: string;
}

/**
 * Weather codes mapping based on Open Meteo API
 * @see https://open-meteo.com/en/docs
 */
export const WEATHER_CODES: Record<number, WeatherCodeInfo> = {

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
} as const;


export const DEFAULT_WEATHER_INFO: WeatherCodeInfo = {
  description: 'Ismeretlen', 
  icon: '❓'
};

export const getWeatherInfo = (code: number): WeatherCodeInfo => {
  return WEATHER_CODES[code] || DEFAULT_WEATHER_INFO;
};

export const isValidWeatherCode = (code: number): boolean => {
  return code in WEATHER_CODES;
};

export const getAllWeatherCodes = (): number[] => {
  return Object.keys(WEATHER_CODES).map(Number);
};