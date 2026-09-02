import { Platform, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { formatDate, formatTime, timezoneAbbreviation, utcOffset } from '@/src/services/time.service';
import { getSolarWindow } from '@/src/services/solar.service';
import { colors } from '@/src/theme';
import { useClocksViewModel } from '@/src/viewmodels/use-clocks.viewmodel';
import { AddCitySheet } from '@/src/components/clocks/AddCitySheet/AddCitySheet';
import { CityClockRow } from '@/src/components/clocks/CityClockRow/CityClockRow';
import { IconButton } from '@/src/components/ui/IconButton/IconButton';
import { ScreenHeader } from '@/src/components/ui/ScreenHeader/ScreenHeader';
import { SegmentedControl } from '@/src/components/ui/SegmentedControl/SegmentedControl';
import { TimeDigits } from '@/src/components/ui/TimeDigits/TimeDigits';
import { useAppStore } from '@/src/store/app.store';
import { styles } from './ClocksScreen.styles';

export function ClocksScreen() {
  const vm = useClocksViewModel();
  const insets = useSafeAreaInsets();
  const updateSetting = useAppStore((state) => state.updateSetting);
  const solar = getSolarWindow(vm.currentCity, vm.now);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 12, paddingBottom: 126 + (Platform.OS === 'ios' ? insets.bottom : 0) }]} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          eyebrow="COORDINATED WORLD TIME"
          title="Clocks"
          action={<IconButton label="Add city" onPress={() => vm.setSheetVisible(true)} icon={<Plus size={20} color={colors.ink} strokeWidth={1.5} />} />}
        />
        <Animated.View entering={FadeInDown.delay(80).duration(620)} style={styles.hero}>
          <View style={styles.heroTop}>
            <View><Text style={styles.currentLabel}><View style={styles.liveDot} />  CURRENT LOCATION</Text><Text style={styles.location}>{vm.currentCity.name}</Text><Text style={styles.country}>{vm.currentCity.country}</Text></View>
            <SegmentedControl options={['12', '24'] as const} value={vm.settings.hourFormat} onChange={(value) => updateSetting('hourFormat', value)} labels={{ '12': '12H', '24': '24H' }} />
          </View>
          <TimeDigits value={formatTime(vm.currentCity, vm.settings.hourFormat, vm.settings.showSeconds, vm.now)} style={styles.heroTime} mutedSeconds />
          <View style={styles.heroMeta}>
            <View><Text style={styles.metaLabel}>DATE</Text><Text style={styles.metaValue}>{formatDate(vm.currentCity, vm.now)}</Text></View>
            <View><Text style={styles.metaLabel}>ZONE</Text><Text style={styles.metaValue}>{timezoneAbbreviation(vm.currentCity, vm.now)} · {utcOffset(vm.currentCity, vm.now)}</Text></View>
          </View>
          <View style={styles.solarRow}>
            <Text style={styles.solar}>{solar.isDay ? 'DAYLIGHT' : 'NIGHT'} · SUNRISE {formatTime(vm.currentCity, '24', false, solar.sunrise)}</Text>
            <Text style={styles.solar}>SUNSET {formatTime(vm.currentCity, '24', false, solar.sunset)}</Text>
          </View>
        </Animated.View>
        <View style={styles.listHeader}><Text style={styles.listTitle}>SAVED CITIES</Text><Text style={styles.listHint}>SWIPE TO REMOVE · HOLD ⠿ TO REORDER</Text></View>
        <View style={styles.list}>
          {vm.savedCities.map((city, index) => (
            <CityClockRow key={city.id} city={city} index={index} now={vm.now} format={vm.settings.hourFormat} seconds={vm.settings.showSeconds} onOpen={() => vm.openCity(city.id)} onRemove={() => vm.remove(city.id)} onReorder={vm.reorder} onHaptic={vm.pulse} />
          ))}
          {!vm.savedCities.length && <Text style={styles.empty}>No saved cities yet. Tap + to add your first coordinate.</Text>}
        </View>
      </ScrollView>
      <AddCitySheet visible={vm.sheetVisible} cities={vm.cities} recent={vm.recentCities} savedIds={vm.savedIds} now={vm.now} format={vm.settings.hourFormat} onClose={() => vm.setSheetVisible(false)} onSelect={(city) => vm.add(city.id)} />
    </View>
  );
}
