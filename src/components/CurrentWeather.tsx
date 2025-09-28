import { Button } from "./ui/button";
import type { City, WeatherData } from "@/types";

interface CurrentWeatherProps {
  selectedCity: City;
  weatherData?: WeatherData;
  isLoading: boolean;
  error: Error | null;
  onCitySelectClick: () => void;
  variant?: "desktop" | "mobile";
}

export function CurrentWeather({
  selectedCity,
  weatherData,
  isLoading,
  error,
  onCitySelectClick,
  variant = "desktop",
}: CurrentWeatherProps) {
  const isMobile = variant === "mobile";

  return (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white ${
        isMobile ? "text-center" : ""
      }`}
    >
      {/* City Selection Button */}
      <Button
        variant="outline"
        size="sm"
        className="text-white border-white/20 hover:bg-white/10 hover:border-white/40 mb-2"
        onClick={onCitySelectClick}
      >
        {selectedCity.name} ▾
      </Button>

      {/* Loading State */}
      {isLoading && (
        <div className={`py-8 ${isMobile ? "" : "text-center"}`}>
          <div className="text-2xl mb-2">🌤️</div>
          <p className="opacity-80">
            {isMobile ? "Betöltés..." : "Időjárás betöltése..."}
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className={`py-8 ${isMobile ? "" : "text-center"}`}>
          <div className="text-2xl mb-2">❌</div>
          <p className="opacity-80">
            {isMobile ? "Hiba történt" : "Időjárás betöltése sikertelen"}
          </p>
        </div>
      )}

      {/* Weather Data */}
      {!isLoading && !error && weatherData && (
        <>
          <div
            className={`font-light mb-2 ${isMobile ? "text-5xl" : "text-6xl"}`}
          >
            {weatherData.current.temperature}°C
          </div>
          <p
            className={`text-lg opacity-90 flex items-center gap-2 ${
              isMobile ? "justify-center mb-6" : ""
            }`}
          >
            <span className="text-2xl">{weatherData.current.weatherIcon}</span>
            {weatherData.current.weatherDescription}
          </p>
        </>
      )}
    </div>
  );
}
