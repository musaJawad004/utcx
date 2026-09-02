import type { PropsWithChildren } from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { styles } from './Button.styles';

type Props = PropsWithChildren<PressableProps & { variant?: 'primary' | 'secondary' | 'ghost'; compact?: boolean }>;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({ children, variant = 'primary', compact = false, disabled, ...props }: Props) {
  const pressed = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(pressed.value ? 0.975 : 1, { duration: 130 }) }],
    opacity: withTiming(disabled ? 0.38 : pressed.value ? 0.82 : 1, { duration: 130 }),
  }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      disabled={disabled}
      onPressIn={() => { pressed.value = 1; }}
      onPressOut={() => { pressed.value = 0; }}
      style={[styles.base, styles[variant], compact && styles.compact, animatedStyle]}
      {...props}
    >
      <Text style={[styles.label, variant === 'primary' && styles.primaryLabel]}>{children}</Text>
    </AnimatedPressable>
  );
}
