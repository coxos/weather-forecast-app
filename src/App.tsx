import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { CityModal } from "@/components/CityModal";
import { useWeatherData } from "@/hooks/useWeatherData";
import "./index.css";

interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showCityModal, setShowCityModal] = useState(false);

  // Weather data query
  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
  } = useWeatherData(selectedCity?.latitude, selectedCity?.longitude);

  // Load saved city from localStorage
  useEffect(() => {
    const savedCity = localStorage.getItem("weather-app-selected-city");
    if (savedCity) {
      try {
        setSelectedCity(JSON.parse(savedCity));
      } catch (error) {
        console.error("Error parsing saved city:", error);
      }
    } else {
      // No city selected, show modal immediately
      setShowCityModal(true);
    }
  }, []);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    localStorage.setItem("weather-app-selected-city", JSON.stringify(city));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#7CB9E8] to-[#A3D4FA]">
      {/* Main Content - Mobile first, then desktop grid */}
      <main className="max-w-7xl mx-auto px-6 pt-8">
        {selectedCity ? (
          <>
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-2 gap-6 mb-6">
              {/* Current Weather - Left side */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white/20 hover:bg-white/10 hover:border-white/40 mb-2"
                  onClick={() => setShowCityModal(true)}
                >
                  {selectedCity.name} ▾
                </Button>

                {isWeatherLoading ? (
                  <div className="text-center py-8">
                    <div className="text-2xl">🌤️</div>
                    <p className="opacity-80">Időjárás betöltése...</p>
                  </div>
                ) : weatherError ? (
                  <div className="text-center py-8">
                    <div className="text-2xl">❌</div>
                    <p className="opacity-80">Időjárás betöltése sikertelen</p>
                  </div>
                ) : weatherData ? (
                  <>
                    <div className="text-6xl font-light mb-2">
                      {weatherData.current.temperature}°C
                    </div>
                    <p className="text-lg opacity-90 flex items-center gap-2">
                      <span className="text-2xl">
                        {weatherData.current.weatherIcon}
                      </span>
                      {weatherData.current.weatherDescription}
                    </p>
                  </>
                ) : null}
              </div>

              {/* 7 Day Forecast - Right side */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
                <h3 className="text-lg font-medium mb-4">
                  7 napos előrejelzés
                </h3>
                {weatherData?.daily ? (
                  <div className="space-y-3">
                    {weatherData.daily.map((day, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="font-medium w-20">{day.dayName}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{day.weatherIcon}</span>
                          <span className="text-sm opacity-80 w-10">
                            {day.precipitationProbability}%
                          </span>
                          <span className="font-medium">
                            {day.temperatureMin}°C / {day.temperatureMax}°C
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between opacity-50"
                      >
                        <span className="font-medium">Loading...</span>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">⏳</span>
                          <span className="text-sm">--%</span>
                          <span className="font-medium">--°C / --°C</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Layout - Stack vertically */}
            <div className="md:hidden space-y-6 mb-6">
              {/* Current Weather */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white/20 hover:bg-white/10 hover:border-white/40 mb-2"
                  onClick={() => setShowCityModal(true)}
                >
                  {selectedCity.name} ▾
                </Button>

                {isWeatherLoading ? (
                  <div className="py-8">
                    <div className="text-2xl mb-2">🌤️</div>
                    <p className="opacity-80">Betöltés...</p>
                  </div>
                ) : weatherError ? (
                  <div className="py-8">
                    <div className="text-2xl mb-2">❌</div>
                    <p className="opacity-80">Hiba történt</p>
                  </div>
                ) : weatherData ? (
                  <>
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
                      <h3 className="text-lg font-medium">
                        7 napos előrejelzés
                      </h3>
                      {weatherData.daily.map((day, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="font-medium text-sm">
                            {day.dayName}
                          </span>
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
          </>
        ) : (
          /* No city selected */
          <div className="text-center text-white py-20">
            <div className="text-4xl mb-4">🌍</div>
            <p className="text-xl opacity-90">
              Válasszon várost az időjárás megtekintéséhez
            </p>
          </div>
        )}

        {/* Temperature Chart - Both mobile & desktop */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
          <h3 className="text-lg font-medium mb-4">Hőmérséklet alakulása</h3>
          <div className="h-48 flex items-center justify-center border border-white/20 rounded-lg">
            <p className="text-white/60">📊 Chart placeholder</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center mt-8 text-white/70">
        <p className="text-sm">Készítette: Görbe János</p>
      </footer>

      {/* City Selection Modal */}
      <CityModal
        open={showCityModal}
        onOpenChange={setShowCityModal}
        onCitySelect={handleCitySelect}
      />
    </div>
  );
}

export default App;
