import { useState } from 'react';
import { selectSavedCities, useAppStore } from '@/src/store/app.store';
import { useNow } from '@/src/hooks/use-now';
import { useShallow } from 'zustand/react/shallow';

export const useWorldViewModel = () => {
  const current = useAppStore((state) => state.currentCity);
  const saved = useAppStore(useShallow(selectSavedCities));
  const settings = useAppStore((state) => state.settings);
  const [index, setIndex] = useState(0);
  const cities = [current, ...saved];
  const now = useNow(settings.showSeconds);
  return { cities, selected: cities[index] ?? current, index, setIndex, now, settings };
};
