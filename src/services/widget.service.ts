import { Platform } from 'react-native';
import type { City } from '@/src/models/city.model';
import type { AppSettings } from '@/src/models/settings.model';
import { formatTime, utcOffset } from '@/src/services/time.service';
import { getSolarWindow } from '@/src/services/solar.service';
import { UTCXClockActivity, UTCXSingleClock, UTCXThreeCity, UTCXWorldTime } from '@/widgets/UTCXWidgets';

const cityCode = (city: City) => city.name.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase();

export const syncWidgets = (current: City, saved: City[], settings: AppSettings) => {
  if (Platform.OS !== 'ios') return;
  try {
    const timeline = Array.from({ length: 61 }, (_, minute) => {
      const date = new Date(Date.now() + minute * 60_000);
      const selected = saved.slice(0, 3);
      return {
        date,
        single: { city: current.name, time: formatTime(current, settings.hourFormat, false, date), offset: utcOffset(current, date), isDay: getSolarWindow(current, date).isDay },
        three: { cities: selected.map((city) => ({ city: city.name, time: formatTime(city, settings.hourFormat, false, date), offset: utcOffset(city, date) })) },
        world: {
          primary: { city: current.name, time: formatTime(current, settings.hourFormat, false, date), offset: utcOffset(current, date), isDay: getSolarWindow(current, date).isDay },
          cities: selected.map((city) => ({ city: city.name, time: formatTime(city, settings.hourFormat, false, date) })),
        },
      };
    });
    UTCXSingleClock.updateTimeline(timeline.map(({ date, single }) => ({ date, props: single })));
    UTCXThreeCity.updateTimeline(timeline.map(({ date, three }) => ({ date, props: three })));
    UTCXWorldTime.updateTimeline(timeline.map(({ date, world }) => ({ date, props: world })));
  } catch {
    // Widgets are unavailable in Expo Go and on unsupported OS versions.
  }
};

export const setLiveActivityEnabled = async (enabled: boolean, current: City, pinned?: City) => {
  if (Platform.OS !== 'ios') return;
  try {
    const instances = UTCXClockActivity.getInstances();
    if (!enabled) {
      await Promise.all(instances.map((instance) => instance.end('immediate')));
      return;
    }
    const city = pinned ?? current;
    const props = {
      localCode: cityCode(current),
      localTime: formatTime(current, '24', false),
      cityCode: cityCode(city),
      cityTime: formatTime(city, '24', false),
    };
    if (instances[0]) await instances[0].update(props);
    else UTCXClockActivity.start(props, `utcx://city/${city.id}`);
  } catch {
    // Live Activities require a development/production build and supported iPhone.
  }
};
