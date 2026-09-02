import * as Location from 'expo-location';
import { DateTime } from 'luxon';
import type { City } from '@/src/models/city.model';
import { cityByZone } from '@/src/data/cities';

export const systemCity = (): City => {
  const zone = DateTime.local().zoneName;
  const known = cityByZone(zone);
  if (known) return { ...known, id: 'current-location', isCurrent: true };
  const segment = zone.split('/').at(-1)?.replaceAll('_', ' ') ?? 'Current Location';
  return { id: 'current-location', name: segment, country: 'Current location', countryCode: '', zone, latitude: 0, longitude: 0, isCurrent: true };
};

export const requestCurrentCity = async (): Promise<City | null> => {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (!permission.granted) return null;
  const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  const [place] = await Location.reverseGeocodeAsync(position.coords);
  const fallback = systemCity();
  return {
    ...fallback,
    name: place?.city || place?.district || fallback.name,
    country: place?.country || fallback.country,
    countryCode: place?.isoCountryCode || fallback.countryCode,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
};
