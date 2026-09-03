import { BlurView } from 'expo-blur';
import { Clock3, Globe2, Settings2 } from 'lucide-react-native';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { colors } from '@/src/theme';
import { useAppStore } from '@/src/store/app.store';
import { styles } from './FloatingTabBar.styles';

const icons = { world: Globe2, clocks: Clock3, settings: Settings2 } as const;

type TabBarProps = {
  state: { index: number; routes: Array<{ key: string; name: string; params?: object }> };
  descriptors: Record<string, { options: { title?: string } }>;
  navigation: { navigate: (name: string, params?: object) => void };
};

export function FloatingTabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const animationIntensity = useAppStore((store) => store.settings.animationIntensity);
  const bottom = Platform.OS === 'ios' ? Math.max(8, insets.bottom) : Math.max(4, insets.bottom);
  const duration = animationIntensity === 'reduced' ? 100 : animationIntensity === 'expressive' ? 300 : 210;
  return (
    <View pointerEvents="box-none" style={[styles.positioner, { bottom }]}>
      <BlurView intensity={75} tint="light" style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const Icon = icons[route.name as keyof typeof icons] ?? Clock3;
          const label = descriptors[route.key]?.options.title ?? route.name;
          return (
            <Animated.View key={route.key} layout={LinearTransition.duration(duration)}>
              <Pressable
                accessibilityRole="tab"
                accessibilityState={{ selected: focused }}
                onPress={() => navigation.navigate(route.name, route.params)}
                style={styles.item}
              >
                {focused && <Animated.View entering={FadeIn.duration(duration)} exiting={FadeOut.duration(90)} style={styles.itemActive} />}
                <Icon size={17} strokeWidth={1.6} color={focused ? colors.inverseText : colors.graphite} />
                {focused && <Animated.Text entering={FadeIn.duration(duration)} exiting={FadeOut.duration(90)} style={styles.label}>{String(label)}</Animated.Text>}
              </Pressable>
            </Animated.View>
          );
        })}
      </BlurView>
    </View>
  );
}
