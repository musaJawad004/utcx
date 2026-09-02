import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '@/src/theme';

export const styles = StyleSheet.create({
  row: { minHeight: 62, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline },
  pressed: { opacity: 0.58 },
  identity: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  label: { fontFamily: fonts.sansMedium, fontSize: 16, color: colors.ink },
  valueRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  value: { fontFamily: fonts.mono, fontSize: 10, color: colors.graphite, textTransform: 'uppercase' },
});
