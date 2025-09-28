import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

interface CityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCitySelect: (city: City) => void;
}

export function CityModal({
  open,
  onOpenChange,
  onCitySelect,
}: CityModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      // Open Meteo Geocoding API
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchQuery
        )}&count=10&language=hu&format=json`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("City search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCitySelect = (city: City) => {
    onCitySelect(city);
    onOpenChange(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white/70 backdrop-blur-sm border border-white/20">
        <DialogHeader>
          <DialogTitle>Város kiválasztása</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Írja be a város nevét..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "Keres..." : "Keresés"}
            </Button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="max-h-60 overflow-y-auto space-y-2">
              {searchResults.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCitySelect(city)}
                  className="w-full text-left p-3 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <div className="font-medium">{city.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {city.admin1 && `${city.admin1}, `}
                    {city.country}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {searchResults.length === 0 && searchQuery && !isLoading && (
            <p className="text-center text-muted-foreground py-4">
              Nem található város ezzel a névvel.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
