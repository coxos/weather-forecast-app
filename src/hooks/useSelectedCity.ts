import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/constants";
import type { City } from "@/types";


interface UseSelectedCityReturn {
  selectedCity: City | null;
  isInitialized: boolean;
  selectCity: (city: City) => void;
  clearCity: () => void;
}


export const useSelectedCity = (): UseSelectedCityReturn => {
  
  const {
    value: selectedCity,
    setValue: setSelectedCity,
    removeValue: removeSelectedCity,
    isLoading: isStorageLoading,
  } = useLocalStorage<City | null>(STORAGE_KEYS.SELECTED_CITY, null);

  // Track if hook is fully initialized
  const isInitialized = !isStorageLoading;


  const selectCity = (city: City) => {
    setSelectedCity(city);
  };


  const clearCity = () => {
    removeSelectedCity();
  };

  return {
    selectedCity,
    isInitialized,
    selectCity,
    clearCity,
  };
};