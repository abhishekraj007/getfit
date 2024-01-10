import ExerciseDetail from 'app/screens/exercise-detail';
import { Stack } from 'expo-router';

export default function Page() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Exercise details',
          headerShown: false,
        }}
      />
      <ExerciseDetail />
    </>
  );
}
