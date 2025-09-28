
import { useState, useEffect, useCallback } from "react";

type SetValue<T> = T | ((val: T) => T);

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: SetValue<T>) => void;
  removeValue: () => void;
  isLoading: boolean;
}

const getStorageValue = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const setStorageValue = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

const removeStorageValue = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
};




export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): UseLocalStorageReturn<T> => {
  const [value, setStoredValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    const storedValue = getStorageValue(key, defaultValue);
    setStoredValue(storedValue);
    setIsLoading(false);
  }, [key, defaultValue]);


  const setValue = useCallback(
    (newValue: SetValue<T>) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
        
        setStoredValue(valueToStore);
        setStorageValue(key, valueToStore);
      } catch (error) {
        console.error(`Error setting value for key "${key}":`, error);
      }
    },
    [key, value]
  );


  const removeValue = useCallback(() => {
    try {
      removeStorageValue(key);
      setStoredValue(defaultValue);
    } catch (error) {
      console.error(`Error removing value for key "${key}":`, error);
    }
  }, [key, defaultValue]);

  return {
    value,
    setValue,
    removeValue,
    isLoading,
  };
};