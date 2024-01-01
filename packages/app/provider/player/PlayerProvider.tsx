import { Track } from '@t4/ui/src/modals';
import { AVPlaybackStatus, AVPlaybackStatusSuccess, Audio } from 'expo-av';
import React, { PropsWithChildren, createContext, useState, useContext } from 'react';
import { mock_songs } from '../../../mock/songs';

// currentSong: {
//   playback: {},
//   soundObj: {},
//   detail: {
//     id: 1,
//     title: 'Heartless',
//     author: 'The Weeknd',
//     img: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/heartless_du9yxe.jpg',
//     uri: 'https://res.cloudinary.com/jsxclan/video/upload/v1623987046/GitHub/Projects/Musicont/mock/audios/heartless_u7exot.mp3',
//     durationMillis: 249740,
//   },
//   playbackStatus: {},
// }

export type CurrentSong = {
  playback?: Audio.Sound;
  soundObj?: AVPlaybackStatus;
  detail?: Track;
  song?: Track;
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
};

const PlayerContext = createContext<PlayerContextType>({
  currentSong: defaultCurrentSong,
  setCurrentSong: (_: CurrentSong) => {},
  isPlayerScreenVisible: false,
  setIsPlayerScreenVisible: (_: boolean) => {},
  playbackStatus: undefined,
  setPlaybackStatus: (_: AVPlaybackStatus) => {},
});

export function PlayerProvider({ children }: PropsWithChildren) {
  const [currentSong, setCurrentSong] = useState<CurrentSong>(defaultCurrentSong);

  const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatusSuccess>();

  const [isPlayerScreenVisible, setIsPlayerScreenVisible] = useState<boolean>(false);

  const updateCurrentSong = (payload: CurrentSong) => {
    const config = {
      playback: 'current',
      soundObj: 'current',
      detail: 'current',
      playbackStatus: 'current',
      song: 'current',
      index: 'current',
      forcePlay: 'current',
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
      // playbackStatus:
      //   config?.playbackStatus === 'current'
      //     ? currentSong?.playbackStatus
      //     : payload?.playbackStatus,
    };

    console.log({ newsong });

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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const useMusicPlayer = () => useContext(PlayerContext);
