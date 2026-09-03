import { useState } from 'react';
import { router } from 'expo-router';
import { CITIES } from '@/src/data/cities';
import { haptics } from '@/src/services/haptics.service';
import { selectRecentCities, selectSavedCities, useAppStore } from '@/src/store/app.store';
import { useNow } from '@/src/hooks/use-now';
import { useShallow } from 'zustand/react/shallow';
import type { City } from '@/src/models/city.model';

export const useClocksViewModel = () => {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const currentCity = useAppStore((state) => state.currentCity);
  const savedCities = useAppStore(useShallow(selectSavedCities));
  const recentCities = useAppStore(useShallow(selectRecentCities));
  const savedIds = useAppStore((state) => state.savedCityIds);
  const settings = useAppStore((state) => state.settings);
  const addCity = useAppStore((state) => state.addCity);
  const removeCity = useAppStore((state) => state.removeCity);
  const reorderCity = useAppStore((state) => state.reorderCity);
  const now = useNow(settings.showSeconds);
  const pulse = () => { haptics.select(settings.haptics); };
  return {
    sheetVisible, setSheetVisible, draggingId, currentCity, savedCities, recentCities, savedIds, settings, now, cities: CITIES,
    openCity: (id: string) => router.push({ pathname: '/city/[id]', params: { id } }),
    add: (city: City) => { addCity(city); haptics.success(settings.haptics); setSheetVisible(false); router.push({ pathname: '/city/[id]', params: { id: city.id } }); },
    remove: (id: string) => { removeCity(id); haptics.impact(settings.haptics); },
    reorder: (from: number, to: number) => { reorderCity(from, Math.max(0, Math.min(savedCities.length - 1, to))); },
    startDragging: (id: string) => setDraggingId(id),
    stopDragging: () => setDraggingId(null),
    pulse,
  };
};
