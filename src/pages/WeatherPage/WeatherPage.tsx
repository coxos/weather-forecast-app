// src/pages/WeatherPage/WeatherPage.tsx
import { useState, useEffect } from "react";
import { TemperatureChart, CityModal } from "@/components";
import { useSelectedCity, useWeatherData } from "@/hooks";
import {
  WeatherEmptyState,
  WeatherDesktopLayout,
  WeatherMobileLayout,
} from "./components";
import type { City } from "@/types";

export function WeatherPage() {
  const [showCityModal, setShowCityModal] = useState(false);

  // City selection state
  const { selectedCity, isInitialized, selectCity } = useSelectedCity();

  // Weather data
  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
  } = useWeatherData(selectedCity?.latitude, selectedCity?.longitude);

  // Show modal if no city selected after initialization
  useEffect(() => {
    if (isInitialized && !selectedCity) {
      setShowCityModal(true);
    }
  }, [isInitialized, selectedCity]);

  // Handle city selection
  const handleCitySelect = (city: City) => {
    selectCity(city);
    setShowCityModal(false);
  };

  // Handle city change button click
  const handleCitySelectClick = () => {
    setShowCityModal(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 pt-8">
      {selectedCity ? (
        <>
          {/* Desktop Layout */}
          <WeatherDesktopLayout
            selectedCity={selectedCity}
            weatherData={weatherData}
            isLoading={isWeatherLoading}
            error={weatherError}
            onCitySelectClick={handleCitySelectClick}
          />

          {/* Mobile Layout */}
          <WeatherMobileLayout
            selectedCity={selectedCity}
            weatherData={weatherData}
            isLoading={isWeatherLoading}
            error={weatherError}
            onCitySelectClick={handleCitySelectClick}
          />

          {/* Temperature Chart - Both mobile & desktop */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
            <h3 className="text-lg font-medium mb-4">Hőmérséklet alakulása</h3>
            <TemperatureChart
              dailyWeather={weatherData?.daily}
              isLoading={isWeatherLoading}
            />
          </div>
        </>
      ) : (
        <WeatherEmptyState />
      )}

      {/* City Selection Modal */}
      <CityModal
        open={showCityModal}
        onOpenChange={setShowCityModal}
        onCitySelect={handleCitySelect}
      />
    </main>
  );
}
