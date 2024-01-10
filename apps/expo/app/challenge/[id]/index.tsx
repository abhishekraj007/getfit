import ChallengeDetail from 'app/screens/challenge-detail';
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
      <ChallengeDetail />
    </>
  );
}
