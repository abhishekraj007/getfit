import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeVariant } from 'app/utils/theme';
import { useAppTheme } from 'app/atoms/theme';
import { TamaguiProvider } from '../tamagui';
export const TamaguiThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [appTheme] = useAppTheme();

  const statusBarStyle = appTheme === ThemeVariant.dark ? ThemeVariant.light : ThemeVariant.dark;
  const themeValue = appTheme === ThemeVariant.dark ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={themeValue}>
      <TamaguiProvider>
        <StatusBar style={statusBarStyle} />
        {children}
      </TamaguiProvider>
    </ThemeProvider>
  );
};
