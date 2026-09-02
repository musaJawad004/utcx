import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { styles } from './SegmentedControl.styles';

type Props<T extends string> = { options: readonly T[]; value: T; onChange: (value: T) => void; labels?: Partial<Record<T, string>> };

export function SegmentedControl<T extends string>({ options, value, onChange, labels }: Props<T>) {
  const index = Math.max(0, options.indexOf(value));
  const progress = useSharedValue(index);
  useEffect(() => { progress.value = withTiming(index, { duration: 240 }); }, [index, progress]);
  const indicator = useAnimatedStyle(() => ({ transform: [{ translateX: `${progress.value * 100}%` }] }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.indicator, { width: `${100 / options.length}%` }, indicator]} />
      {options.map((option) => (
        <Pressable key={option} accessibilityRole="button" accessibilityState={{ selected: option === value }} onPress={() => onChange(option)} style={styles.option}>
          <Text style={[styles.label, option === value && styles.selectedLabel]}>{labels?.[option] ?? option}</Text>
        </Pressable>
      ))}
    </View>
  );
}
