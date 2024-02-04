import React, { useState } from 'react';
import { createParam } from 'solito';
import { Spinner, PageSlider, Button, H5 } from '@t4/ui/src';
import { useRouter } from 'solito/router';
import { ExerciseTimer, ExitModal, PageHeader } from 'app/components';
import { useExercisesByWorkoutId } from 'app/hooks';
import { CheckCircle, ChevronLeft, ChevronRight } from '@tamagui/lucide-icons';
import { WhitePage } from 'app/components/Page';

const { useParam } = createParam<{ id: string }>();

export default function ChallengePlay() {
  // useKeepAwake();

  const [workoutId = ''] = useParam('id');
  const { back, push } = useRouter();
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
    const isLastExercise = pageNumber === exercises.length - 1;
    return (
      <Button
        accessibilityLabel="Carousel left"
        iconAfter={isLastExercise ? CheckCircle : ChevronRight}
        size={isLastExercise ? '$6' : '$10'}
        chromeless
        padding={'$3'}
        onPress={() => {
          setIsPlaying(false);

          if (isLastExercise) {
            push(`/workout/${workoutId}/completed`);
          } else {
            onNext();
          }
        }}
        color={`${isLastExercise ? '$color.green10Dark' : ''}`}
      >
        <H5 color={'$color.green10Dark'}>{isLastExercise ? 'Finish' : ''}</H5>
      </Button>
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
        onComplete={() => {}}
        onNext={() => {}}
        onPrev={() => {}}
      />
    );
  };

  return (
    <WhitePage>
      <PageHeader
        onBack={() => {
          setShowExitAlert(true);
        }}
      />

      {showExitAlert && (
        <ExitModal
          open={showExitAlert}
          onConfirm={() => push(`/workout/${workoutId}`)}
          onCancel={() => setShowExitAlert(false)}
        />
      )}

      {isLoading ? <Spinner /> : <PageSlider data={exercises} renderItem={renderItem} />}
    </WhitePage>
  );
}
