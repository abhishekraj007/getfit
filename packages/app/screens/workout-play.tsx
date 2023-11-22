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
import { useExercisesByWorkoutId } from 'app/hooks';
import { IExercise } from '@t4/ui/src/modals';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from '@tamagui/lucide-icons';
import { WhitePage } from '@t4/ui/src/Page';

const { useParam } = createParam<{ id: string }>();

export default function WorkoutPlay() {
  // useKeepAwake();

  const [workoutId = ''] = useParam('id');
  const { back } = useRouter();
  const { exercises, isLoading } = useExercisesByWorkoutId(workoutId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showExitAlert, setShowExitAlert] = useState(false);

  const exercisesLength = exercises?.length || 0;

  const leftButton = (onPrev, pageNumber) => {
    const buttonDisabled = pageNumber === 0;
    return (
      <Button
        accessibilityLabel="Carousel left"
        icon={ChevronLeft}
        size="$10"
        // circular
        chromeless
        padding={'$3'}
        onPress={() => {
          setIsPlaying(false);
          onPrev();
        }}
        disabled={buttonDisabled}
        color={`${buttonDisabled ? '$color.gray6Light' : ''}`}
      />
    );
  };

  const rightButton = (onNext, pageNumber) => {
    const buttonDisabled = pageNumber === exercises.length - 1;
    return (
      <Button
        accessibilityLabel="Carousel left"
        icon={ChevronRight}
        size="$10"
        // circular
        chromeless
        padding={'$3'}
        onPress={() => {
          setIsPlaying(false);
          onNext();
        }}
        disabled={buttonDisabled}
        color={`${buttonDisabled ? '$color.gray6Light' : ''}`}
      />
    );
  };

  const renderItem = ({ item, pageNumber, onNext, onPrev }) => {
    return (
      <ExerciseTimer
        exercise={item}
        stop={isPlaying}
        currentPage={pageNumber}
        lastPage={exercisesLength - 1}
        totalItems={exercisesLength}
        leftButton={leftButton(onPrev, pageNumber)}
        rightButton={rightButton(onNext, pageNumber)}
      />
    );
  };

  return (
    <WhitePage>
      <PageHeader
        onBack={() => {
          console.log('bbooooo');
          setShowExitAlert(true);
        }}
      />

      {showExitAlert && (
        <ExitModal
          open={showExitAlert}
          onConfirm={() => back()}
          onCancel={() => setShowExitAlert(false)}
        />
      )}

      {isLoading ? <Spinner /> : <PageSlider data={exercises} renderItem={renderItem} />}
    </WhitePage>
  );
}
