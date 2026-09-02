import { useState } from 'react';
import { router } from 'expo-router';
import { haptics } from '@/src/services/haptics.service';
import { requestCurrentCity } from '@/src/services/location.service';
import { useAppStore } from '@/src/store/app.store';

export const useOnboardingViewModel = () => {
  const [page, setPage] = useState(0);
  const [locating, setLocating] = useState(false);
  const complete = useAppStore((state) => state.completeOnboarding);
  const setCurrentCity = useAppStore((state) => state.setCurrentCity);
  const hapticsEnabled = useAppStore((state) => state.settings.haptics);

  const finish = () => { complete(); router.replace('/(tabs)/clocks'); };
  const next = () => {
    haptics.select(hapticsEnabled);
    if (page < 2) setPage((value) => value + 1);
    else finish();
  };
  const allowLocation = async () => {
    setLocating(true);
    const city = await requestCurrentCity();
    if (city) { setCurrentCity(city); haptics.success(hapticsEnabled); }
    setLocating(false);
    finish();
  };
  return { page, setPage, next, allowLocation, skip: finish, locating };
};
