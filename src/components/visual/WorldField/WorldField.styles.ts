import { StyleSheet } from 'react-native';
import { colors } from '@/src/theme';

export const styles = StyleSheet.create({
  canvas: { overflow: 'hidden', backgroundColor: colors.canvasRaised },
  map: { flex: 1 },
  markerHalo: { width: 14, height: 14, borderRadius: 7, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(16,16,15,0.16)' },
  markerHaloSelected: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(16,16,15,0.18)' },
  marker: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#777670', borderWidth: 1, borderColor: '#FFFFFF' },
  markerSelected: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#10100F', borderWidth: 2 },
});
