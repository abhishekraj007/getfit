import {
  Card,
  Paragraph,
  YStack,
  Image,
  H4,
  H6,
  H5,
  useWindowDimensions,
  View,
  XStack,
  Text,
} from 'tamagui';
import { ImageBackground } from './ImageBackground';
import { LinearGradient } from '@tamagui/linear-gradient';

interface PlaylistCardProps {
  name: string;
  image: string;
  onPress: () => void;
}
const CARD_GRADIENT_COLOR = ['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)'];

export function PlaylistCard({ onPress, name = '', image = '' }: PlaylistCardProps) {
  const { width } = useWindowDimensions();

  const CARD_HEIGHT = 160;
  const CARD_WIDTH = (width - 32) / 2;
  const BORDER_RADIUS = 8;

  return (
    <View paddingHorizontal={8} paddingVertical={8}>
      <Card
        bordered
        animation="bouncy"
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        hoverStyle={{ opacity: 0.9, scale: 0.99 }}
        pressStyle={{ opacity: 0.9, scale: 0.9 }}
        enterStyle={{
          opacity: 0.9,
          scale: 0.9,
        }}
        exitStyle={{
          opacity: 1,
          scale: 1,
        }}
        onPress={onPress}
        borderRadius={BORDER_RADIUS}
      >
        <ImageBackground
          source={{ uri: image }}
          resizeMode={'cover'}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          borderRadius={BORDER_RADIUS}
        >
          <LinearGradient
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            colors={CARD_GRADIENT_COLOR}
            borderRadius={BORDER_RADIUS}
          >
            <Card.Footer padding={8} paddingHorizontal={12}>
              <Paragraph
                numberOfLines={2}
                // lineBreakMode="tail"
                ellipse
                fontWeight={'bold'}
                fontSize={13}
                color={'white'}
              >
                {name}
              </Paragraph>
            </Card.Footer>
          </LinearGradient>
        </ImageBackground>
      </Card>
    </View>
  );
}
