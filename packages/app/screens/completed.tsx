import React, { useEffect } from 'react';
import { createParam } from 'solito';
import { Button, YStack, XStack, useWindowDimensions } from '@t4/ui/src';
import { useRouter } from 'solito/router';
import { Home, RotateCcw, X } from '@tamagui/lucide-icons';
import { CONGRATULATION_IMAGE } from 'app/constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WhitePage } from 'app/components/Page';
import { useTranslation } from 'app/provider/language';
import { BackHandler, Platform } from 'react-native';
import { SolitoImage } from 'solito/image';

const { useParam } = createParam<{ id: string }>();

export default function Completed() {
  // useKeepAwake();

  const [workoutId = ''] = useParam('id');
  const { push } = useRouter();
  const translation = useTranslation();

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const backAction = () => {
        push('/');
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
    }
  }, []);

  return (
    <WhitePage>
      <SafeAreaView>
        <XStack paddingHorizontal="$4">
          <Button
            icon={<X size={'$2'} color={'$gray11'} />}
            onPress={() => push('/')}
            // themeInverse
            circular
          ></Button>
        </XStack>
        <YStack
          // backgroundColor={'red'}
          height={height - 75}
          alignItems="center"
          justifyContent="center"
        >
          {/* <H2 color={'white'}>{translation?.congratulations}</H2> */}
          <SolitoImage
            width={width - 80}
            height={100}
            src={CONGRATULATION_IMAGE}
            // resizeMode="contain"
            alt="congrates"
            unoptimized
          />
          <XStack space marginTop={30}>
            <Button icon={Home} chromeless onPress={() => push('/')}>
              {translation?.home}
            </Button>
            <Button
              iconAfter={RotateCcw}
              chromeless
              // themeInverse
              onPress={() => push(`/workout/${workoutId}`)}
            >
              {translation?.restart}
            </Button>
          </XStack>
        </YStack>
      </SafeAreaView>
    </WhitePage>
  );
}
