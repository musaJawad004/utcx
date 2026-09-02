import { Canvas, Circle, Path, Skia } from '@shopify/react-native-skia';
import { colors } from '@/src/theme';
import { styles } from './DayArc.styles';

export function DayArc({ width, progress }: { width: number; progress: number }) {
  const height = 78;
  const path = Skia.Path.Make();
  path.moveTo(10, height - 12);
  path.quadTo(width / 2, -20, width - 10, height - 12);
  const x = 10 + (width - 20) * progress;
  const y = (height - 12) - 4 * (height - 12) * progress * (1 - progress);
  return (
    <Canvas style={[styles.canvas, { width, height }]}>
      <Path path={path} color={colors.quiet} style="stroke" strokeWidth={1} />
      <Circle cx={x} cy={y} r={5} color={colors.ember} />
      <Circle cx={x} cy={y} r={12} color={colors.emberSoft} />
    </Canvas>
  );
}
