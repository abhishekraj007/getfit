import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DocumentData } from 'firebase/firestore'
import { fetchWorkouts } from '@t4/api/index'
import { YStack } from '@t4/ui/src'

export default function ExerciseList() {
  const [workouts, setWorkouts] = useState<DocumentData[]>()

  useEffect(() => {
    const getWorkouts = async () => {
      const data = await fetchWorkouts()

      setWorkouts(data)
    }

    getWorkouts()
  }, [])

  return (
    <YStack height={'100%'} display="flex" alignItems="center" justifyContent="center">
      {workouts ? (
        <View>
          {workouts.map((workout) => {
            return <Text key={workout.id}>{workout.title}</Text>
          })}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </YStack>
  )
}
