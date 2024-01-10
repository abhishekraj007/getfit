import {
  Button,
  XStack,
  Text,
  useWindowDimensions,
  useThemeName,
  MusicImage,
  ImageProps,
} from '@t4/ui/src';
import { ITrack } from '@t4/ui/src/modals';
import { useMusicPlayer } from 'app/provider/player/PlayerProvider';
import { AVPlaybackStatusSuccess } from 'expo-av';

interface MusicItemProps {
  track: ITrack;
  isSelected: boolean;
  index: number;
  playbackStatus?: AVPlaybackStatusSuccess;
}

export function MusicItem({ track, isSelected, index, playbackStatus }: MusicItemProps) {
  const { currentSong, setCurrentSong } = useMusicPlayer();
  const { width } = useWindowDimensions();
  const isThemeDark = useThemeName().includes('dark');
  const { isBuffering, isPlaying } = playbackStatus || {};

  const handlePress = () => {
    setCurrentSong({
      ...currentSong,
      song: track,
      // index,
      forcePlay: true,
    });
  };

  return (
    <XStack alignItems="center">
      <Button
        onPress={handlePress}
        // icon={isPlaying ? <PauseCircle size={'$2'} /> : <PlayCircle size={'$2'} />}
        // chromeless
        borderRadius={0}
        width={width}
        textAlign="left"
        justifyContent="flex-start"
        // backgroundColor={}
        height={40}
        marginBottom={4}
        backgroundColor={'transparent'}
      >
        <MusicImage
          isBuffering={!!(isSelected && isBuffering)}
          isPlaying={!!(isSelected && isPlaying)}
          isSelected={isSelected}
          uri={track?.image ?? ''}
        />

        <Text color={isSelected ? '$color.pink10Dark' : isThemeDark ? 'white' : 'black'}>
          {track.name}
        </Text>
      </Button>
    </XStack>
  );
}
