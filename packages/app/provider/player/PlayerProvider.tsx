import { ITrack } from '@t4/ui/src/modals';
import { AVPlaybackStatus, AVPlaybackStatusSuccess, Audio } from 'expo-av';
import React, { PropsWithChildren, createContext, useState, useContext, useEffect } from 'react';
// import { mock_songs } from '../../../mock/songs';
import { useAudio } from 'app/hooks/Audio';

export type CurrentSong = {
  playback?: Audio.Sound;
  soundObj?: AVPlaybackStatus;
  playbackStatus?: AVPlaybackStatusSuccess;
  detail?: ITrack;
  song?: ITrack;
  index?: number;
  forcePlay?: boolean;
};

const defaultCurrentSong: CurrentSong = {
  playback: undefined,
  soundObj: undefined,
  detail: undefined,
  song: undefined,
};

type PlayerContextType = {
  currentSong?: CurrentSong;
  setCurrentSong: (currentSong: CurrentSong) => void;
  isPlayerScreenVisible: boolean;
  setIsPlayerScreenVisible: (isPlayerScreenVisible: boolean) => void;
  playbackStatus?: AVPlaybackStatusSuccess;
  setPlaybackStatus: (status: AVPlaybackStatusSuccess) => void;
  songs: ITrack[];
  setSongs: (songs: ITrack[]) => void;
  handlePlayAndPause: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSeek: (millis: number) => void;
  handleStop: (fn) => void;
};

const PlayerContext = createContext<PlayerContextType>({
  currentSong: defaultCurrentSong,
  setCurrentSong: (_: CurrentSong) => {},
  isPlayerScreenVisible: false,
  setIsPlayerScreenVisible: (_: boolean) => {},
  playbackStatus: undefined,
  setPlaybackStatus: (_: AVPlaybackStatus) => {},
  songs: [],
  setSongs: (_: ITrack[]) => {},
  handlePlayAndPause: () => {},
  handleNext: () => {},
  handlePrev: () => {},
  handleSeek: (_: number) => {},
  handleStop: (_) => {},
});

export function PlayerProvider({ children }: PropsWithChildren) {
  const [currentSong, setCurrentSong] = useState<CurrentSong>(defaultCurrentSong);
  const [songs, setSongs] = useState<ITrack[]>([]);
  const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatusSuccess>();
  const [isPlayerScreenVisible, setIsPlayerScreenVisible] = useState<boolean>(false);

  const { init, configAndPlay, play, seek, stop } = useAudio();

  const [actions, setActions] = useState({
    prev: false,
    play: false,
    stop: false,
    next: false,
  });

  const updateActions = (arg = {}) => {
    setActions({
      ...actions,
      ...arg,
    });
  };

  const handlePlayAndPause = async () => {
    updateActions({ play: true });

    if (!currentSong?.soundObj?.isLoaded) {
      configAndPlayLocal(true);
      updateActions({ play: true });
    }

    try {
      if (currentSong?.soundObj?.isLoaded && currentSong?.soundObj?.isPlaying) {
        return currentSong?.playback?.pauseAsync().then((soundObj) => {
          setCurrentSong({
            ...currentSong,
            soundObj,
          });

          updateActions({ play: false });
        });
      }
    } catch (error) {
      console.log(`[Audio Error: handlePlayAndPause][pauseAync]: ${error?.message}`);
    }

    try {
      if (currentSong?.soundObj?.isLoaded && !currentSong?.soundObj?.isPlaying) {
        return currentSong?.playback?.playAsync().then((soundObj) => {
          setCurrentSong({
            ...currentSong,
            soundObj,
          });

          updateActions({ play: false });
        });
      }
    } catch (error) {
      console.log(`[Audio Error: handlePlayAndPause][playAsync]: ${error?.message}`);
    }
  };

  const handleStop = async (after = () => {}) => {
    updateActions({ stop: true });

    if (currentSong?.playback && currentSong?.playback?._loaded) {
      return stop(currentSong?.playback)(() => {
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

    const currentIndex = songs?.findIndex((song) => song?.id === currentSong?.detail?.id);
    const prevIndex = currentIndex === 0 ? songs?.length - 1 : currentIndex - 1;
    const prevSong = songs?.[prevIndex];

    setCurrentSong({
      ...currentSong,
      song: prevSong,
      index: prevIndex,
      forcePlay: true,
    });
  };

  async function handleNext() {
    console.log('==== handle next =====');

    const currentIndex = songs?.findIndex((song) => song.id === currentSong?.song?.id);
    const nextIndex = currentIndex === songs.length - 1 ? 0 : currentIndex + 1;
    const nextSong = songs?.[nextIndex];

    setCurrentSong({
      ...currentSong,
      song: nextSong,
      index: nextIndex,
      forcePlay: true,
    });
  }

  const handleSeek = (millis: number) => {
    return seek(
      currentSong?.playback,
      Math.floor(millis)
    )((soundObj) => {
      setCurrentSong({
        ...currentSong,
        soundObj,
      });
    })(onPlaybackStatusUpdate);
  };

  const onPlaybackStatusUpdate = (playbackStatus) => {
    setPlaybackStatus(playbackStatus);

    if (playbackStatus?.didJustFinish) {
      (async () => {
        console.log({ playbackStatus });

        await handleNext();
      })();
    }
  };

  const configAndPlayLocal = (shouldPlay = false) => {
    console.log('==== config and play ====');
    const { soundObj, song } = currentSong;
    const uri = song?.url;

    if (!soundObj?.isLoaded && song) {
      return configAndPlay(
        uri as string,
        shouldPlay
      )((playback, soundObj) => {
        setCurrentSong({
          ...currentSong,
          playback,
          soundObj,
        });

        // addToRecentlyPlayed(songs.findIndex((i) => i.id === song?.detail?.id));
      })(onPlaybackStatusUpdate);
    }
  };

  const config = () => {
    console.log('===== config =====');
    try {
      const playback = new Audio.Sound();
      setCurrentSong({
        ...currentSong,
        playback,
      });
    } catch (error) {
      console.log(`[Audio Error][config]: ${error?.message}`);
    }
  };

  useEffect(() => {
    const { song, forcePlay, detail, playback } = currentSong;
    const uri = song?.url as string;

    if (forcePlay && uri && song?.id !== detail?.id) {
      console.log('========stop and play=============');

      handleStop(() => {
        play(
          playback,
          uri
        )((soundObj) => {
          setCurrentSong({
            ...currentSong,
            soundObj,
            playback,
            detail: song,
          });

          // addToRecentlyPlayed(currentSong?.index);
        })(onPlaybackStatusUpdate);
      });
    }
  }, [currentSong?.forcePlay, currentSong?.song]);

  useEffect(() => {
    (async () => {
      await init();

      if (currentSong?.detail) {
        configAndPlayLocal();
      } else {
        config();
      }
    })();
  }, []);

  const updateCurrentSong = (payload: CurrentSong) => {
    const config = {
      playback: 'current',
      soundObj: 'current',
      detail: 'current',
      song: 'current',
      index: 'current',
      forcePlay: 'current',
      playbackStatus: 'current',
      ...payload,
    };

    const newsong = {
      ...currentSong,
      playback: config?.playback === 'current' ? currentSong?.playback : payload?.playback,
      soundObj: config?.soundObj === 'current' ? currentSong?.soundObj : payload?.soundObj,
      song: config?.song === 'current' ? currentSong?.song : payload?.song,
      index: config?.index === 'current' ? currentSong?.index : payload?.index,
      forcePlay: config?.forcePlay === 'current' ? currentSong?.forcePlay : payload?.forcePlay,
      detail: config?.detail === 'current' ? currentSong?.detail : payload?.detail,
      playbackStatus:
        config?.playbackStatus === 'current'
          ? currentSong?.playbackStatus
          : payload?.playbackStatus,
    };

    setCurrentSong(newsong);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        setCurrentSong: updateCurrentSong,
        isPlayerScreenVisible,
        setIsPlayerScreenVisible,
        playbackStatus,
        setPlaybackStatus,
        songs,
        setSongs,
        handlePlayAndPause,
        handleNext,
        handlePrev,
        handleSeek,
        handleStop,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const useMusicPlayer = () => useContext(PlayerContext);
