import { useAppTheme } from 'app/atoms/theme';
import { YStack, YStackProps, useWindowDimensions } from 'tamagui';

interface WhitePage extends YStackProps {}

export function WhitePage({ children, backgroundColor, height, width, ...rest }: YStackProps) {
  const [theme] = useAppTheme();

  const defaultColor = theme === 'dark' ? '$background' : 'white';
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  return (
    <YStack
      width={width ?? windowWidth}
      height={height ?? windowHeight}
      backgroundColor={backgroundColor ?? defaultColor}
      theme={theme}
      {...rest}
    >
      {children}
    </YStack>
  );
}
