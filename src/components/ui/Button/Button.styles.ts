import { StyleSheet } from 'react-native';
import { colors, fonts, radii, spacing } from '@/src/theme';

export const styles = StyleSheet.create({
  base: { minHeight: 56, borderRadius: radii.pill, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg },
  compact: { minHeight: 44, paddingHorizontal: spacing.md },
  primary: { backgroundColor: colors.ink },
  secondary: { backgroundColor: colors.glassStrong, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline },
  ghost: { backgroundColor: colors.transparent },
  label: { color: colors.ink, fontFamily: fonts.sansMedium, fontSize: 15, letterSpacing: 0.2 },
  primaryLabel: { color: colors.inverseText },
});
