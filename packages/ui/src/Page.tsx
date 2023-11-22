import { YStack, YStackProps, useThemeName, useWindowDimensions } from 'tamagui';

interface WhitePage extends YStackProps {}

export function WhitePage({ children, backgroundColor, height, width, ...rest }: YStackProps) {
  const themeName = useThemeName();
  const defaultColor = themeName.includes('dark') ? '$background' : 'white';
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  return (
    <YStack
      width={width ?? windowWidth}
      height={height ?? windowHeight}
      backgroundColor={backgroundColor ?? defaultColor}
      {...rest}
    >
      {children}
    </YStack>
  );
}
