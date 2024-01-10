import React from 'react';
import { XStack, YStack, H4 } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H5, HomeLoader, ScrollView } from '@t4/ui/src';
import { LanguageSelect, ThemeToggle, WorkoutList } from 'app/components';
import { ListType } from '@t4/ui/src/modals';
import { useSections } from 'app/hooks/useData';
import { useAppTheme } from 'app/atoms/theme';
import { APP_NAME } from 'app/constants';
import { useLanguage } from 'app/provider/language';

export function HomeScreen() {
  const { isLoading, sections } = useSections();
  const [theme] = useAppTheme();
  const { lang } = useLanguage();

  return (
    <SafeAreaView>
      <YStack padding="$4" height={'100%'}>
        <XStack
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          paddingBottom={'$3'}
        >
          <H5 fontWeight={'bold'}>{APP_NAME}</H5>

          <XStack space>
            <ThemeToggle />
            <LanguageSelect />
          </XStack>
        </XStack>

        {isLoading ? (
          <HomeLoader theme={theme} />
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
              return (
                <WorkoutList
                  key={section.id}
                  data={section.workouts}
                  title={
                    section.name_translated
                      ? section.name_translated[lang] ?? ''
                      : section.name ?? ''
                  }
                />
              );
            })}
          </ScrollView>
        )}
      </YStack>
    </SafeAreaView>
  );
}
