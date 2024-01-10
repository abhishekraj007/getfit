import ChallengePlay from 'app/screens/challenge-play';
import { Stack } from 'expo-router';

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Challenge Play',
          headerShown: false,
        }}
      />
      <ChallengePlay />
    </>
  );
}
