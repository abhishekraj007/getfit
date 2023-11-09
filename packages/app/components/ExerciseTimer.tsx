import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  VirtualList,
  XStack,
  Text,
  Card,
  H5,
  H6,
  H4,
  useWindowDimensions,
  Button,
  Image,
  H2,
  YStack,
  H3,
  useThemeName,
} from '@t4/ui/src';
import { useRouter } from 'solito/router';
import { Pause, Play } from '@tamagui/lucide-icons';
import { IExercise } from '@t4/ui/src/modals';
// import { ResizeMode, Video } from 'expo-av';

export interface ExerciseTimerProps {
  data: IExercise;
  stop: boolean;
  currentPage: number;
  lastPage: number;
  workoutId: string;
  totalItems: number;
}

export function ExerciseTimer(props: ExerciseTimerProps) {
  const { data, stop, currentPage, lastPage, workoutId, totalItems } = props;

  const { push } = useRouter();
  const { width, height } = useWindowDimensions();

  const refVideo2 = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nextSet, setnextSet] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [reps, setReps] = useState(1);
  const [sets, setSets] = useState(1);
  const [rest, setRest] = useState(false);

  const restTime = (data.rest.unit === 'sec' ? data.rest.time : data.rest.time * 60) || 60;

  const [timeLeft, setTimeLeft] = useState(restTime);
  const [totaltime, setTotaltime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  // const contextState = useContext(LanguageContext);
  // const language = contextState.language;
  // const Strings = Languages[language].texts;

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

    if (isPlaying || rest) {
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

  useEffect(() => {
    if (rest) {
      if (!timeLeft) return;

      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [rest, timeLeft]);

  useEffect(() => {
    if (reps === data.reps) {
      if (data.sets === sets) {
        if (isEnd) {
          setTimeout(() => {
            push('/completed');
            // push('completed', {
            //   id: workoutId,
            //   total: totalItems,
            //   time: totaltime,
            // });
          }, 1000);
        } else if (!isEnd) {
          setTimeout(() => {
            setFinished(true);
          }, 1000);
        }
      } else {
        setTimeout(() => {
          setRest(true);
        }, 1000);
      }
    }
  }, [reps]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (sets < data.sets) {
        setSets(sets + 1);
        setReps(1);
        setnextSet(true);
        setTimeLeft(60);
        setRest(false);
      }
    }
  }, [timeLeft]);

  useEffect(() => {
    if (isPlaying) {
      if (!reps) return;
      const intervalId = setInterval(() => {
        if (reps < data.reps) {
          setReps(reps + 1);
        } else {
          setnextSet(true);
          setIsPlaying(false);
        }
      }, 2500);

      return () => clearInterval(intervalId);
    }
  }, [reps, isPlaying]);

  useEffect(() => {
    if (stop === false) {
      setIsPlaying(false);
    }
  }, [stop]);

  const renderButton = () => {
    if (!nextSet && !rest) {
      return (
        <Button
          icon={isPlaying ? <Pause /> : <Play />}
          onPress={() => PlayPause()}
          themeInverse
          theme={'pink'}
          size={100}
        />
      );
    } else if (!rest) {
      return (
        <Button
          icon={isPlaying ? <Pause /> : <Play />}
          onPress={() => PlayPause()}
          themeInverse
          size={100}
          theme={'pink'}
        />
      );
    }
  };

  const renderExerciseInProgress = () => {
    if (!finished && !rest) {
      return (
        <YStack
          alignItems="center"
          // animation={'bouncy'}
          // animateOnly={['transform']}
        >
          <Image
            width={width}
            height={300}
            source={{
              uri: data.image,
            }}
          ></Image>
          <H4 marginTop={20}>{data.title}</H4>
          <XStack marginTop={20} marginBottom={20}>
            <YStack alignItems="center" marginRight="$8">
              <XStack alignItems="center">
                <Text fontWeight={'bold'} fontSize={60}>
                  {reps}
                </Text>
                <Text fontSize={40}>/</Text>
                <Text fontSize={40}>{data.reps}</Text>
              </XStack>
              <H5>Reps</H5>
            </YStack>

            <YStack alignItems="center">
              <XStack alignItems="center">
                <Text fontWeight={'bold'} fontSize={60}>
                  {sets}
                </Text>
                <Text fontSize={40}>/</Text>
                <Text fontSize={40}>{data.sets}</Text>
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
      <View
        animation="slideInDown"
        style={{
          maxWidth: 300,
          height: height,
          flex: 1,
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: -70,
          }}
        >
          {/* <Icon
              name="checkbox-marked-circle-outline"
              style={{
                color: ColorsApp.PRIMARY,
                fontSize: 72,
                marginBottom: 10,
              }}
            /> */}
          <Text style={{ fontSize: 34, fontWeight: 'bold', textAlign: 'center' }}>
            Exercise Completed
          </Text>
        </View>
      </View>
    );
  };

  const showExerciseInProgress = !rest && !finished;
  const showRest = rest && !finished;

  return (
    <YStack alignItems="center">
      {showExerciseInProgress && renderExerciseInProgress()}
      {showRest && renderRest()}
      {finished && renderFinishedScreen()}
      {!finished && renderButton()}
    </YStack>
  );
}
