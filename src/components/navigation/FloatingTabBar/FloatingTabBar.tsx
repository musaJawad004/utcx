import { BlurView } from 'expo-blur';
import { Clock3, Globe2, Settings2 } from 'lucide-react-native';
import { Platform, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/src/theme';
import { styles } from './FloatingTabBar.styles';

const icons = { world: Globe2, clocks: Clock3, settings: Settings2 } as const;

type TabBarProps = {
  state: { index: number; routes: Array<{ key: string; name: string; params?: object }> };
  descriptors: Record<string, { options: { title?: string } }>;
  navigation: { navigate: (name: string, params?: object) => void };
};

export function FloatingTabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const bottom = Platform.OS === 'ios' ? Math.max(8, insets.bottom) : Math.max(4, insets.bottom);
  return (
    <View pointerEvents="box-none" style={[styles.positioner, { bottom }]}>
      <BlurView intensity={75} tint="light" style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const Icon = icons[route.name as keyof typeof icons] ?? Clock3;
          const label = descriptors[route.key]?.options.title ?? route.name;
          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              onPress={() => navigation.navigate(route.name, route.params)}
              style={[styles.item, focused && styles.itemActive]}
            >
              <Icon size={17} strokeWidth={1.6} color={focused ? colors.inverseText : colors.graphite} />
              {focused && <Text style={styles.label}>{String(label)}</Text>}
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}
