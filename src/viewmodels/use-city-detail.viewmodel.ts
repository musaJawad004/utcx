import { useMemo, useState } from 'react';
import { cityById } from '@/src/data/cities';
import { useNow } from '@/src/hooks/use-now';
import { getSolarWindow } from '@/src/services/solar.service';
import { describeDifference } from '@/src/services/time.service';
import { useAppStore } from '@/src/store/app.store';

export const useCityDetailViewModel = (id: string) => {
  const [hourOffset, setHourOffset] = useState(0);
  const current = useAppStore((state) => state.currentCity);
  const settings = useAppStore((state) => state.settings);
  const now = useNow(settings.showSeconds);
  const city = cityById(id) ?? current;
  const comparedAt = useMemo(() => new Date(now.getTime() + hourOffset * 3_600_000), [now, hourOffset]);
  return { city, current, settings, now: comparedAt, liveNow: now, hourOffset, setHourOffset, solar: getSolarWindow(city, comparedAt), difference: describeDifference(current, city, comparedAt) };
};
