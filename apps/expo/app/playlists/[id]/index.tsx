import PlaylistDetails from 'app/screens/playlists-details';
import { Stack } from 'expo-router';

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Music',
          headerShown: false,
        }}
      />
      <PlaylistDetails />
    </>
  );
}
