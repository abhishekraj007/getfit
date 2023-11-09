import WorkoutPlay from 'app/features/workout-play';
import { Stack } from 'expo-router';

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Workout Play',
          headerShown: false,
        }}
      />
      <WorkoutPlay />
    </>
  );
}
