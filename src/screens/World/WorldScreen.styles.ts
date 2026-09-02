import { StyleSheet } from 'react-native';
import { colors, fonts, radii, screenGutter, spacing } from '@/src/theme';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas, paddingHorizontal: screenGutter },
  mapCard: { marginTop: spacing.lg, borderRadius: radii.lg, overflow: 'hidden', borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline },
  coordinates: { position: 'absolute', left: spacing.md, right: spacing.md, bottom: spacing.sm, flexDirection: 'row', justifyContent: 'space-between' },
  coordinate: { fontFamily: fonts.mono, color: colors.graphite, fontSize: 8, letterSpacing: 1 },
  carousel: { flexGrow: 0, marginTop: spacing.lg },
  readout: { minHeight: 120, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  offset: { fontFamily: fonts.monoMedium, fontSize: 9, color: colors.ember, letterSpacing: 1.1 },
  city: { fontFamily: fonts.sansMedium, fontSize: 30, color: colors.ink, letterSpacing: -1.2, marginTop: 5 },
  country: { fontFamily: fonts.sans, fontSize: 12, color: colors.graphite },
  timeBlock: { alignItems: 'flex-end' },
  time: { fontFamily: fonts.sans, fontSize: 44, color: colors.ink, letterSpacing: -3, fontVariant: ['tabular-nums'] },
  date: { fontFamily: fonts.mono, fontSize: 9, color: colors.graphite, marginTop: 3, textTransform: 'uppercase' },
  pager: { flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: spacing.md },
  pagerDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.quiet },
  pagerDotActive: { width: 20, backgroundColor: colors.ember },
});
