import React from 'react';
import { H5, ScrollView, Spinner, WorkoutCard, YStack } from '@t4/ui/src';
import { useRouter } from 'solito/router';
import { IChallenge, IWorkout } from '@t4/ui/src/modals';
import { useLanguage } from 'app/provider/language';

interface WorkoutListProps {
  title: string;
  data: IWorkout[] | IChallenge[] | undefined;
}

export function WorkoutList({ data = [], title }: WorkoutListProps) {
  const { push } = useRouter();
  const { lang } = useLanguage();

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
        {data.map((item: IWorkout | IChallenge, index) => {
          return (
            <WorkoutCard
              key={item?.id}
              isLast={data.length - 1 === index}
              name={(item?.name_translated ? item?.name_translated[lang] : item?.name) || ''}
              image={item?.image}
              isChallenge={item?.isChallenge || false}
              duration={item?.duration || ''}
              onPress={() => {
                push(`/${item?.isChallenge ? 'challenge' : 'workout'}/${item?.id}`);
              }}
            />
          );
        })}
      </ScrollView>
    </YStack>
  );
}
