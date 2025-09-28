export const STORAGE_KEYS = {
  SELECTED_CITY: 'weather-app-selected-city',
  USER_PREFERENCES: 'weather-app-user-preferences',
  APP_SETTINGS: 'weather-app-settings'
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
