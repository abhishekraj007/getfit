import React, { useEffect } from 'react';
import { XStack, YStack, H3, H4 } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H5, ScrollView } from '@t4/ui/src';
import { ThemeToggle, WorkoutList } from 'app/components';
import useAppData from 'app/hooks/useAppData';
import { LatestWorkouts } from 'app/components/LatestWorkouts';
// import Swiper from '@t4/ui/src/Swiper';

export function HomeScreen() {
  const { workouts } = useAppData();

  return (
    <SafeAreaView>
      <YStack padding="$4" height={'100%'}>
        <XStack
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          paddingBottom={'$3'}
          // backgroundColor={'red'}
        >
          <H4>App Name</H4>
          <ThemeToggle />
        </XStack>

        <ScrollView showsVerticalScrollIndicator={false}>
          <WorkoutList data={workouts?.data} title="Beast workout" />
          <WorkoutList data={workouts?.data} title="Abs workout" />
          <WorkoutList data={workouts?.data} title="Abs workout" />
          <WorkoutList data={workouts?.data} title="Abs workout" />
          <WorkoutList data={workouts?.data} title="Abs workout" />
          <WorkoutList data={workouts?.data} title="Abs workout" />
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
}
