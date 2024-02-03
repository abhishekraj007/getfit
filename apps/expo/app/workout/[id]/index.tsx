import WorkoutDetail from 'app/screens/workout-detail';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Page() {
  return (
    <>
      <StatusBar style="light" />
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
