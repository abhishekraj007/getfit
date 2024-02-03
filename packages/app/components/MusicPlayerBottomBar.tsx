import { useMusicPlayer } from 'app/provider/player/PlayerProvider';
import {
  Button,
  Text,
  XStack,
  Card,
  useWindowDimensions,
  Slider,
  MusicImage,
  YStack,
} from '@t4/ui/src';
import { Pause, Play, SkipBack, SkipForward, Square } from '@tamagui/lucide-icons';
import { PLAYER_BAR_HEIGHT } from 'app/constants';

export const MusicPlayerBottomBar = () => {
  const { width } = useWindowDimensions();

  // const { data: songs = [], isLoading = false } = useSongs();

  const {
    currentSong,
    playbackStatus,
    handleNext,
    handlePlayAndPause,
    handlePrev,
    handleSeek,
    handleStop,
  } = useMusicPlayer();
  const { song } = currentSong || {};

  const { isBuffering } = playbackStatus || {};

  // const formatTime = (time) => {
  //   const minutes = Math.floor(time / 60000);
  //   const seconds = Math.floor((time % 60000) / 1000);
  //   return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  // };

  if (!song) {
    return null;
  }

  return (
    <Card
      //   padded
      position="absolute"
      zIndex={100}
      bottom={40}
      left={0}
      width={width}
      borderRadius={0}
      height={PLAYER_BAR_HEIGHT}
      paddingVertical={12}
      //   paddingHorizontal={'$4'}
      //   backgroundColor={'green'}
      // elevate
      // backgroundColor={'white'}
    >
      <YStack>
        <Slider
          min={0}
          // @ts-ignore
          max={playbackStatus?.durationMillis || 100}
          step={1}
          value={[playbackStatus?.positionMillis || 0]}
          marginBottom={18}
          flex={1}
          // backgroundColor={'purple'}
          size={'$1'}
          onSlideEnd={(_, millis) => handleSeek(millis)}
          position="absolute"
          top={-12}
          left={0}
          width={width}
          //   backgroundColor={'yellow'}
        >
          <Slider.Track>
            <Slider.TrackActive />
          </Slider.Track>
          <Slider.Thumb height={10} width={10} index={0} circular elevate />
        </Slider>

        <XStack justifyContent="space-between" alignItems="center" paddingHorizontal={'$4'}>
          <XStack alignItems="center" width={width / 2}>
            <MusicImage
              isBuffering={!!isBuffering}
              //   isPlaying={!!isPlaying}
              uri={song?.image ?? ''}
              marginRight={6}
              //   isSelected={true}
              circular
            />

            <Text
              maxWidth={140}
              fontSize={16}
              numberOfLines={1}
              ellipsizeMode="tail"
              paddingRight={12}
              //   backgroundColor={'red'}
            >
              {/* {'sdfd sdfds sdfsdf sdfsdf sdfsdf sdfdf'} */}
              {song?.name}
            </Text>
          </XStack>

          <XStack
            //   backgroundColor={'red'}
            width={width / 2}
            justifyContent="space-between"
            alignItems="center"
            flex={1}
          >
            <Button
              icon={<SkipBack size={'$1'} />}
              unstyled
              chromeless
              onPress={handlePrev}
            ></Button>
            <Button
              icon={
                // @ts-ignore
                playbackStatus?.isPlaying ? <Pause size={'$3'} /> : <Play size={'$3'} />
              }
              unstyled
              chromeless
              onPress={handlePlayAndPause}
            ></Button>
            <Button
              opacity={0.8}
              icon={<Square size={'$1'} />}
              unstyled
              chromeless
              // @ts-ignore
              onPress={() => (playbackStatus?.isPlaying ? handleStop(() => {}) : () => {})}
              disabled={!playbackStatus?.isPlaying || playbackStatus?.isBuffering}
            ></Button>
            <Button
              icon={<SkipForward size={'$1'} />}
              unstyled
              chromeless
              onPress={handleNext}
            ></Button>
          </XStack>
        </XStack>
      </YStack>
    </Card>
  );
};
