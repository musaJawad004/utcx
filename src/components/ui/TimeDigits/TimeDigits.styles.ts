import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/src/theme';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'baseline' },
  digits: { fontFamily: fonts.sans, color: colors.ink, fontSize: 72, letterSpacing: -5, fontVariant: ['tabular-nums'] },
  seconds: { fontFamily: fonts.mono, color: colors.ink, fontSize: 18, marginLeft: 2, fontVariant: ['tabular-nums'] },
  muted: { color: colors.quiet },
});
