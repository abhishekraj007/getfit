import React from 'react';
import { useParam } from 'app/hooks';
import { useWorkouts } from 'app/stores';
import { Spinner, View, useWindowDimensions, YStack, H3, ImageBackground } from '@t4/ui/src';
import { LinearGradient } from '@tamagui/linear-gradient';
import useAppData from 'app/hooks/useAppData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WhitePage } from '@t4/ui/src/Page';
import { Exercises, PageHeader } from 'app/components';

export default function WorkoutExercises() {
  useAppData();
  const [workoutId = ''] = useParam('id');
  const [workouts] = useWorkouts();
  const { flatData, hasLoaded } = workouts;
  const workoutDetail = flatData?.[workoutId];
  const { width } = useWindowDimensions();

  if (!hasLoaded || !workoutDetail) {
    return <Spinner />;
  }

  return (
    <WhitePage>
      <PageHeader image={workoutDetail.image}>
        <H3 color={'$color.blue1Light'}>{workoutDetail.title}</H3>
      </PageHeader>

      <Exercises workoutId={workoutId} />
    </WhitePage>
  );
}
