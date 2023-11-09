import React from 'react';
import useAppData from 'app/hooks/useAppData';
import { SolitoImage } from 'solito/image';
import { createParam } from 'solito';
import { useExercises } from 'app/stores';
import { H3, YStack, Text, Card } from '@t4/ui/src';

const { useParam } = createParam<{ id: string }>();

export default function ExerciseDetail() {
  useAppData();

  const [id = ''] = useParam('id');

  const [exercises] = useExercises();

  const { flatData } = exercises;

  const details = flatData?.[id];

  return (
    <YStack padding="$5" paddingTop="$8" height={'100%'}>
      <YStack>
        <Card>
          <SolitoImage src={details?.image ?? ''} width={200} height={200} unoptimized alt="" />
        </Card>
        <H3>{details?.title}</H3>
      </YStack>
    </YStack>
  );
}
