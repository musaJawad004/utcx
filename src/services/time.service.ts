import { DateTime } from 'luxon';
import type { City } from '@/src/models/city.model';
import type { HourFormat } from '@/src/models/settings.model';

export const inCity = (city: City, at: Date | number = Date.now()) =>
  DateTime.fromJSDate(at instanceof Date ? at : new Date(at), { zone: city.zone });

export const formatTime = (city: City, format: HourFormat, seconds: boolean, at: Date | number = Date.now()) => {
  const value = inCity(city, at);
  if (format === '24') return value.toFormat(seconds ? 'HH:mm:ss' : 'HH:mm');
  return value.toFormat(seconds ? 'hh:mm:ss a' : 'hh:mm a');
};

export const formatDate = (city: City, at: Date | number = Date.now()) =>
  inCity(city, at).toFormat('ccc, dd LLL');

export const timezoneAbbreviation = (city: City, at: Date | number = Date.now()) =>
  inCity(city, at).offsetNameShort ?? city.zone;

export const utcOffset = (city: City, at: Date | number = Date.now()) => {
  const minutes = inCity(city, at).offset;
  const sign = minutes >= 0 ? '+' : '−';
  const absolute = Math.abs(minutes);
  const hours = Math.floor(absolute / 60);
  const remainder = absolute % 60;
  return `UTC${sign}${hours}${remainder ? `:${String(remainder).padStart(2, '0')}` : ''}`;
};

export const hourDifference = (from: City, to: City, at: Date | number = Date.now()) => {
  const deltaMinutes = inCity(to, at).offset - inCity(from, at).offset;
  return deltaMinutes / 60;
};

export const describeDifference = (from: City, to: City, at: Date | number = Date.now()) => {
  const difference = hourDifference(from, to, at);
  if (difference === 0) return `${to.name} is at the same time as ${from.name}`;
  const direction = difference > 0 ? 'ahead of' : 'behind';
  const hours = Math.abs(difference);
  const amount = Number.isInteger(hours) ? `${hours} hour${hours === 1 ? '' : 's'}` : `${hours.toFixed(1)} hours`;
  return `${to.name} is ${amount} ${direction} ${from.name}`;
};
