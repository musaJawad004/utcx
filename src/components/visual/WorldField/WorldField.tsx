import { Camera, Map as MapLibreMap, ViewAnnotation } from '@maplibre/maplibre-react-native';
import { View } from 'react-native';
import type { City } from '@/src/models/city.model';
import { styles } from './WorldField.styles';

const LIGHT_STYLE = 'https://tiles.openfreemap.org/styles/positron';
const DARK_STYLE = 'https://tiles.openfreemap.org/styles/dark';

type Props = { width: number; height: number; cities: City[]; selected: City; dark?: boolean; zoom?: number };

export function WorldField({ width, height, cities, selected, dark = false, zoom = 4.5 }: Props) {
  return (
    <View style={[styles.canvas, { width, height }]}>
      <MapLibreMap
        style={styles.map}
        mapStyle={dark ? DARK_STYLE : LIGHT_STYLE}
        attribution
        attributionPosition={{ bottom: 5, left: 5 }}
        logo={false}
        compass
        compassPosition={{ top: 10, right: 10 }}
        scaleBar={false}
        touchRotate={false}
        touchPitch={false}
      >
        <Camera center={[selected.longitude, zoom < 1 ? 12 : selected.latitude]} zoom={zoom} duration={700} easing="ease" />
        {cities.map((city) => (
          <ViewAnnotation key={city.id} id={`city-${city.id}`} lngLat={[city.longitude, city.latitude]} anchor="center">
            <View style={[styles.markerHalo, city.id === selected.id && styles.markerHaloSelected]}>
              <View style={[styles.marker, city.id === selected.id && styles.markerSelected]} />
            </View>
          </ViewAnnotation>
        ))}
      </MapLibreMap>
    </View>
  );
}
