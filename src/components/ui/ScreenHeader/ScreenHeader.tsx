import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { styles } from './ScreenHeader.styles';

export function ScreenHeader({ eyebrow = 'UTCX', title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      {action}
    </View>
  );
}
