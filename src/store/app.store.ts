import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CITIES, DEFAULT_CITY_IDS, cityById } from '@/src/data/cities';
import type { City } from '@/src/models/city.model';
import { defaultSettings, type AppSettings } from '@/src/models/settings.model';
import { systemCity } from '@/src/services/location.service';
import { zustandStorage } from '@/src/services/storage.service';

type AppState = {
  onboardingComplete: boolean;
  currentCity: City;
  savedCityIds: string[];
  recentCityIds: string[];
  customCities: City[];
  settings: AppSettings;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  setCurrentCity: (city: City) => void;
  addCity: (city: City) => void;
  removeCity: (id: string) => void;
  reorderCity: (from: number, to: number) => void;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      onboardingComplete: false,
      currentCity: systemCity(),
      savedCityIds: DEFAULT_CITY_IDS,
      recentCityIds: [],
      customCities: [],
      settings: defaultSettings,
      completeOnboarding: () => set({ onboardingComplete: true }),
      resetOnboarding: () => set({ onboardingComplete: false }),
      setCurrentCity: (currentCity) => set({ currentCity }),
      addCity: (city) => set((state) => ({
        customCities: CITIES.some((item) => item.id === city.id) || state.customCities.some((item) => item.id === city.id) ? state.customCities : [...state.customCities, city],
        savedCityIds: state.savedCityIds.includes(city.id) ? state.savedCityIds : [...state.savedCityIds, city.id],
        recentCityIds: [city.id, ...state.recentCityIds.filter((item) => item !== city.id)].slice(0, 5),
      })),
      removeCity: (id) => set((state) => ({ savedCityIds: state.savedCityIds.filter((item) => item !== id) })),
      reorderCity: (from, to) => set((state) => {
        if (from === to || from < 0 || to < 0 || from >= state.savedCityIds.length || to >= state.savedCityIds.length) return state;
        const next = [...state.savedCityIds];
        const [moved] = next.splice(from, 1);
        if (!moved) return state;
        next.splice(to, 0, moved);
        return { savedCityIds: next };
      }),
      updateSetting: (key, value) => set((state) => ({ settings: { ...state.settings, [key]: value } })),
    }),
    {
      name: 'utcx-state-v1',
      storage: createJSONStorage(() => zustandStorage),
      partialize: ({ onboardingComplete, currentCity, savedCityIds, recentCityIds, customCities, settings }) => ({ onboardingComplete, currentCity, savedCityIds, recentCityIds, customCities, settings }),
    },
  ),
);

export const selectSavedCities = (state: AppState) =>
  state.savedCityIds.map((id) => cityById(id) ?? (state.customCities ?? []).find((city) => city.id === id)).filter((city): city is City => Boolean(city));

export const selectRecentCities = (state: AppState) =>
  state.recentCityIds.map((id) => CITIES.find((city) => city.id === id) ?? (state.customCities ?? []).find((city) => city.id === id)).filter((city): city is City => Boolean(city));
