import React from 'react';
import { useParam } from 'app/hooks';
import { useWorkouts } from 'app/stores';
import {
  Spinner,
  useWindowDimensions,
  YStack,
  ImageBackground,
  XStack,
  Button,
  H5,
  useThemeName,
} from '@t4/ui/src';
import { LinearGradient } from '@tamagui/linear-gradient';
import useAppData from 'app/hooks/useAppData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { useRouter } from 'solito/router';

interface PageHeaderProps {
  image?: string;
  title?: string;
  onBack?: () => void;
  children?: React.ReactNode;
}

export function PageHeader({ image, onBack, title, children }: PageHeaderProps) {
  useAppData();
  const [workoutId = ''] = useParam('id');
  const [workouts] = useWorkouts();
  const { flatData, hasLoaded } = workouts;
  const workoutDetail = flatData?.[workoutId];
  const { width } = useWindowDimensions();
  const isThemeDark = useThemeName().includes('dark');

  const { back } = useRouter();

  if (!hasLoaded || !workoutDetail) {
    return <Spinner />;
  }

  const backIconColor = image ? 'white' : isThemeDark ? 'white' : 'black';
  const headerBackgroundColor = image ? 'transparent' : isThemeDark ? 'transparent' : 'white';

  console.log({ backIconColor });

  const HEADER_HEIGHT = 300;

  const renderBackButton = () => {
    return (
      <YStack paddingHorizontal="$4" backgroundColor={headerBackgroundColor}>
        <XStack alignItems="center">
          <Button
            icon={<ArrowLeft size={'$1.5'} color={backIconColor} />}
            chromeless
            onPress={back}
            paddingVertical={'$4'}
            unstyled
            marginRight={'$4'}
          />

          {title && <H5 color={'white'}>{title}</H5>}
        </XStack>

        {children && (
          <YStack height={HEADER_HEIGHT - 120} justifyContent="flex-end">
            {children}
          </YStack>
        )}
      </YStack>
    );
  };

  return (
    <YStack>
      {image ? (
        <ImageBackground
          source={{ uri: workoutDetail.image }}
          resizeMode={'cover'}
          width={width}
          height={HEADER_HEIGHT}
        >
          <LinearGradient
            width={width}
            height={HEADER_HEIGHT}
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)']}
          >
            <SafeAreaView>{renderBackButton()}</SafeAreaView>
          </LinearGradient>
        </ImageBackground>
      ) : (
        <SafeAreaView>{renderBackButton()}</SafeAreaView>
      )}
    </YStack>
  );
}
