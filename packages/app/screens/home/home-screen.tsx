import React from 'react';
import { XStack, YStack } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H5, HomeLoader, ScrollView, Text, useWindowDimensions } from '@t4/ui/src';
import { LanguageSelect, ThemeToggle, WorkoutList } from 'app/components';
import { ListType } from '@t4/ui/src/modals';
import { useAllExercises, useAllWorkouts, useAssets, useSections } from 'app/hooks/useData';
import { useAppTheme } from 'app/atoms/theme';
import { APP_NAME, PAGE_HEADER_HEIGHT_WITHOUT_BACKGROUND } from 'app/constants';
import { useLanguage } from 'app/provider/language';
import { ReviewApp } from 'app/components/ReviewApp';
import { ShareApp } from 'app/components/ShareApp';
import { GenderSelect } from 'app/components/GenderSelect';

export function HomeScreen() {
  const { isLoading, sections, isError, refetch, isSuccess } = useSections();
  const [theme] = useAppTheme();
  const { lang } = useLanguage();
  const { height } = useWindowDimensions();

  // Pre-load assets
  useAssets();

  // pre-load workouts and exercises
  // useAllWorkouts();
  // useAllExercises();

  console.log({ isError, sections });

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
            <ReviewApp />
            <ShareApp />
            <GenderSelect />
          </XStack>
        </XStack>

        {(isError && !isLoading) ||
          (isSuccess && !sections?.length && (
            <YStack
              height={height - PAGE_HEADER_HEIGHT_WITHOUT_BACKGROUND}
              alignItems="center"
              justifyContent="center"
            >
              <Text>Check your network</Text>
              <Button
                size="$3"
                themeInverse
                onPress={() => {
                  refetch();
                }}
                marginTop={16}
              >
                Try again
              </Button>
            </YStack>
          ))}

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
      {/* <BannerAd
          size={BannerAdSize.FULL_BANNER}
          unitId={adIdHomeBanner}
          // requestOptions={{
          //   requestNonPersonalizedAdsOnly: true,
          // }}
        /> */}
    </SafeAreaView>
  );
}
