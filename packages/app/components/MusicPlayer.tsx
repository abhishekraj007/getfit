import { FlatList } from 'react-native';
import { useMusicPlayer } from 'app/provider/player/PlayerProvider';
import { YStack, useWindowDimensions, MusicLoader } from '@t4/ui/src';
import { MusicItem } from './MusicItem';
import { PAGE_HEADER_HEIGHT_WITHOUT_BACKGROUND, PLAYER_BAR_HEIGHT } from 'app/constants';
import { MusicPlayerBottomBar } from './MusicPlayerBottomBar';
import { useEffect } from 'react';

export const MusicPlayer = () => {
  const { height } = useWindowDimensions();
  // const { data, isLoading } = useSongs();

  const { currentSong, playbackStatus, songs } = useMusicPlayer();

  // useEffect(() => {
  //   if (data?.length) {
  //     setSongs(data);
  //   }
  // }, [data]);

  const playlistHeight = currentSong?.song
    ? height - PAGE_HEADER_HEIGHT_WITHOUT_BACKGROUND + PLAYER_BAR_HEIGHT
    : height - PAGE_HEADER_HEIGHT_WITHOUT_BACKGROUND;

  // if (isLoading) {
  //   return <MusicLoader />;
  // }

  return (
    <YStack position="relative" height={height - PAGE_HEADER_HEIGHT_WITHOUT_BACKGROUND}>
      <YStack height={playlistHeight}>
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
