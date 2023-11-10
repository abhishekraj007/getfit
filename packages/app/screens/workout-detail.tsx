import React from 'react';
import { useParam } from 'app/hooks';
import { useWorkouts } from 'app/stores';
import {
  Spinner,
  View,
  useWindowDimensions,
  YStack,
  H3,
  ImageBackground,
  Paragraph,
  ScrollView,
} from '@t4/ui/src';
import { LinearGradient } from '@tamagui/linear-gradient';
import useAppData from 'app/hooks/useAppData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageHeader, WorkoutWeek } from 'app/components';

export default function WorkoutDetail() {
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
    <YStack>
      <PageHeader image={workoutDetail.image}>
        <H3 color={'$color.blue1Light'}>{workoutDetail.title}</H3>
      </PageHeader>

      <YStack>
        <WorkoutWeek days={7} workoutId={workoutDetail.id} />
      </YStack>
    </YStack>
  );
}
