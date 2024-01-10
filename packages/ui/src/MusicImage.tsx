import { LinearGradient } from '@tamagui/linear-gradient';
import { View, Image, Spinner, XStackProps } from 'tamagui';
import { ImageBackground } from './ImageBackground';

interface MusicImageProps extends XStackProps {
  isPlaying?: boolean;
  isBuffering: boolean;
  isSelected?: boolean;
  uri: string;
  circular?: boolean;
}

export function MusicImage({
  isPlaying,
  isBuffering,
  isSelected,
  uri,
  circular,
  ...rest
}: MusicImageProps) {
  return (
    <View position="relative" {...rest}>
      {isPlaying ? (
        <ImageBackground
          resizeMode={'cover'}
          source={{ uri }}
          width={40}
          height={40}
          borderRadius={circular ? 40 : 4}
        >
          <LinearGradient
            borderRadius={4}
            width={40}
            height={40}
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
          ></LinearGradient>
        </ImageBackground>
      ) : (
        <Image source={{ uri }} width={40} height={40} borderRadius={circular ? 40 : 4} />
      )}

      <View position="absolute" left={10} top={10}>
        {isPlaying && !isBuffering && (
          <Image source={require('../../../assets/music_playing.gif')} width={20} height={20} />
        )}

        {isBuffering && <Spinner size="small" />}
      </View>
    </View>
  );
}
