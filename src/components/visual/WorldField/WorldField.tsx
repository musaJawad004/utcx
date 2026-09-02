import { useEffect } from 'react';
import { Circle, Line, Path, Rect, Svg } from 'react-native-svg';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import type { City } from '@/src/models/city.model';
import { colors } from '@/src/theme';
import { styles } from './WorldField.styles';
const continents = ['M34 76 L52 54 L74 48 L93 55 L112 76 L128 91 L121 108 L102 103 L92 119 L72 108 L57 98 Z','M132 118 L154 124 L165 148 L160 175 L145 202 L132 190 L125 164 Z','M206 62 L228 48 L265 49 L289 62 L315 65 L337 82 L352 105 L337 119 L312 116 L299 128 L276 121 L258 131 L240 114 L219 108 Z','M250 123 L273 130 L286 151 L277 174 L265 194 L249 187 L240 161 Z','M337 159 L355 164 L369 180 L361 194 L342 188 Z'];
export function WorldField({ width, height, cities, selected }: { width: number; height: number; cities: City[]; selected: City }) {
  const focus = useSharedValue(0); useEffect(() => { focus.value = withTiming(selected.longitude * 0.12, { duration: 760 }); }, [focus, selected.longitude]); const mapStyle = useAnimatedStyle(() => ({ transform: [{ translateX: -focus.value }] }));
  const project = (city: City) => ({ x: ((city.longitude + 180) / 360) * width, y: ((82 - city.latitude) / 164) * height }); const marker = project(selected);
  return <Animated.View style={[styles.canvas, { width, height }, mapStyle]}><Svg width={width} height={height} viewBox="0 0 400 220" preserveAspectRatio="none"><Rect x={0} y={0} width={400} height={220} fill="rgba(16,16,15,0.025)" />{[80,160,240,320].map((x) => <Line key={`v${x}`} x1={x} y1={0} x2={x} y2={220} stroke={colors.hairline} strokeWidth={1} />)}{[55,110,165].map((y) => <Line key={`h${y}`} x1={0} y1={y} x2={400} y2={y} stroke={colors.hairline} strokeWidth={1} />)}{continents.map((d, index) => <Path key={index} d={d} fill="rgba(16,16,15,0.18)" stroke={colors.hairline} strokeWidth={0.7} />)}{cities.map((city) => { const point = project(city); return <Circle key={city.id} cx={(point.x / width) * 400} cy={(point.y / height) * 220} r={city.id === selected.id ? 5 : 2.5} fill={city.id === selected.id ? colors.ember : colors.ink} />; })}<Circle cx={(marker.x / width) * 400} cy={(marker.y / height) * 220} r={13} fill={colors.emberSoft} /></Svg></Animated.View>;
}
