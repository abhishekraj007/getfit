import { ThemeName, View, XStack, YStack, useWindowDimensions } from 'tamagui';
import { Skeleton } from 'moti/skeleton';
import { CARD_WORKOUT_HEIGHT, CARD_WORKOUT_WIDTH } from './constant';

interface LoaderProps {
  theme: 'light' | 'dark';
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
