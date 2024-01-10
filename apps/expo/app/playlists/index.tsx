import Playlists from 'app/screens/playlists';
import { Stack } from 'expo-router';

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Playlists',
          headerShown: false,
        }}
      />
      <Playlists />
    </>
  );
}
