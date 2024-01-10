import { Card, Spinner, ThemeName, View, XStack, YStack, useWindowDimensions } from 'tamagui';
import { Skeleton } from 'moti/skeleton';
import { CARD_WORKOUT_HEIGHT, CARD_WORKOUT_WIDTH } from './constant';

interface LoaderProps {
  theme?: 'light' | 'dark';
}

export const WorkoutLoader = ({ theme = 'light' }: LoaderProps) => {
  return (
    <YStack padding={'$2'} paddingVertical={'$4'} space>
      <Skeleton colorMode={theme} height={20} width={CARD_WORKOUT_WIDTH} />
      <XStack space justifyContent="space-between">
        <Skeleton colorMode={theme} height={CARD_WORKOUT_HEIGHT} width={CARD_WORKOUT_WIDTH} />
        <Skeleton colorMode={theme} height={CARD_WORKOUT_HEIGHT} width={120} />
      </XStack>
    </YStack>
  );
};

export const HomeLoader = ({ theme = 'light' }: LoaderProps) => {
  return (
    <>
      <WorkoutLoader theme={theme} />
      <WorkoutLoader theme={theme} />
      <WorkoutLoader theme={theme} />
    </>
  );
};

export const MusicLoader = ({ theme = 'light' }: LoaderProps) => {
  const { width } = useWindowDimensions();
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      {rows.map((row) => {
        return (
          <View key={row} paddingHorizontal={'$4'} paddingVertical={'$1'}>
            <Skeleton colorMode={theme} height={40} width={width - 40} />
          </View>
        );
      })}
    </>
  );
};

export const WorkoutDetailLoader = ({ theme = 'light' }: LoaderProps) => {
  const { width } = useWindowDimensions();

  return (
    <>
      <YStack padding={'$4'} space>
        <Skeleton colorMode={theme} height={20} width={200} />
        <Skeleton colorMode={theme} height={20} width={250} />

        <XStack space>
          <Skeleton colorMode={theme} height={20} width={80} />
          <Skeleton colorMode={theme} height={20} width={80} />
        </XStack>
        <Skeleton colorMode={theme} height={80} width={width - 40} />
        <Skeleton colorMode={theme} height={80} width={width - 40} />
        <Skeleton colorMode={theme} height={80} width={width - 40} />
        <Skeleton colorMode={theme} height={80} width={width - 40} />
      </YStack>
    </>
  );
};
