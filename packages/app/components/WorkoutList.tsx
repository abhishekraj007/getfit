import React from 'react';
import { H5, ScrollView, Spinner, WorkoutCard, YStack } from '@t4/ui/src';
import { useRouter } from 'solito/router';
import { IWorkout } from '@t4/ui/src/modals';

interface WorkoutListProps {
  title: string;
  data: IWorkout[];
  isLoading?: boolean;
}

export function WorkoutList({ data, title, isLoading }: WorkoutListProps) {
  const { push } = useRouter();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <YStack marginVertical={'$3'}>
      <H5 fontSize={12} marginBottom={'$2'}>
        {title}
      </H5>
      <ScrollView
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        {data.map((item, index) => {
          return (
            <WorkoutCard
              key={item.id}
              isLast={data.length - 1 === index}
              workout={item}
              onPress={() => {
                push(`/workout/${item.id}`);
              }}
            />
          );
        })}
      </ScrollView>
    </YStack>
  );
}
