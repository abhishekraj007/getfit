import { IExercise } from '@t4/ui/src/modals';
import { YStack, XStack, useWindowDimensions, Button, ScrollView } from '@t4/ui/src';
import { useTranslation } from 'app/provider/language';
import { ExerciseCard } from './ExerciseCard';

export function Exercises({ exercises, onStart }: { exercises: IExercise[]; onStart }) {
  const { height } = useWindowDimensions();
  const translation = useTranslation();

  return (
    <YStack position="relative">
      <ScrollView showsVerticalScrollIndicator={false} height={height - 500}>
        {exercises.map((item) => (
          <ExerciseCard key={item.id} item={item} />
        ))}
      </ScrollView>

      <XStack position="relative" justifyContent="center" bottom={-25} borderRadius={'$5'}>
        <Button
          size="$6"
          themeInverse
          width={280}
          pressStyle={{ scale: 0.96, opacity: 0.9 }}
          onPress={onStart}
          borderRadius={50}
        >
          {translation?.start}
        </Button>
      </XStack>
    </YStack>
  );
}
