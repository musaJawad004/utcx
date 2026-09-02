import { Pressable, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { FadeIn, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { GripVertical } from 'lucide-react-native';
import type { City } from '@/src/models/city.model';
import { getSolarWindow } from '@/src/services/solar.service';
import { formatTime, timezoneAbbreviation, utcOffset } from '@/src/services/time.service';
import type { HourFormat } from '@/src/models/settings.model';
import { colors } from '@/src/theme';
import { styles } from './CityClockRow.styles';

type Props = {
  city: City;
  index: number;
  now: Date;
  format: HourFormat;
  seconds: boolean;
  onOpen: () => void;
  onRemove: () => void;
  onReorder: (from: number, to: number) => void;
  onHaptic: () => void;
};

export function CityClockRow({ city, index, now, format, seconds, onOpen, onRemove, onReorder, onHaptic }: Props) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const swipe = Gesture.Pan().activeOffsetX([-14, 14]).failOffsetY([-10, 10])
    .onUpdate((event) => { x.value = Math.min(0, Math.max(-116, event.translationX)); })
    .onEnd(() => {
      if (x.value < -86) { x.value = withTiming(-420, { duration: 220 }); runOnJS(onRemove)(); }
      else x.value = withTiming(0, { duration: 180 });
    });
  const drag = Gesture.Pan().activateAfterLongPress(180)
    .onStart(() => { runOnJS(onHaptic)(); })
    .onUpdate((event) => { y.value = event.translationY; })
    .onEnd(() => {
      const shift = Math.max(-index, Math.min(8, Math.round(y.value / 96)));
      if (shift) runOnJS(onReorder)(index, index + shift);
      y.value = withTiming(0, { duration: 180 });
    });
  const rowStyle = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }, { translateY: y.value }], zIndex: y.value === 0 ? 0 : 4 }));
  const solar = getSolarWindow(city, now);

  return (
    <Animated.View entering={FadeIn.duration(260)} style={styles.wrapper}>
      <View style={styles.deleteRail}><Text style={styles.deleteText}>REMOVE</Text></View>
      <GestureDetector gesture={swipe}>
        <Animated.View style={[styles.row, rowStyle]}>
          <Pressable accessibilityRole="button" accessibilityLabel={`Open ${city.name}`} onPress={onOpen} style={styles.content}>
            <View style={styles.identity}>
              <View style={styles.metaLine}><View style={[styles.statusDot, solar.isDay && styles.dayDot]} /><Text style={styles.meta}>{utcOffset(city, now)} · {timezoneAbbreviation(city, now)}</Text></View>
              <Text numberOfLines={1} style={styles.city}>{city.name}</Text>
              <Text numberOfLines={1} style={styles.country}>{city.country}</Text>
            </View>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.time}>{formatTime(city, format, seconds, now)}</Text>
          </Pressable>
          <GestureDetector gesture={drag}>
            <Animated.View accessibilityLabel={`Reorder ${city.name}`} style={styles.handle}><GripVertical size={17} strokeWidth={1.5} color={colors.quiet} /></Animated.View>
          </GestureDetector>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
