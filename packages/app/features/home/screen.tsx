import React from 'react'
import { XStack, YStack } from 'tamagui'
import ThemeToggle from 'app/components/ThemeToggle'
import ExerciseList from 'app/components/Excercise/List'

export function HomeScreen() {
  return (
    <YStack padding="$5" paddingTop="$8" height={'100%'}>
      <XStack display="flex" alignItems="center" justifyContent="flex-end" space="$4">
        <ThemeToggle />
      </XStack>

      <ExerciseList />
    </YStack>
  )
}
