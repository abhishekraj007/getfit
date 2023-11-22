import React from 'react';
import { useColors, useParam } from 'app/hooks';
import { Spinner, YStack, H3, Paragraph, XStack, H5, Card } from '@t4/ui/src';
import { Exercises, PageHeader } from 'app/components';
import { useExercisesByWorkoutId } from 'app/hooks/useData';
import { useRouter } from 'solito/router';
import { WhitePage } from '@t4/ui/src/Page';
import { PersonStanding, Timer } from '@tamagui/lucide-icons';

export default function WorkoutDetail() {
  const [workoutId = ''] = useParam('id');
  const { push } = useRouter();
  const { workoutDetail, exercises, isLoading } = useExercisesByWorkoutId(workoutId);

  const { backgroundColor, headerColor, paragraphColor } = useColors();

  return (
    <WhitePage userSelect="none">
      <PageHeader image={workoutDetail?.image}></PageHeader>

      {isLoading ? (
        <Spinner />
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
              {workoutDetail?.name}
            </H3>
            <Paragraph
              lineHeight={22}
              numberOfLines={2}
              ellipsizeMode="tail"
              color={paragraphColor}
            >
              {workoutDetail?.description}
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
                  <Paragraph marginLeft={8}>{(exercises ?? []).length} Exercises</Paragraph>
                </XStack>
              </Card>
            </XStack>
          </YStack>
          <Exercises
            exercises={exercises}
            onStart={() => {
              push(`/workout/${workoutId}/play`);
            }}
          />
        </YStack>
      )}
    </WhitePage>
  );
}
