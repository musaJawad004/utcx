import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, useColorScheme, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, FadeOut, ZoomIn } from 'react-native-reanimated';
import { CITIES, cityById } from '@/src/data/cities';
import { useNow } from '@/src/hooks/use-now';
import { formatTime } from '@/src/services/time.service';
import { colors } from '@/src/theme';
import { useOnboardingViewModel } from '@/src/viewmodels/use-onboarding.viewmodel';
import { Button } from '@/src/components/ui/Button/Button';
import { OrbitGlobe } from '@/src/components/visual/OrbitGlobe/OrbitGlobe';
import { styles } from './OnboardingScreen.styles';

const demoIds = ['los-angeles', 'london', 'tokyo', 'dubai'];

export function OnboardingScreen() {
  const vm = useOnboardingViewModel();
  const now = useNow(true);
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [demoIndex, setDemoIndex] = useState(0);
  useEffect(() => {
    if (vm.page !== 1) return;
    const interval = setInterval(() => setDemoIndex((value) => (value + 1) % demoIds.length), 2500);
    return () => clearInterval(interval);
  }, [vm.page]);
  const demoCity = cityById(demoIds[demoIndex] ?? '') ?? CITIES[0]!;
  const globeSize = Math.min(width * 0.92, height * 0.48, 430);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 18 }]}>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#1D1D1B', '#10100F'] : ['#F8F7F2', '#F2F0EA']}
        style={styles.background}
      />
      <View style={styles.top}><Text style={styles.brand}>UTCX</Text><Text style={styles.step}>0{vm.page + 1} / 03</Text></View>
      <Animated.View key={vm.page} entering={FadeIn.duration(500)} exiting={FadeOut.duration(220)} style={styles.stage}>
        {vm.page === 0 && <>
          <View style={styles.visual}><OrbitGlobe size={globeSize} subtle /><Animated.Text entering={ZoomIn.duration(700)} style={styles.heroTime}>{formatTime(demoCity, '24', false, now)}</Animated.Text></View>
          <View style={styles.copy}><Text style={styles.eyebrow}>TIME, WITHOUT BORDERS</Text><Text style={styles.title}>One quiet view of everywhere.</Text><Text style={styles.body}>A precise world-time instrument built around place, light, and the moments between.</Text></View>
        </>}
        {vm.page === 1 && <>
          <View style={styles.cityStage}>
            <OrbitGlobe size={globeSize * 0.86} accentLongitude={demoCity.longitude} />
            <Animated.View key={demoCity.id} entering={FadeInDown.duration(560)} style={styles.cityReadout}>
              <Text style={styles.cityName}>{demoCity.name}</Text>
              <Text style={styles.cityCountry}>{demoCity.country}</Text>
              <Text style={styles.cityTime}>{formatTime(demoCity, '24', true, now)}</Text>
            </Animated.View>
          </View>
          <View style={styles.copy}><Text style={styles.eyebrow}>SHIFT PERSPECTIVE</Text><Text style={styles.title}>Follow the sun across the world.</Text><Text style={styles.body}>Saved cities update continuously, even offline.</Text></View>
        </>}
        {vm.page === 2 && <>
          <View style={styles.permissionVisual}><View style={styles.pinHalo}><View style={styles.pinCircle}><MapPin size={34} color={colors.ink} strokeWidth={1.4} /></View></View><Text style={styles.coordinate}>40.7128° N  ·  74.0060° W</Text></View>
          <View style={styles.copy}><Text style={styles.eyebrow}>CURRENT COORDINATE</Text><Text style={styles.title}>Start where you are.</Text><Text style={styles.body}>Allow location once to label your city and timezone automatically. UTCX never tracks you in the background.</Text></View>
        </>}
      </Animated.View>
      <View style={styles.footer}>
        <View style={styles.dots}>{[0, 1, 2].map((page) => <View key={page} style={[styles.dot, page === vm.page && styles.dotActive]} />)}</View>
        {vm.page === 2 ? <>
          <Button disabled={vm.locating} onPress={() => void vm.allowLocation()}>{vm.locating ? <ActivityIndicator color={colors.white} /> : 'Use my location'}</Button>
          <Button compact onPress={vm.skip} variant="ghost">Skip for now</Button>
        </> : <Button onPress={vm.next}>Continue</Button>}
      </View>
    </View>
  );
}
