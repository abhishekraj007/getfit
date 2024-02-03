import { FlatList } from 'react-native';
import { useMusicPlayer } from 'app/provider/player/PlayerProvider';
import { YStack, useWindowDimensions, MusicLoader, XStack, Button } from '@t4/ui/src';
import { MusicItem } from './MusicItem';
import {
  PAGE_HEADER_HEIGHT,
  PAGE_HEADER_HEIGHT_WITHOUT_BACKGROUND,
  PLAYER_BAR_HEIGHT,
} from 'app/constants';
import { MusicPlayerBottomBar } from './MusicPlayerBottomBar';
import { useEffect } from 'react';
import { Pause, PauseCircle, Play, PlayCircle } from '@tamagui/lucide-icons';

export const MusicPlayer = () => {
  const { height } = useWindowDimensions();
  // const { data, isLoading } = useSongs();

  const { currentSong, playbackStatus, songs, handlePlayAndPause } = useMusicPlayer();

  // useEffect(() => {
  //   if (data?.length) {
  //     setSongs(data);
  //   }
  // }, [data]);

  const { isPlaying } = playbackStatus || {};

  const playlistHeight = currentSong?.song
    ? height - PAGE_HEADER_HEIGHT + PLAYER_BAR_HEIGHT
    : height - PAGE_HEADER_HEIGHT;

  // if (isLoading) {
  //   return <MusicLoader />;
  // }

  return (
    <YStack position="relative">
      <XStack justifyContent="flex-end" position="absolute" top={-28} right={16}>
        <Button
          // theme="green"
          themeInverse
          chromeless
          backgroundColor={'$pink10Dark'}
          color={'white'}
          circular
          size={'$5'}
          icon={isPlaying ? <Pause size={'$1.5'} /> : <Play size={'$1.5'} />}
          onPress={handlePlayAndPause}
        ></Button>
      </XStack>
      <YStack height={playlistHeight} marginTop={14}>
        <FlatList
          data={songs}
          renderItem={({ item, index }) => (
            <MusicItem
              track={item}
              isSelected={item.id === currentSong?.detail?.id}
              index={index}
              playbackStatus={playbackStatus}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </YStack>
      <MusicPlayerBottomBar />
    </YStack>
  );
};
