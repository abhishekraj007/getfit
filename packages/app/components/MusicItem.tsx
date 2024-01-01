import { Button, XStack, YStack, Text, Card } from '@t4/ui/src';
import { Track } from '@t4/ui/src/modals';
import { PauseCircle, PlayCircle } from '@tamagui/lucide-icons';
import { useMusicPlayer } from 'app/provider/player/PlayerProvider';

type MusicItemProps = {
  track: Track;
  isPlaying: boolean;
  index: number;
};

export function MusicItem({ track, isPlaying, index }: MusicItemProps) {
  const { currentSong, setCurrentSong } = useMusicPlayer();

  const handlePress = () => {
    setCurrentSong({
      ...currentSong,
      song: track,
      index,
      forcePlay: true,
    });
  };

  // onPlayPress(song, index)

  return (
    <Card space marginBottom={6}>
      <XStack alignItems="center">
        <Button
          onPress={handlePress}
          icon={isPlaying ? <PauseCircle size={'$2'} /> : <PlayCircle size={'$2'} />}
          chromeless
        ></Button>
        <Text>{track.title}</Text>
      </XStack>
    </Card>
  );
}
