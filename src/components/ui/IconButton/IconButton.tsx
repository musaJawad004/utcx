import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { styles } from './IconButton.styles';

type Props = { icon: ReactNode; label: string; selected?: boolean; onPress: () => void; size?: 'small' | 'regular' };

export function IconButton({ icon, label, selected, onPress, size = 'regular' }: Props) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [styles.base, size === 'small' && styles.small, selected && styles.selected, pressed && styles.pressed]}
    >
      <View>{icon}</View>
    </Pressable>
  );
}
