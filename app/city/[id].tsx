import { useLocalSearchParams } from 'expo-router';
import { CityDetailScreen } from '@/src/screens/CityDetail/CityDetailScreen';

export default function CityDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <CityDetailScreen id={id} />;
}
