import React, { useEffect } from 'react';
import { useRouter } from 'solito/router';
import { MusicPlayer, PageHeader } from 'app/components';
import { WhitePage } from 'app/components/Page';
import { useMusicPlayer } from 'app/provider/player/PlayerProvider';
import { BackHandler, Platform } from 'react-native';

export default function MusicScreen() {
  const { back } = useRouter();
  const { setIsPlayerScreenVisible } = useMusicPlayer();

  useEffect(() => {
    if (Platform.OS !== 'web') {
      console.log('from musi pla');
      // console.log({ isPlayerScreenVisible });
      const backAction = () => {
        // if (!showExitAlert && !isPlayerScreenVisible) {
        //   setShowExitAlert(true);
        //   return true;
        // }

        // isPlayerScreenVisible

        setIsPlayerScreenVisible(false);

        return false;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        console.log('play screen gone!');

        backHandler.remove();
      };
    }
  }, []);

  return (
    <WhitePage>
      <PageHeader
        onBack={() => {
          back();
        }}
      ></PageHeader>

      <MusicPlayer />
    </WhitePage>
  );
}
