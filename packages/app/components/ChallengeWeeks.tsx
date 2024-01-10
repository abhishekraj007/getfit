import React from 'react';
import { XStack, Card, H5, useWindowDimensions, ScrollView } from '@t4/ui/src';
import { useRouter } from 'solito/router';
import { useAllChallenges } from 'app/hooks';
import { ArrowRight, ChevronRight } from '@tamagui/lucide-icons';

export function ChallengeWeeks({ days, challengeId }) {
  const { push } = useRouter();
  const { width } = useWindowDimensions();
  const totalDays = Array.from(Array(days).keys());

  const { challengesMap } = useAllChallenges();

  const challengeDetails = challengesMap[challengeId];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {totalDays.map((day) => {
        const hasExercises = challengeDetails[`day_${day + 1}`]?.length;

        return (
          <Card
            key={day}
            padded
            bordered
            scale={1}
            width={width}
            animation="bouncy"
            hoverStyle={{ scale: 0.99, opacity: 0.95 }}
            pressStyle={{ scale: 0.96, opacity: 0.9 }}
            enterStyle={{ scale: 0.99, opacity: 0.95 }}
            exitStyle={{ scale: 1, opacity: 1 }}
            onPress={() => {
              if (hasExercises) {
                push({
                  pathname: `/challenge/${challengeId}/exercises`,
                  query: {
                    day: day + 1,
                  },
                });
              }
            }}
          >
            <XStack justifyContent="space-between">
              <H5>{`Day ${day + 1}`}</H5>

              {!hasExercises ? (
                <H5 fontSize={10} opacity={0.5}>
                  Rest Day
                </H5>
              ) : (
                <ChevronRight opacity={0.3} />
              )}
            </XStack>
          </Card>
        );
      })}
    </ScrollView>
  );
}
