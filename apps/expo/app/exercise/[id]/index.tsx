import { View, Text } from '@t4/ui/src';
import ExerciseDetail from 'app/screens/exercise-detail';
import { Stack } from 'expo-router';

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Exercise Details',
        }}
      />
      <ExerciseDetail />
    </>
  );
}
