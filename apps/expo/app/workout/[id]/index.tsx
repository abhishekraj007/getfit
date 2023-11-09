import WorkoutDetail from 'app/features/workout-detail';
import { Stack } from 'expo-router';

export default function Page() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Workout details',
          headerShown: false,
        }}
      />
      <WorkoutDetail />
    </>
  );
}
