export interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

export interface CitySelection {
  selectedCity: City | null;
  isInitialized: boolean;
}

export interface CitySearchResult extends City {
  score?: number;
}