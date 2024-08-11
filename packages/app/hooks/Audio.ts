import { Audio } from 'expo-av';

interface Configs {
  allowsRecordingIOS?: boolean;
  interruptionModeIOS?: number;
  playsInSilentModeIOS?: boolean;
  interruptionModeAndroid?: number;
  shouldDuckAndroid?: boolean;
  staysActiveInBackground?: boolean;
  playThroughEarpieceAndroid?: boolean;
}

export const useAudio = () => {
  const init = async (defaultConfigs: Configs = {}) => {
    try {
      const configs: Configs = {
        allowsRecordingIOS: false,
        //   interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        //   interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: false,
        ...defaultConfigs,
      };

      await Audio.setAudioModeAsync(configs);
    } catch (error) {
      console.log(`[Audio Error][init]: ${error?.message}`);
    }
  };

  const playbackStatusUpdate =
    (playbackObject: any) =>
    (next: Function = (status: any) => console.log({ status })) => {
      if ('setOnPlaybackStatusUpdate' in playbackObject) {
        playbackObject.setOnPlaybackStatusUpdate(next);
      }
    };

  const play =
    (playbackObject: any, uri: string, shouldPlay = true) =>
    (next: Function = () => {}) =>
    (onPlaybackStatusUpdate: Function = () => {}) => {
      (async () => {
        try {
          const soundObj = await playbackObject?.loadAsync({ uri }, { shouldPlay });

          playbackStatusUpdate(playbackObject)(onPlaybackStatusUpdate);
          next(soundObj);
        } catch (error) {
          console.log(`[Audio Error][play]: ${error?.message}`);
        }
      })();
    };

  const configAndPlay =
    (uri: string, shouldPlay = true) =>
    (next: Function = () => {}) =>
    (onPlaybackStatusUpdate: Function = () => {}) => {
      (async () => {
        try {
          const playbackObject = new Audio.Sound();
          play(
            playbackObject,
            uri,
            shouldPlay
          )((soundObj: any) => {
            next(playbackObject, soundObj);
          })(onPlaybackStatusUpdate);
        } catch (error) {
          console.log(`[Audio Error][configAndPlay]: ${error?.message}`);
        }
      })();
    };

  const pause =
    (playbackObject: any) =>
    (next: Function = () => {}) => {
      (async () => {
        try {
          const soundObj = await playbackObject?.pauseAsync();
          next(soundObj);
        } catch (error) {
          console.log(`[Audio Error][pause]: ${error?.message}`);
        }
      })();
    };

  const resume =
    (playbackObject: any) =>
    (next: Function = () => {}) => {
      (async () => {
        try {
          const soundObj = await playbackObject?.playAsync();
          next(soundObj);
        } catch (error) {
          console.log(`[Audio Error][resume]: ${error?.message}`);
        }
      })();
    };

  const seek =
    (playbackObject: any, millis: number) =>
    (next: Function = () => {}) =>
    (onPlaybackStatusUpdate: Function = () => {}) => {
      (async () => {
        try {
          const soundObj = await playbackObject?.playFromPositionAsync(millis);
          playbackStatusUpdate(playbackObject)(onPlaybackStatusUpdate);
          next(soundObj);
        } catch (error) {
          console.log(`[Audio Error][seek]: ${error?.message}`);
        }
      })();
    };

  const stop =
    (playbackObject: any) =>
    (next: Function = () => {}) => {
      (async () => {
        try {
          if ('stopAsync' in playbackObject && 'unloadAsync' in playbackObject) {
            const soundObj = await playbackObject?.stopAsync();
            await playbackObject?.unloadAsync();
            next(soundObj);
          } else {
            next(null);
          }
        } catch (error) {
          console.log(`[Audio Error][stop]: ${error?.message}`);
        }
      })();
    };

  return {
    init,
    playbackStatusUpdate,
    configAndPlay,
    play,
    pause,
    resume,
    seek,
    stop,
  };
};
