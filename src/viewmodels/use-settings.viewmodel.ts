import { router } from 'expo-router';
import type { AppSettings } from '@/src/models/settings.model';
import { haptics } from '@/src/services/haptics.service';
import { requestCurrentCity } from '@/src/services/location.service';
import { setLiveActivityEnabled } from '@/src/services/widget.service';
import { selectSavedCities, useAppStore } from '@/src/store/app.store';

export const useSettingsViewModel = () => {
  const settings = useAppStore((state) => state.settings);
  const current = useAppStore((state) => state.currentCity);
  const saved = useAppStore(selectSavedCities);
  const update = useAppStore((state) => state.updateSetting);
  const setCurrentCity = useAppStore((state) => state.setCurrentCity);
  const reset = useAppStore((state) => state.resetOnboarding);

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    update(key, value);
    haptics.select(settings.haptics);
    if (key === 'liveActivity') void setLiveActivityEnabled(Boolean(value), current, saved[0]);
  };
  const refreshLocation = async () => {
    const city = await requestCurrentCity();
    if (city) { setCurrentCity(city); haptics.success(settings.haptics); }
  };
  const resetOnboarding = () => { reset(); router.replace('/onboarding'); };
  return { settings, updateSetting, refreshLocation, resetOnboarding };
};
