import React, { useEffect } from 'react';
import { createParam } from 'solito';
import { Button, YStack, XStack, useWindowDimensions, H2, ImageBackground, H3 } from '@t4/ui/src';
import { useRouter } from 'solito/router';
import { Home, RotateCcw, X } from '@tamagui/lucide-icons';
import { CONGRATULATION_IMAGE } from 'app/constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WhitePage } from 'app/components/Page';
import { useLanguage, useTranslation } from 'app/provider/language';
import { BackHandler, Platform } from 'react-native';
import { SolitoImage } from 'solito/image';
import { useAssets } from 'app/hooks';

const { useParam } = createParam<{ id: string }>();

export default function Completed() {
  const [workoutId = ''] = useParam('id');
  const { push } = useRouter();
  const translation = useTranslation();

  const { height, width } = useWindowDimensions();
  const { lang } = useLanguage();
  const { data } = useAssets();

  const { images, texts } = data || {};

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

        <ImageBackground
          resizeMode={'cover'}
          source={{ uri: images?.firework ?? '' }}
          width={width}
          // height={40}
          height={height - 75}
          // borderRadius={circular ? 40 : 4}
        >
          <YStack
            // backgroundColor={'red'}
            height={height - 75}
            alignItems="center"
            justifyContent="center"
          >
            <SolitoImage
              width={width - 80}
              height={300}
              src={images?.congratulation_url ?? CONGRATULATION_IMAGE}
              // resizeMode="contain"
              alt="congrates"
              unoptimized
            />
            <H2> {texts?.congratulation_title?.[lang] ?? ''}</H2>
            <XStack space marginTop={80}>
              <Button
                size={'$5'}
                borderRadius={50}
                icon={Home}
                themeInverse
                onPress={() => push('/')}
              >
                {translation?.home}
              </Button>
              <Button
                size={'$5'}
                borderRadius={50}
                iconAfter={RotateCcw}
                chromeless
                // themeInverse
                onPress={() => push(`/workout/${workoutId}`)}
              >
                {translation?.restart}
              </Button>
            </XStack>
          </YStack>
        </ImageBackground>
      </SafeAreaView>
    </WhitePage>
  );
}
