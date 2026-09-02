import { Tabs } from 'expo-router';
import { FloatingTabBar } from '@/src/components/navigation/FloatingTabBar/FloatingTabBar';

export default function TabLayout() {
  return (
    <Tabs initialRouteName="clocks" screenOptions={{ headerShown: false }} tabBar={(props) => <FloatingTabBar {...props} />}>
      <Tabs.Screen name="world" options={{ title: 'World' }} />
      <Tabs.Screen name="clocks" options={{ title: 'Clocks' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
