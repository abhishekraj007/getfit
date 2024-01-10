import ChallengeExercises from 'app/screens/challenge-exercises';
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
      <ChallengeExercises />
    </>
  );
}
