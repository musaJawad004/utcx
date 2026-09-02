import { useEffect, useMemo } from 'react';
import { Canvas, Circle, Group, Line, Rect, vec } from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import type { City } from '@/src/models/city.model';
import { colors } from '@/src/theme';
import { styles } from './WorldField.styles';

const landAt = (lat: number, lon: number) => {
  const inEllipse = (cx: number, cy: number, rx: number, ry: number) => ((lon - cx) / rx) ** 2 + ((lat - cy) / ry) ** 2 < 1;
  return inEllipse(-105, 46, 56, 28) || inEllipse(-62, -17, 25, 40) || inEllipse(13, 50, 25, 14) || inEllipse(20, 6, 29, 37) || inEllipse(89, 38, 76, 28) || inEllipse(135, -25, 25, 16) || inEllipse(47, -20, 6, 12);
};

export function WorldField({ width, height, cities, selected }: { width: number; height: number; cities: City[]; selected: City }) {
  const focus = useSharedValue(selected.longitude);
  useEffect(() => { focus.value = withTiming(selected.longitude, { duration: 760 }); }, [focus, selected.longitude]);
  const mapTransform = useDerivedValue(() => [{ translateX: -focus.value * 0.12 }]);
  const dots = useMemo(() => {
    const values: Array<{ x: number; y: number }> = [];
    for (let lat = -60; lat <= 76; lat += 7) for (let lon = -176; lon <= 176; lon += 7) {
      if (landAt(lat, lon)) values.push({ x: ((lon + 180) / 360) * width, y: ((82 - lat) / 164) * height });
    }
    return values;
  }, [height, width]);
  const project = (city: City) => ({ x: ((city.longitude + 180) / 360) * width, y: ((82 - city.latitude) / 164) * height });
  const marker = project(selected);

  return (
    <Canvas style={[styles.canvas, { width, height }]}>
      <Rect x={0} y={0} width={width} height={height} color="rgba(16,16,15,0.025)" />
      {[0.2, 0.4, 0.6, 0.8].map((part) => <Line key={`v${part}`} p1={vec(width * part, 0)} p2={vec(width * part, height)} color={colors.hairline} strokeWidth={1} />)}
      {[0.25, 0.5, 0.75].map((part) => <Line key={`h${part}`} p1={vec(0, height * part)} p2={vec(width, height * part)} color={colors.hairline} strokeWidth={1} />)}
      <Group transform={mapTransform}>
        {dots.map((dot, index) => <Circle key={index} cx={dot.x} cy={dot.y} r={1.45} color="rgba(16,16,15,0.34)" />)}
        {cities.map((city) => { const point = project(city); return <Circle key={city.id} cx={point.x} cy={point.y} r={city.id === selected.id ? 6 : 3} color={city.id === selected.id ? colors.ember : colors.ink} />; })}
        <Circle cx={marker.x} cy={marker.y} r={15} color={colors.emberSoft} />
      </Group>
    </Canvas>
  );
}
