import React from 'react';
import { XStack, YStack, H4 } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Spinner } from '@t4/ui/src';
import { ThemeToggle, WorkoutList } from 'app/components';
import { ListType } from '@t4/ui/src/modals';
import { useSections } from 'app/hooks/useData';

export function HomeScreen() {
  const { isLoading, sections } = useSections();

  return (
    <SafeAreaView>
      <YStack padding="$4" height={'100%'}>
        <XStack
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          paddingBottom={'$3'}
        >
          <H4>App Name</H4>
          <ThemeToggle />
        </XStack>

        {isLoading ? (
          <Spinner />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {sections?.map((section) => {
              if (section.type === ListType.challenge) {
                // Remove challenges for now
                return null;
                // return (
                //   <WorkoutList key={section.id} data={section.challenges} title={section.name} />
                // );
              }
              return <WorkoutList key={section.id} data={section.workouts} title={section.name} />;
            })}
          </ScrollView>
        )}
      </YStack>
    </SafeAreaView>
  );
}
