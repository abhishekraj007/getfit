import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  XStack,
  Text,
  H5,
  H6,
  useWindowDimensions,
  Button,
  YStack,
  useThemeName,
  H3,
  H2,
} from '@t4/ui/src';
import { useRouter } from 'solito/router';
import { Check, Info, Pause, Play } from '@tamagui/lucide-icons';
import { IExercise } from '@t4/ui/src/modals';
import { SolitoImage } from 'solito/image';
import { useWorktouAtom } from 'app/atoms/workouts';
import { useLanguage, useTranslation } from 'app/provider/language';
import { CustomSheet } from './CustomSheet';
import { ExerciseDetail } from './ExerciseDetail';
// import { ResizeMode, Video } from 'expo-av';

export interface ExerciseTimerProps {
  exercise: IExercise;
  stop: boolean;
  currentPage: number;
  lastPage: number;
  totalItems: number;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  onNext: Function;
  onPrev: Function;
  onComplete: () => void;
}

export function ExerciseTimer(props: ExerciseTimerProps) {
  const { exercise, stop, currentPage, lastPage, leftButton, rightButton, onNext, onComplete } =
    props;

  const { push } = useRouter();
  const { width, height } = useWindowDimensions();
  const { selectedWorkout } = useWorktouAtom();
  const { lang } = useLanguage();
  const [showDetail, setShowDetail] = useState(false);

  const {
    image,
    sets = 2,
    title,
    title_translated,
    reps_unit = 'rep',
    reps_value = 3,
    rest_unit = 'sec',
    rest_value = 60,
  } = exercise || {};

  const restTime = (rest_unit === 'sec' ? rest_value : rest_value * 60) || 60;
  const shouldShowRepsInSec = reps_unit !== 'rep';

  // const refVideo2 = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nextSet, setnextSet] = useState(false);
  const [finished] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [currentReps, setCurrentReps] = useState(reps_value);
  // const [currentReps, setCurrentReps] = useState(1);
  const [currentSets, setCurrentSets] = useState(1);
  const [shouldTakeRest, setShouldTakeRest] = useState(false);
  const translation = useTranslation();

  const [timeLeft, setTimeLeft] = useState(restTime);
  const [totaltime, setTotaltime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const PlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let isCancelled = false;

    const advanceTime = () => {
      setTimeout(() => {
        let nSeconds = totaltime.seconds;
        let nMinutes = totaltime.minutes;
        let nHours = totaltime.hours;

        nSeconds++;

        if (nSeconds > 59) {
          nMinutes++;
          nSeconds = 0;
        }
        if (nMinutes > 59) {
          nHours++;
          nMinutes = 0;
        }
        if (nHours > 24) {
          nHours = 0;
        }

        !isCancelled && setTotaltime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
      }, 1000);
    };

    if (isPlaying || shouldTakeRest) {
      advanceTime();
    }

    return () => {
      isCancelled = true;
    };
  }, [totaltime, isPlaying]);

  useEffect(() => {
    if (currentPage === lastPage) {
      setIsEnd(true);
    } else {
      setIsEnd(false);
    }
  }, [currentPage]);

  // Rest
  useEffect(() => {
    if (shouldTakeRest) {
      if (!timeLeft) return;

      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [shouldTakeRest, timeLeft]);

  useEffect(() => {
    if (currentReps === 0) {
      if (sets === currentSets) {
        if (isEnd) {
          setTimeout(() => {
            onComplete();
          }, 1000);
        } else if (!isEnd) {
          setTimeout(() => {
            goToRest();
          }, 1000);
        }
      } else {
        setTimeout(() => {
          setShouldTakeRest(true);
        }, 1000);
      }
    }
  }, [currentReps]);

  const gotToNextSet = () => {
    if (currentSets > sets) {
      onNext();
    } else {
      setCurrentSets(currentSets + 1);
      setCurrentReps(reps_value);
      setnextSet(true);
      setTimeLeft(restTime);
      setShouldTakeRest(false);
    }
  };

  const onSkip = () => {
    if (currentSets === sets) {
      if (isEnd) {
        onComplete();
      } else {
        onNext();
        setShouldTakeRest(false);
        setTimeLeft(restTime);
        setCurrentReps(reps_value);
      }
    } else {
      setCurrentSets(currentSets + 1);
      setCurrentReps(reps_value);
      setnextSet(true);
      setTimeLeft(restTime);
      setShouldTakeRest(false);
    }
  };

  const goToRest = () => {
    // setCurrentSets(currentSets + 1);
    // setCurrentReps(reps_value);
    setnextSet(true);
    setTimeLeft(restTime);
    setIsPlaying(false);
    setShouldTakeRest(true);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      if (currentSets < sets) {
        gotToNextSet();
      } else {
        onNext();
      }
    }
  }, [timeLeft]);

  const repsTimeOutSeconds = 4000;

  useEffect(() => {
    if (isPlaying) {
      if (!currentReps) return;
      // This is when reps are not in secs
      const intervalId = setInterval(
        () => {
          if (currentReps > 0) {
            setCurrentReps(currentReps - 1);
          } else {
            setnextSet(true);
            setIsPlaying(false);
          }
        },
        shouldShowRepsInSec ? 1000 : repsTimeOutSeconds
      );

      return () => clearInterval(intervalId);
    }
  }, [currentReps, isPlaying]);

  useEffect(() => {
    if (stop === false) {
      setIsPlaying(false);
    }
  }, [stop]);

  const PRIMARY_TEXT_SIZE = 65;
  const SECONDARY_TEXT_SIZE = 30;

  const renderExerciseProgress = () => {
    if (!finished && !shouldTakeRest) {
      return (
        <YStack>
          <SolitoImage width={width} height={height / 2.2} src={image} alt="" unoptimized />

          <YStack marginTop={'$4'} padding={'$4'}>
            <XStack alignItems="center">
              {shouldShowRepsInSec ? (
                <H2 fontSize={PRIMARY_TEXT_SIZE} lineHeight={PRIMARY_TEXT_SIZE} opacity={0.9}>
                  00:
                </H2>
              ) : (
                <H2 fontSize={SECONDARY_TEXT_SIZE} lineHeight={SECONDARY_TEXT_SIZE} opacity={0.7}>
                  X{' '}
                </H2>
              )}
              <H2 fontSize={PRIMARY_TEXT_SIZE} lineHeight={PRIMARY_TEXT_SIZE}>
                {shouldShowRepsInSec ? currentReps : reps_value}
              </H2>
            </XStack>

            <XStack
              alignItems="center"
              space
              marginTop={'$2'}
              marginBottom={'$1'}
              paddingRight={20}
            >
              <H3 userSelect="none" maxWidth={width - 100} numberOfLines={1} fontWeight={'bold'}>
                {title_translated?.[lang] ?? title}
              </H3>
              <View>
                <Button
                  chromeless
                  unstyled
                  icon={<Info size={'$1'} />}
                  onPress={() => setShowDetail(true)}
                />
              </View>
            </XStack>
            <H5>
              {translation?.sets} {`${currentSets}/${sets}`}
            </H5>
          </YStack>
        </YStack>
      );
    }
  };

  const themeName = useThemeName();
  const buttonColor = themeName.includes('dark') ? 'white' : 'black';

  const renderRest = () => {
    return (
      <View
        animation={'flash'}
        alignItems="center"
        justifyContent="center"
        flex={1}
        height={height}
        width={width}
      >
        <XStack
          justifyContent="center"
          width={180}
          height={180}
          borderRadius={90}
          borderWidth={15}
          alignItems="center"
          borderColor={buttonColor}
        >
          <Text fontSize={60} fontWeight={'bold'} color={buttonColor}>
            {timeLeft}"
          </Text>
        </XStack>
        <H6 fontSize={20} margin={30}>
          Take a rest
        </H6>

        <Button chromeless onPress={onSkip}>
          Skip
        </Button>
      </View>
    );
  };

  const showExerciseInProgress = !shouldTakeRest && !finished;
  const showRest = shouldTakeRest && !finished;

  const renderPlayPauseButton = () => {
    if ((!nextSet && !shouldTakeRest) || !shouldTakeRest) {
      return (
        <Button
          icon={isPlaying ? <Pause /> : <Play />}
          onPress={() => PlayPause()}
          size={80}
          width={100}
          height={100}
        />
      );
    }
  };

  const renderFinishRepButton = () => {
    if ((!nextSet && !shouldTakeRest) || !shouldTakeRest) {
      return (
        <Button
          icon={Check}
          onPress={goToRest}
          theme={'green'}
          size={80}
          width={100}
          height={100}
          circular
        />
      );
    }
  };

  const renderBottomActions = () => {
    return (
      <XStack
        width={width}
        alignItems="center"
        justifyContent="space-between"
        paddingBottom={20}
        position="absolute"
        bottom={100}
        left={0}
      >
        {leftButton}
        {shouldShowRepsInSec ? renderPlayPauseButton() : renderFinishRepButton()}
        {rightButton}
      </XStack>
    );
  };

  return (
    <YStack position="relative" flex={1}>
      {showExerciseInProgress && renderExerciseProgress()}
      {showRest && renderRest()}
      {!finished && renderBottomActions()}
      {showDetail && (
        <CustomSheet open={showDetail} onOpenChange={setShowDetail}>
          <ExerciseDetail exercise={exercise} lang={lang} />
        </CustomSheet>
      )}
    </YStack>
  );
}
