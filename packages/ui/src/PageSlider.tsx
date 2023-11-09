import { AnimatePresence } from '@tamagui/animate-presence';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { Button, Image, XStack, YStack, styled, useWindowDimensions } from 'tamagui';
import { WhitePage } from './Page';

const YStackEnterable = styled(YStack, {
  variants: {
    isLeft: { true: { x: -300, opacity: 0 } },

    isRight: { true: { x: 300, opacity: 0 } },
  } as const,
});

export function PageSlider({ data, renderItem }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const pageSize = data.length;

  const sliderIndex = wrap(0, pageSize, page);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const { height } = useWindowDimensions();

  const enterVariant = direction === 1 || direction === 0 ? 'isRight' : 'isLeft';

  const exitVariant = direction === 1 ? 'isLeft' : 'isRight';
  const BOTTOM_SHEET_HEIGHT = 140;
  const backButtonDisabled = sliderIndex === 0;
  const nextButtonDisabled = sliderIndex === pageSize - 1;

  return (
    <WhitePage overflow="hidden" position="relative" width="100%" alignItems="center">
      <YStack height={height - BOTTOM_SHEET_HEIGHT}>
        <AnimatePresence enterVariant={enterVariant} exitVariant={exitVariant}>
          <YStackEnterable
            key={page}
            animation="bouncy"
            fullscreen
            x={0}
            opacity={1}
            alignItems="center"
          >
            {renderItem(data[sliderIndex])}
          </YStackEnterable>
        </AnimatePresence>
      </YStack>
      <XStack height={BOTTOM_SHEET_HEIGHT} justifyContent="space-between" padding="$4">
        <Button
          accessibilityLabel="Carousel left"
          icon={ArrowLeft}
          size="$6"
          circular
          onPress={() => paginate(-1)}
          disabled={backButtonDisabled}
          color={`${backButtonDisabled ? '$color.gray10Light' : ''}`}
        />

        <Button
          accessibilityLabel="Carousel right"
          icon={ArrowRight}
          size="$6"
          circular
          onPress={() => paginate(1)}
          disabled={nextButtonDisabled}
          color={`${nextButtonDisabled ? '$color.gray10Light' : ''}`}
        />
      </XStack>
    </WhitePage>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;

  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
