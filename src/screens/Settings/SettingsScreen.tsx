import { Alert, Platform, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LocateFixed, RotateCcw, Shapes, Sparkles } from 'lucide-react-native';
import { colors } from '@/src/theme';
import { useSettingsViewModel } from '@/src/viewmodels/use-settings.viewmodel';
import { ScreenHeader } from '@/src/components/ui/ScreenHeader/ScreenHeader';
import { SegmentedControl } from '@/src/components/ui/SegmentedControl/SegmentedControl';
import { SettingAction } from '@/src/components/settings/SettingAction/SettingAction';
import { ToggleRow } from '@/src/components/ui/ToggleRow/ToggleRow';
import { styles } from './SettingsScreen.styles';

export function SettingsScreen() {
  const vm = useSettingsViewModel();
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 12, paddingBottom: 130 + (Platform.OS === 'ios' ? insets.bottom : 0) }]} showsVerticalScrollIndicator={false}>
        <ScreenHeader eyebrow="INSTRUMENT CONFIGURATION" title="Settings" />
        <Text style={styles.sectionLabel}>TIME</Text>
        <View style={styles.panel}>
          <View style={styles.controlRow}><View><Text style={styles.label}>Clock format</Text><Text style={styles.detail}>Applied across app and widgets</Text></View><SegmentedControl options={['12', '24'] as const} value={vm.settings.hourFormat} onChange={(value) => vm.updateSetting('hourFormat', value)} labels={{ '12': '12H', '24': '24H' }} /></View>
          <ToggleRow label="Show seconds" detail="Live precision in foreground" value={vm.settings.showSeconds} onChange={(value) => vm.updateSetting('showSeconds', value)} />
        </View>
        <Text style={styles.sectionLabel}>LOCATION</Text>
        <View style={styles.panel}>
          <ToggleRow icon={<LocateFixed size={18} color={colors.graphite} strokeWidth={1.5} />} label="Automatic location" detail="Used only while UTCX is open" value={vm.settings.automaticLocation} onChange={(value) => vm.updateSetting('automaticLocation', value)} />
          <SettingAction label="Refresh current city" icon={<RotateCcw size={18} color={colors.graphite} strokeWidth={1.5} />} onPress={() => void vm.refreshLocation()} />
        </View>
        <Text style={styles.sectionLabel}>SYSTEM</Text>
        <View style={styles.panel}>
          {Platform.OS === 'ios' && <ToggleRow label="Live Activity" detail="Current + first pinned clock" value={vm.settings.liveActivity} onChange={(value) => vm.updateSetting('liveActivity', value)} />}
          <SettingAction label="Widget configuration" value="3 layouts" icon={<Shapes size={18} color={colors.graphite} strokeWidth={1.5} />} onPress={() => Alert.alert('UTCX widgets', 'Add UTCX City, UTCX Three Cities, or UTCX World Time from your system widget gallery. They use the first saved cities in your list.')} />
          <ToggleRow label="Haptic feedback" value={vm.settings.haptics} onChange={(value) => vm.updateSetting('haptics', value)} />
        </View>
        <Text style={styles.sectionLabel}>MOTION</Text>
        <View style={styles.panel}>
          <View style={styles.stackedControl}><View style={styles.controlCopy}><Sparkles size={18} color={colors.graphite} strokeWidth={1.5} /><View><Text style={styles.label}>Animation intensity</Text><Text style={styles.detail}>Motion always remains calm</Text></View></View><SegmentedControl options={['reduced', 'standard', 'expressive'] as const} value={vm.settings.animationIntensity} onChange={(value) => vm.updateSetting('animationIntensity', value)} labels={{ reduced: 'LOW', standard: 'MID', expressive: 'HIGH' }} /></View>
        </View>
        <Text style={styles.sectionLabel}>GENERAL</Text>
        <View style={styles.panel}>
          <View style={styles.controlRow}><View><Text style={styles.label}>Temperature</Text><Text style={styles.detail}>Reserved for weather surfaces</Text></View><SegmentedControl options={['celsius', 'fahrenheit'] as const} value={vm.settings.temperatureUnit} onChange={(value) => vm.updateSetting('temperatureUnit', value)} labels={{ celsius: '°C', fahrenheit: '°F' }} /></View>
          <SettingAction label="Reset onboarding" onPress={vm.resetOnboarding} />
          <SettingAction label="About UTCX" value="1.0.0" onPress={() => Alert.alert('UTCX 1.0', 'A quiet world-time instrument. Timezone calculations run locally and saved cities remain available offline.')} />
        </View>
        <Text style={styles.footer}>UTCX · LOCAL-FIRST WORLD TIME{`\n`}NO ACCOUNT · NO BACKGROUND TRACKING</Text>
      </ScrollView>
    </View>
  );
}
