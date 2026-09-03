import type { City } from '@/src/models/city.model';

type GeocodingResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  timezone?: string;
};

type GeocodingResponse = { results?: GeocodingResult[]; reason?: string };

export async function searchWorldPlaces(query: string, signal?: AbortSignal): Promise<City[]> {
  const normalized = query.trim();
  if (normalized.length < 2) return [];
  const params = new URLSearchParams({ name: normalized, count: '10', language: 'en', format: 'json' });
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Place search failed (${response.status})`);
  const payload = await response.json() as GeocodingResponse;
  return (payload.results ?? []).filter((result) => result.timezone).map((result) => ({
    id: `geo-${result.id}`,
    name: result.name,
    country: result.country ?? 'Unknown country',
    countryCode: result.country_code ?? 'XX',
    latitude: result.latitude,
    longitude: result.longitude,
    zone: result.timezone!,
  }));
}
