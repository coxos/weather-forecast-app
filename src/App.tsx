import { WeatherPage } from "@/pages/WeatherPage";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#7CB9E8] to-[#A3D4FA]">
      <WeatherPage />

      <footer className="text-center mt-8 text-white/70">
        <p className="text-sm">Készítette: Görbe János</p>
      </footer>
    </div>
  );
}

export default App;
