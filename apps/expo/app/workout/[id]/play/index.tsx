import WorkoutPlay from 'app/screens/workout-play';
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
