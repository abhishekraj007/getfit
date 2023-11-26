import React from 'react';
import { createParam } from 'solito';
import { Button, YStack, XStack, ImageBackground, useWindowDimensions, H2 } from '@t4/ui/src';
import { useRouter } from 'solito/router';
import { Home, RotateCcw, X } from '@tamagui/lucide-icons';
import { CONGRATULATION_IMAGE } from 'app/constants/images';

import { LinearGradient } from '@tamagui/linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WhitePage } from 'app/components/Page';

const { useParam } = createParam<{ id: string }>();

export default function Completed() {
  // useKeepAwake();

  const [workoutId = ''] = useParam('id');
  const { back, push } = useRouter();

  const { height, width } = useWindowDimensions();

  return (
    <WhitePage>
      <ImageBackground
        source={{ uri: CONGRATULATION_IMAGE }}
        resizeMode={'cover'}
        width={width}
        height={height}
      >
        <SafeAreaView>
          <LinearGradient
            width={width}
            height={height}
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)']}
          >
            <XStack>
              <Button
                unstyled
                paddingHorizontal="$4"
                icon={<X size={'$2.5'} color={'$gray11'} />}
                onPress={() => push('/')}
                themeInverse
                marginTop={24}
              >
                {/* <X size={'$3'} /> */}
              </Button>
            </XStack>
            <YStack height={height} alignItems="center" justifyContent="center">
              <H2 color={'white'}>Congratulations</H2>
              <XStack space marginTop={24}>
                <Button themeInverse icon={Home} chromeless onPress={() => push('/')}>
                  Home
                </Button>
                <Button
                  iconAfter={RotateCcw}
                  chromeless
                  themeInverse
                  onPress={() => push(`/workout/${workoutId}`)}
                >
                  Restart
                </Button>
              </XStack>
            </YStack>
          </LinearGradient>
        </SafeAreaView>
      </ImageBackground>
    </WhitePage>
  );
}
