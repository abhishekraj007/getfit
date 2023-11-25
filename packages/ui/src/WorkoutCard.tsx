import { Card, Paragraph, YStack, Image, H4, H6, H5 } from 'tamagui';
import { IChallenge, IWorkout } from './modals';
import LevelRate from './LevelRate';
import { ImageBackground } from './ImageBackground';
import { LinearGradient } from '@tamagui/linear-gradient';
import { CARD_WORKOUT_HEIGHT, CARD_WORKOUT_RADIUS, CARD_WORKOUT_WIDTH } from './constant';

interface WorkoutCardProps {
  workout: IWorkout | IChallenge;
  onPress: () => void;
  isLast?: boolean;
}
const CARD_GRADIENT_COLOR = ['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.1)'];

export function WorkoutCard({ workout, onPress, isLast = false }: WorkoutCardProps) {
  const { isChallenge, name, duration } = workout;

  return (
    <Card
      bordered
      animation="bouncy"
      width={CARD_WORKOUT_WIDTH}
      height={CARD_WORKOUT_HEIGHT}
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
      borderRadius={CARD_WORKOUT_RADIUS}
    >
      <ImageBackground
        source={{ uri: workout.image ?? '' }}
        resizeMode={'cover'}
        width={CARD_WORKOUT_WIDTH}
        height={CARD_WORKOUT_HEIGHT}
        borderRadius={CARD_WORKOUT_RADIUS}
      >
        <LinearGradient
          width={CARD_WORKOUT_WIDTH}
          height={CARD_WORKOUT_HEIGHT}
          colors={CARD_GRADIENT_COLOR}
          borderRadius={8}
        >
          <Card.Footer padded paddingBottom={14}>
            <YStack>
              <Paragraph fontSize={12} color={'$color.gray5Light'}>
                {isChallenge ? '7 X 4 Challenge' : duration}
              </Paragraph>
              <H5 fontWeight={'bold'} fontSize={13} color={'white'}>
                {name}
              </H5>
            </YStack>
          </Card.Footer>
        </LinearGradient>
      </ImageBackground>
    </Card>
  );
}
