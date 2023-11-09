import { useWindowDimensions } from 'tamagui';

export type ImageResizeMode = 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';

interface ImageBackgroudProps {
  source: { uri: string };
  width: number;
  height?: number;
  resizeMode: ImageResizeMode;
  children?: any;
}

export const ImageBackground = ({
  source,
  width,
  height,
  resizeMode,
  children,
}: ImageBackgroudProps) => {
  const { width: windowWidth } = useWindowDimensions();

  const backgroundImageStyle = {
    backgroundImage: `url(${source?.uri})`,
    backgroundSize: resizeMode ?? 'cover',
    backgroundPosition: 'center',
    width: width ?? windowWidth,
    height, // Set the desired height
  };

  return <div style={backgroundImageStyle}>{children}</div>;
};
