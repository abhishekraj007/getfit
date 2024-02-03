import PlaylistDetails from 'app/screens/playlists-details';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Screen() {
  return (
    <>
      <StatusBar style="light" />
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
