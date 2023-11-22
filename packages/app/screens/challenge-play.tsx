import React, { useEffect, useRef, useState } from 'react';
import { createParam } from 'solito';
import {
  useWindowDimensions,
  Spinner,
  View,
  ScrollView,
  PageSlider,
  YStack,
  AlertDialog,
  Button,
  XStack,
  Text,
} from '@t4/ui/src';
import { useKeepAwake } from 'expo-keep-awake';
import { BackHandler } from 'react-native';
import { useRouter } from 'solito/router';
import { ExerciseTimer, ExitModal, PageHeader } from 'app/components';
import { useExercisesByChallengeId, useExercisesByWorkoutId, useParam } from 'app/hooks';
import { IExercise } from '@t4/ui/src/modals';
import { WhitePage } from '@t4/ui/src/Page';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';

export default function ChallengePlay() {
  // useKeepAwake();
  const [challengeId = ''] = useParam('id');
  const [day] = useParam('day', {
    parse: (day) => day,
    initial: 1,
  });

  const { back } = useRouter();

  const { isLoading, exercises } = useExercisesByChallengeId(challengeId, day);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showExitAlert, setShowExitAlert] = useState(false);

  const exercisesLength = exercises?.length || 0;

  const actionButton = () => {
    return (
      <XStack
        // position="absolute"
        // height={BOTTOM_SHEET_HEIGHT}
        justifyContent="space-between"
        padding="$4"
        backgroundColor={'red'}
        // height={0}
      >
        <Button
          accessibilityLabel="Carousel left"
          icon={ArrowLeft}
          size="$6"
          circular
          // onPress={() => {
          //   paginate(-1);
          //   onPrev && onPrev();
          // }}
          // disabled={backButtonDisabled}
          // color={`${backButtonDisabled ? '$color.gray10Light' : ''}`}
          // position="absolute"
          // left={'$6'}
          // bottom={'$6'}
        />

        <Button
          accessibilityLabel="Carousel right"
          icon={ArrowRight}
          size="$6"
          circular
          // onPress={() => {
          //   paginate(1);
          //   onNext && onNext();
          // }}
          // disabled={nextButtonDisabled}
          // color={`${nextButtonDisabled ? '$color.gray10Light' : ''}`}
          // position="absolute"
          // right={'$6'}
          // bottom={'$6'}
        />
      </XStack>
    );
  };

  const renderItem = (item: IExercise, pageNumber) => {
    return (
      <ExerciseTimer
        exercise={item}
        stop={isPlaying}
        currentPage={pageNumber}
        lastPage={exercisesLength - 1}
        totalItems={exercisesLength}
        actions={actionButton()}
      />
    );
  };

  const stopPlaying = () => {
    setIsPlaying(false);
  };

  return (
    <WhitePage>
      {/* Image Backround: Header, Nav */}

      <PageHeader onBack={() => setShowExitAlert(true)} />

      {showExitAlert && (
        <ExitModal
          open={showExitAlert}
          onConfirm={() => back()}
          onCancel={() => setShowExitAlert(false)}
        />
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <PageSlider
          data={exercises}
          renderItem={renderItem}
          onNext={stopPlaying}
          onPrev={stopPlaying}
        />
      )}
    </WhitePage>
  );
}
