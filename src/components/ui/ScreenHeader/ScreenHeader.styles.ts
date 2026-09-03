import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/src/theme';

export const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  eyebrow: { fontFamily: fonts.monoMedium, color: colors.graphite, fontSize: 10, letterSpacing: 2.2, marginBottom: 8 },
  title: { fontFamily: fonts.sansMedium, color: colors.ink, fontSize: 34, letterSpacing: -1.5 },
});
