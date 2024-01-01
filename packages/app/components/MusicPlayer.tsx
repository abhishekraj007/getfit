import { StyleSheet, FlatList, Pressable } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Sound } from 'expo-av/build/Audio';
import { useMusicPlayer } from 'app/provider/player/PlayerProvider';
import {
  Button,
  View,
  Text,
  XStack,
  YStack,
  Card,
  useWindowDimensions,
  H3,
  Slider,
} from '@t4/ui/src';
import {
  Pause,
  PauseCircle,
  Play,
  PlayCircle,
  SkipBack,
  SkipForward,
  Square,
  StopCircle,
} from '@tamagui/lucide-icons';
import { MusicItem } from './MusicItem';
import { Track } from '@t4/ui/src/modals';
import { mock_songs } from '../../mock/songs';
import { useAudio } from 'app/hooks/Audio';

export const MusicPlayer = () => {
  const { init, config, configAndPlay, play, pause, seek, stop } = useAudio();

  const songs = mock_songs;

  const [actions, setActions] = useState({
    prev: false,
    play: false,
    stop: false,
    next: false,
  });

  const { currentSong, setCurrentSong, playbackStatus, setPlaybackStatus } = useMusicPlayer();

  // console.log({ currentSong });

  const configAndPlayLocal = (shouldPlay = false) => {
    if (!currentSong?.soundObj?.isLoaded) {
      return configAndPlay(
        currentSong?.song?.uri ?? '',
        shouldPlay
      )((playback, soundObj) => {
        // dispatch({
        // 	type: DISPATCHES.SET_CURRENT_SONG,
        // 	payload: {
        // 		playback,
        // 		soundObj,
        // 	},
        // });

        setCurrentSong({
          ...currentSong,
          playback,
          soundObj,
        });

        // addToRecentlyPlayed(songs.findIndex((i) => i.id === song?.detail?.id));
      })(onPlaybackStatusUpdate);
    }
  };

  useEffect(() => {
    (async () => {
      await init();
      config();
      // configAndPlayLocal();
    })();
  }, []);

  const updateActions = (arg = {}) => {
    setActions({
      ...actions,
      ...arg,
    });
  };

  const handlePlayAndPause = async () => {
    // const dispatch = useDispatch();

    updateActions({ play: true });

    if (!currentSong?.soundObj?.isLoaded) {
      configAndPlayLocal(true);
      updateActions({ play: true });
    }

    if (currentSong?.soundObj?.isLoaded && currentSong?.soundObj?.isPlaying) {
      return currentSong?.playback?.pauseAsync().then((soundObj) => {
        // dispatch({
        //   type: DISPATCHES.SET_CURRENT_SONG,
        //   payload: {
        //     soundObj,
        //   },
        // });

        setCurrentSong({
          ...currentSong,
          soundObj,
        });

        updateActions({ play: false });
      });
    }

    if (currentSong?.soundObj?.isLoaded && !currentSong?.soundObj?.isPlaying) {
      return currentSong?.playback?.playAsync().then((soundObj) => {
        // dispatch({
        //   type: DISPATCHES.SET_CURRENT_SONG,
        //   payload: {
        //     soundObj,
        //   },
        // });

        setCurrentSong({
          ...currentSong,
          soundObj,
        });

        updateActions({ play: false });
      });
    }
  };

  const handleStop = async (after = () => {}) => {
    updateActions({ stop: true });

    const { soundObj } = currentSong || {};

    console.log('stop opening...', { soundObj });

    if (currentSong?.soundObj?.isLoaded) {
      console.log('stop.....');
      return stop(currentSong?.playback)(() => {
        // dispatch({
        // 	type: DISPATCHES.SET_CURRENT_SONG,
        // 	payload: {
        // 		soundObj: {},
        // 	},
        // });

        setCurrentSong({
          ...currentSong,
          soundObj: undefined,
        });

        after();
        updateActions({ stop: false });
      });
    }

    after();
    updateActions({ stop: false });
  };

  const handlePrev = async () => {
    updateActions({ prev: true });

    const currentIndex = songs.findIndex((i) => i.id === currentSong?.detail?.id);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    const prevSong = songs[prevIndex];

    return handleStop(() => {
      play(
        currentSong?.playback,
        prevSong?.uri ?? ''
      )((soundObj) => {
        // dispatch({
        // 	type: DISPATCHES.SET_CURRENT_SONG,
        // 	payload: {
        // 		soundObj,
        // 		detail: prevSong,
        // 	},
        // });

        setCurrentSong({
          ...currentSong,
          soundObj,
          detail: prevSong,
        });

        // addToRecentlyPlayed(prevIndex);
        updateActions({ prev: false });
      })(onPlaybackStatusUpdate);
    });
  };

  async function handleNext() {
    updateActions({ next: true });

    const currentIndex = songs.findIndex((i) => i.id === currentSong?.detail?.id);
    const nextIndex = currentIndex === songs.length - 1 ? 0 : currentIndex + 1;
    const nextSong = songs[nextIndex];

    return handleStop(() => {
      play(
        currentSong?.playback,
        nextSong?.uri ?? ''
      )((soundObj) => {
        // dispatch({
        // 	type: DISPATCHES.SET_CURRENT_SONG,
        // 	payload: {
        // 		soundObj,
        // 		detail: nextSong,
        // 	},
        // });

        setCurrentSong({
          ...currentSong,
          soundObj,
          detail: nextSong,
        });

        // addToRecentlyPlayed(nextIndex);
        updateActions({ next: false });
      })(onPlaybackStatusUpdate);
    });
  }

  const handleSeek = (_, millis) => {
    console.log({ millis });
    return seek(
      currentSong?.playback,
      Math.floor(millis)
    )((soundObj) => {
      // dispatch({
      // 	type: DISPATCHES.SET_CURRENT_SONG,
      // 	payload: {
      // 		soundObj,
      // 	},
      // });

      setCurrentSong({
        ...currentSong,
        soundObj,
      });
    })(onPlaybackStatusUpdate);
  };

  const onPlaybackStatusUpdate = (playbackStatus) => {
    // dispatch({
    // 	type: DISPATCHES.SET_CURRENT_SONG,
    // 	payload: {
    // 		playbackStatus,
    // 	},
    // });
    // setCurrentSong({
    //   ...currentSong,
    //   playbackStatus,
    // });

    setPlaybackStatus(playbackStatus);
    if (playbackStatus?.didJustFinish) {
      handleNext();
    }
  };

  useEffect(() => {
    const { detail, song } = currentSong || {};
    console.log('===============', { detail, song });
    if (currentSong?.forcePlay && currentSong?.song?.uri !== currentSong?.detail?.uri) {
      handleStop(() => {
        play(
          currentSong?.playback,
          currentSong?.song?.uri ?? ''
        )((soundObj) => {
          // dispatch({
          // 	type: DISPATCHES.SET_CURRENT_SONG,
          // 	payload: {
          // 		soundObj,
          // 		detail: currentSong?.song,
          // 	},
          // });
          console.log('**********', { currentSong });

          console.log('soundddd', { soundObj });

          setCurrentSong({
            ...currentSong,
            soundObj,
            detail: currentSong?.song,
          });

          // addToRecentlyPlayed(currentSong?.index);
        })(onPlaybackStatusUpdate);
      });
    }
  }, [currentSong?.forcePlay, currentSong?.song, currentSong?.index]);

  const circleSize = 12;
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const { width, height } = useWindowDimensions();

  const player = () => {
    if (!currentSong?.detail) {
      return null;
    }

    return (
      <Card
        // backgroundColor={'red'}
        padded
        position="absolute"
        zIndex={100}
        bottom={0}
        left={0}
        width={width}
        borderRadius={0}
      >
        <XStack alignItems="center" justifyContent="center">
          {/* <Text width={50}>{formatTime(currentTime)}</Text> */}

          <Text width={50}>{formatTime(playbackStatus?.positionMillis ?? 0)}</Text>

          {/* 
          <Slider
								minimumValue={0}
								maximumValue={song?.detail?.durationMillis}
								minimumTrackTintColor="#C07037"
								thumbTintColor="transparent"
								maximumTrackTintColor="transparent"
								value={song?.playbackStatus?.positionMillis || 0}
								onSlidingComplete={handleSeek}
							/> */}

          <Slider
            // defaultValue={[50]}
            min={0}
            // @ts-ignore
            max={playbackStatus?.durationMillis || 100}
            step={1}
            // width={width - 100}
            // height={2}
            value={[playbackStatus?.positionMillis || 0]}
            onValueChange={(value) => console.log({ value })}
            marginBottom={18}
            flex={1}
            // backgroundColor={'purple'}
            size={'$1'}
            onSlideEnd={handleSeek}
          >
            <Slider.Track>
              <Slider.TrackActive />
            </Slider.Track>
            <Slider.Thumb height={10} width={10} index={0} circular elevate />
          </Slider>

          <Text width={50}>{formatTime(playbackStatus?.durationMillis ?? 0)}</Text>
        </XStack>

        <XStack justifyContent="space-between" alignItems="center">
          <H3 width={width / 2}>{currentSong?.detail?.title}</H3>

          <XStack width={width / 2} justifyContent="space-between" alignItems="center" flex={1}>
            <Button
              icon={<SkipBack size={'$3'} />}
              unstyled
              chromeless
              onPress={handlePrev}
            ></Button>
            <Button
              icon={
                // @ts-ignore
                currentSong?.soundObj?.isPlaying ? (
                  <PauseCircle size={'$5'} />
                ) : (
                  <PlayCircle size={'$5'} />
                )
              }
              unstyled
              chromeless
              onPress={handlePlayAndPause}
            ></Button>
            <Button
              opacity={0.8}
              icon={<Square size={'$2'} />}
              unstyled
              chromeless
              // @ts-ignore
              onPress={() => (currentSong?.soundObj?.isPlaying ? handleStop(() => {}) : () => {})}
            ></Button>
            <Button
              icon={<SkipForward size={'$3'} />}
              unstyled
              chromeless
              onPress={handleNext}
            ></Button>
          </XStack>
        </XStack>
      </Card>
    );
  };

  return (
    <YStack position="relative" height={height - 90} backgroundColor={'yellow'}>
      <FlatList
        data={songs}
        renderItem={({ item, index }) => (
          <MusicItem
            track={item}
            isPlaying={item.id === currentSong?.detail?.id}
            // isPlaying={false}
            // onPlay={handlePlayAndPause}
            index={index}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      {player()}
    </YStack>
  );
};
