export type HourFormat = '12' | '24';
export type AnimationIntensity = 'reduced' | 'standard' | 'expressive';
export type TemperatureUnit = 'celsius' | 'fahrenheit';

export type AppSettings = {
  hourFormat: HourFormat;
  automaticLocation: boolean;
  liveActivity: boolean;
  showSeconds: boolean;
  haptics: boolean;
  animationIntensity: AnimationIntensity;
  temperatureUnit: TemperatureUnit;
  darkMode: boolean;
};

export const defaultSettings: AppSettings = {
  hourFormat: '24',
  automaticLocation: true,
  liveActivity: false,
  showSeconds: true,
  haptics: true,
  animationIntensity: 'standard',
  temperatureUnit: 'celsius',
  darkMode: false,
};
