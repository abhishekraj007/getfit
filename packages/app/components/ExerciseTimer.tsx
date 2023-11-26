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
  Paragraph,
  CustomModal,
} from '@t4/ui/src';
import { useRouter } from 'solito/router';
import { CheckCircle, Info, Pause, Play } from '@tamagui/lucide-icons';
import { IExercise } from '@t4/ui/src/modals';
import { SolitoImage } from 'solito/image';
import { useWorktouAtom } from 'app/atoms/workouts';
import { useLanguage } from 'app/provider/language';
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
}

export function ExerciseTimer(props: ExerciseTimerProps) {
  const { exercise, stop, currentPage, lastPage, leftButton, rightButton } = props;

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

  const refVideo2 = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nextSet, setnextSet] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [currentReps, setCurrentReps] = useState(1);
  // const [currentReps, setCurrentReps] = useState(1);
  const [currentSets, setCurrentSets] = useState(1);
  const [shouldTakeRest, setShouldTakeRest] = useState(false);

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
    if (currentReps === reps_value) {
      if (sets === currentSets) {
        if (isEnd) {
          setTimeout(() => {
            push(`/workout/${selectedWorkout}/completed`);
          }, 1000);
        } else if (!isEnd) {
          setTimeout(() => {
            setFinished(true);
          }, 1000);
        }
      } else {
        setTimeout(() => {
          setShouldTakeRest(true);
        }, 1000);
      }
    }
  }, [currentReps]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (currentSets < sets) {
        setCurrentSets(currentSets + 1);
        setCurrentReps(1);
        setnextSet(true);
        setTimeLeft(60);
        setShouldTakeRest(false);
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
          if (currentReps < reps_value) {
            setCurrentReps(currentReps + 1);
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

  const renderPlayPauseButton = () => {
    if ((!nextSet && !shouldTakeRest) || !shouldTakeRest) {
      return (
        <Button
          icon={isPlaying ? <Pause /> : <Play />}
          onPress={() => PlayPause()}
          // themeInverse
          size={80}
          width={100}
          height={100}
          // theme={'pink'}
          // circular
        />
      );
    }
  };

  const renderBottomActions = () => {
    return (
      <XStack
        width={width}
        // backgroundColor={'red'}
        alignItems="center"
        justifyContent="space-between"
        paddingBottom={20}
      >
        {leftButton}
        {renderPlayPauseButton()}
        {rightButton}
      </XStack>
    );
  };

  const PRIMARY_TEXT_SIZE = 65;
  const SECONDARY_TEXT_SIZE = 30;

  const renderExerciseInProgress = () => {
    if (!finished && !shouldTakeRest) {
      return (
        <YStack alignItems="center">
          <SolitoImage width={width} height={height - 420} src={image} alt="" unoptimized />

          <XStack alignItems="center" space marginTop={24}>
            <H5 fontWeight={'bold'}>{title_translated?.[lang] ?? title}</H5>

            <Button
              chromeless
              unstyled
              icon={<Info size={'$1'} />}
              onPress={() => setShowDetail(true)}
            />
          </XStack>
          <XStack marginTop={20} marginBottom={20}>
            <YStack alignItems="center" marginRight="$8">
              <XStack alignItems="center">
                <Text fontWeight={'bold'} fontSize={PRIMARY_TEXT_SIZE}>
                  {`${currentReps}${shouldShowRepsInSec ? '"' : ''}`}
                </Text>
                <Text fontSize={SECONDARY_TEXT_SIZE}>/</Text>
                <Text fontSize={SECONDARY_TEXT_SIZE}>{`${reps_value}${
                  shouldShowRepsInSec ? '"' : ''
                }`}</Text>
              </XStack>
              <H5>{`${shouldShowRepsInSec ? 'Sec' : 'Reps'}`}</H5>
            </YStack>

            <YStack alignItems="center">
              <XStack alignItems="center">
                <Text fontWeight={'bold'} fontSize={PRIMARY_TEXT_SIZE}>
                  {currentSets}
                </Text>
                <Text fontSize={SECONDARY_TEXT_SIZE}>/</Text>
                <Text fontSize={SECONDARY_TEXT_SIZE}>{sets}</Text>
              </XStack>
              <H5>Sets</H5>
            </YStack>
          </XStack>
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
        <H6 fontSize={20} marginTop={30}>
          Rest
        </H6>
      </View>
    );
  };

  const renderFinishedScreen = () => {
    return (
      <YStack
        animation="slideInDown"
        height={height}
        alignItems="center"
        justifyContent="center"
        space="$3"
        marginTop={-80}
      >
        <CheckCircle />
        <Text style={{ fontSize: 34, fontWeight: 'bold', textAlign: 'center' }}>
          Exercise Completed
        </Text>
      </YStack>
    );
  };

  const showExerciseInProgress = !shouldTakeRest && !finished;
  const showRest = shouldTakeRest && !finished;

  return (
    <YStack>
      {showExerciseInProgress && renderExerciseInProgress()}
      {showRest && renderRest()}
      {finished && renderFinishedScreen()}
      {!finished && renderBottomActions()}

      {showDetail && (
        <CustomSheet open={showDetail} onOpenChange={setShowDetail} scrollView={false}>
          <ExerciseDetail exercise={exercise} />
        </CustomSheet>
      )}
    </YStack>
  );
}
