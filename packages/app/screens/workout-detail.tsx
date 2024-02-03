import React, { useTransition } from 'react';
import { useColors, useParam } from 'app/hooks';
import { YStack, H3, Paragraph, XStack, Card, WorkoutDetailLoader } from '@t4/ui/src';
import { Exercises, PageHeader } from 'app/components';
import { useExercisesByWorkoutId } from 'app/hooks/useData';
import { useRouter } from 'solito/router';
import { PersonStanding, Timer } from '@tamagui/lucide-icons';
import { useAppTheme } from 'app/atoms/theme';
import { useLanguage, useTranslation } from 'app/provider/language';
import { useWorktouAtom } from 'app/atoms/workouts';
import { WhitePage } from 'app/components/Page';

export default function WorkoutDetail() {
  const [workoutId = ''] = useParam('id');
  const { push } = useRouter();
  const { workoutDetail, exercises, isLoading } = useExercisesByWorkoutId(workoutId);

  const { backgroundColor, headerColor, paragraphColor } = useColors();
  const [theme] = useAppTheme();
  const { lang } = useLanguage();
  const { updatedSelectedWorkout } = useWorktouAtom();
  const translation = useTranslation();

  console.log({ exercises });

  return (
    <WhitePage userSelect="none">
      <PageHeader image={workoutDetail?.image} onBack={() => push('/')} />

      {isLoading ? (
        <WorkoutDetailLoader theme={theme} />
      ) : (
        <YStack
          position="relative"
          borderRadius={30}
          marginTop={-30}
          padding={24}
          paddingHorizontal={28}
          backgroundColor={backgroundColor}
        >
          <YStack marginBottom={20}>
            <H3 numberOfLines={1} ellipsizeMode="tail" color={headerColor} marginBottom={'$2'}>
              {workoutDetail?.name_translated?.[lang] ?? workoutDetail?.name}
            </H3>
            <Paragraph
              lineHeight={22}
              numberOfLines={2}
              ellipsizeMode="tail"
              color={paragraphColor}
            >
              {workoutDetail?.description_translated?.[lang] ?? workoutDetail?.description}
            </Paragraph>
            <XStack marginTop={14} space>
              <Card padding={'$2'} paddingHorizontal={'$2.5'} borderRadius={8} theme={'blue'}>
                <XStack>
                  <Timer />
                  <Paragraph marginLeft={8}>{workoutDetail?.duration}</Paragraph>
                </XStack>
              </Card>
              <Card padding={'$2'} paddingHorizontal={'$2.5'} borderRadius={8} theme={'orange'}>
                <XStack>
                  <PersonStanding />
                  <Paragraph marginLeft={8}>
                    {(exercises ?? []).length} {translation?.exercises}
                  </Paragraph>
                </XStack>
              </Card>
            </XStack>
          </YStack>
          <Exercises
            exercises={exercises}
            onStart={() => {
              push(`/workout/${workoutId}/play`);
              updatedSelectedWorkout(workoutId);
            }}
          />
        </YStack>
      )}
    </WhitePage>
  );
}
