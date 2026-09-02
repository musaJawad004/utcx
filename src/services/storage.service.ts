import { createMMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

export const deviceStorage = createMMKV({ id: 'utcx.device' });

export const zustandStorage: StateStorage = {
  setItem: (name, value) => deviceStorage.set(name, value),
  getItem: (name) => deviceStorage.getString(name) ?? null,
  removeItem: (name) => deviceStorage.remove(name),
};
