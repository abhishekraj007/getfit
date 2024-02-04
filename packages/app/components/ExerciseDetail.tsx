import React from 'react';
import { IExercise } from '@t4/ui/src/modals';
import { useColors } from 'app/hooks';
import { H5, Paragraph, ScrollView, View, YStack, useWindowDimensions } from '@t4/ui/src';
import { SolitoImage } from 'solito/image';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { AD_IDS } from 'app/constants';

const adIdHomeBanner = __DEV__ ? TestIds.BANNER : AD_IDS.BANNER_EXERCISE_DETAIL_SCREEN;

export function ExerciseDetail({
  exercise,
  hideImage = false,
  lang,
}: {
  exercise: IExercise;
  hideImage?: boolean;
  lang: string;
}) {
  const { textPrimary } = useColors();
  const { width } = useWindowDimensions();

  const { title, title_translated, image, instructions, instructions_translated } = exercise;

  return (
    <YStack padding={0} paddingBottom={50}>
      {/* {!hideImage && (
        <Image
          width={'100%'}
          height={200}
          source={{ width: 200, height: 200, uri: image }}
          alt=""
        />
      )} */}
      {!hideImage && (
        <SolitoImage
          width={width}
          height={300}
          src={image}
          alt=""
          resizeMode="contain"
          unoptimized
        />
      )}

      <YStack
        paddingHorizontal={'$4'}
        paddingVertical={'$2'}
        // alignContent="space-between"
        flex={1}
      >
        <H5 userSelect="none" color={textPrimary} marginBottom={'$3'}>
          {title_translated?.[lang] ?? title}
        </H5>
        <ScrollView>
          <Paragraph userSelect="none">{instructions_translated?.[lang] ?? instructions}</Paragraph>

          <View marginTop={16}>
            <BannerAd
              size={BannerAdSize.MEDIUM_RECTANGLE}
              unitId={adIdHomeBanner}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
        </ScrollView>
      </YStack>
    </YStack>
  );
}
