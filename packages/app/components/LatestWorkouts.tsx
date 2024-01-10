import React, { useEffect } from 'react';
import {
  Card,
  H4,
  Image,
  Paragraph,
  Spinner,
  View,
  VirtualList,
  YStack,
  useThemeName,
  WorkoutCard,
} from '@t4/ui/src';
import LevelRate from '@t4/ui/src/LevelRate';
import { useRouter } from 'solito/router';
import { useAllWorkouts } from 'app/stores';
import { IWorkout } from '@t4/ui/src/modals';

export function LatestWorkouts() {
  const [workouts] = useAllWorkouts();
  const { hasLoaded, data } = workouts;
  const { push } = useRouter();

  //   const themeName = useThemeName();
  //   const headingColor = themeName.includes('dark') ? '$background' : 'white';

  useEffect(() => {
    // getLatestWorkouts().then(response => {
    //   setItems(response);
    //   setIsLoaded(true);
    // });
  }, []);

  if (!hasLoaded) {
    return <Spinner />;
  }

  const renderItem = (item: IWorkout) => {
    return (
      <WorkoutCard
        workout={item}
        onPress={() => {
          push(`/workout/${item.id}`);
        }}
      />
    );
  };

  if (hasLoaded) {
    return (
      <View>
        <VirtualList data={data} renderItem={renderItem}></VirtualList>
      </View>
    );
  }
}
