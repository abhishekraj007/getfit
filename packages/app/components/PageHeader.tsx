import React from 'react';
import {
  useWindowDimensions,
  YStack,
  ImageBackground,
  XStack,
  Button,
  H5,
  useThemeName,
} from '@t4/ui/src';
import { LinearGradient } from '@tamagui/linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { useRouter } from 'solito/router';
import { HEADER_HEIGHT, HEADER_HEIGHT_WITHOUT_IMAGE } from 'app/constants';

interface PageHeaderProps {
  image?: string;
  title?: string;
  onBack?: () => void;
  children?: React.ReactNode;
  height?: number;
  hasBackdrop?: boolean;
  rightContent?: React.ReactNode;
}

export function PageHeader({
  image,
  onBack,
  title,
  children,
  height,
  hasBackdrop = true,
  rightContent,
}: PageHeaderProps) {
  const { width } = useWindowDimensions();
  const isThemeDark = useThemeName().includes('dark');
  const { back } = useRouter();

  const backIconColor = image || !hasBackdrop ? 'white' : isThemeDark ? 'white' : 'black';

  const headerBackgroundColor = image ? 'transparent' : isThemeDark ? 'transparent' : 'white';

  const renderBackButton = () => {
    return (
      <YStack paddingHorizontal="$4" backgroundColor={headerBackgroundColor}>
        <XStack
          alignItems="center"
          height={HEADER_HEIGHT_WITHOUT_IMAGE}
          justifyContent="space-between"
        >
          <Button
            icon={<ArrowLeft size={'$1.5'} color={backIconColor} />}
            // icon={<ChevronLeft size={'$2'} color={backIconColor} />}
            chromeless
            onPress={() => {
              if (!!onBack) {
                onBack();
              } else {
                back();
              }
            }}
            unstyled
            marginRight={'$4'}
            // themeInverse={}
          />

          {title && <H5 color={'white'}>{title}</H5>}
          {rightContent && rightContent}
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
          source={{ uri: image }}
          resizeMode={height ? 'contain' : 'cover'}
          width={width}
          height={height ?? HEADER_HEIGHT}
        >
          {hasBackdrop ? (
            <LinearGradient
              width={width}
              height={height ?? HEADER_HEIGHT}
              colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)']}
            >
              <SafeAreaView>{renderBackButton()}</SafeAreaView>
            </LinearGradient>
          ) : (
            <SafeAreaView>
              <YStack height={height ?? HEADER_HEIGHT}>{renderBackButton()}</YStack>
            </SafeAreaView>
          )}
        </ImageBackground>
      ) : (
        <SafeAreaView>{renderBackButton()}</SafeAreaView>
      )}
    </YStack>
  );
}
