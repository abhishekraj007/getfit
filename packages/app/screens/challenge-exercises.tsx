import React from 'react';
import { useParam } from 'app/hooks';
import { Spinner, YStack, H3 } from '@t4/ui/src';
import { Exercises, PageHeader } from 'app/components';
import { useAllChallenges, useAllExercises, useExercisesByChallengeId } from 'app/hooks/useData';
import { IChallenge, IExercise } from '@t4/ui/src/modals';
import { useRouter } from 'solito/router';
import { WhitePage } from 'app/components/Page';

export default function WorkoutExercises() {
  const [challengeId = ''] = useParam('id');
  const [day] = useParam('day', {
    parse: (day) => day,
    initial: 1,
  });

  const { push } = useRouter();

  const { isLoading, challengeDetail, exercises } = useExercisesByChallengeId(challengeId, day);

  return (
    <WhitePage>
      <PageHeader image={challengeDetail?.image}>
        <H3 color={'$color.blue1Light'}>{challengeDetail?.name}</H3>
      </PageHeader>

      {isLoading ? (
        <Spinner />
      ) : (
        <YStack>
          <Exercises
            exercises={exercises}
            onStart={() => {
              // push(`/challenge/${challengeId}/play`);

              push({
                pathname: `/challenge/${challengeId}/play`,
                query: {
                  day,
                },
              });
            }}
          />
        </YStack>
      )}
    </WhitePage>
  );
}
