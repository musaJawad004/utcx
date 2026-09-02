import { useEffect, useMemo } from 'react';
import { Canvas, Circle, Group, Line, vec } from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { colors } from '@/src/theme';
import { styles } from './OrbitGlobe.styles';

type Props = { size: number; accentLongitude?: number; subtle?: boolean };

export function OrbitGlobe({ size, accentLongitude = -74, subtle = false }: Props) {
  const rotation = useSharedValue(0);
  useEffect(() => {
    rotation.value = withRepeat(withTiming(Math.PI * 2, { duration: 48_000 }), -1, false);
  }, [rotation]);
  const transform = useDerivedValue(() => [{ rotate: rotation.value }]);
  const center = size / 2;
  const radius = size * 0.39;
  const dots = useMemo(() => Array.from({ length: 72 }, (_, index) => {
    const angle = index * 2.39996;
    const distance = radius * Math.sqrt((index + 1) / 72);
    return { x: center + Math.cos(angle) * distance, y: center + Math.sin(angle) * distance };
  }), [center, radius]);
  const markerAngle = (accentLongitude / 180) * Math.PI;

  return (
    <Canvas style={[styles.canvas, { width: size, height: size }]}>
      <Circle cx={center} cy={center} r={radius} color={subtle ? 'rgba(16,16,15,0.035)' : 'rgba(16,16,15,0.055)'} />
      <Group origin={vec(center, center)} transform={transform}>
        <Circle cx={center} cy={center} r={radius} color={colors.hairline} style="stroke" strokeWidth={1} />
        <Circle cx={center} cy={center} r={radius * 0.64} color={colors.hairline} style="stroke" strokeWidth={1} />
        <Line p1={vec(center - radius, center)} p2={vec(center + radius, center)} color={colors.hairline} strokeWidth={1} />
        <Line p1={vec(center, center - radius)} p2={vec(center, center + radius)} color={colors.hairline} strokeWidth={1} />
        {dots.map((dot, index) => <Circle key={index} cx={dot.x} cy={dot.y} r={index % 5 === 0 ? 1.6 : 1} color={subtle ? 'rgba(16,16,15,0.12)' : 'rgba(16,16,15,0.22)'} />)}
        <Circle cx={center + Math.cos(markerAngle) * radius * 0.82} cy={center + Math.sin(markerAngle) * radius * 0.34} r={5} color={colors.ember} />
        <Circle cx={center + Math.cos(markerAngle) * radius * 0.82} cy={center + Math.sin(markerAngle) * radius * 0.34} r={13} color={colors.emberSoft} />
      </Group>
    </Canvas>
  );
}
