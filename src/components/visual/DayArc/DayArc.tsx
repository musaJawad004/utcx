import { Circle, Path, Svg } from 'react-native-svg';
import { colors } from '@/src/theme';
import { styles } from './DayArc.styles';
export function DayArc({ width, progress }: { width: number; progress: number }) {
  const height = 78; const safe = Math.max(0, Math.min(1, progress)); const x = 10 + (width - 20) * safe; const y = (height - 12) - 4 * (height - 12) * safe * (1 - safe);
  return <Svg style={[styles.canvas, { width, height }]} width={width} height={height} viewBox={`0 0 ${width} ${height}`}><Path d={`M10 ${height - 12} Q${width / 2} -20 ${width - 10} ${height - 12}`} fill="none" stroke={colors.quiet} strokeWidth={1} /><Circle cx={x} cy={y} r={12} fill={colors.emberSoft} /><Circle cx={x} cy={y} r={5} fill={colors.ember} /></Svg>;
}
