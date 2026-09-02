import type { City } from '@/src/models/city.model';

export const CITIES: City[] = [
  { id: 'los-angeles', name: 'Los Angeles', country: 'United States', countryCode: 'US', zone: 'America/Los_Angeles', latitude: 34.0522, longitude: -118.2437 },
  { id: 'new-york', name: 'New York', country: 'United States', countryCode: 'US', zone: 'America/New_York', latitude: 40.7128, longitude: -74.006 },
  { id: 'london', name: 'London', country: 'United Kingdom', countryCode: 'GB', zone: 'Europe/London', latitude: 51.5072, longitude: -0.1276 },
  { id: 'paris', name: 'Paris', country: 'France', countryCode: 'FR', zone: 'Europe/Paris', latitude: 48.8566, longitude: 2.3522 },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', countryCode: 'JP', zone: 'Asia/Tokyo', latitude: 35.6762, longitude: 139.6503 },
  { id: 'dubai', name: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', zone: 'Asia/Dubai', latitude: 25.2048, longitude: 55.2708 },
  { id: 'sydney', name: 'Sydney', country: 'Australia', countryCode: 'AU', zone: 'Australia/Sydney', latitude: -33.8688, longitude: 151.2093 },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', countryCode: 'SG', zone: 'Asia/Singapore', latitude: 1.3521, longitude: 103.8198 },
  { id: 'hong-kong', name: 'Hong Kong', country: 'Hong Kong', countryCode: 'HK', zone: 'Asia/Hong_Kong', latitude: 22.3193, longitude: 114.1694 },
  { id: 'mumbai', name: 'Mumbai', country: 'India', countryCode: 'IN', zone: 'Asia/Kolkata', latitude: 19.076, longitude: 72.8777 },
  { id: 'delhi', name: 'Delhi', country: 'India', countryCode: 'IN', zone: 'Asia/Kolkata', latitude: 28.6139, longitude: 77.209 },
  { id: 'beijing', name: 'Beijing', country: 'China', countryCode: 'CN', zone: 'Asia/Shanghai', latitude: 39.9042, longitude: 116.4074 },
  { id: 'seoul', name: 'Seoul', country: 'South Korea', countryCode: 'KR', zone: 'Asia/Seoul', latitude: 37.5665, longitude: 126.978 },
  { id: 'berlin', name: 'Berlin', country: 'Germany', countryCode: 'DE', zone: 'Europe/Berlin', latitude: 52.52, longitude: 13.405 },
  { id: 'rome', name: 'Rome', country: 'Italy', countryCode: 'IT', zone: 'Europe/Rome', latitude: 41.9028, longitude: 12.4964 },
  { id: 'cairo', name: 'Cairo', country: 'Egypt', countryCode: 'EG', zone: 'Africa/Cairo', latitude: 30.0444, longitude: 31.2357 },
  { id: 'cape-town', name: 'Cape Town', country: 'South Africa', countryCode: 'ZA', zone: 'Africa/Johannesburg', latitude: -33.9249, longitude: 18.4241 },
  { id: 'sao-paulo', name: 'São Paulo', country: 'Brazil', countryCode: 'BR', zone: 'America/Sao_Paulo', latitude: -23.5505, longitude: -46.6333 },
  { id: 'mexico-city', name: 'Mexico City', country: 'Mexico', countryCode: 'MX', zone: 'America/Mexico_City', latitude: 19.4326, longitude: -99.1332 },
  { id: 'toronto', name: 'Toronto', country: 'Canada', countryCode: 'CA', zone: 'America/Toronto', latitude: 43.6532, longitude: -79.3832 },
  { id: 'vancouver', name: 'Vancouver', country: 'Canada', countryCode: 'CA', zone: 'America/Vancouver', latitude: 49.2827, longitude: -123.1207 },
  { id: 'honolulu', name: 'Honolulu', country: 'United States', countryCode: 'US', zone: 'Pacific/Honolulu', latitude: 21.3099, longitude: -157.8581 },
  { id: 'reykjavik', name: 'Reykjavík', country: 'Iceland', countryCode: 'IS', zone: 'Atlantic/Reykjavik', latitude: 64.1466, longitude: -21.9426 },
  { id: 'auckland', name: 'Auckland', country: 'New Zealand', countryCode: 'NZ', zone: 'Pacific/Auckland', latitude: -36.8509, longitude: 174.7645 },
];

export const DEFAULT_CITY_IDS = ['los-angeles', 'london', 'tokyo'];

export function cityById(id: string) {
  return CITIES.find((city) => city.id === id);
}

export function cityByZone(zone: string) {
  return CITIES.find((city) => city.zone === zone);
}
