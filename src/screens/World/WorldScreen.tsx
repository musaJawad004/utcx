import { FlatList, Platform, Text, View, useWindowDimensions, type ViewToken } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { formatDate, formatTime, utcOffset } from '@/src/services/time.service';
import { useWorldViewModel } from '@/src/viewmodels/use-world.viewmodel';
import { ScreenHeader } from '@/src/components/ui/ScreenHeader/ScreenHeader';
import { WorldField } from '@/src/components/visual/WorldField/WorldField';
import { styles } from './WorldScreen.styles';

export function WorldScreen() {
  const vm = useWorldViewModel();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const mapWidth = width - 44;
  const mapHeight = Math.min(380, height * 0.43);
  const viewability = ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
    const first = viewableItems[0]?.index;
    if (typeof first === 'number') vm.setIndex(first);
  };
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 12, paddingBottom: 116 + (Platform.OS === 'ios' ? insets.bottom : 0) }]}>
      <ScreenHeader eyebrow="LONGITUDE FIELD" title="World" />
      <Animated.View entering={FadeInDown.duration(600)} style={styles.mapCard}>
        <WorldField width={mapWidth} height={mapHeight} cities={vm.cities} selected={vm.selected} dark={vm.settings.darkMode} zoom={0} />
        <View style={styles.coordinates}><Text style={styles.coordinate}>{vm.selected.latitude.toFixed(2)}°</Text><Text style={styles.coordinate}>{vm.selected.longitude.toFixed(2)}°</Text></View>
      </Animated.View>
      <FlatList
        data={vm.cities}
        horizontal
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={viewability}
        pagingEnabled
        renderItem={({ item }) => (
          <View style={[styles.readout, { width: mapWidth }]}>
            <View><Text style={styles.offset}>{item.isCurrent ? 'CURRENT · ' : ''}{utcOffset(item, vm.now)}</Text><Text style={styles.city}>{item.name}</Text><Text style={styles.country}>{item.country}</Text></View>
            <View style={styles.timeBlock}><Text style={styles.time}>{formatTime(item, vm.settings.hourFormat, false, vm.now)}</Text><Text style={styles.date}>{formatDate(item, vm.now)}</Text></View>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      />
      <View style={styles.pager}>{vm.cities.map((city, index) => <View key={city.id} style={[styles.pagerDot, index === vm.index && styles.pagerDotActive]} />)}</View>
    </View>
  );
}
