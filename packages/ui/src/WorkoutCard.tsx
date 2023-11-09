import { Card, Paragraph, YStack, Image, H4, H6, H5 } from 'tamagui';
import { IWorkout } from './modals';
import LevelRate from './LevelRate';
import { ImageBackground } from './ImageBackground';
import { LinearGradient } from '@tamagui/linear-gradient';

interface WorkoutCardProps {
  workout: IWorkout;
  onPress: () => void;
  isLast?: boolean;
}
const CARD_GRADIENT_COLOR = ['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.5)'];

export function WorkoutCard({ workout, onPress, isLast = false }: WorkoutCardProps) {
  const CARD_WIDTH = 220;
  const CARD_HEIGHT = 140;
  const RADIUS = 8;

  return (
    <Card
      bordered
      animation="bouncy"
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      // scale={0.95}
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
      marginRight={isLast ? 0 : 12}
      borderRadius={RADIUS}
    >
      <ImageBackground
        source={{ uri: workout.image }}
        resizeMode={'cover'}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        borderRadius={RADIUS}
      >
        <LinearGradient
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          colors={CARD_GRADIENT_COLOR}
          borderRadius={8}
        >
          <Card.Header padded>{/* <LevelRate rate={workout.rate} /> */}</Card.Header>
          <Card.Footer padded>
            <YStack>
              <Paragraph fontSize={12} color={'$color.gray5Light'}>
                {workout.duration}
              </Paragraph>
              <H5 fontWeight={'bold'} fontSize={13} color={'white'}>
                {workout.title}
              </H5>
            </YStack>
          </Card.Footer>
        </LinearGradient>
      </ImageBackground>
    </Card>
  );
}
