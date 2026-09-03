import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '@/src/theme';

export const styles = StyleSheet.create({
  wrapper: { minHeight: 94, overflow: 'hidden', borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline },
  wrapperDragging: { zIndex: 6, elevation: 6 },
  deleteRail: { ...StyleSheet.absoluteFill, backgroundColor: colors.ink, alignItems: 'flex-end', justifyContent: 'center', paddingRight: spacing.lg },
  deleteText: { color: colors.inverseText, fontFamily: fonts.monoMedium, fontSize: 10, letterSpacing: 1.6 },
  row: { minHeight: 94, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.canvas },
  content: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  identity: { flex: 1, paddingRight: spacing.md },
  metaLine: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  statusDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.quiet },
  dayDot: { backgroundColor: colors.ink },
  meta: { fontFamily: fonts.mono, fontSize: 9, color: colors.graphite, letterSpacing: 0.4 },
  city: { fontFamily: fonts.sansMedium, fontSize: 20, color: colors.ink, letterSpacing: -0.4, marginTop: 5 },
  country: { fontFamily: fonts.sans, fontSize: 11, color: colors.graphite, marginTop: 1 },
  time: { maxWidth: '52%', fontFamily: fonts.sans, fontSize: 34, color: colors.ink, letterSpacing: -2, fontVariant: ['tabular-nums'] },
  handle: { width: 30, alignItems: 'flex-end', justifyContent: 'center', alignSelf: 'stretch' },
});
