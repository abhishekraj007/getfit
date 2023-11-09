import { useForceUpdate } from '@t4/ui';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { Appearance } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import { storage } from '../kv'
import { ThemeVariant } from 'app/utils/theme';
import { appThemeKey, useAppTheme, useCurrentTheme } from 'app/atoms/theme';
import { TamaguiProvider } from '../tamagui';
// import { TamaguiProvider } from './tamagui'

export const TamaguiThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [appTheme, setAppTheme] = useAppTheme();
  const [currentTheme] = useCurrentTheme();
  const forceUpdate = useForceUpdate();

  const defaultTheme = 'system';
  const statusBarStyle =
    currentTheme === ThemeVariant.dark ? ThemeVariant.light : ThemeVariant.dark;
  const themeValue = currentTheme === ThemeVariant.dark ? DarkTheme : DefaultTheme;

  useEffect(() => {
    const systemThemeChangeListener = Appearance.addChangeListener(() => {
      setAppTheme(Appearance.getColorScheme() as ThemeVariant);
      forceUpdate();
    });
    return () => {
      systemThemeChangeListener.remove();
    };
  }, []);

  useEffect(() => {
    if (appTheme === undefined) {
      // storage.set(appThemeKey, defaultTheme)
      setAppTheme(defaultTheme);
    } else {
      setAppTheme(appTheme);
      // storage.set(appThemeKey, appTheme)
    }
  }, [appTheme]);

  return (
    <ThemeProvider value={themeValue}>
      <TamaguiProvider>
        <StatusBar style={statusBarStyle} />
        {children}
      </TamaguiProvider>
    </ThemeProvider>
  );
};
