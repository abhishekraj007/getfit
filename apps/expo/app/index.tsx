import { FloatingMusicButton } from 'app/components';
import { HomeScreen } from 'app/screens/home/home-screen';
import { Stack } from 'expo-router';

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <HomeScreen />
      <FloatingMusicButton />
    </>
  );
}
