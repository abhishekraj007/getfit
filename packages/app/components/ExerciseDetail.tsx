import React, { useContext } from 'react';
import { IExercise } from '@t4/ui/src/modals';
import { LanguageContext, useLanguage } from 'app/provider/language';
import { useColors } from 'app/hooks';
import {
  H5,
  Image,
  ImageBackground,
  Paragraph,
  ScrollView,
  YStack,
  useWindowDimensions,
} from '@t4/ui/src';
import { SolitoImage } from 'solito/image';

export function ExerciseDetail({
  exercise,
  hideImage = false,
}: {
  exercise: IExercise;
  hideImage?: boolean;
}) {
  const { lang } = useLanguage();
  const { textPrimary, backgroundColor } = useColors();
  const { width } = useWindowDimensions();

  const { title, title_translated, image, instructions, instructions_translated } = exercise;

  return (
    <YStack padding={0}>
      {/* {!hideImage && <Image width={width} height={300} source={{ uri: image }} alt="" />} */}
      {!hideImage && <SolitoImage width={width} height={220} src={image} alt="" unoptimized />}
      {/* {!hideImage && (
          <ImageBackground
          source={{ uri: image }}
          width={width}
          height={400}
          alt=""
          resizeMode="contain"
          />
        )} */}

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
        </ScrollView>
      </YStack>
    </YStack>
  );
}
