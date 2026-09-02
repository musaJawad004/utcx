import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '@/src/theme';

export const styles = StyleSheet.create({
  track: { height: 44, justifyContent: 'center', marginHorizontal: spacing.xs },
  line: { height: 1, backgroundColor: colors.quiet },
  past: { position: 'absolute', left: 0, height: 2, backgroundColor: colors.ember },
  thumb: { position: 'absolute', marginLeft: -10, width: 20, height: 20, borderRadius: 10, borderWidth: 5, borderColor: colors.canvasRaised },
  labels: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontFamily: fonts.mono, fontSize: 8, color: colors.graphite, letterSpacing: 0.6 },
  now: { color: colors.ink },
});
