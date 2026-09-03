import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { formatDate, formatTime, timezoneAbbreviation, utcOffset } from '@/src/services/time.service';
import { colors } from '@/src/theme';
import { useCityDetailViewModel } from '@/src/viewmodels/use-city-detail.viewmodel';
import { CompareScrubber } from '@/src/components/detail/CompareScrubber/CompareScrubber';
import { IconButton } from '@/src/components/ui/IconButton/IconButton';
import { TimeDigits } from '@/src/components/ui/TimeDigits/TimeDigits';
import { DayArc } from '@/src/components/visual/DayArc/DayArc';
import { WorldField } from '@/src/components/visual/WorldField/WorldField';
import { styles } from './CityDetailScreen.styles';

export function CityDetailScreen({ id }: { id: string }) {
  const vm = useCityDetailViewModel(id);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const contentWidth = width - 44;
  const dayProgress = (Number(formatTime(vm.city, '24', false, vm.now).slice(0, 2)) + Number(formatTime(vm.city, '24', false, vm.now).slice(3, 5)) / 60) / 24;
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 36 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.top}><IconButton size="small" label="Back" onPress={() => router.back()} icon={<ArrowLeft size={19} color={colors.ink} strokeWidth={1.5} />} /><Text style={styles.zone}>{timezoneAbbreviation(vm.city, vm.now)} · {utcOffset(vm.city, vm.now)}</Text></View>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.hero}>
          <Text style={styles.city}>{vm.city.name}</Text><Text style={styles.country}>{vm.city.country}</Text>
          <TimeDigits value={formatTime(vm.city, vm.settings.hourFormat, vm.settings.showSeconds, vm.now)} style={styles.time} mutedSeconds />
          <View style={styles.dateRow}><Text style={styles.date}>{formatDate(vm.city, vm.now)}</Text>{vm.hourOffset !== 0 && <Text style={styles.offsetBadge}>{vm.hourOffset > 0 ? '+' : ''}{vm.hourOffset}H FROM NOW</Text>}</View>
        </Animated.View>
        <View style={styles.solarCard}>
          <View style={styles.solarTop}><View><Text style={styles.metaLabel}>LIGHT WINDOW</Text><Text style={styles.solarState}>{vm.solar.isDay ? 'Daylight' : 'Night'}</Text></View><View style={styles.solarTimes}><Text style={styles.solarTime}>↑ {formatTime(vm.city, '24', false, vm.solar.sunrise)}</Text><Text style={styles.solarTime}>↓ {formatTime(vm.city, '24', false, vm.solar.sunset)}</Text></View></View>
          <DayArc width={contentWidth - 48} progress={dayProgress} />
        </View>
        <View style={styles.mapCard}>
          <WorldField width={contentWidth} height={280} cities={[vm.city]} selected={vm.city} dark={vm.settings.darkMode} />
          <View style={styles.mapLabel}><Text style={styles.coordinate}>{vm.city.latitude.toFixed(4)}°</Text><Text style={styles.coordinate}>{vm.city.longitude.toFixed(4)}°</Text></View>
        </View>
        <View style={styles.compareCard}>
          <Text style={styles.metaLabel}>TIME DIFFERENCE</Text><Text style={styles.difference}>{vm.difference}</Text>
          <View style={styles.comparison}><View><Text style={styles.compareCity}>{vm.current.name}</Text><Text style={styles.compareTime}>{formatTime(vm.current, vm.settings.hourFormat, false, vm.now)}</Text></View><View style={styles.compareDivider} /><View style={styles.compareRight}><Text style={styles.compareCity}>{vm.city.name}</Text><Text style={styles.compareTime}>{formatTime(vm.city, vm.settings.hourFormat, false, vm.now)}</Text></View></View>
          <CompareScrubber value={vm.hourOffset} onChange={vm.setHourOffset} />
        </View>
      </ScrollView>
    </View>
  );
}
