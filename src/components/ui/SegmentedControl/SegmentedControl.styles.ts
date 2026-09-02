import { StyleSheet } from 'react-native';
import { colors, fonts, radii } from '@/src/theme';

export const styles = StyleSheet.create({
  container: { flexDirection: 'row', minWidth: 116, height: 42, padding: 3, borderRadius: radii.pill, backgroundColor: colors.glassStrong, overflow: 'hidden' },
  indicator: { position: 'absolute', top: 3, bottom: 3, left: 3, borderRadius: radii.pill, backgroundColor: colors.ink },
  option: { flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  label: { fontFamily: fonts.mono, fontSize: 12, color: colors.graphite },
  selectedLabel: { color: colors.inverseText },
});
