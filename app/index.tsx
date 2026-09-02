import { Redirect } from 'expo-router';
import { useAppStore } from '@/src/store/app.store';

export default function Index() {
  const complete = useAppStore((state) => state.onboardingComplete);
  return <Redirect href={complete ? '/(tabs)/clocks' : '/onboarding'} />;
}
