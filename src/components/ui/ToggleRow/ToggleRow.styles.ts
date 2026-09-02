import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '@/src/theme';

export const styles = StyleSheet.create({
  row: { minHeight: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline, paddingVertical: spacing.sm },
  pressed: { opacity: 0.65 },
  copyRow: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: spacing.sm },
  copy: { flex: 1 },
  label: { fontFamily: fonts.sansMedium, fontSize: 16, color: colors.ink },
  detail: { fontFamily: fonts.sans, fontSize: 12, color: colors.graphite, marginTop: 2 },
  track: { width: 48, height: 28, borderRadius: 14, backgroundColor: colors.quiet, padding: 3 },
  trackOn: { backgroundColor: colors.ink },
  thumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.white },
  thumbOn: { backgroundColor: colors.ember },
});
