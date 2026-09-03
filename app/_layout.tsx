import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts as useSpaceGrotesk, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold } from '@expo-google-fonts/space-grotesk';
import { useFonts as useIbmPlex, IBMPlexMono_400Regular, IBMPlexMono_500Medium } from '@expo-google-fonts/ibm-plex-mono';
import { colors } from '@/src/theme';
import { selectSavedCities, useAppStore } from '@/src/store/app.store';
import { syncWidgets } from '@/src/services/widget.service';
import { useShallow } from 'zustand/react/shallow';

void SplashScreen.preventAutoHideAsync();

function AppEffects() {
  const current = useAppStore((state) => state.currentCity);
  const saved = useAppStore(useShallow(selectSavedCities));
  const settings = useAppStore((state) => state.settings);
  useEffect(() => { syncWidgets(current, saved, settings); }, [current, saved, settings]);
  return null;
}

export default function RootLayout() {
  const [spaceLoaded] = useSpaceGrotesk({ SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold });
  const [monoLoaded] = useIbmPlex({ IBMPlexMono_400Regular, IBMPlexMono_500Medium });
  const ready = spaceLoaded && monoLoaded;
  const darkMode = useAppStore((state) => state.settings.darkMode);
  useEffect(() => { Appearance.setColorScheme(darkMode ? 'dark' : 'light'); }, [darkMode]);
  useEffect(() => { if (ready) void SplashScreen.hideAsync(); }, [ready]);
  if (!ready) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={darkMode ? 'light' : 'dark'} />
        <AppEffects />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.canvas }, animation: 'fade' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="city/[id]" options={{ animation: 'fade_from_bottom', gestureEnabled: true }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
