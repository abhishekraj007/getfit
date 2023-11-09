import React from 'react';
import {
  View,
  VirtualList,
  XStack,
  Text,
  Card,
  H5,
  H6,
  H4,
  useWindowDimensions,
  ScrollView,
} from '@t4/ui/src';
import { useRouter } from 'solito/router';

export function WorkoutWeek({ days, workoutId }) {
  const { push } = useRouter();
  const { width } = useWindowDimensions();
  const totalDays = Array.from(Array(10).keys());

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {totalDays.map((day) => {
        return (
          <Card
            key={day}
            padded
            bordered
            // scale={0.95}
            width={width}
            // animation="bouncy"
            hoverStyle={{ scale: 0.99, opacity: 0.95 }}
            pressStyle={{ scale: 0.96, opacity: 0.9 }}
            exitStyle={{ scale: 1, opacity: 1 }}
            onPress={() => {
              push(`/workout/${workoutId}/exercises`);
            }}
          >
            <XStack>
              <H5>{`Day ${day + 1}`}</H5>
            </XStack>
          </Card>
        );
      })}
    </ScrollView>
  );
}
