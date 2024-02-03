import React, { useEffect, useState } from 'react';
import { createParam } from 'solito';
import { Spinner, PageSlider, Button, H5, View } from '@t4/ui/src';
import { useRouter } from 'solito/router';
import { ExerciseTimer, ExitModal, PageHeader } from 'app/components';
import { useAssets, useExercisesByWorkoutId } from 'app/hooks';
import { CheckCircle, ChevronLeft, ChevronRight, Music } from '@tamagui/lucide-icons';
import { WhitePage } from 'app/components/Page';
import { useTranslation } from 'app/provider/language';
import { useMusicPlayer } from 'app/provider/player/PlayerProvider';
import { TestIds, useInterstitialAd } from 'react-native-google-mobile-ads';
import { AD_IDS, APP_FEATURES } from 'app/constants';

const { useParam } = createParam<{ id: string }>();

const interstitialAdId = __DEV__ ? TestIds.INTERSTITIAL : AD_IDS.INTERTETIAL_WORKOUT_FINISH;

export default function WorkoutPlay() {
  const [workoutId = ''] = useParam('id');
  const { push } = useRouter();
  const { exercises, isLoading } = useExercisesByWorkoutId(workoutId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showExitAlert, setShowExitAlert] = useState(false);
  const translation = useTranslation();
  const exercisesLength = exercises?.length || 0;
  const { setIsPlayerScreenVisible } = useMusicPlayer();
  const isMusicDisabled = !APP_FEATURES.music;

  // useEffect(() => {
  //   if (Platform.OS !== 'web') {
  //     console.log({ isPlayerScreenVisible });
  //     const backAction = () => {
  //       if (!showExitAlert && !isPlayerScreenVisible) {
  //         setShowExitAlert(true);
  //         return true;
  //       }
  //       return false;
  //     };

  //     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

  //     return () => {
  //       console.log('play screen unmdf');

  //       backHandler.remove();
  //     };
  //   }
  // }, []);

  /**
   * Ads
   */
  const { isLoaded, isClosed, load, show, isOpened } = useInterstitialAd(interstitialAdId);
  // const { isLoaded, isClosed, load, show, isOpened } = useRewardedInterstitialAd(
  //   TestIds.REWARDED_INTERSTITIAL
  // );
  // const { isLoaded, isClosed, load, show, isOpened } = useRewardedAd(TestIds.REWARDED);

  useEffect(() => {
    // Start loading the interstitial
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      push(`/workout/${workoutId}/completed`);
    }
  }, [isClosed]);

  const leftButton = (onPrev, pageNumber) => {
    const buttonDisabled = pageNumber === 0;
    return (
      <Button
        accessibilityLabel="Carousel left"
        icon={ChevronLeft}
        size="$10"
        chromeless
        padding={'$3'}
        onPress={() => {
          setIsPlaying(false);
          onPrev();
        }}
        disabled={buttonDisabled}
        color={`${buttonDisabled ? '$color.gray6Light' : ''}`}
      />
    );
  };

  const finishText = translation?.finish;

  const onComplete = () => {
    if (isLoaded) {
      show();
    } else {
      // No advert ready to show yet
      push(`/workout/${workoutId}/completed`);
    }
  };

  const rightButton = (onNext, pageNumber) => {
    const isLastExercise = pageNumber === exercises.length - 1;
    return (
      <Button
        accessibilityLabel="Carousel left"
        iconAfter={isLastExercise ? CheckCircle : ChevronRight}
        size={isLastExercise ? '$6' : '$10'}
        chromeless
        padding={isLastExercise ? '$3' : 0}
        onPress={() => {
          setIsPlaying(false);

          if (isLastExercise) {
            onComplete();
          } else {
            onNext();
          }
        }}
        color={`${isLastExercise ? '$color.green10Dark' : ''}`}
      >
        <H5 color={'$color.green10Dark'}>{isLastExercise ? finishText : ''}</H5>
      </Button>
    );
  };

  const renderItem = ({ item, pageNumber, onNext, onPrev }) => {
    return (
      <ExerciseTimer
        exercise={item}
        stop={isPlaying}
        currentPage={pageNumber}
        lastPage={exercisesLength - 1}
        totalItems={exercisesLength}
        leftButton={leftButton(onPrev, pageNumber)}
        rightButton={rightButton(onNext, pageNumber)}
        onNext={onNext}
        onPrev={onPrev}
        onComplete={onComplete}
      />
    );
  };

  const renderMusicButton = () => {
    if (isMusicDisabled) return null;

    return (
      <View>
        <Button
          icon={<Music size={'$1'} />}
          unstyled
          chromeless
          onPress={() => {
            setIsPlayerScreenVisible(true);
            push(`/playlists`);
          }}
        ></Button>
      </View>
    );
  };

  return (
    <WhitePage>
      <PageHeader
        onBack={() => {
          setShowExitAlert(true);
        }}
        rightContent={renderMusicButton()}
      ></PageHeader>

      {showExitAlert && (
        <ExitModal
          open={showExitAlert}
          onConfirm={() => push(`/workout/${workoutId}`)}
          onCancel={() => setShowExitAlert(false)}
        />
      )}

      {isLoading || isOpened ? (
        <Spinner />
      ) : (
        <PageSlider data={exercises} renderItem={renderItem} />
      )}
    </WhitePage>
  );
}
