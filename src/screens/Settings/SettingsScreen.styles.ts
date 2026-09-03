import { StyleSheet } from 'react-native';
import { colors, fonts, radii, screenGutter, spacing } from '@/src/theme';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  content: { paddingHorizontal: screenGutter },
  sectionLabel: { marginTop: spacing.xl, marginBottom: spacing.xs, fontFamily: fonts.monoMedium, color: colors.graphite, fontSize: 9, letterSpacing: 1.6 },
  panel: { borderRadius: radii.md, paddingHorizontal: spacing.md, backgroundColor: colors.canvasRaised, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline, overflow: 'hidden' },
  controlRow: { minHeight: 74, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline },
  stackedControl: { minHeight: 118, justifyContent: 'center', gap: spacing.md },
  controlCopy: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  label: { fontFamily: fonts.sansMedium, fontSize: 16, color: colors.ink },
  detail: { fontFamily: fonts.sans, fontSize: 11, color: colors.graphite, marginTop: 2 },
  footer: { fontFamily: fonts.mono, fontSize: 8, lineHeight: 14, color: colors.quiet, letterSpacing: 1.1, textAlign: 'center', marginTop: spacing.xl },
});
