import { useEffect, useMemo } from 'react';
import { Circle, Line, Svg } from 'react-native-svg';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { colors } from '@/src/theme';
import { styles } from './OrbitGlobe.styles';

type Props = { size: number; accentLongitude?: number; subtle?: boolean };
export function OrbitGlobe({ size, accentLongitude = -74, subtle = false }: Props) {
  const rotation = useSharedValue(0);
  useEffect(() => { rotation.value = withRepeat(withTiming(360, { duration: 48000 }), -1, false); }, [rotation]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value}deg` }] }));
  const center = size / 2;
  const radius = size * 0.39;
  const dots = useMemo(() => Array.from({ length: 96 }, (_, index) => { const angle = index * 2.39996; const distance = radius * Math.sqrt((index + 1) / 96); return { x: center + Math.cos(angle) * distance, y: center + Math.sin(angle) * distance }; }), [center, radius]);
  const markerAngle = (accentLongitude / 180) * Math.PI;
  const markerX = center + Math.cos(markerAngle) * radius * 0.82;
  const markerY = center + Math.sin(markerAngle) * radius * 0.34;
  return <Animated.View style={[styles.canvas, { width: size, height: size }, animatedStyle]}><Svg width={size} height={size}><Circle cx={center} cy={center} r={radius} fill={subtle ? 'rgba(16,16,15,0.035)' : 'rgba(16,16,15,0.055)'} stroke={colors.hairline} strokeWidth={1} /><Circle cx={center} cy={center} r={radius * 0.64} fill="none" stroke={colors.hairline} strokeWidth={1} /><Line x1={center - radius} y1={center} x2={center + radius} y2={center} stroke={colors.hairline} strokeWidth={1} /><Line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke={colors.hairline} strokeWidth={1} />{dots.map((dot, index) => <Circle key={index} cx={dot.x} cy={dot.y} r={index % 5 === 0 ? 1.6 : 1} fill={subtle ? 'rgba(16,16,15,0.12)' : 'rgba(16,16,15,0.22)'} />)}<Circle cx={markerX} cy={markerY} r={13} fill={colors.emberSoft} /><Circle cx={markerX} cy={markerY} r={5} fill={colors.ember} /></Svg></Animated.View>;
}
