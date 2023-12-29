import { OpenWeatherTempScale } from "./api";

export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}

export interface LocalStorageOptions {
  tempscale: OpenWeatherTempScale;
  homeCity: string;
  hasAutoOverlay: boolean;
}

export type LocalStorageKey = keyof LocalStorage;

export function setStoredCities(cities: string[]): Promise<void> {
  const vals: LocalStorage = {
    cities,
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredCities(): Promise<string[]> {
  let keys: LocalStorageKey[] = ["cities"];

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result) => {
      resolve(result.cities);
    });
  });
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = {
    options,
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  let keys: LocalStorageKey[] = ["options"];

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result) => {
      resolve(result.options);
    });
  });
}
