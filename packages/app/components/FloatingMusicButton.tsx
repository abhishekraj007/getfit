import React from 'react';
import { Music } from '@tamagui/lucide-icons';
import { Button, View, useWindowDimensions, Image } from '@t4/ui/src';
import { useRouter } from 'solito/router';
import { useMusicPlayer } from 'app/provider/player/PlayerProvider';
import { MotiView } from 'moti';

export function FloatingMusicButton() {
  const { push } = useRouter();
  const onClick = async () => {
    push('/playlists');
  };

  const { height } = useWindowDimensions();
  const { playbackStatus: { isPlaying } = { isPlaying } } = useMusicPlayer();

  // console.log({ isPlaying });

  return (
    <View position="absolute" right={0} top={height / 2}>
      {!isPlaying ? (
        <Button
          elevate
          icon={<Music size={'$1'} />}
          circular
          padding={12}
          onPress={onClick}
        ></Button>
      ) : (
        <Button
          elevate
          // icon={<Music size={'$1'} />}
          circular
          padding={12}
          onPress={onClick}
        >
          <Image source={require('../../../assets/music_playing.gif')} width={20} height={20} />
        </Button>

        // <MotiView
        //   from={{
        //     rotate: '0deg',
        //   }}
        //   animate={{ rotate: '360deg' }}
        //   transition={{ type: 'timing', duration: 2000, loop: true }}
        // >
        //   <Button
        //     elevate
        //     icon={<Music size={'$1'} />}
        //     circular
        //     padding={12}
        //     onPress={onClick}
        //   ></Button>
        // </MotiView>
      )}
    </View>
  );
}
