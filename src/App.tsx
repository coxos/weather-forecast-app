import { Button } from "./components/ui/button";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#7CB9E8] to-[#A3D4FA]">
      {/* Main Content - Mobile first, then desktop grid */}
      <main className="max-w-7xl mx-auto px-6 pt-8">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 mb-6">
          {/* Current Weather - Left side */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
            <Button
              variant="outline"
              size="sm"
              className="text-white cursor-pointer border-white/20 hover:bg-white/10 hover:border-white/40 mb-2"
              onClick={() => console.log("Open city modal")}
            >
              Város neve
            </Button>

            <div className="text-6xl font-light mb-2">25°C</div>
            <p className="text-lg opacity-90">Tiszta idő</p>
          </div>

          {/* 7 Day Forecast - Right side */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
            <h3 className="text-lg font-medium mb-4">7 napos előrejelzés</h3>
            <div className="space-y-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="font-medium">Hétfő</span>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">☀️</span>
                    <span className="text-sm opacity-80">56%</span>
                    <span className="font-medium">9°C / 23°C</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout - Stack vertically */}
        <div className="md:hidden space-y-6 mb-6">
          {/* Current Weather */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
            <h2 className="text-sm opacity-80 mb-2">Város neve</h2>
            <div className="text-5xl font-light mb-2">25°C</div>
            <p className="text-lg opacity-90 mb-6">Tiszta idő</p>

            {/* Mobile 7-day forecast */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">7 napos előrejelzés</h3>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="font-medium">Hétfő</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">☀️</span>
                    <span className="text-xs opacity-80">56%</span>
                    <span className="text-sm font-medium">9° / 23°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
    </div>
  );
}

export default App;
