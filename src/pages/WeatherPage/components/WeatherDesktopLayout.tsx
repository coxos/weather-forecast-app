// src/pages/WeatherPage/components/WeatherDesktopLayout.tsx
import { CurrentWeather, WeatherForecast } from "@/components";
import type { City, WeatherData } from "@/types";

interface WeatherDesktopLayoutProps {
  selectedCity: City;
  weatherData?: WeatherData;
  isLoading: boolean;
  error: Error | null;
  onCitySelectClick: () => void;
}

export function WeatherDesktopLayout({
  selectedCity,
  weatherData,
  isLoading,
  error,
  onCitySelectClick,
}: WeatherDesktopLayoutProps) {
  return (
    <div className="hidden md:grid md:grid-cols-2 gap-6 mb-6">
      {/* Current Weather - Left side */}
      <CurrentWeather
        selectedCity={selectedCity}
        weatherData={weatherData}
        isLoading={isLoading}
        error={error}
        onCitySelectClick={onCitySelectClick}
        variant="desktop"
      />

      {/* 7 Day Forecast - Right side */}
      <WeatherForecast
        dailyWeather={weatherData?.daily}
        isLoading={isLoading}
        error={error}
        variant="desktop"
      />
    </div>
  );
}
