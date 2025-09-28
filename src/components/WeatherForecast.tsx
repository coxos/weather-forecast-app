import type { DailyWeather } from "@/types";

interface WeatherForecastProps {
  dailyWeather?: DailyWeather[];
  isLoading: boolean;
  error: Error | null;
  variant?: "desktop" | "mobile";
}

function ForecastLoadingSkeleton({
  variant,
}: {
  variant: "desktop" | "mobile";
}) {
  const isMobile = variant === "mobile";

  return (
    <div className="space-y-3">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between opacity-50">
          <span className={`font-medium ${isMobile ? "text-sm" : ""}`}>
            Loading...
          </span>
          <div className="flex items-center gap-3">
            <span className={isMobile ? "text-xl" : "text-2xl"}>⏳</span>
            <span className={`text-sm ${isMobile ? "text-xs" : ""}`}>--%</span>
            <span className={`font-medium ${isMobile ? "text-sm" : ""}`}>
              --°C / --°C
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ForecastItem({
  day,
  variant,
}: {
  day: DailyWeather;
  variant: "desktop" | "mobile";
}) {
  const isMobile = variant === "mobile";

  return (
    <div className="flex items-center justify-between">
      <span className={`font-medium ${isMobile ? "text-sm w-16" : "w-20"}`}>
        {day.dayName}
      </span>
      <div className={`flex items-center ${isMobile ? "gap-2" : "gap-3"}`}>
        <span className={isMobile ? "text-xl" : "text-2xl"}>
          {day.weatherIcon}
        </span>
        <span
          className={`opacity-80 ${isMobile ? "text-xs w-8" : "text-sm w-10"}`}
        >
          {day.precipitationProbability}%
        </span>
        <span className={`font-medium ${isMobile ? "text-sm" : ""}`}>
          {isMobile
            ? `${day.temperatureMin}° / ${day.temperatureMax}°`
            : `${day.temperatureMin}°C / ${day.temperatureMax}°C`}
        </span>
      </div>
    </div>
  );
}

export function WeatherForecast({
  dailyWeather,
  isLoading,
  error,
  variant = "desktop",
}: WeatherForecastProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
      <h3 className="text-lg font-medium mb-4">7 napos előrejelzés</h3>

      {/* Loading State */}
      {isLoading && <ForecastLoadingSkeleton variant={variant} />}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <div className="text-2xl mb-2">❌</div>
          <p className="opacity-80 text-sm">Előrejelzés betöltése sikertelen</p>
        </div>
      )}

      {/* Forecast Data */}
      {!isLoading && !error && dailyWeather && dailyWeather.length > 0 && (
        <div className="space-y-3">
          {dailyWeather.map((day, index) => (
            <ForecastItem key={index} day={day} variant={variant} />
          ))}
        </div>
      )}

      {/* No Data */}
      {!isLoading && !error && (!dailyWeather || dailyWeather.length === 0) && (
        <div className="text-center py-8">
          <div className="text-2xl mb-2">📅</div>
          <p className="opacity-80 text-sm">Nincs előrejelzési adat</p>
        </div>
      )}
    </div>
  );
}
