import WorkoutExercises from 'app/features/workout-exercises';
import { Stack } from 'expo-router';

export default function Page() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Workout Exercises',
          headerShown: false,
        }}
      />
      <WorkoutExercises />
    </>
  );
}
