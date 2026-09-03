import { Tabs } from 'expo-router';
import { FloatingTabBar } from '@/src/components/navigation/FloatingTabBar/FloatingTabBar';
import { colors } from '@/src/theme';

export default function TabLayout() {
  return (
    <Tabs detachInactiveScreens={false} initialRouteName="clocks" screenOptions={{ headerShown: false, animation: 'none', lazy: false, sceneStyle: { backgroundColor: colors.canvas } }} tabBar={(props) => <FloatingTabBar {...props} />}>
      <Tabs.Screen name="world" options={{ title: 'World' }} />
      <Tabs.Screen name="clocks" options={{ title: 'Clocks' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
