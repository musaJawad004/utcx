import { useEffect, useMemo, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Modal, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, X } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import type { City } from '@/src/models/city.model';
import { matchesCityQuery } from '@/src/utils/validation';
import { formatTime, utcOffset } from '@/src/services/time.service';
import type { HourFormat } from '@/src/models/settings.model';
import { colors } from '@/src/theme';
import { IconButton } from '@/src/components/ui/IconButton/IconButton';
import { styles } from './AddCitySheet.styles';
import { searchWorldPlaces } from '@/src/services/geocoding.service';

type Props = {
  visible: boolean;
  cities: City[];
  recent: City[];
  savedIds: string[];
  now: Date;
  format: HourFormat;
  onClose: () => void;
  onSelect: (city: City) => void;
};

export function AddCitySheet({ visible, cities, recent, savedIds, now, format, onClose, onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [worldResults, setWorldResults] = useState<City[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [searchedQuery, setSearchedQuery] = useState('');
  const insets = useSafeAreaInsets();
  const normalizedQuery = query.trim();
  const queryReady = normalizedQuery.length >= 2;
  const results = useMemo(() => cities.filter((city) => !savedIds.includes(city.id) && matchesCityQuery(city, query)), [cities, query, savedIds]);
  useEffect(() => {
    if (normalizedQuery.length < 2) { setWorldResults([]); setSearchedQuery(''); setSearching(false); setSearchError(false); return; }
    let active = true;
    const controller = new AbortController();
    setWorldResults([]);
    setSearching(true);
    setSearchError(false);
    const timer = setTimeout(() => {
      void searchWorldPlaces(normalizedQuery, controller.signal)
        .then((places) => { if (active) setWorldResults(places.filter((city) => !savedIds.includes(city.id))); })
        .catch((error: unknown) => { if (active && !(error instanceof Error && error.name === 'AbortError')) setSearchError(true); })
        .finally(() => { if (active) { setSearchedQuery(normalizedQuery); setSearching(false); } });
    }, 550);
    return () => { active = false; clearTimeout(timer); controller.abort(); };
  }, [normalizedQuery, savedIds]);
  const searchPending = queryReady && (searching || searchedQuery !== normalizedQuery);
  const currentWorldResults = searchedQuery === normalizedQuery ? worldResults : [];
  const suggestions = query ? [...results, ...currentWorldResults.filter((remote) => !results.some((local) => local.name === remote.name && local.countryCode === remote.countryCode))] : results.filter((city) => ['new-york', 'paris', 'dubai', 'sydney', 'singapore'].includes(city.id));
  const data = query ? suggestions : [...recent.filter((city) => !savedIds.includes(city.id)), ...suggestions.filter((city) => !recent.some((item) => item.id === city.id))];

  return (
    <Modal animationType="none" transparent visible={visible} onRequestClose={onClose} statusBarTranslucent>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.full}>
        <Animated.View entering={FadeIn.duration(180)} exiting={FadeOut.duration(160)} style={styles.backdrop}>
          <Pressable accessibilityLabel="Close city search" onPress={onClose} style={styles.backdropPress} />
        </Animated.View>
        <Animated.View entering={FadeIn.duration(220)} exiting={FadeOut.duration(180)} style={styles.sheet}>
          <BlurView intensity={82} tint="light" style={[styles.blur, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.handle} />
            <View style={styles.header}>
              <View><Text style={styles.eyebrow}>NEW COORDINATE</Text><Text style={styles.title}>Add a city</Text></View>
              <IconButton size="small" label="Close" onPress={onClose} icon={<X size={18} color={colors.ink} strokeWidth={1.7} />} />
            </View>
            <View style={[styles.searchBox, focused && styles.searchBoxFocused]}>
              <Search size={18} color={colors.graphite} strokeWidth={1.5} />
              <TextInput autoCapitalize="words" autoCorrect={false} clearButtonMode="while-editing" onBlur={() => setFocused(false)} onChangeText={setQuery} onFocus={() => setFocused(true)} placeholder="City or country" placeholderTextColor={colors.quiet} returnKeyType="search" style={styles.input} value={query} />
            </View>
            <Text style={styles.section}>{query ? !queryReady ? 'ENTER AT LEAST 2 CHARACTERS' : searchPending ? 'SEARCHING THE WORLD…' : `${data.length} MATCH${data.length === 1 ? '' : 'ES'}` : recent.length ? 'RECENT · SUGGESTED' : 'SUGGESTED'}</Text>
            <FlatList
              data={data}
              keyboardShouldPersistTaps="handled"
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<Text style={styles.empty}>{!queryReady && query ? 'Type at least 2 characters to search.' : searchError ? 'World search is unavailable. Check your connection.' : searchPending ? 'Looking across cities and countries…' : 'No city or country matches that search.'}</Text>}
              renderItem={({ item }) => (
                <Pressable accessibilityRole="button" onPress={() => { onSelect(item); setQuery(''); }} style={({ pressed }) => [styles.result, pressed && styles.resultPressed]}>
                  <View><Text style={styles.city}>{item.name}</Text><Text style={styles.country}>{item.country} · {utcOffset(item, now)}</Text></View>
                  <Text style={styles.preview}>{formatTime(item, format, false, now)}</Text>
                </Pressable>
              )}
              showsVerticalScrollIndicator={false}
            />
          </BlurView>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
