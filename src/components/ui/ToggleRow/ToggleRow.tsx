import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { styles } from './ToggleRow.styles';

export function ToggleRow({ label, detail, value, onChange, icon }: { label: string; detail?: string; value: boolean; onChange: (value: boolean) => void; icon?: ReactNode }) {
  const thumbStyle = useAnimatedStyle(() => ({ transform: [{ translateX: withTiming(value ? 22 : 0, { duration: 180 }) }] }));
  return (
    <Pressable accessibilityRole="switch" accessibilityState={{ checked: value }} onPress={() => onChange(!value)} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.copyRow}>{icon}<View style={styles.copy}><Text style={styles.label}>{label}</Text>{detail && <Text style={styles.detail}>{detail}</Text>}</View></View>
      <View style={[styles.track, value && styles.trackOn]}><Animated.View style={[styles.thumb, value && styles.thumbOn, thumbStyle]} /></View>
    </Pressable>
  );
}
