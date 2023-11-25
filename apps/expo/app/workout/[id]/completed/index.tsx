import Completed from 'app/screens/completed';
import { Stack } from 'expo-router';

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Completed',
          headerShown: false,
        }}
      />
      <Completed />
    </>
  );
}
