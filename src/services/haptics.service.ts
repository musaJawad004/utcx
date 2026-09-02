import * as Haptics from 'expo-haptics';

export const haptics = {
  select: (enabled = true) => enabled && Haptics.selectionAsync(),
  success: (enabled = true) => enabled && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  impact: (enabled = true) => enabled && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
};
