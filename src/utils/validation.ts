import type { City } from '@/src/models/city.model';
import type { AppSettings } from '@/src/models/settings.model';

export const normalizeSearch = (value: string) =>
  value.trim().toLocaleLowerCase().replace(/\s+/g, ' ');

export const matchesCityQuery = (city: City, query: string) => {
  const normalized = normalizeSearch(query);
  if (!normalized) return true;
  return `${city.name} ${city.country} ${city.countryCode} ${city.zone}`
    .toLocaleLowerCase()
    .includes(normalized);
};

export const isValidCity = (value: unknown): value is City => {
  if (!value || typeof value !== 'object') return false;
  const city = value as Partial<City>;
  return Boolean(
    city.id && city.name && city.country && city.zone &&
    Number.isFinite(city.latitude) && Number.isFinite(city.longitude),
  );
};

export const sanitizeSettings = (value: Partial<AppSettings>, fallback: AppSettings): AppSettings => ({
  hourFormat: value.hourFormat === '12' ? '12' : '24',
  automaticLocation: typeof value.automaticLocation === 'boolean' ? value.automaticLocation : fallback.automaticLocation,
  liveActivity: typeof value.liveActivity === 'boolean' ? value.liveActivity : fallback.liveActivity,
  showSeconds: typeof value.showSeconds === 'boolean' ? value.showSeconds : fallback.showSeconds,
  haptics: typeof value.haptics === 'boolean' ? value.haptics : fallback.haptics,
  animationIntensity: ['reduced', 'standard', 'expressive'].includes(value.animationIntensity ?? '')
    ? value.animationIntensity!
    : fallback.animationIntensity,
  temperatureUnit: value.temperatureUnit === 'fahrenheit' ? 'fahrenheit' : 'celsius',
});
