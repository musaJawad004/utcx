import { StyleSheet } from 'react-native';
import { colors, radii } from '@/src/theme';

export const styles = StyleSheet.create({
  base: { width: 52, height: 52, borderRadius: radii.pill, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.glassStrong, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline },
  small: { width: 44, height: 44 },
  selected: { backgroundColor: colors.ink, borderColor: colors.ink },
  pressed: { opacity: 0.66, transform: [{ scale: 0.96 }] },
});
