import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS, API_CONFIG } from "@/config";
import type { City } from "@/types";


interface GeocodingApiResponse {
  results?: City[];
}

const fetchCities = async (query: string): Promise<City[]> => {
  if (!query.trim()) {
    return [];
  }

  const url = `${API_ENDPOINTS.GEOCODING}?name=${encodeURIComponent(
    query
  )}&count=10&language=hu&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Geocoding API error: ${response.status} ${response.statusText}`);
  }

  const data: GeocodingApiResponse = await response.json();
  return data.results || [];
};

export const useCitySearch = (searchQuery: string) => {
  return useQuery({
    queryKey: ["cities", searchQuery],
    queryFn: () => fetchCities(searchQuery),
    enabled: Boolean(searchQuery.trim()),
    staleTime: API_CONFIG.CACHE_TIME.GEOCODING,
    gcTime: API_CONFIG.CACHE_TIME.GEOCODING * 2,
    retry: API_CONFIG.RETRY_ATTEMPTS,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};