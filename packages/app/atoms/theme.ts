// import AsyncStorage from '@react-native-async-storage/async-storage'
import { type CurrentThemeVariant, ThemeVariant } from 'app/utils/theme';
import { atom, useAtom } from 'jotai';
import { Appearance } from 'react-native';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const appThemeKey = 'appTheme';

const storage = createJSONStorage<ThemeVariant>(() => AsyncStorage);
export const appThemeAtom = atomWithStorage<ThemeVariant>(appThemeKey, ThemeVariant.light, storage);

export function useAppTheme() {
  const [appTheme, setAppTheme] = useAtom(appThemeAtom);

  return [appTheme, setAppTheme] as const;
}

const currentThemeAtom = atom((get) => {
  const userTheme = get(appThemeAtom);
  if (userTheme === ThemeVariant.system) {
    return Appearance.getColorScheme() as CurrentThemeVariant;
  }
  return userTheme;
});

export function useCurrentTheme() {
  return [...useAtom(currentThemeAtom)] as const;
}
