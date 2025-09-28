import { Button } from "@/components";
import type { City, WeatherData } from "@/types";

interface WeatherMobileLayoutProps {
  selectedCity: City;
  weatherData?: WeatherData;
  isLoading: boolean;
  error: Error | null;
  onCitySelectClick: () => void;
}

export function WeatherMobileLayout({
  selectedCity,
  weatherData,
  isLoading,
  error,
  onCitySelectClick,
}: WeatherMobileLayoutProps) {
  return (
    <div className="md:hidden space-y-6 mb-6">
      {/* Current Weather + Mobile Forecast */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
        {/* City Button */}
        <Button
          onClick={onCitySelectClick}
          className="text-white border border-white/20 hover:bg-white/10 hover:border-white/40 mb-2 px-3 py-1 rounded text-sm transition-colors"
        >
          {selectedCity.name} ▾
        </Button>

        {/* Weather Content */}
        {isLoading ? (
          <div className="py-8">
            <div className="text-2xl mb-2">🌤️</div>
            <p className="opacity-80">Betöltés...</p>
          </div>
        ) : error ? (
          <div className="py-8">
            <div className="text-2xl mb-2">❌</div>
            <p className="opacity-80">Hiba történt</p>
          </div>
        ) : weatherData ? (
          <>
            {/* Current Temperature */}
            <div className="text-5xl font-light mb-2">
              {weatherData.current.temperature}°C
            </div>
            <p className="text-lg opacity-90 mb-6 flex items-center justify-center gap-2">
              <span className="text-2xl">
                {weatherData.current.weatherIcon}
              </span>
              {weatherData.current.weatherDescription}
            </p>

            {/* Mobile 7-day forecast */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">7 napos előrejelzés</h3>
              {weatherData.daily.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium text-sm">{day.dayName}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{day.weatherIcon}</span>
                    <span className="text-xs opacity-80">
                      {day.precipitationProbability}%
                    </span>
                    <span className="text-sm font-medium">
                      {day.temperatureMin}° / {day.temperatureMax}°
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
