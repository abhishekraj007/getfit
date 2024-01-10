import { NextThemeProvider, ColorScheme } from '@tamagui/next-theme';
import { useAppTheme } from 'app/atoms/theme';
import { TamaguiProvider } from '../tamagui';

export const TamaguiThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [_, setAppTheme] = useAppTheme();

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        setAppTheme(next as ColorScheme);
      }}
    >
      <TamaguiProvider>{children}</TamaguiProvider>
    </NextThemeProvider>
  );
};

export { useRootTheme } from '@tamagui/next-theme';
