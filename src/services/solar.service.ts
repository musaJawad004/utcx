import * as SunCalc from 'suncalc';
import type { City, SolarWindow } from '@/src/models/city.model';
import { inCity } from '@/src/services/time.service';

export const getSolarWindow = (city: City, at = new Date()): SolarWindow => {
  const times = SunCalc.getTimes(at, city.latitude, city.longitude);
  const localDay = inCity(city, at).startOf('day');
  const sunrise = times.sunrise ?? localDay.set({ hour: 6 }).toJSDate();
  const sunset = times.sunset ?? localDay.set({ hour: 18 }).toJSDate();
  const isDay = SunCalc.getPosition(at, city.latitude, city.longitude).altitude > 0;
  return { sunrise, sunset, isDay };
};
