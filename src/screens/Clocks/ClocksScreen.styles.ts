import { StyleSheet } from 'react-native';
import { colors, fonts, radii, screenGutter, spacing } from '@/src/theme';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  content: { paddingHorizontal: screenGutter },
  hero: { marginTop: spacing.lg, padding: spacing.lg, borderRadius: radii.lg, backgroundColor: colors.canvasRaised, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline, overflow: 'hidden' },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.md },
  currentLabel: { fontFamily: fonts.monoMedium, color: colors.graphite, fontSize: 9, letterSpacing: 1.4 },
  liveDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.ink },
  location: { fontFamily: fonts.sansMedium, color: colors.ink, fontSize: 23, letterSpacing: -0.7, marginTop: spacing.xs },
  country: { fontFamily: fonts.sans, color: colors.graphite, fontSize: 12, marginTop: 1 },
  heroTime: { fontSize: 76, letterSpacing: -6, marginTop: spacing.xl },
  heroMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xl, borderTopWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline, paddingTop: spacing.md },
  metaLabel: { fontFamily: fonts.mono, fontSize: 8, color: colors.quiet, letterSpacing: 1.4, marginBottom: 4 },
  metaValue: { fontFamily: fonts.monoMedium, fontSize: 10, color: colors.ink },
  solarRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md },
  solar: { fontFamily: fonts.mono, color: colors.graphite, fontSize: 8 },
  listHeader: { marginTop: spacing.xl, marginBottom: spacing.xs, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  listTitle: { fontFamily: fonts.monoMedium, color: colors.ink, fontSize: 10, letterSpacing: 1.4 },
  listHint: { fontFamily: fonts.mono, color: colors.quiet, fontSize: 7, letterSpacing: 0.5 },
  list: { borderTopWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline },
  empty: { fontFamily: fonts.sans, fontSize: 14, color: colors.graphite, lineHeight: 20, paddingVertical: spacing.xl },
});
