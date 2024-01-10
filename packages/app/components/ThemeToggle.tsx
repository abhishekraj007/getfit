import React from 'react';
import { Platform } from 'react-native';
import AnimatedButton from './AnimatedButton';
import { useAppTheme } from 'app/atoms/theme';
import { useThemeSetting } from '@tamagui/next-theme';
import { ThemeVariant } from 'app/utils/theme';
import { Moon, SunMoon } from '@tamagui/lucide-icons';

export function ThemeToggle() {
  const [theme, setNativeTheme] = useAppTheme();
  const { set: setWebTheme } = useThemeSetting();

  const onThemeToggle = () => {
    const webPlatform = Platform.OS === 'web';
    const nextTheme = theme === ThemeVariant.dark ? ThemeVariant.light : ThemeVariant.dark;
    if (webPlatform) {
      setWebTheme(nextTheme);
    } else {
      setNativeTheme(nextTheme);
    }
  };

  return (
    <AnimatedButton onClick={onThemeToggle}>
      {theme === 'light' ? <SunMoon size={'$1'} /> : <Moon size={'$1'} />}
    </AnimatedButton>
  );
}
