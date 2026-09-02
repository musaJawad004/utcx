import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@/src/theme';
import { styles } from './SettingAction.styles';

export function SettingAction({ label, value, icon, onPress }: { label: string; value?: string; icon?: ReactNode; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.identity}>{icon}<Text style={styles.label}>{label}</Text></View>
      <View style={styles.valueRow}>{value && <Text style={styles.value}>{value}</Text>}<ChevronRight size={16} color={colors.quiet} strokeWidth={1.5} /></View>
    </Pressable>
  );
}
