import { StyleSheet } from 'react-native';
import { colors, fonts, radii, spacing } from '@/src/theme';

export const styles = StyleSheet.create({
  positioner: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  bar: { flexDirection: 'row', borderRadius: radii.pill, padding: 5, overflow: 'hidden', borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline, backgroundColor: colors.glass, shadowColor: colors.ink, shadowOpacity: 0.12, shadowRadius: 24, shadowOffset: { width: 0, height: 10 }, elevation: 8 },
  item: { height: 48, minWidth: 48, paddingHorizontal: spacing.md, borderRadius: radii.pill, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs },
  itemActive: { backgroundColor: colors.ink },
  label: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.inverseText },
});
