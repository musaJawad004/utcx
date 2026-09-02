import { Dimensions, StyleSheet } from 'react-native';
import { colors, fonts, radii, spacing } from '@/src/theme';

const height = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  full: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(16,16,15,0.28)' },
  backdropPress: { flex: 1 },
  sheet: { maxHeight: height * 0.82, minHeight: height * 0.64, borderTopLeftRadius: radii.lg, borderTopRightRadius: radii.lg, overflow: 'hidden' },
  blur: { flex: 1, paddingTop: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, backgroundColor: colors.glass },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.quiet, alignSelf: 'center', marginBottom: spacing.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyebrow: { fontFamily: fonts.monoMedium, fontSize: 9, color: colors.ember, letterSpacing: 1.7, marginBottom: 5 },
  title: { fontFamily: fonts.sansMedium, fontSize: 30, color: colors.ink, letterSpacing: -1.2 },
  searchBox: { height: 54, marginTop: spacing.lg, borderRadius: radii.md, backgroundColor: colors.glassStrong, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, gap: spacing.sm },
  input: { flex: 1, fontFamily: fonts.sans, fontSize: 16, color: colors.ink },
  section: { fontFamily: fonts.monoMedium, color: colors.graphite, fontSize: 9, letterSpacing: 1.5, marginTop: spacing.lg, marginBottom: spacing.xs },
  result: { minHeight: 72, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline },
  resultPressed: { opacity: 0.55 },
  city: { fontFamily: fonts.sansMedium, color: colors.ink, fontSize: 17 },
  country: { fontFamily: fonts.mono, color: colors.graphite, fontSize: 10, marginTop: 3 },
  preview: { fontFamily: fonts.sans, color: colors.ink, fontSize: 24, letterSpacing: -1.3, fontVariant: ['tabular-nums'] },
  empty: { fontFamily: fonts.sans, color: colors.graphite, fontSize: 15, textAlign: 'center', marginTop: spacing.xl },
});
