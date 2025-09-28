import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCitySearch } from "@/hooks/useCitySearch";
import type { City } from "@/types";

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
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const {
    data: searchResults = [],
    isLoading,
    error,
  } = useCitySearch(debouncedQuery);

  const handleSearch = () => {
    setDebouncedQuery(searchQuery.trim());
  };

  const handleCitySelect = (city: City) => {
    onCitySelect(city);
    handleModalClose();
  };

  const handleModalClose = () => {
    onOpenChange(false);
    setSearchQuery("");
    setDebouncedQuery("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const hasSearched = Boolean(debouncedQuery);
  const hasResults = searchResults.length > 0;
  const showNoResults = hasSearched && !hasResults && !isLoading && !error;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white/80 backdrop-blur-sm border border-white/20">
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
              onKeyDown={handleKeyPress}
              className="flex-1 bg-white/70 text-black placeholder:text-black/50 focus:bg-white/90"
              disabled={isLoading}
            />
            <Button
              variant="secondary"
              className="bg-black hover:bg-black/80 cursor-pointer text-white"
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
            >
              {isLoading ? "Keres..." : "Keresés"}
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-4">
              <div className="text-2xl mb-2">🔍</div>
              <p className="text-muted-foreground">Keresés...</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-center text-red-600 py-4">
              <div className="text-2xl mb-2">❌</div>
              <p className="text-sm">
                Hiba történt a keresés során. Kérjük, próbálja újra.
              </p>
            </div>
          )}

          {/* No Results */}
          {showNoResults && (
            <div className="text-center text-muted-foreground py-4">
              <div className="text-2xl mb-2">🏙️</div>
              <p className="text-sm">Nem található város ezzel a névvel.</p>
            </div>
          )}

          {/* Search Results */}
          {hasResults && (
            <div className="max-h-60 overflow-y-auto space-y-2 p-3">
              {searchResults.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCitySelect(city)}
                  className="w-full text-left p-3 rounded-lg cursor-pointer bg-white/70 border hover:bg-accent hover:text-accent-foreground hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-ring-offset-2 focus:ring-offset-background focus:ring-primary"
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
