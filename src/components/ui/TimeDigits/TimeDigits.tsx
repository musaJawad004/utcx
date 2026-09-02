import { Text, View, type TextStyle, type StyleProp } from 'react-native';
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from 'react-native-reanimated';
import { styles } from './TimeDigits.styles';

type Props = { value: string; style?: StyleProp<TextStyle>; mutedSeconds?: boolean; accessibilityLabel?: string };

export function TimeDigits({ value, style, mutedSeconds = false, accessibilityLabel }: Props) {
  const parts = value.split(':');
  const primary = parts.slice(0, 2).join(':');
  const secondsAndPeriod = parts.length > 2 ? `:${parts.slice(2).join(':')}` : '';
  return (
    <View accessibilityLabel={accessibilityLabel ?? value} accessible style={styles.row}>
      <Animated.Text key={primary} entering={FadeInDown.duration(360)} exiting={FadeOutUp.duration(220)} layout={LinearTransition} style={[styles.digits, style]}>
        {primary}
      </Animated.Text>
      {!!secondsAndPeriod && <Text style={[styles.seconds, mutedSeconds && styles.muted]}>{secondsAndPeriod}</Text>}
    </View>
  );
}
