import React, { useEffect, useRef, useState } from 'react';
import useAppData from 'app/hooks/useAppData';
import { SolitoImage } from 'solito/image';
import { createParam } from 'solito';
import { useExercises } from 'app/stores';
import {
  H3,
  YStack,
  Text,
  Card,
  useWindowDimensions,
  Spinner,
  VirtualList,
  View,
  XStack,
  Button,
  H2,
  ScrollView,
  PageSlider,
} from '@t4/ui/src';
import { useKeepAwake } from 'expo-keep-awake';
import { BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronLeft, ChevronRight, PanelTopClose } from '@tamagui/lucide-icons';
import { useRouter } from 'solito/router';
import { WhitePage } from '@t4/ui/src/Page';
import { ExerciseTimer, PageHeader } from 'app/components';

const { useParam } = createParam<{ id: string }>();

export default function WorkoutPlay() {
  useAppData();
  useKeepAwake();

  console.log('loading play mobile');

  const [workoutId = ''] = useParam('id');

  const [exercises] = useExercises();

  const { data, hasLoaded } = exercises;

  const { push, back } = useRouter();

  // const { route } = props;
  // const { id, day } = route.params;

  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  // const { width } = Dimensions.get("window");
  const { width, height } = useWindowDimensions();

  // const contextState = useContext(LanguageContext);
  // const language = contextState.language;
  // const Strings = Languages[language].texts;

  const scrollViewRef = useRef<ScrollView | null>(null);
  // const scrollViewRef = useRef<ScrollView | null>(null); // Specify the type

  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const onPageIndex = () => {
    return pageIndex;
  };

  const toPrevExercise = () => {
    setIsPlaying(false);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: width * (pageIndex - 1),
        animated: true,
      });
    }

    onPageIndex();
  };

  const toNextExercise = () => {
    setIsPlaying(false);
    if (scrollViewRef.current) {
      // console.log({ scrollViewRef });
      scrollViewRef.current.scrollTo({
        x: width * (pageIndex + 1),
        animated: true,
      });
    }

    onPageIndex();
  };

  const { currentPage: pageIndex } = sliderState;

  const confirmClose = () => {
    // Show alert
    // Alert.alert(
    //   Strings.ST123,
    //   Strings.ST124,
    //   [
    //     {
    //       text: Strings.ST125,
    //       style: "cancel",
    //     },
    //     { text: Strings.ST126, onPress: () => props.navigation.goBack() },
    //   ],
    //   { cancelable: false }
    // );

    back();

    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', confirmClose);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setIsPlaying(false);
  }, [sliderState]);

  if (!hasLoaded) {
    return <Spinner />;
  }

  const exercisesLength = data.length || 0;

  const BOTTOM_SHEET_HEIGHT = 100;
  const backButtonDisabled = pageIndex === 0;
  const nextButtonDisabled = pageIndex === exercisesLength - 1;

  const renderItem = (item) => {
    return (
      <ExerciseTimer
        data={item}
        stop={isPlaying}
        currentPage={onPageIndex()}
        lastPage={exercisesLength - 1}
        workoutId={workoutId}
        totalItems={exercisesLength}
        // key={i}
      />
    );
  };

  console.log({ pageIndex, nextButtonDisabled, backButtonDisabled, exercisesLength });
  return (
    <View>
      {/* Image Backround: Header, Nav */}

      <PageHeader />

      <PageSlider data={data} renderItem={renderItem} />
    </View>
  );
}
