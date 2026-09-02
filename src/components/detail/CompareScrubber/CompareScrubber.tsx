import { useState } from 'react';
import { Text, View, type GestureResponderEvent } from 'react-native';
import { colors } from '@/src/theme';
import { styles } from './CompareScrubber.styles';

export function CompareScrubber({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const [width, setWidth] = useState(1);
  const update = (event: GestureResponderEvent) => {
    const ratio = Math.max(0, Math.min(1, event.nativeEvent.locationX / width));
    onChange(Math.round(ratio * 24) - 12);
  };
  return (
    <View>
      <View
        accessible
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        accessibilityLabel="Time comparison offset"
        accessibilityRole="adjustable"
        accessibilityValue={{ min: -12, max: 12, now: value, text: `${value} hours` }}
        onAccessibilityAction={({ nativeEvent }) => onChange(Math.max(-12, Math.min(12, value + (nativeEvent.actionName === 'increment' ? 1 : -1))))}
        onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={update}
        onResponderMove={update}
        onStartShouldSetResponder={() => true}
        style={styles.track}
      >
        <View style={styles.line} />
        <View style={[styles.past, { width: `${((value + 12) / 24) * 100}%` }]} />
        <View style={[styles.thumb, { left: `${((value + 12) / 24) * 100}%`, backgroundColor: value === 0 ? colors.ink : colors.ember }]} />
      </View>
      <View style={styles.labels}><Text style={styles.label}>−12H</Text><Text style={[styles.label, styles.now]}>NOW</Text><Text style={styles.label}>+12H</Text></View>
    </View>
  );
}
