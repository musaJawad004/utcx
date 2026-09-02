import { DynamicColorIOS } from 'react-native';

export const colors = {
  canvas: DynamicColorIOS({ light: '#F2F0EA', dark: '#10100F' }),
  canvasRaised: DynamicColorIOS({ light: '#F8F7F2', dark: '#1D1D1B' }),
  ink: DynamicColorIOS({ light: '#10100F', dark: '#F8F7F2' }),
  graphite: DynamicColorIOS({ light: '#777670', dark: '#B9B7AF' }),
  quiet: DynamicColorIOS({ light: '#A9A7A0', dark: '#777670' }),
  hairline: DynamicColorIOS({ light: 'rgba(16,16,15,0.12)', dark: 'rgba(248,247,242,0.16)' }),
  glass: DynamicColorIOS({ light: 'rgba(248,247,242,0.74)', dark: 'rgba(29,29,27,0.9)' }),
  glassStrong: DynamicColorIOS({ light: 'rgba(255,255,252,0.9)', dark: 'rgba(29,29,27,0.98)' }),
  inverse: DynamicColorIOS({ light: '#10100F', dark: '#F8F7F2' }),
  inverseText: DynamicColorIOS({ light: '#F8F7F2', dark: '#10100F' }),
  ember: DynamicColorIOS({ light: '#FFFFFF', dark: '#000000' }),
  emberSoft: DynamicColorIOS({ light: 'rgba(255,255,255,0.24)', dark: 'rgba(0,0,0,0.24)' }),
  danger: '#C7462B',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;
