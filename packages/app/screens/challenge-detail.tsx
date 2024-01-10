import React from 'react';
import { useParam } from 'app/hooks';
import { Spinner, YStack, H3 } from '@t4/ui/src';
import { PageHeader, ChallengeWeeks } from 'app/components';
import { useAllChallenges } from 'app/hooks/useData';

export default function ChallengeDetail() {
  const [challengeId = ''] = useParam('id');
  const { isLoading, challengesMap } = useAllChallenges();

  const challengeDetails = challengesMap[challengeId];

  return (
    <YStack>
      <PageHeader image={challengeDetails?.image} title="7X4 Challenge">
        <H3 color={'$color.blue1Light'}>{challengeDetails?.name}</H3>
      </PageHeader>

      {isLoading ? (
        <Spinner />
      ) : (
        <YStack>
          <ChallengeWeeks days={7} challengeId={challengeDetails.id} />
        </YStack>
      )}
    </YStack>
  );
}
