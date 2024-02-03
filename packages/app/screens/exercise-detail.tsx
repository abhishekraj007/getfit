import React from 'react';
import { createParam } from 'solito';
import { WorkoutDetailLoader, YStack } from '@t4/ui/src';
import { useRouter } from 'solito/router';
import { ExerciseDetail, PageHeader } from 'app/components';
import { useAllExercises } from 'app/hooks';
import { WhitePage } from 'app/components/Page';
import { IExercise } from '@t4/ui/src/modals';
import { useLanguage } from 'app/provider/language';

const { useParam } = createParam<{ id: string }>();

export default function WorkoutPlay() {
  // useKeepAwake();

  const [exerciseId = ''] = useParam('id');
  const { back, push } = useRouter();
  const { exercisesMap, isLoading } = useAllExercises();
  const { lang } = useLanguage();

  const exercise: IExercise = exercisesMap[exerciseId];

  return (
    <WhitePage>
      <PageHeader image={exercise?.image} hasBackdrop={false} height={400} />

      {isLoading ? (
        <WorkoutDetailLoader />
      ) : (
        <YStack>
          <ExerciseDetail lang={lang} exercise={exercise} hideImage />
        </YStack>
      )}
    </WhitePage>
  );
}
