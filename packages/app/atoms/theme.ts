import { ThemeVariant, ThemeVariant as ThemeVariantEnum } from 'app/utils/theme';
import { atom, useAtom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export const appThemeAtom = atom<ThemeVariant | undefined>(undefined);

export function useAppTheme() {
  const [appTheme, setAppThemeLocal] = useAtom(appThemeAtom);

  useEffect(() => {
    async function checkTheme() {
      await AsyncStorage.getItem('theme').then((value) => {
        setAppThemeLocal((value as ThemeVariant) ?? ThemeVariantEnum.light);
      });
    }

    if (!appTheme) {
      checkTheme();
    }
  }, []);

  const setAppTheme = (theme: ThemeVariant) => {
    setAppThemeLocal(theme);
    try {
      AsyncStorage.setItem('theme', theme);
    } catch {
      console.log("cound't save theme");
    }
  };

  return [appTheme, setAppTheme] as const;
}
