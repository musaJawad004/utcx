import { Tabs } from 'expo-router';
import { FloatingTabBar } from '@/src/components/navigation/FloatingTabBar/FloatingTabBar';
import { useAppStore } from '@/src/store/app.store';
import { colors } from '@/src/theme';

export default function TabLayout() {
  const animationIntensity = useAppStore((state) => state.settings.animationIntensity);
  return (
    <Tabs initialRouteName="clocks" screenOptions={{ headerShown: false, animation: animationIntensity === 'reduced' ? 'none' : 'fade', sceneStyle: { backgroundColor: colors.canvas } }} tabBar={(props) => <FloatingTabBar {...props} />}>
      <Tabs.Screen name="world" options={{ title: 'World' }} />
      <Tabs.Screen name="clocks" options={{ title: 'Clocks' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
